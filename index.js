const express = require('express');
const app = new express()
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const Prueba = require('./models/Prueba');


const db = mongoose.connection
mongoose.connect('mongodb://localhost/miBaseDeDatos', {useNewUrlParser: true, useUnifiedTopology:true})  // conecta la base de datos y nuestra aplicación
db.on('error', (error) => console.log('Hubo un error en el servidor!',error)) 
db.once('open', () => console.log('Servidor lanzado con éxito!')) // mensaje una vez que servidor haya sido lanzado


// Files 
app.use(express.static('public'))// app.use(express.static('public'))  // todos los archivos estáticos
app.set('view engine', 'ejs')  //archivos ejs
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.listen(4000, (req,res) => {
    console.log('Server has started')  // se inicializa servidor
})


app.get('/', async (req,res) =>{
    console.log('el modelo de blogpost ha sido guardado en el homepage');
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})



app.get('/post/:id', async (req,res) => {
    const blogpost = await BlogPost.findById(req.params.id)
        console.log(blogpost)
        res.render('post', {
            blogpost
        })
})

app.get('/posts/new', (req,res) => {
    res.render('create')
})

app.post('/posts/store',  async (req,res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
})










