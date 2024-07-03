import { users } from "../dummyData/data.js";
import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";

const userResolver = {
    Mutation: {
        signUp: async(_, {input}, context)=>{
try{
    const {username,name,password,gender}= input;
    if(!username || !name || !password || !gender){
        throw new Error("User already exists ")
    }
    const existingUser = await User.findOne({ username });
    if (existingUser){
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


    const newUser = new User({
        username,
        name,
        password: hashedPassword,
        gender,
        profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
    })

    await newUser.save()
    await context.login(newUser)
    return newUser;

} catch(err ){
 console.error("Error in Signup", err);
 throw new Error(err.message || "Internal server error");
}
        },
        login: async(_,{input},context)=>{
            try{
 const {username,password}= input;
 const {user} = await context.authenticate("graph-ql-local", {username, password })
await context.login(user)
return user
 }catch(err){
    console.error("Error in Login", err);
    throw new Error(err.message || "Internal server error");
            }
        },
        logout: async(_,_,context) => {
try{
await context.logout();
req.session.destroy((err) =>{
    if(err) throw err;
})
res.clearCookie("connect.sid");

return { message: "Logged out successfully"};

}catch(err){
    console.error("Error in Login", err);
    throw new Error(err.message || "Internal server error");
}
        }
    },
    Query: { 
        users: (n) => {
            return users;
        },
        user: (_, { userId}) =>{
            return users.find((user) => user._id === userId)
        }
    },
   
};

export default userResolver;