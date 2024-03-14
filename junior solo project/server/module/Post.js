const mongoose =require('mongoose');

const PostSchema= new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        FirstName:{
            type:String,
            required:true,   
        },
        LastName:{
            type:String,
            required:true,   
        },
        location:String,
        description:String,
        picturePath:String,
        userpicturePath:String,
        likes:{
           type:Map,
           of:Boolean
        },
        comment:{
            type:Array,
            default:[]
        }
    }
)
const Post=mongoose.model("Post",PostSchema);
module.exports=Post;