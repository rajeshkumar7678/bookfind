const express=require("express")
const { bookmodel } = require("../models/bookmodel")

const bookroute=express.Router()

bookroute.get("/",(req,res)=>{
    res.send("book route")
})

// addbook========================================
bookroute.post("/addbook",async(req,res)=>{
    try {
        let bookdelails=req.body
        let addbook=new bookmodel(bookdelails)
        await addbook.save()
        res.status(200).send({"msg":"book added successful"})
        
    } catch (error) {
        console.log(error)
    }
})


// retrive book==========================================
bookroute.get("/allbook",async(req,res)=>{
    try {
        let allbooks=await bookmodel.find()
        res.status(200).send({"allbooks":allbooks})
        
    } catch (error) {
        console.log(error)
    }
})


// delete book by id========================================
bookroute.delete("/delete/:id",async(req,res)=>{
    try {
        let {id}=req.params
        let user=await bookmodel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"book deleted"})

    } catch (error) {
        console.log(error)
    }
})

//filter book================================
bookroute.get("/filter",async(req,res)=>{
    try {
        let abc=req.query
        console.log(abc)
        let bookdata=await bookmodel.find(abc)
        res.status(200).send({"filterdata":bookdata})
        
    } catch (error) {
        console.log(error)
    }
})

bookroute.get("/sort/:val",async(req,res)=>{
    try {
        let {val}=req.params
        let bookdata= await bookmodel.find().sort({price:val})
        res.send(bookdata)
    } catch (error) {
        console.log(error)
    }
})














module.exports={
    bookroute
}