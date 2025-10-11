 
NGOCON/                       <-- Root folder
│
├── .gitignore                 <-- Ignore node_modules, .env, logs
├── README.md                  <-- Project description
│
├── backend/                   <-- Node.js + Express backend
│   ├── config/
│   │   └── db.js              <-- MongoDB connection
│   │
│   ├── controllers/           <-- Functions for routes
│   │   ├── ngoController.js
│   │   ├── donorController.js
│   │   └── volunteerController.js
│   │
│   ├── middleware/            <-- Middleware (auth, error handling)
│   │   └── authMiddleware.js
│   │
│   ├── models/                <-- Mongoose models
│   │   ├── NGO.js
│   │   ├── Donor.js
│   │   ├── Volunteer.js
│   │   └── Campaign.js
│   │
│   ├── routes/                <-- API routes
│   │   ├── ngoRoutes.js
│   │   ├── donorRoutes.js
│   │   └── volunteerRoutes.js
│   │
│   ├── utils/                 <-- Helper files (emails, validation)
│   │   └── emailService.js
│   │
│   ├── .env                   <-- Environment variables (DB URI, JWT_SECRET)
│   ├── package.json
│   └── server.js              <-- Entry point for backend
│
frontend/
├── public/
│   ├── index.html           # Main HTML file
│   ├── favicon.ico
│   └── images/              # Logo, placeholder images
│
├── src/
│   ├── assets/              # Images, icons, SVGs
│   │   └── logo.png
│   │
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx         # Campaign cards
│   │   ├── Button.jsx
│   │   └── Modal.jsx
│   │
│   ├── pages/               # Pages for routes
│   │   ├── Home.jsx         # Landing page
│   │   ├── NGO/
│   │   │   ├── NGODashboard.jsx
│   │   │   ├── CreateCampaign.jsx
│   │   │   └── NGOProfile.jsx
│   │   ├── Donor/
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── Donate.jsx
│   │   │   └── DonorProfile.jsx
│   │   ├── Volunteer/
│   │   │   ├── VolunteerDashboard.jsx
│   │   │   ├── RegisterActivity.jsx
│   │   │   └── VolunteerProfile.jsx
│   │   └── Auth/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   │
│   ├── services/           # API calls
│   │   └── api.js
│   │
│   ├── context/            # React context for global state (auth, user info)
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── useFetch.js
│   │
│   ├── App.jsx             # Main App with routes
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles (Tailwind / CSS)
│
├── .env                    # API base URL
├── package.json
└── vite.config.js

