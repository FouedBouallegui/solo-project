const User=require('../module/User');
module.exports={
    getUser:async (req,res)=>{
    
     try {
        const { id }=req.params;
        const user = await User.findById(id);
        res.status(200).send(user);
     } catch (error) {
        throw error
     }
    },
    getUserFriends:async (req,res)=>{
    
        try {
           const { id }=req.params;
           const user = await User.findById(id);
           const friend=await  Promise.all(
            user.Friends.map((id)=>User.findById(id))
           )
           const formattedFriends=friend.map(
            ({_id,FirstName,LastName,occupation,location,picturePath})=>{
              return {_id,FirstName,LastName,occupation,location,picturePath};
            }
           )
           res.status(200).send(formattedFriends);
        } catch (error) {
           throw error
        }
       },
    addRemoveFriend:async (req,res)=>{
    
        try {
           const {id,friendId}=req.params;
           const user = await User.findById(id);
           const friend=await User.findById(friendId);
          
           if(user.Friends.includes(friendId)){
            user.Friends=user.Friends.filter((id)=>id!==friendId);
            friend.Friends=friend.Friends.filter((id)=>id!==id);
           }
           else{
            user.Friends.push(friendId)
            friend.Friends.push(id)
           }
           await user.save()
           await friend.save()

           const friends=await  Promise.all(
            user.Friends.map((id)=>User.findById(id))
           )
           const formattedFriends=friends.map(
            ({_id,FirstName,LastName,occupation,location,picturePath})=>{
              return {_id,FirstName,LastName,occupation,location,picturePath};
            }
           )
           res.status(200).send(formattedFriends);
        } catch (error) {
           throw error
        }
       },
}