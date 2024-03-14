const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../module/User');

module.exports={
getAll:async (req,res)=>{
  try {
       const users = await User.find({})
       res.status(200).send(users)
    } catch (error) {
       throw error
    }
   },
register: async  (req,res)=>{
    try {
       const{
         FirstName,
         LastName,
         email,
         password,
         picturePath,
         Friends,
         location,
         occupation
       }=req.body
       const salt=await bcrypt.genSalt();
       const passwordHash=await bcrypt.hash(password,salt)
       const newUser= new User({
         FirstName,
         LastName,
         email,
         password:passwordHash,
         picturePath,
         Friends,
         location,
         occupation
       });
       const savedUser=await newUser.save();
       res.status(201).json(savedUser);
    } catch (error) {
       throw error
    }
   },
   login: async  (req,res)=>{
    try {
       const {email,password}=req.body
       const user = await User.findOne({email:email})
       if(!user) return res.status(400).json({msg:'user does not exist.'});
       const isMatch= await bcrypt.compare(password,user.password)
       if(!isMatch) return res.status(400).json({msg:'Invalid password'});
       const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
       delete user.password;
       res.status(200).json({token,user});
    } catch (error) {
       throw error
    }
   },

}