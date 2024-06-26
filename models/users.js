const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const userSchema = new Schema({
    fullName: { type: String, required: true },
    nickname: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String, required: true },
    isActive: { type: String, default: true },
    role: { type: String, default: 'user' }
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.createdAt = moment(ret.createdAt).format('MM/DD/YYYY HH:mm');
        ret.updatedAt = moment(ret.updatedAt).format('MM/DD/YYYY HH:mm');
        return ret;
    }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
