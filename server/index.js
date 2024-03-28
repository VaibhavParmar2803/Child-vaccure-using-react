require('dotenv').config()
require("./database/db")
const express = require('express');
const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.listen(PORT, () => {
      console.log(`Server running in http://localhost:${PORT}`);
})