require('dotenv').config()
require("./database/db")
const express = require('express');
const PORT = process.env.PORT
const user = require("./routers/user")
const appointment = require("./routers/appointment")

const app = express();
app.use(express.json());

app.use("/user", user)
app.use("/appointment", appointment)

app.listen(PORT, () => {
      console.log(`Server running in http://localhost:${PORT}`);
})