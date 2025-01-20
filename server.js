const app = require("./src/app");

const PORT = process.env.PORT;
app.listen(3055, () => {
    console.log(`App listening on :: http://localhost:${PORT}`);
});
