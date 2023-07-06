const express=require("express")
const { connection } = require("./config/db")
const { bookroute } = require("./routes/bookroute")
const cors=require("cors")
require("dotenv").config()

const app=express()
let Port=process.env.port || 5858
app.use(express.json())
app.use(cors())



app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/book",bookroute)








app.listen(Port,async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running on ${Port}`)
})