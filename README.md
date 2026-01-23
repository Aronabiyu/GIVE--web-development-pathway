# 🚀 Learning Center - Web Development Learning Platform

![Learning Center Banner](https://img.shields.io/badge/Learning-Center-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)

A comprehensive web development learning platform with interactive lessons, admin panel, and contact management system.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Development Workflow](#development-workflow)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Team Members](#team-members)
- [License](#license)

## ✨ Features

### 🌐 Public Features
- **Interactive Lessons**: Structured CSS and JavaScript lessons with sections
- **Responsive Design**: Mobile-first, fully responsive layout
- **Lesson Navigation**: Sidebar navigation with anchor links
- **Contact Form**: User contact form with email notifications
- **Search Functionality**: Search through lessons and content

### 🛠️ Admin Features
- **Secure Authentication**: JWT-based admin login system
- **Dashboard**: Analytics and statistics overview
- **Lesson Management**: CRUD operations for lessons
- **Contact Management**: View, filter, and respond to user messages
- **Real-time Updates**: Live updates without page refresh

### 🎯 User Experience
- **Progress Tracking**: Mark lessons as completed
- **Print Support**: Printer-friendly lesson formats
- **Dark Mode**: Toggle between light and dark themes
- **Keyboard Shortcuts**: Quick navigation shortcuts
- **Code Playground**: Interactive code execution

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **React Router DOM** - Routing
- **React Icons** - Icon library
- **CSS3** - Custom styling with modern features
- **Axios** - HTTP client

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Nodemailer** - Email notifications

### **Development Tools**
- **Git & GitHub** - Version control
- **Postman** - API testing
- **MongoDB Atlas** - Cloud database
- **dotenv** - Environment variables

## 📁 Project Structure

```
Learning-center/
├── backend/                    # Backend API (Managed by [Your Name])
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── server.js        # Entry point
│   ├── seed/               # Database seed scripts
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies
│   └── README.md         # Backend documentation
│
├── frontend/                   # Frontend Application (Divided between 2 developers)
│   ├── src/
│   │   ├── admin/           # Admin panel (Managed by Person 2)
│   │   │   ├── pages/      # Admin pages
│   │   │   ├── components/ # Admin components
│   │   │   └── styles/     # Admin CSS
│   │   ├── api/            # API services (Person 2)
│   │   ├── components/     # Public components (Person 1)
│   │   ├── pages/          # Public pages (Person 1)
│   │   ├── styles/         # Public styles (Person 1)
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets (Person 1)
│   └── package.json        # Frontend dependencies
│
└── README.md               # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Git
- Code editor (VS Code recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Learning-center.git
cd Learning-center
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@learningcenter.com
```

Start the backend:
```bash
npm start
# Server runs on http://localhost:5000
```

Seed the database:
```bash
node seed/seedAdmin.js
node seed/seedAllLessons.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

## 👥 Development Workflow

### Team Responsibilities

#### **Backend Developer** ([Your Name])
- API development and maintenance
- Database design and management
- Authentication system
- Email notifications
- API documentation
- Deployment configuration

#### **Frontend - Person 1** (Public UI)
- Landing page and public pages
- Lesson display components
- Navigation and layout
- Responsive design
- Public CSS styling
- User interface components

#### **Frontend - Person 2** (Admin & API Integration)
- Admin panel pages
- Authentication flow
- API service integration
- Admin components
- Admin CSS styling
- Form validation

### Git Workflow Guidelines

#### 1. Daily Start
```bash
git pull origin main
git checkout -b feature/your-feature-name
```

#### 2. After Making Changes
```bash
git add .
git commit -m "feat: descriptive message"
git push origin feature/your-feature-name
```

#### 3. Commit Message Convention
```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code restructuring
test:     Tests
chore:    Maintenance
```

### File Assignment

#### **Person 1 - Public UI:**
```
src/pages/Landing.jsx
src/pages/Lessons.jsx
src/pages/Lesson.jsx
src/pages/About.jsx
src/pages/Contact.jsx
src/components/Navigation.jsx
src/components/Footer.jsx
src/components/Sidebar.jsx
src/components/LessonCard.jsx
src/styles/
public/
App.jsx (public routes)
```

#### **Person 2 - Admin & API:**
```
src/admin/
src/api/
src/context/
App.jsx (admin routes)
```

## 📡 API Documentation

### Base URL: `http://localhost:5000/api`

### Public Endpoints

#### Get All Lessons
```http
GET /lessons
```
**Response:**
```json
[
  {
    "_id": "string",
    "topic": "string",
    "slug": "string",
    "sections": [
      {
        "title": "string",
        "anchor": "string",
        "content": "string"
      }
    ]
  }
]
```

#### Get Single Lesson
```http
GET /lessons/:slug
```

#### Submit Contact Form
```http
POST /contact
```
**Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

### Admin Endpoints

#### Admin Login
```http
POST /admin/login
```
**Body:**
```json
{
  "email": "admin@learningcenter.com",
  "password": "admin123"
}
```

#### Dashboard Stats
```http
GET /admin/dashboard/stats
```
**Headers:**
```
Authorization: Bearer <token>
```

#### Manage Lessons (CRUD)
```http
GET    /admin/lessons
POST   /admin/lessons
PUT    /admin/lessons/:id
DELETE /admin/lessons/:id
```

#### Manage Contacts
```http
GET   /admin/contacts
PATCH /admin/contacts/:id
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@learningcenter.com
```

## 📦 Deployment

### Backend Deployment (Railway/Heroku/Render)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Contributing

### Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Test your changes before committing

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style update

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] API tests passing

## Screenshots (if applicable)
```

## 👨‍💻 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| [Dagmawi Ephrem] | Backend Developer | API, Database, Authentication |
| [Natanim ketsela] | Frontend Developer | Public UI, Components, Styling |
| [Aron Nebiyou] | Frontend Developer | Admin Panel, API Integration |

### Communication Channels
- **Daily Standup**: 10:00 AM (Virtual)
- **Code Reviews**: PR comments on GitHub
- **Issue Tracking**: GitHub Issues
- **Documentation**: GitHub Wiki

## 📞 Support

For support, email dagmawiephrem44@gmail.com or create an issue in the GitHub repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- MongoDB Atlas for database hosting
- All contributors and testers

---

## 🚨 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongod --version

# Check connection string in .env
# Ensure IP is whitelisted in MongoDB Atlas
```

#### 2. Admin Login Issues
```bash
# Reset admin password
cd backend
node seed/resetAdminPassword.js
```

#### 3. CORS Errors
```bash
# Check backend CORS configuration
# Ensure frontend URL is in allowed origins
```

#### 4. Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Development Tips
1. **Always pull before starting work**
2. **Create feature branches for each task**
3. **Write descriptive commit messages**
4. **Test API endpoints with Postman**
5. **Check console for errors**
6. **Use Git responsibly**

---

<div align="center">
  
### 🎯 Project Status
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/Learning-center)
![GitHub issues](https://img.shields.io/github/issues/your-username/Learning-center)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/Learning-center)

**Happy Coding!** 👨‍💻👩‍💻

</div>

## 📱 Quick Start Commands

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database Seed
```bash
cd backend
node seed/seedAdmin.js
node seed/seedAllLessons.js
```

### Default Admin Credentials
```
Email: admin@learningcenter.com
Password: admin123
```

**⚠️ IMPORTANT: Change default password after first login!**
