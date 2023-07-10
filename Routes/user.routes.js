const express=require('express');
const { userModel } = require('../model/user.model');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { blacklist } = require('../blacklist');
const userRouter=express.Router();


userRouter.get('/',(req,res)=>{
    res.status(200).json({msg:"hii"})
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,city,age}=req.body;
    const passReg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!passReg.test(pass)){
        return res.status(400).json({err:"Pass word does not fulfilled criteria"});
    }
    try {
        const existing=await userModel.findOne({email});
        if(existing){
            return res.status(400).json({err:"User already exists"})
        }
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                return res.status(400).json({err:err.message})
            }
            const user=new userModel({name,email,pass:hash,city,age});
            await user.save();
            res.status(200).json({msg:"The new user has been registered",registeredUser:user})
        })
    } catch (error) {
        res.status(400).json({err:error.message})
    }

})

userRouter.post("/login",async(req,res)=>{
    const{email,pass} = req.body
    try{
const user= await userModel.findOne({email})

if(user){
    bcrypt.compare(pass, user.pass, (err, result)=> {
        if(result){
            var token = jwt.sign({ course:"backend" }, 'eval',{
                expiresIn: 420
            });
            var rtoken = jwt.sign({ course:"backend" }, 'evaluation',{
                expiresIn: 600
            });
            
              res.status(200).json({msg:"Login Successfull",token,rtoken})

        }else{
            res.status(200).json({msg:"Login Failure"})

        }
      });
}else{
    res.status(200).json({msg:"Login Failure"})
}
    }catch{
        res.status(400).json({error:error.message})
 
    }
})

userRouter.get('/logout',async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
        blacklist.push(token);
        res.status(200).json({msg:"Logout Success"})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})


module.exports={userRouter};