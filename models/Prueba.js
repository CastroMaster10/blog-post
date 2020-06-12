const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newTestSchema = new Schema({
    test: String
})

const Prueba = mongoose.model('Prueba', newTestSchema);

module.exports = Prueba;