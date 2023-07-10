const express=require('express');
const { userRouter } = require('./Routes/user.routes');
const { connection } = require('./db');
const { postRouter } = require('./Routes/post.routes');
const { rateLimiter } = require('./middleware/rateLimiter.middleware');

const app=express();

app.use(express.json());

app.use('/users',userRouter)
app.use('/posts',postRouter)


app.get("/regeneratetoken",(req,res)=>{
    const rToken=req.headers.authorization?.split(" ")[1];
    const decoded=jwt.verify(rToken,"evaluation");
    if(decoded){
      const token=jwt.sign({course:"backend"},"eval",{
        expiresIn:300
      })
    }else{
      res.json({msg:"Invalid"})
    }
  })
  
  


app.listen(8080,rateLimiter,async()=>{
    try {
        await connection;
        console.log('Connected to DB')
        console.log('Connected to port 8080')
    } catch (error) {
        console.log('err')
    }
})