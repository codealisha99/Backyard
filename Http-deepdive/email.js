// 1. Generate & Store OTP (Node.js + Redis)
const crypto = require('crypto');
const redis = require('redis');

const client = redis.createClient();

async function generateOTP(email) {
  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
  const key = `otp:${email}`;
  
  await client.setEx(key, 300, JSON.stringify({
    otp,
    attempts: 0,
    createdAt: Date.now()
  })); // TTL: 5 minutes
  
  return otp;
}

// 2. Send OTP via Email (using Nodemailer)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
});

async function sendOTPEmail(email, otp) {
  await transporter.sendMail({
    from: '"MyApp" <no-reply@myapp.com>',
    to: email,
    subject: 'Your Verification Code',
    html: `<p>Your OTP is: <strong>${otp}</strong>. Valid for 5 minutes.</p>`
  });
}

// 3. Verify OTP
async function verifyOTP(email, submittedOTP) {
  const key = `otp:${email}`;
  const data = JSON.parse(await client.get(key));
  
  if (!data) throw new Error('OTP expired or not found');
  
  if (data.attempts >= 3) {
    await client.del(key);
    throw new Error('Too many failed attempts');
  }
  
  if (data.otp !== submittedOTP) {
    data.attempts++;
    await client.setEx(key, 300, JSON.stringify(data));
    throw new Error('Invalid OTP');
  }
  
  await client.del(key); // Invalidate after success
  return true;
}