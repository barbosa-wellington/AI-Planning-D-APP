import express from "express";
import {ENV} from "./config/env.js";

// the dotenv will ensure that the listening port will be 5001 from the env file.
// import "dotenv/config"



const app = express()
const PORT = ENV.PORT || 5001;


app.get("/api/health", (req,res) => {
    res.status(200).json({success:true});
});

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT)
})