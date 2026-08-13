require("dotenv").config();

console.log("ENV keys:", Object.keys(process.env).filter(key =>
    key.toUpperCase().includes("JWT")
));

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
