
# 🛒 Amazon E-Commerce Clone – MERN Stack Web App

A fully functional Amazon-style e-commerce platform developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This project supports user registration, login, product browsing, and a dynamic shopping cart with authentication.

🚀 **Live Demo**: [https://e-commerce-amazon1.onrender.com](https://e-commerce-amazon1.onrender.com)

## ⚙️ Tech Stack

- **Frontend:** React.js, Context API, Custom CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt, cookie-based auth
- **State Management:** React Context API
- **Deployment:** Render

## ✨ Features

- 🧾 User registration and login with encrypted passwords
- 🛍️ Product listing and single product detail pages
- 🛒 Add to cart functionality with session persistence
- 🔒 Protected routes for cart and checkout
- 🍪 Secure cookie handling with JWT
- ✅ Mobile responsive UI with clean user experience



## 📂 Folder Structure

```
E-Commerce-Amazon/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Navbar, ProductCard, etc.
│   │   ├── pages/           # Home, SignIn, Cart, etc.
│   │   └── context/         # Auth & cart context
│   └── public/
├── server/                  # Express Backend
│   ├── models/              # Mongoose Schemas
│   ├── routes/              # Express routers
│   ├── middleware/          # Auth middleware
│   ├── db/                  # MongoDB connection config
│   ├── defualtData.js       # Product seeding script
│   └── app.js               # Entry point
└── .env.example             # Example environment variables
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Udaykiran-12/E-Commerce-Amazon.git
cd E-Commerce-Amazon
```

### 2. Install dependencies for both client and server
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Create environment file in `server/.env`
```env
KEY=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=8005
```

### 4. Run the development servers
```bash
# Start backend
cd server
node app.js

# In another terminal, start frontend
cd ../client
npm start
```

## ✍️ Author

**Pedduri Udaykiran**  
- [GitHub](https://github.com/Udaykiran-12)  
- [LinkedIn](https://www.linkedin.com/in/pedduri-udaykiran)



## 🙌 Acknowledgements

- Inspired by the UI/UX and functionality of [Amazon](https://www.amazon.com)
