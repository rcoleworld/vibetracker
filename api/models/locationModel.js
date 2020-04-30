const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Model = mongoose.model

const LocationSchema = new Schema({
    username: {type: String, required: true},
    title: {type: String},
    description: { type: String },
    latitude: {type: Number},
    longitude: {type: Number}
})

module.exports = Model('Location', LocationSchema)
