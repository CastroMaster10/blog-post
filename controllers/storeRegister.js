const User = require('../models/User')
const path = require('path');


module.exports =  (req,res)=>{ 
   User.create(req.body, (error,user) =>{
       if(error){
        
             const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            //  req.session.validationErrors = validationErrors;
                req.flash('validationErrors', validationErrors);
                req.flash('data', req.body);
                console.log(error)
                return res.redirect('/auth/register')
       } else{
           req.session.userId = user._id
           return res.redirect('/')
       }
   })
}
