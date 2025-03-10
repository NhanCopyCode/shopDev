"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const keytokenModel = require("../models/keytoken.model");
const { getInfoData } = require("../utils");

const RoleShop = {
	SHOP: "SHOP",
	WRITER: "WRITER",
	EDITOR: "EDITOR",
	ADMIN: "ADMIN",
};

class AccessService {
	static signUp = async ({ name, email, password }) => {
		try {
			const listShop = await shopModel.find().lean();
			console.log("listShop:", listShop);

			// check email exists
			const holderShop = await shopModel.find({ email }).lean();
			if (holderShop.length > 0) {
				console.log(`Holder shop::${holderShop}`);
				return {
					code: "xxx",
					message: "Shop already registered!",
				};
			}
			const passwordHash = await bcrypt.hash(password, 10);
			const newShop = await shopModel.create({
				name,
				email,
				password: passwordHash,
				roles: [RoleShop.SHOP],
			});
			if (newShop) {
				// const { privateKey, publicKey } = crypto.generateKeyPairSync(
				// 	"rsa",
				// 	{
				// 		modulusLength: 4096,
				// 		publicKeyEncoding: {
				// 			type: "pkcs1",
				// 			format: "pem",
				// 		},
				// 		privateKeyEncoding: {
				// 			type: "pkcs1",
				// 			format: "pem",
				// 		},
				// 	}
				// ); // Save collection keystore
				const privateKey = crypto.randomBytes(64).toString('hex');
				const publicKey = crypto.randomBytes(64).toString("hex");

				const keyStore = await KeyTokenService.createKeyToken({
					userId: newShop._id,
					publicKey,
					privateKey
				});

				if (!keyStore) {
					return {
						code: "xxx",
						message: "publicKeyString error",
					};
				}


				const tokens = await createTokenPair(
					{
						userId: newShop._id,
						email,
					},
					publicKey,
					privateKey
				);
				console.log("Create Token success::", tokens);

				return {
					code: 201,
					metadata: {
						shop: getInfoData({
							fields: ["_id", "name", "email"],
							object: newShop,
						}),
						tokens,
					},
				};
			}

			return {
				code: 200,
				metadata: null,
			};
		} catch (error) {
			console.log("Error::", error);
			return {
				code: "xxx",
				message: error.message,
				status: "error",
			};
		}
	};
}

module.exports = AccessService;
