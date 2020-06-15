const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) =>{
    const { username, password } = req.body;

    User.findOne({username:username}, (error,user) => {      
      if (user){ 
        bcrypt.compare(password, user.password, (error, same) =>{
          if(same){ 
            req.session.userId = user._id;
            res.redirect('/')
          }
          else{
            const validationErrors = Object.keys(error.errors).map(key => error.errors[i].message)
            res.flash('validationErrors', validationErrors)
            res.redirect('/login')  
          }
        })
      }
      else{
        res.redirect('/w    login')
      }
    })
}