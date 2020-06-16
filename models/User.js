const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema({  
  username: { // pass in config object. and put in validation rules 
    type: String,
    required: [true, 'Por favor introduce un usuario'],
    index: {
      unique: [true, 'Ya existe un usuario con ese nombre']
    } // mongoose will check that record should be unique before saving to db. can do exact same thing to username    
  },
  password: {
    type: String,
    required: [true, 'Por favor introduce una contraseña']
  }
});
  
UserSchema.pre('save', function(next){
    let user = this      
    bcrypt.hash(user.password, 10,  (error, hash) => {        
      user.password = hash 
      next() 
    }); 
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User',UserSchema);
module.exports = User
  