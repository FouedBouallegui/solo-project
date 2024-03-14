const express =require ('express');
const bodyParser= require ('body-parser');

const cors =require('cors');
const dotenv=require('dotenv');
const multer = require ('multer');
const helmet =require ('helmet');
const morgan =  require ('morgan');
const path =require ('path');
const { fileURLToPath } =require ('url');
const db = require('./mongoDB')
const {register}=require('./controller/auth');
const {createPost}=require('./controller/Post');
const userRoute=require('./Routes/User')
const authRoute =require('./Routes/auth');
const postRoute =require('./Routes/Post');
const verifyToken = require('./middleware/middleware');


//
const _filename= path.resolve(__filename);
const _dirname=path.dirname(_filename);


dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet({crossOriginEmbedderPolicy:true}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use("api/assets",express.static(path.join(_dirname,"public/assets")));
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)

//
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,"public/assets");  
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);  
       }
})
const upload=multer({storage});

app.post("/api/auth/register",upload.single("picture"),register);
app.post("/api/posts/",verifyToken,upload.single("picture"), createPost);

const port=3001
app.listen(port, () => {
    console.log(`listening on ${port}`);
  });