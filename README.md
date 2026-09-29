# StreamHub - Full Stack Video Streaming Backend

**Your Complete Node.js Video Streaming Platform Backend Solution**

[![Stars](https://img.shields.io/github/stars/Tanushh18/StreamHub?style=flat-square)](https://github.com/Tanushh18/StreamHub)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-brightgreen?style=flat-square)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4%2B-green?style=flat-square)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

---

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Configuration](#configuration)
8. [Dependencies](#dependencies)
9. [API Endpoints](#api-endpoints)
10. [Contribution Guide](#contribution-guide)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)
13. [Security](#security)
14. [License](#license)

---

## Project Description

StreamHub is a robust, production-ready backend infrastructure for a YouTube-like video streaming platform. Built with Node.js, Express, and MongoDB, this project provides a comprehensive solution for managing users, videos, comments, subscriptions, and all the features needed to power a modern video streaming service.

The application implements industry-standard practices for authentication, authorization, file handling, and database management. It's designed to be scalable, maintainable, and secure, making it suitable for enterprise-level applications.

### Key Capabilities

- **User Management**: Complete user authentication and profile management system
- **Video Streaming**: Upload, manage, and serve video content with metadata
- **Social Features**: Comments, likes, subscriptions, and watch history
- **File Handling**: Secure file upload and cloud storage integration
- **Database Management**: Efficient MongoDB schemas with proper indexing and relationships
- **Error Handling**: Comprehensive error handling and custom error responses
- **Security**: JWT-based authentication, password hashing, and input validation

---

## Features

### Core Features

#### 1. **User Authentication & Management**
- User registration with profile information (avatar, cover image)
- Secure login with JWT-based token authentication
- Password hashing using bcryptjs for enhanced security
- Refresh token mechanism for extended sessions
- User logout with token management
- Watch history tracking

#### 2. **Video Management**
- Upload and publish videos with metadata (title, description, duration)
- Thumbnail generation and management
- View count tracking
- Publish/unpublish functionality
- Video metadata indexing for efficient searching
- Aggregate pagination support for large datasets

#### 3. **Comment System**
- Add, update, and delete comments on videos
- Comment model with full CRUD operations
- Support for nested comment structures

#### 4. **Social Features**
- Like/dislike functionality (models available)
- Subscription system (models available)
- Playlist management (models available)
- Tweet system (models available)

#### 5. **File Management**
- Multer integration for multi-file uploads
- Avatar and cover image handling during registration
- Cloud storage support (Cloudinary ready)
- File size limits (50MB+ support)
- Public static file serving

#### 6. **API Standards**
- RESTful API design principles
- Versioned API endpoints (`/api/v1/`)
- Structured JSON responses with success/error states
- Cookie-based session management
- CORS support for cross-origin requests

---

## Technology Stack

### **Backend Runtime & Framework**
```
- Node.js (v14.0.0 or higher)
- Express.js (Web application framework)
- ES6+ (Modern JavaScript with import/export)
```

### **Database**
```
- MongoDB (v4.4 or higher - NoSQL database)
- Mongoose (v7.0+ - Object Data Modeling)
- mongoose-aggregate-paginate-v2 (Pagination plugin)
```

### **Authentication & Security**
```
- jsonwebtoken (JWT token generation and verification)
- bcryptjs (Password hashing and comparison)
- cors (Cross-Origin Resource Sharing)
- cookie-parser (Cookie parsing middleware)
```

### **File & Data Handling**
```
- Multer (File upload handling)
- express (Built-in JSON/URL-encoded body parser)
```

### **Environment Management**
```
- dotenv (Environment variable management)
```

### **Development Tools**
```
- Nodemon (Development server auto-reload)
- ES6 modules (Modern module system)
```

---

## Project Structure

```
StreamHub/
├── Youtube_Project/                  # Main project directory
│   └── src/                         # Source code
│       ├── controllers/             # Business logic controllers
│       │   ├── user.controller.js   # User operations (register, login, logout)
│       │   ├── video.controller.js  # Video operations (upload, fetch, update)
│       │   └── comment.controller.js # Comment operations
│       │
│       ├── models/                  # MongoDB schema definitions
│       │   ├── user.model.js        # User schema (username, email, password, avatar)
│       │   ├── video.model.js       # Video schema (videoFile, thumbnail, title, views)
│       │   ├── comment.model.js     # Comment schema
│       │   ├── like.model.js        # Like/dislike schema
│       │   ├── subscription.model.js # Subscription schema
│       │   ├── playlist.model.js    # Playlist schema
│       │   └── tweet.model.js       # Tweet schema
│       │
│       ├── routes/                  # API route definitions
│       │   └── user.routes.js       # User authentication routes
│       │
│       ├── middlewares/             # Custom middleware functions
│       │   ├── auth.js              # JWT verification middleware
│       │   └── multer.js            # File upload configuration
│       │
│       ├── utils/                   # Utility functions
│       │   ├── asyncHandler.js      # Async error handling wrapper
│       │   ├── ApiError.js          # Custom error class
│       │   ├── ApiResponse.js       # Standard API response format
│       │   └── FileHandling.js      # File operations utilities
│       │
│       ├── db/                      # Database configuration
│       │   └── index.js             # MongoDB connection setup
│       │
│       ├── constants.js             # Application constants (DB_NAME, etc.)
│       ├── app.js                   # Express app setup and middleware config
│       └── index.js                 # Application entry point
│
├── .env                             # Environment variables (not in repo)
├── .env.example                     # Example env file template (recommended)
├── README.md                        # This file
└── package.json                     # Dependencies (recommended to create)
```

### Directory Explanations

- **controllers/**: Contains business logic for handling requests. Each controller function processes incoming requests and sends responses.

- **models/**: Mongoose schema definitions that define data structure and relationships in MongoDB.

- **routes/**: Express route definitions that map HTTP methods and paths to controller functions.

- **middlewares/**: Custom middleware for authentication, file uploads, validation, and other request processing.

- **utils/**: Reusable utility functions including error handling, API response formatting, and file operations.

- **db/**: Database connection setup and initialization logic.

---

## Installation

### Prerequisites

Before installing StreamHub, ensure you have:

1. **Node.js** - v14.0.0 or higher
   ```bash
   # Check Node.js version
   node --version
   ```

2. **npm** - v6.0.0 or higher (comes with Node.js)
   ```bash
   # Check npm version
   npm --version
   ```

3. **MongoDB** - v4.4 or higher (local or cloud instance)
   ```bash
   # For local MongoDB, ensure mongod is running
   mongod
   ```

4. **Git** - For version control

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Tanushh18/StreamHub.git
cd StreamHub
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required packages from `package.json`:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- multer
- cors
- cookie-parser
- dotenv
- nodemon (dev dependency)
- mongodb/mongoose plugins

#### 3. Create Environment Configuration

```bash
# Copy the example env file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
# or use your preferred editor
```

#### 4. Configure MongoDB Connection

Ensure MongoDB is running:

```bash
# For local MongoDB
mongod

# For MongoDB Atlas (cloud), update the connection string in .env
```

#### 5. Start the Application

```bash
# Development mode (with auto-reload via Nodemon)
npm run dev

# Production mode
npm start
```

You should see:
```
Server is running on port 3000
DB connected successfully
```

#### 6. Verify Installation

```bash
# Test the API
curl http://localhost:3000/api/v1/users/register

# Should return a response from your backend
```

### Installation Troubleshooting

- **Port already in use**: Change PORT in `.env` or kill the process using port 3000
- **MongoDB connection error**: Verify MongoDB is running and connection string is correct
- **Module not found**: Run `npm install` again to ensure all dependencies are installed

---

## Usage

### Starting the Server

```bash
# Development mode (recommended for development with hot-reload)
npm run dev

# Production mode (optimized for deployment)
npm start
```

### Basic API Usage

#### User Registration

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -F "username=john_doe" \
  -F "email=john@example.com" \
  -F "password=securePassword123" \
  -F "fullName=John Doe" \
  -F "avatar=@/path/to/avatar.jpg" \
  -F "coverImage=@/path/to/cover.jpg"
```

#### User Login

```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

#### Logout (Requires Authentication)

```bash
curl -X POST http://localhost:3000/api/v1/users/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Refresh Access Token

```bash
curl -X POST http://localhost:3000/api/v1/users/refreshToken \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Workflow Example

1. **User Registration**: Create a new user account
2. **User Login**: Get access and refresh tokens
3. **Upload Video**: Use access token to upload videos
4. **Add Comments**: Comment on videos using the API
5. **Subscribe**: Subscribe to other users
6. **Refresh Token**: When access token expires, use refresh token

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
Mongo_DB_URL=mongodb://localhost:27017
# For MongoDB Atlas: Mongo_DB_URL=mongodb+srv://username:password@cluster.mongodb.net

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret_key_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here
REFRESH_TOKEN_EXPIRY=30d

# CORS Configuration
Corsorigin=http://localhost:3000
# For production: Corsorigin=https://yourdomain.com

# Cloudinary Configuration (Optional - for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Configuration Details

- **PORT**: Server port (default: 3000)
- **NODE_ENV**: Environment mode (development/production)
- **Mongo_DB_URL**: MongoDB connection string
- **ACCESS_TOKEN_SECRET**: Secret key for signing access tokens (make it long and random)
- **ACCESS_TOKEN_EXPIRY**: How long access tokens are valid (e.g., 1d, 7d, 30d)
- **REFRESH_TOKEN_SECRET**: Secret key for signing refresh tokens
- **REFRESH_TOKEN_EXPIRY**: How long refresh tokens are valid
- **Corsorigin**: Allowed origin for CORS requests
- **Cloudinary**: For cloud-based file storage (optional)

### Important Security Notes

- **Never commit `.env`** to version control
- Use strong, random values for JWT secrets
- Change all default values in production
- Use environment-specific configurations for dev/staging/prod

---

## Dependencies

### Core Dependencies

#### Express.js
```
"express": "^4.18.0"
```
Web application framework for building REST APIs.

#### Mongoose
```
"mongoose": "^7.0.0"
"mongoose-aggregate-paginate-v2": "^1.0.6"
```
ODM (Object Data Modeling) for MongoDB with pagination support.

#### Authentication & Security
```
"jsonwebtoken": "^9.0.0"      # JWT token generation
"bcryptjs": "^2.4.3"          # Password hashing
"cookie-parser": "^1.4.6"     # Cookie parsing
"cors": "^2.8.5"              # CORS middleware
```

#### File Handling
```
"multer": "^1.4.5"            # File upload handling
```

#### Environment
```
"dotenv": "^16.0.3"           # Environment variables
```

### Dev Dependencies

```
"nodemon": "^2.0.20"          # Auto-restart on file changes
```

### Complete package.json Example

```json
{
  "name": "streamhub",
  "version": "1.0.0",
  "description": "Full-stack video streaming backend",
  "type": "module",
  "main": "Youtube_Project/src/index.js",
  "scripts": {
    "dev": "nodemon Youtube_Project/src/index.js",
    "start": "node Youtube_Project/src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["youtube", "streaming", "video", "nodejs"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.0",
    "mongoose-aggregate-paginate-v2": "^1.0.6",
    "multer": "^1.4.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

---

## API Endpoints

### Authentication Routes

All user authentication endpoints are prefixed with `/api/v1/users`.

#### Register User

**Endpoint**: `POST /api/v1/users/register`

**Description**: Register a new user with avatar and cover image

**Request**:
```
Headers: Content-Type: multipart/form-data
Body:
  - username: string (required, unique, lowercase)
  - email: string (required, unique)
  - password: string (required)
  - fullName: string (required)
  - avatar: file (required, image file)
  - coverImage: file (optional, image file)
```

**Response** (Success - 201):
```json
{
  "status": 201,
  "data": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "avatar": "cloudinary_url",
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  },
  "message": "User registered successfully"
}
```

#### Login User

**Endpoint**: `POST /api/v1/users/login`

**Description**: Authenticate user and receive tokens

**Request**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response** (Success - 200):
```json
{
  "status": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  },
  "message": "Login successful"
}
```

#### Logout User

**Endpoint**: `POST /api/v1/users/logout`

**Description**: Logout user and invalidate tokens

**Authentication**: Required (Bearer Token)

**Request**:
```
Headers: Authorization: Bearer <accessToken>
```

**Response** (Success - 200):
```json
{
  "status": 200,
  "data": null,
  "message": "Logout successful"
}
```

#### Refresh Access Token

**Endpoint**: `POST /api/v1/users/refreshToken`

**Description**: Get a new access token using refresh token

**Request**:
```json
{
  "refreshToken": "refresh_token_value"
}
```

**Response** (Success - 200):
```json
{
  "status": 200,
  "data": {
    "accessToken": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  },
  "message": "Token refreshed successfully"
}
```

### Error Responses

All error responses follow this format:

```json
{
  "status": 400,
  "data": null,
  "message": "Error description",
  "errors": []
}
```

### Common HTTP Status Codes

- **200**: OK - Request successful
- **201**: Created - Resource created successfully
- **400**: Bad Request - Invalid input or validation error
- **401**: Unauthorized - Missing or invalid authentication
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server-side error

---

## Contribution Guide

We welcome contributions to StreamHub! Follow these guidelines to contribute:

### Prerequisites for Contributing

- GitHub account
- Git installed locally
- Familiarity with Node.js and MongoDB
- Understanding of RESTful APIs

### Contribution Workflow

#### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy of the repository.

#### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/StreamHub.git
cd StreamHub
git remote add upstream https://github.com/Tanushh18/StreamHub.git
```

#### 3. Create a Feature Branch

```bash
# Update from upstream
git fetch upstream
git checkout upstream/main

# Create new feature branch
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-video-comments`
- `fix/jwt-validation`
- `docs/api-documentation`

#### 4. Make Your Changes

```bash
# Make changes to files
# Test your changes locally
npm run dev

# Verify no existing tests break
npm test
```

#### 5. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Add feature: brief description of what you added"
```

**Commit Message Guidelines**:
- Use present tense: "Add feature" not "Added feature"
- Be descriptive: "Add JWT token refresh endpoint" not "Update auth"
- Reference issues: "Fix: address issue #123"

#### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

#### 7. Create a Pull Request

- Go to your fork on GitHub
- Click "New Pull Request"
- Select your feature branch
- Write a clear PR description including:
  - What changes you made
  - Why you made them
  - Any testing you performed
  - Related issues (if any)

#### 8. Code Review

- Maintainers will review your code
- Address feedback and push new commits
- Once approved, your PR will be merged

### Code Standards

- Follow existing code style and patterns
- Add comments for complex logic
- Keep functions focused and small
- Use descriptive variable names
- Handle errors gracefully

### Reporting Issues

If you find a bug or have a feature request:

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment (OS, Node version, etc.)

### Areas for Contribution

We're looking for help in:

- **Features**: New API endpoints, improved video handling
- **Bug Fixes**: Performance issues, security vulnerabilities
- **Documentation**: README improvements, API docs
- **Tests**: Unit tests, integration tests
- **DevOps**: Docker setup, CI/CD pipeline

---

## Deployment

### Prerequisites for Deployment

- Production MongoDB instance (MongoDB Atlas or self-hosted)
- Server or hosting platform (Heroku, AWS, DigitalOcean, etc.)
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

### Deployment to Heroku

#### 1. Install Heroku CLI

```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
heroku login
```

#### 2. Create Heroku Application

```bash
heroku create your-app-name
```

#### 3. Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
heroku config:set Mongo_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/db_name
heroku config:set ACCESS_TOKEN_SECRET=your_secret_key
heroku config:set REFRESH_TOKEN_SECRET=your_refresh_secret
heroku config:set Corsorigin=https://your-frontend-domain.com
```

#### 4. Deploy Application

```bash
git push heroku main
```

#### 5. Monitor Logs

```bash
heroku logs --tail
```

### Deployment to AWS EC2

#### 1. Launch EC2 Instance

- Choose Ubuntu 20.04 LTS AMI
- Open ports 80, 443, 3000 in security group

#### 2. Install Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 3. Clone and Setup

```bash
git clone https://github.com/Tanushh18/StreamHub.git
cd StreamHub
npm install
```

#### 4. Configure Nginx Reverse Proxy

```bash
sudo apt install -y nginx

# Create /etc/nginx/sites-available/streamhub
sudo nano /etc/nginx/sites-available/streamhub
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/streamhub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Use PM2 for Process Management

```bash
sudo npm install -g pm2
pm2 start Youtube_Project/src/index.js --name "streamhub"
pm2 startup
pm2 save
```

#### 6. Setup SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Deployment Checklist

- [ ] Environment variables configured for production
- [ ] MongoDB connection verified
- [ ] SSL certificate installed
- [ ] CORS origin updated to production domain
- [ ] File upload destination configured (Cloudinary or similar)
- [ ] Database backups scheduled
- [ ] Error logging configured
- [ ] Application tested end-to-end
- [ ] Performance monitoring setup

### Performance Optimization

Before deployment:

```bash
# Enable compression in Express
# Add to app.js:
import compression from 'compression';
app.use(compression());

# Set up database indexes
# Review models/ for index configurations

# Enable caching headers
# Configure response cache control in controllers
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error

**Error**: `connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
```bash
# Start MongoDB
mongod

# Or check MongoDB status
sudo systemctl status mongod

# Verify connection string in .env
# Mongo_DB_URL=mongodb://localhost:27017
```

#### 2. Port Already in Use

**Error**: `listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Change port in .env
PORT=5000

# Or kill process using port 3000
sudo lsof -i :3000
sudo kill -9 <PID>
```

#### 3. Module Not Found Error

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 4. JWT Token Expired

**Error**: `TokenExpiredError: jwt expired`

**Solution**:
```bash
# Client should use refresh token endpoint
POST /api/v1/users/refreshToken
# to get new access token
```

#### 5. Multer File Upload Error

**Error**: `File upload failed`

**Solution**:
- Check file size limits in `middlewares/multer.js`
- Verify disk space available
- Check Cloudinary credentials if using cloud storage
- Ensure upload directory has write permissions

#### 6. CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
```bash
# Update Corsorigin in .env
Corsorigin=http://localhost:3000

# For production
Corsorigin=https://yourdomain.com
```

#### 7. Password Validation Error

**Error**: `bcrypt comparison failed`

**Solution**:
- Ensure password hashing is happening in the `pre-save` hook
- Clear cache and restart server
- Verify bcryptjs is installed: `npm list bcryptjs`

### Debug Mode

Enable detailed logging:

```javascript
// Add to app.js
import morgan from 'morgan';
app.use(morgan('dev'));

// Or enable console logs
console.log('Request:', req.method, req.path);
```

### Getting Help

If you encounter issues:

1. **Check existing issues**: https://github.com/Tanushh18/StreamHub/issues
2. **Search documentation**: Review this README and code comments
3. **Enable debug logging**: Add console.log statements
4. **Check MongoDB logs**: `tail -f /var/log/mongodb/mongod.log`
5. **Review error stack traces**: Look at server console output

---

## Security

### Security Practices

#### 1. Authentication Security

- **JWT Tokens**: Short-lived access tokens (1 day default) and long-lived refresh tokens (30 days default)
- **Password Hashing**: bcryptjs with salt rounds for secure password storage
- **Refresh Token Rotation**: New tokens issued on refresh
- **Token Expiration**: Automatic token expiry to limit damage from compromised tokens

#### 2. Data Protection

- **CORS Configuration**: Restrict API access to authorized domains only
- **Input Validation**: All inputs validated before processing
- **MongoDB Injection Prevention**: Mongoose prevents NoSQL injection
- **File Upload Validation**: File type and size validation

#### 3. Environment Security

- **Environment Variables**: Sensitive data stored in `.env` (not version controlled)
- **Secrets Management**: Never commit secrets to repository
- **API Key Security**: Cloudinary and JWT secrets kept private

#### 4. HTTP Security

- **Secure Cookies**: Cookie-parser with secure flags
- **CORS Headers**: Properly configured for production domains
- **Content-Type Validation**: JSON and form-data validation

### Security Checklist

- [ ] Never commit `.env` file
- [ ] Use strong JWT secrets (minimum 32 characters)
- [ ] Validate all user inputs
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Monitor MongoDB for unauthorized access
- [ ] Use strong database passwords
- [ ] Implement rate limiting for API endpoints
- [ ] Log all authentication attempts
- [ ] Regular security audits

### Updating Dependencies

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

### Best Practices

- Always use HTTPS in production
- Implement rate limiting on authentication endpoints
- Add logging for security events
- Regular database backups
- Use database transactions for critical operations
- Implement request validation
- Monitor error logs for suspicious patterns
- Keep all software updated

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

### MIT License Summary

You are free to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately

You must:
- 📝 Include license and copyright notice

You cannot:
- ❌ Hold the authors liable for damages
- ❌ Use trademark claims

---

## Additional Resources

### Documentation

- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Multer File Upload](https://github.com/expressjs/multer)

### Tools & Services

- [Cloudinary](https://cloudinary.com/) - Cloud file storage
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud MongoDB
- [Postman](https://www.postman.com/) - API testing tool
- [Heroku](https://www.heroku.com/) - Cloud deployment

### Community

- Issues: [GitHub Issues](https://github.com/Tanushh18/StreamHub/issues)
- Discussions: [GitHub Discussions](https://github.com/Tanushh18/StreamHub/discussions)

---

## Support & Contact

### Getting Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check this README first
- **Code Comments**: Read inline code documentation
- **Community**: Join discussions on GitHub

### Contributing to This Documentation

Found an error or have an improvement? Please:
1. Fork the repository
2. Create a documentation branch
3. Make improvements
4. Submit a pull request

---

## Acknowledgments

Built with modern Node.js practices and designed for scalability and maintainability.

**Happy Streaming! 🚀**

---

**Last Updated**: September 2026
**Version**: 1.0.0
**Maintainer**: [Tanushh18](https://github.com/Tanushh18)
