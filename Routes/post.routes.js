const express=require('express');
const {  userPost } = require('../model/post.model');
const { auth } = require('../middleware/auth.middleware');
const postRouter=express.Router();


postRouter.post('/add',auth,async(req,res)=>{
    const {data}=req.body;
    try {
        let newPost=await userPost(data);
        newPost.save();
        res.status(200).json({msg:'New post added successfully',addedPost:newPost});
    } catch (error) {
        res.status(400).json({msg:'Error'})
    }
});


postRouter.get('/',auth,async(req,res)=>{
    const query=req.body;
    try {
        const posts=await userPost.find(query);
        res.status(200).json({msg:{posts}})
    } catch (error) {
        res.status(error.status).json({msg:error.message})
    }
})




postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID}=req.params;
    const payload=req.body;
    try {
        await userPost.findByIdAndUpdate({_id:postID},payload);
        res.status(200).json({msg:'Post updated successfully'})
    } catch (error) {
        res.status(error.status).json({msg:error.message})
    }
})

postRouter.delete("/delete/:postID",auth,async(req,res)=>{
    const {postID}=req.params;
    try {
        await userPost.findByIdAndDelete({_id:postID});
        res.status(200).json({msg:'Post Delete successfully'})
    } catch (error) {
        res.status(error.status).json({msg:error.message})
    }
})


module.exports={
    postRouter
}