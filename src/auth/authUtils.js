"use strict";

const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		// access token
		const accessToken = JWT.sign(payload, publicKey, {
			expiresIn: "2 days",
		});
		const refreshToken = JWT.sign(payload, privateKey, {
			expiresIn: "7 days",
		});

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if(err) {
                console.log('Error verify::', err);
            }else {
                console.log('Decode verify::', decode);
            }

        })
        return { accessToken, refreshToken };
	} catch (error) {
		return error;
	}
};

module.exports = {
	createTokenPair,
};
