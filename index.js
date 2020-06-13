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



const db = mongoose.connection
mongoose.connect('mongodb://localhost/miBaseDeDatos', {useNewUrlParser: true, useUnifiedTopology:true})  // conecta la base de datos y nuestra aplicación
db.on('error', (error) => console.log('Hubo un error en el servidor!',error)) 
db.once('open', () => console.log('Servidor lanzado con éxito!')) // mensaje una vez que servidor haya sido lanzado



// Files 
app.use(fileUpload())
app.use(express.static('public'))// app.use(express.static('public'))  // todos los archivos estáticos
app.set('view engine', 'ejs')  //archivos ejs
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.listen(3003, (req,res) => {
    console.log('Server has started')  // se inicializa servidor
})

// Controllers

app.get('/', homeController);
app.get('/post/:id', newPostController);
app.get('/posts/new', getPostController);
app.post('/posts/store', storePostController);



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










