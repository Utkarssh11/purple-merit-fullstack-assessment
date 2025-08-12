# GreenCart Logistics - KPI Dashboard & Simulation Tool

This project is a full-stack web application built for the Purple Merit Technologies developer assessment. It's an internal tool for a fictional delivery company, GreenCart Logistics, that allows managers to simulate delivery operations and see the impact on company profits and efficiency.

---

### **Live Demo & Credentials**

*   **Live App (Frontend):** **[https://purple-merit-fullstack-assessment.vercel.app/](https://purple-merit-fullstack-assessment.vercel.app/)**
*   **Backend API:** **[https://purple-merit-fullstack-assessment.onrender.com/](https://purple-merit-fullstack-assessment.onrender.com/)**

> **Login Credentials:**
> *   **Username:** `manager`
> *   **Password:** `password123`

---

## What It Does

*   **Simulate Operations:** Managers can enter the number of drivers and max work hours to run a simulation.
*   **Calculate KPIs:** The backend uses custom company rules (like driver fatigue, late penalties, and high-value bonuses) to calculate profit, efficiency, and fuel costs.
*   **Visualize Data:** The dashboard shows the results with clear KPIs and charts.
*   **Manage Data:** Simple pages to view the company's drivers, routes, and orders.

## Tech Stack

*   **Frontend:** React (Vite), Chart.js, Axios
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Deployment:** Vercel (Frontend), **Railway** (Backend), MongoDB Atlas (Database)

---

## Getting Started Locally

### 1. Clone the Repo
```bash
git clone https://github.com/Utkarssh11/purple-merit-fullstack-assessment.git
cd purple-merit-fullstack-assessment
