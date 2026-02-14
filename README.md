# 🚀 Interview Pattern Mastery Dashboard

A responsive web application to track DSA problem-solving progress by pattern and difficulty.  
Built using Vanilla JavaScript with basic analytics and visualization.

Live Demo:  
👉 https://interview-pattern-mastery-dashboard.vercel.app/

## 🔥 Features

- Add and delete solved problems
- Pattern-based mastery tracking (weighted scoring)
- Animated bar chart visualization using Chart.js
- Weak area detection
- Difficulty-based color badges
- Pattern filtering
- Total problems counter
- Achievement milestones
- Dark mode toggle
- Persistent data using LocalStorage
- Installable as a Progressive Web App (PWA)



## 📱 Progressive Web App (PWA)

This project is configured as a basic Progressive Web App.

It includes:
- Web App Manifest configuration
- Service Worker for caching static files
- Installable on desktop and mobile devices
- Standalone mode (runs without browser UI)

The app can be added to the home screen and works offline for cached content.



## 🛠 Tech Stack

- HTML5
- CSS3 (Glassmorphism UI + Animations)
- JavaScript (Vanilla)
- Chart.js
- Web App Manifest
- Service Worker (basic caching)



## 📊 How Mastery is Calculated

Each solved problem contributes weighted points:

- Easy → 1 point  
- Medium → 2 point  
- Hard → 3 point  

Mastery percentage per pattern:

Mastery % = (weighted score / 30) × 100

The score is capped at 100%.

## 🧠 What I Learned

- DOM manipulation using Vanilla JavaScript
- Managing application state using LocalStorage
- Data visualization with Chart.js
- Basic Service Worker registration and caching
- Configuring a Web App Manifest
- Deploying projects using Vercel
- Git & GitHub workflow

## 💡 Future Improvements

- User authentication
- Backend integration (Node.js + Database)
- Cloud-based data storage
- Multi-user support
- Progress-over-time analytics



