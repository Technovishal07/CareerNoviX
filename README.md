
# 🚀 CareerNoviX - Full Stack Job Portal

CareerNoviX is a modern MERN Stack-based Job Portal that connects job seekers with employers. The platform provides a seamless recruitment experience where candidates can search and apply for jobs while employers can post vacancies and manage applications efficiently.

## ✨ Features

### 👨‍🎓 Job Seekers
- User Registration & Login
- Browse Available Jobs
- Apply for Jobs
- Track Application Status
- Manage Profile Information

### 🏢 Employers
- Employer Registration & Login
- Post New Jobs
- Update/Delete Job Listings
- View Applicant Details
- Manage Recruitment Process

### 🔐 Security Features
- JWT Authentication
- Password Hashing with Bcrypt
- Protected Routes
- Secure Cookie Handling

### 📱 Responsive Design
- Mobile Friendly UI
- Tablet Optimized
- Desktop Compatible

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|--------|
| React.js | Frontend UI |
| React Router | Client-side Routing |
| Bootstrap | Styling & Responsive Design |
| Node.js | Backend Runtime |
| Express.js | REST APIs |
| MongoDB Atlas | Database |
| Mongoose | Database Modeling |
| JWT | Authentication |
| Bcrypt.js | Password Encryption |
| Cloudinary | Image Storage |
| Vercel | Frontend Deployment |
| Render | Backend Deployment |

---

## 📂 Project Structure

```bash
CareerNova/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
└── README.md
````

---

## ⚙️ Installation Guide

### Prerequisites

* Node.js v22.2.0 or above
* MongoDB Atlas Account
* Cloudinary Account
* Git Installed

### Clone Repository

```bash
git clone https://github.com/Technovishal07/CareerNoviX.git
cd CareerNoviX
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔧 Environment Variables

Create:

```bash
backend/config/config.env
```

Add:

```env
PORT=4000
MONGO_URL=mongodb://localhost:27017
ADMIN_SECRET_KEY=your secret key
EMAIL_USER=your gmail
EMAIL_PASS=your password
FRONTEND_URL=http://localhost:5173
JWT_SECRET_KEY=fgjfgsudgfudnhfousidfnewuikfmlewf
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run the Project

### Backend

```bash
cd backend
npm start
```

or

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm run dev
```

Visit:

```text
http://localhost:5173
```

---

## 🌐 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

## 🚀 Future Enhancements

* AI-Based Job Recommendations
* Resume Builder
* Interview Scheduling
* Email Notifications
* Company Profiles
* Admin Dashboard
* Advanced Search Filters

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit changes

```bash
git commit -m "Add Amazing Feature"
```

4. Push changes

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Vishal Kumar**

GitHub: https://github.com/Technovishal07

---

## ⭐ Support

If you found this project helpful, please give it a **Star ⭐** on GitHub.

Your support motivates future development and improvements.

---

### Made with ❤️ CareerNoviX using MERN Stack

```
```
