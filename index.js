const express = require('express');
const app = new express()
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const BlogPost = require('./models/BlogPost');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const newPostController = require('./controllers/newPost');
const getRegisterController = require('./controllers/getRegister');
const storeRegisterController = require('./controllers/storeRegister');
const getLoginController = require('./controllers/getLogin');
const storeLoginController = require('./controllers/logUser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const logOutController = require('./controllers/logOut');
const flash = require('connect-flash');

global.loggedIn = null  // global var for conditioning navbar lists


// middlewares

const logMiddleWare = require('./middlewares/logMiddleWare')  
const ifLoggedinMiddleware = require('./middlewares/ifLoggedinMiddleWare');
app.use(flash())


const db = mongoose.connection
mongoose.connect('mongodb+srv://CastroMaster10:rodrigo02@cluster0-tynid.mongodb.net/miBaseDeDatos', {useNewUrlParser: true, useUnifiedTopology:true})  // conecta la base de datos y nuestra aplicación
db.on('error', (error) => console.log('Hubo un error en el servidor!',error)) 
db.once('open', () => console.log('Servidor lanzado con éxito!')) // mensaje una vez que servidor haya sido lanzado


// Files 
app.use(fileUpload())
app.use(express.static('public'))// app.use(express.static('public'))  // todos los archivos estáticos
app.set('view engine', 'ejs')  //archivos ejs
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressSession({
    secret: 'sessionCookie'
}))
app.use("*", (req,res,next) =>{
    loggedIn = req.session.userId
    next()
})

let port = process.env.PORT
if(port == null || port == ""){
    port = 4000;
}

app.listen(port, (req, res) => {
  console.log("Server has started"); // se inicializa servidor
});




// Controllers

app.get('/', homeController);
app.get('/post/:id', newPostController);
app.get('/posts/new', logMiddleWare ,getPostController);
app.post('/posts/store', logMiddleWare, storePostController);
app.get('/auth/register', ifLoggedinMiddleware, getRegisterController);
app.post('/user/register', ifLoggedinMiddleware,storeRegisterController);
app.get('/login', ifLoggedinMiddleware, getLoginController);
app.post('/store/login',ifLoggedinMiddleware ,storeLoginController);
app.get('/logout', logOutController);
app.use((req,res) =>{
    res.render('notFound')
})



// app.get('/', async (req,res) =>{
//     console.log('el modelo de blogpost ha sido guardado en el homepage');
//     const blogposts = await BlogPost.find({})
//     res.render('index', {
//         blogposts
//     })
// })



// app.get('/post/:id', async (req,res) => {
//     const blogpost = await BlogPost.findById(req.params.id)
//         console.log(blogpost)
//         res.render('post', {
//             blogpost
//         })
// })

// app.get('/posts/new', (req ,res) => {
//     res.render('create')
// })

// app.post('/posts/store', (req,res)=>{  
//     if(req.files === null || req.body.title ===  null || req.body.body === null){
//         return res.redirect ('/posts/new')

//     }

//     let image = req.files.image;  
//     image.mv(path.resolve(__dirname,'public/img',image.name),async (error)=>{
//         await BlogPost.create({
//             ...req.body,
//             image: '/img/' + image.name
//         })
//         res.redirect('/')
//     })            
// })










