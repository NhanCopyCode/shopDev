"use strict";

const AccessService = require("../services/access.service");

class AccessController {
	signUp = async (req, res, next) => {
		try {
			console.log(`[P]::singUp::${JSON.stringify(req.body)}`);

			// return res.status(200).json({
			// 	code: "2001",
			// 	message: "Success",
			// });
			return res.status(201).json(await AccessService.signUp(req.body));
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = new AccessController();
