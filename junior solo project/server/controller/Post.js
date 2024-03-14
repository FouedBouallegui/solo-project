const Post=require('../module/Post');
const User=require('../module/User');

module.exports={
  createPost:async(req,res)=>{
     try {
        const {userId,description,picturePath}=req.body;
        const user = await User.findById(userId);
        const newPost= new Post({
            userId,
            FirstName:user.FirstName,
            LastName:user.LastName,
            location:user.location,
            description,
            userpicturePath:user.picturePath,
            picturePath,
            likes:{},
            comment:[]
        })
         await newPost.save()
         const post=await Post.find();
         res.status(201).json(post)
    } catch (error) {
        throw error
     }
 },
 
 getFeedPosts:async(req,res)=>{
    try {
        const post=await Post.find();
         res.status(200).json(post)
      }catch (error) {
        throw error
      }
     },

getUserPosts:async(req,res)=>{
    try {
        const{userId}=req.params
        const post=await Post.find({userId});
         res.status(200).json(post)
      }catch (error) {
        throw error
      }
     },
     likePost:async(req,res)=>{
        try {
            const{id}=req.params;
            const{userId}=req.body;
            const post=await Post.findById(id);
            const isliked=post.likes.get(userId)
             if(isliked){
                post.likes.delete(userId)
             }else{
                post.likes.set(userId,true)
             }
             const updatedPost=await Post.findByIdAndUpdate(
                id,
                {likes:post.likes},
                {new:true}
             )
             res.status(200).json(updatedPost)
          }catch (error) {
            throw error
          }
         },

}