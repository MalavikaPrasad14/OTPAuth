const express = require('express');
const nodemailer = require('nodemailer');
const OTP = require('../model/otpData');
const router = express.Router();
require('dotenv').config();



const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();

    try {
        await OTP.create({ email, otp });

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // true for 465, false for other ports like 587
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // Send OTP to user's email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}`,
        });

        res.status(200).send("OTP sent successfully");
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send("Error sending OTP");
    }
});

// Route to verify OTP entered by user
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body; // Get email and OTP from request body
  
    try {
      // Check if OTP matches and is still valid
      const record = await OTP.findOne({ email, otp });
      if (!record) {
        return res.status(400).send("Invalid OTP");
      }
      res.status(200).send("OTP verified");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).send("Error verifying OTP");
    }
  });
  
  module.exports = router;