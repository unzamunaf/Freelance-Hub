# FreelanceHub - Full-Stack Freelance Platform

A premium full-stack web application designed for a freelance marketplace. Users can browse services, filter by category/price, view details, and simulate saving or hiring services using drag-and-drop or interactive buttons.

## Features
- **Frontend**: Responsive Vanilla HTML/CSS/JS with a glassmorphic design.
- **Backend**: Express.js server with RESTful API endpoints.
- **Dynamic Filtering**: Search by title, filter by category, and sort by price/rating.
- **User Dashboard**: Manage "Saved" and "Hired" services.
- **Interactive UI**: Drag-and-drop functionality and modal-based detail views.
- **State Management**: Local state sync with backend memory storage.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Retrieve all available services |
| GET | `/api/services/:id` | Retrieve detailed info for one service |
| POST | `/api/save` | Save a service to the dashboard |
| POST | `/api/hire` | Hire a freelancer for a service |
| GET | `/api/saved` | Get the list of saved services |
| GET | `/api/hired` | Get the list of hired services |

## Setup Instructions
1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Installation**:
   ```bash
   cd FreelanceHub
   npm install
   ```
3. **Run the Server**:
   ```bash
   npm start
   ```
4. **Access**: Open `http://localhost:5000` in your browser.

## Project Structure
```text
/FreelanceHub
│── /client
│     ├── index.html
│     ├── /css/style.css
│     ├── /js/app.js
│── /server
│     ├── server.js
│     ├── /routes/api.js
│     ├── /controllers/serviceController.js
│     ├── /data/services.json
│── package.json
│── README.md
```
