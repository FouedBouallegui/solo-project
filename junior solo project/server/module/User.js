const mongoose =require('mongoose');

const UserSchema= new mongoose.Schema(
    {
        FirstName:{
            type:String,
            
            min:2,
            max:50,
        },
        LastName:{
            type:String,
            
            min:2,
            max:50,
        },
        email:{
            type:String,
            
            max:50,
            unique:true,
        },
        password:{
            type:String,
           
            min:8,
        },
        picturePath:{
            type:String,
            default:"",
        },
        Friends:{
            type:Array,
            default:[],
        },
        location:String,
        occupation:String,
        
    }
)
const User=mongoose.model("User",UserSchema);
module.exports=User;