const express = require('express');


module.exports = () => {
    const route = express.Router();

    route.get('/',(req,res)=>{
        res.send("Hello Test");
    });

    return route;
}