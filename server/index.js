const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require("dotenv").config();
const app=express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;


const schemadata = mongoose.Schema({
    name : String,
    email : String,
    mobile : String
},{
    timestamps : true
})
const usermodel = mongoose.model("user",schemadata);


//read
app.get("/", async(req,res)=>{
    const data= await usermodel.find({})
    res.json({success: "true", data: data})
})

// create data || save data in db
app.post("/create",async(req,res)=>{
    // console.log(req.body);
    const data = new usermodel(req.body);
    await data.save();
    res.send({success:"true",message:"data save successfully",data:data});
})

//update data
app.put("/update", async(req,res)=>{
    // console.log(req.body);
    const {_id,...rest}= req.body;
    // console.log(rest);
    const data = await usermodel.updateOne({_id:_id},rest);
    res.send({success:true,message: "data update successfully",data:data})

}) 

//delete data
app.delete("/delete/:id", async(req,res)=>{
    const id= req.params.id;
    // console.log(id);
    const data = await usermodel.deleteOne({_id : id});
    res.send({success:true,message: "data delete successfully",data:data})

})



//connection of server to database using this link;
// const URL= "mongodb://localhost:27017/crudoperation";
const URL = process.env.DBURL || "mongodb://localhost:27017/crudoperation";
mongoose.connect(URL)
.then(()=>{
    console.log("connect to db")
    app.listen(PORT,()=>console.log("server is running on "+PORT));
    console.log(URL); 

})
.catch((err)=>console.log(err))

 