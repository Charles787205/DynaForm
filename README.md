<div align="center">
  
# 📋 DynaForm

### A Dynamic Form Builder Built with HTMX

Build, share, and manage forms effortlessly with DynaForm - a modern, hypermedia-driven web application powered by **HTMX** for creating dynamic forms with real-time responses and zero JavaScript frameworks.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![HTMX](https://img.shields.io/badge/HTMX-Powered-blueviolet.svg)](https://htmx.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.8+-brightgreen.svg)](https://www.mongodb.com/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

- **⚡ HTMX-Powered Interactions** - Enjoy smooth, real-time updates without complex JavaScript frameworks
- **🎨 Drag & Drop Interface** - Intuitive form builder with drag-and-drop functionality
- **📝 Multiple Field Types** - Support for text fields, checkboxes, dropdowns, radio buttons, textareas, and more
- **👥 Google OAuth Authentication** - Secure login with Google OAuth 2.0
- **📊 Response Management** - Collect, view, and manage form responses efficiently
- **🚀 Hypermedia-Driven Architecture** - Leveraging HTMX for a modern, SPA-like experience with server-side rendering
- **📱 Responsive Design** - Beautiful UI built with Tailwind CSS
- **💾 Form History** - Track changes and maintain version history
- **🔗 Easy Sharing** - Share forms with custom links
- **📋 Templates** - Pre-built templates for surveys, feedback forms, and information collection

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6.8 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Charles787205/DynaForm.git
   cd DynaForm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/dynaform
   
   # Session Secret
   SESSION_SECRET=your_session_secret_here
   
   # Google OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   
   # Application Port
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will start on `http://localhost:3000`

## 📖 Usage

### Creating a Form

1. Log in with your Google account
2. Click on "Create New Form"
3. Drag and drop fields from the sidebar
4. Customize field properties and styling
5. Save and share your form

### Managing Responses

- View all responses in the dashboard
- Export responses for analysis
- Track response statistics and summaries

### Form Templates

Choose from pre-built templates:
- **Survey Forms** - For gathering opinions and feedback
- **Feedback Forms** - Collect customer/user feedback
- **Information Forms** - Gather data and information

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web application framework
- **MongoDB & Mongoose** - Database and ODM
- **Passport.js** - Authentication middleware
- **Express Session** - Session management

### Frontend
- **HTMX** - 🌟 **Core Technology** - High-power tools for hypermedia, enabling modern browser features directly from HTML attributes. No build step, no complex JavaScript frameworks required!
- **EJS** - Server-side templating engine for dynamic HTML generation
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **SweetAlert** - Beautiful alerts and modals

### Development Tools
- **Babel** - JavaScript transpiler
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting

## 📁 Project Structure

```
DynaForm/
├── public/              # Static assets
│   ├── css/            # Stylesheets
│   └── js/             # Client-side JavaScript
├── src/
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # Route definitions
│   ├── middleware/     # Custom middleware
│   ├── views/          # EJS templates
│   ├── objects/        # Business logic objects
│   └── util/           # Utility functions
├── index.js            # Application entry point
├── passport.js         # Passport configuration
└── package.json        # Project dependencies
```

## 🔧 Available Scripts

```bash
# Start development server with hot reload
npm start

# Run Tailwind CSS compiler in watch mode
npm run tailwind

# Start server with Nodemon
npm run nodemon

# Run tests
npm test
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Charles787205/DynaForm/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is [ISC](https://opensource.org/licenses/ISC) licensed.

## 👨‍💻 Author

**Charles787205**

- GitHub: [@Charles787205](https://github.com/Charles787205)

---

<div align="center">

Made with ❤️ by the DynaForm Team

</div>
