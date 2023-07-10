const mongoose=require('mongoose');
require('dotenv').config();
const connection=mongoose.connect('mongodb+srv://Akash:Chaurasiya@cluster0.izqpfng.mongodb.net/postManagement?retryWrites=true&w=majority');

module.exports={connection}