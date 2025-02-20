"use strict";

// LV0
// const config = {
//     app: {
//         port: 3055,
//     },
//     db: {
//         host: "127.0.0.1",
//         port: "27017",
//         name: "shopDev",
//     },
// };

//LV1

const dev = {
    app: {
        port: 3055,
    },
    db: {
        host: "127.0.0.1",
        port: "27017",
        name: "shopDev",
    },
};

const pro = {
    app: {
        port: 3055,
    },
    db: {
        host: "127.0.0.1",
        port: "27017",
        name: "shopPro",
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
