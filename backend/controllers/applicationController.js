import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import mongoose from "mongoose"; 
import cloudinary from "cloudinary";

// ==========================================================================
// 1. POST APPLICATION CONTROLLER (Job Seeker Submits Profile)
// ==========================================================================
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User session not found. Please log in again.", 401));
  }

  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
  }
  
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all input fields.", 400));
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload a PNG, JPEG, or WEBP file.", 400));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job reference context not found!", 404));
  }

  const targetEmployerId = jobDetails.postedBy || jobDetails.postedID || jobDetails.createdBy || jobDetails.user;

  if (!targetEmployerId) {
    return next(new ErrorHandler("Job document does not contain an internal owner or creator link.", 400));
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Failed to upload Resume snapshot asset to Cloudinary", 500));
    }
    
    const applicantID = { user: req.user._id, role: "Job Seeker" };
    const employerID = { user: new mongoose.Types.ObjectId(targetEmployerId), role: "Employer" };
    
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      employerId: new mongoose.Types.ObjectId(targetEmployerId),
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    
    res.status(200).json({
      success: true,
      message: "Application Submitted Successfully!",
      application,
    });
  } catch (error) {
    return next(error);
  }
});

// ==========================================================================
// 2. EMPLOYER: GET ALL APPLICATIONS (Fix: Admin key restriction removed)
// ==========================================================================
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User session not found. Please log in again.", 401));
  }

  // 🛡️ Only check if the user role is Employer
  if (req.user.role !== "Employer") {
    return next(new ErrorHandler("Access denied. Only Employers can view these submissions.", 403));
  }
  
  const { _id } = req.user;
  const parsedEmployerId = mongoose.Types.ObjectId.isValid(_id) ? new mongoose.Types.ObjectId(_id) : _id;

  // Query matching all potential schema structures for the employer ID
  const applications = await Application.find({
    $or: [
      { "employerID.user": parsedEmployerId },
      { "employerID.user": _id.toString() },
      { employerID: parsedEmployerId },
      { employerId: parsedEmployerId },
      { "employerId": _id.toString() },
      { "employerID": parsedEmployerId }
    ]
  }).populate("applicantID").populate("userID");

  console.log("Query Execution for Employer ID:", _id);
  console.log("Records Pulled:", applications.length);

  res.status(200).json({
    success: true,
    applications,
  });
});

// ==========================================================================
// 3. JOB SEEKER: GET ALL APPLICATIONS
// ==========================================================================
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User session not found. Please log in again.", 401));
  }

  if (req.user.role === "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
  }
  const { _id } = req.user;
  const parsedApplicantId = mongoose.Types.ObjectId.isValid(_id) ? new mongoose.Types.ObjectId(_id) : _id;

  const applications = await Application.find({
    $or: [
      { "applicantID.user": parsedApplicantId },
      { "applicantID.user": _id.toString() },
      { applicantID: parsedApplicantId },
      { applicantId: parsedApplicantId }
    ]
  });

  res.status(200).json({
    success: true,
    applications,
  });
});

// ==========================================================================
// 4. JOB SEEKER: WITHDRAW/DELETE APPLICATION
// ==========================================================================
export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User session not found. Please log in again.", 401));
  }

  if (req.user.role === "Employer") {
    return next(new ErrorHandler("Employer not allowed to access this resource.", 400));
  }
  
  const application = await Application.findById(req.params.id);
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }
  await application.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application Deleted Successfully!",
  });
});