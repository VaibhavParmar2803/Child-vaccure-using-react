require('dotenv').config()
require("./database/db")
const express = require('express');
const PORT = process.env.PORT
const user = require("./routers/user")

const app = express();
app.use(express.json());

app.use("/user", user)

app.listen(PORT, () => {
      console.log(`Server running in http://localhost:${PORT}`);
})