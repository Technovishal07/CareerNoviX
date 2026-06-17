import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import nodemailer from "nodemailer";

// Temporary RAM Cache memory storage to track registration OTP payloads
const tempOtpStorage = new Map();

/**
 * Helper Function: Handles automated delivery of secure OTP tokens using Nodemailer
 */
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"CareerNova Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 CareerNova Account Email Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #17a2b8; text-align: center;">Welcome to CareerNova</h2>
        <p>Thank you for signing up. Please use the following One-Time Password (OTP) to complete your registration process:</p>
        <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #0f172a; margin: 20px 0; border-radius: 6px;">
          ${otp}
        </div>
        <p style="color: #64748b; font-size: 13px;">This security code is valid for 10 minutes. Do not share this OTP with anyone.</p>
      </div>
    `,
  });
};

// ==================== 1. REGISTER (GENERATE & SEND OTP) ====================
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role, adminKey } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form !", 400));
  }

  // SECURITY CHECK: Verify Admin Key immediately if role requested is Employer
  if (role === "Employer") {
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
      return next(
        new ErrorHandler("Unauthorized! Invalid Admin Key for Employer registration.", 403)
      );
    }
  }

  // Duplicate Account Check
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered !", 400));
  }

  // Generate 6-Digit random secure registration token string
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // Map metadata records context cache state safely
  tempOtpStorage.set(email, {
    userData: { name, email, phone, password, role },
    otp: generatedOtp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 Minutes Lifecycle
  });

  // Execute internal background email pipeline transit dispatch
  await sendOtpEmail(email, generatedOtp);

  res.status(200).json({
    success: true,
    message: "A secure verification code has been dispatched to your email address!",
  });
});

// ==================== 2. VERIFY OTP & SAVE ACCOUNT TO DB ====================
export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Please provide email and verification code!", 400));
  }

  const record = tempOtpStorage.get(email);
  if (!record) {
    return next(
      new ErrorHandler("Verification session expired or record not found! Please register again.", 404)
    );
  }

  // Check TTL lifecycle expiration timestamp
  if (Date.now() > record.expiresAt) {
    tempOtpStorage.delete(email);
    return next(new ErrorHandler("Verification code expired! Please request registration again.", 400));
  }

  // Validate integrity token authentication keys matching
  if (record.otp !== otp) {
    return next(new ErrorHandler("Invalid validation code! Access Denied.", 400));
  }

  // Extract variables context parameters block state map entries
  const { name, phone, password, role } = record.userData;
  
  // Safe write transaction execute inside cluster pipeline
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  // Clear memory tracking leaks maps safely
  tempOtpStorage.delete(email);

  // Authenticate session tokens immediately upon persistent commit
  sendToken(user, 201, res, "Account Verified and Created Successfully !");
});

// ==================== 3. LOGIN CONTROLLER ====================
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role, adminKey } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password and role !", 400));
  }

  // SECURITY CHECK: Enforce authentication keys check if log targeted is Employer
  if (role === "Employer") {
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
      return next(
        new ErrorHandler("Unauthorized! Invalid Admin Key for Employer login.", 403)
      );
    }
  }

  // Verify Identity Existence
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  // Verify Password Crypt Match
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password !", 400));
  }

  // Role Conflict Guard Protection Check
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found !`, 404)
    );
  }

  sendToken(user, 200, res, "User Logged In Successfully !");
});

// ==================== 4. LOGOUT CONTROLLER ====================
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully !",
    });
});

// ==================== 5. GET USER CONTROLLER ====================
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});