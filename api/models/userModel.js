const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Model = mongoose.model

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    dateJoined: { type: Date, required: true },
    locations: [{
        title: { type: String },
        public: { type: Boolean },
        description: { type: String },
        latitude: { type: Number },
        longitude: { type: Number }
    }]
})

module.exports = Model('User', UserSchema)
