const mongoose=require('mongoose');

const otpSchema= new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: Number, required: true},
    expireAt: {type: Date, default: Date.now, expires: 300}
});

const otpModel= mongoose.model('otpdetail',otpSchema);

module.exports =otpModel;