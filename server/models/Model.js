const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modelWear: {
        type: String,
        maxlength: 50
    },
    modelname: {
        type: String
    },
    height: {
        type: String
    },
    bust:{
        type: String,
        default: ""
    },
    images: {
        type: Array,
        default: []
    },
    waist:{
        type: String,
        default: ""
    },
    highhip:{
        type: String,
        default: ""
    },
    lowhip: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Model = mongoose.model('ModelInfo', modelSchema);

module.exports = { Model }