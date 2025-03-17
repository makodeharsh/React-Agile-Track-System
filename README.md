# React-Agile-Track-System  

## 📖 Project Overview  
This project was developed as part of my **Wipro Training Program** under **Techademy**, guided by my instructor **Prasad**.  

The **React-Agile Track System** is a **Single Page Application (SPA)** that helps teams **manage agile workflows efficiently**. It enables:  
✅ **Users to track assigned tasks**  
✅ **Administrators to manage Scrum teams, users, and task assignments**  

---

## 📂 Features  
✅ **User Authentication** (Login & Signup)  
✅ **Role-Based Access Control** (Admin & Employee)  
✅ **Scrum Teams & Task Management**  
✅ **Task Status Tracking** (`To Do`, `In Progress`, `Done`)  
✅ **Admin Privileges** (Add Users, Assign Tasks, Change Status)  
✅ **User Profile & Task History**  
✅ **Bootstrap for Responsive UI**  
✅ **JSON Server as Fake REST API**  

---

## 📁 Folder Structure  
```
react-agile-track-system/
│── public/                       # Static files  
│── src/  
│   ├── components/  
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js      # Displays Scrum Teams  
│   │   ├── Login/
│   │   │   └── Login.js          # Login Page  
│   │   ├── Signup/
│   │   │   └── SignUp.js         # User Registration  
│   │   ├── Scrum Details/ 
│   │   │   └── ScrumDetails.js   # Shows Tasks & Users in a Scrum  
│   │   ├── UserProfile/
│   │   │   └── UserProfile.js    # User Task History  
│   ├── context/  
│   │   ├── UserContext.js        # Global Authentication State  
│   ├── App.js                    # Main Application Component  
│   ├── index.js                  # React Entry Point  
│── db.json                       # Fake REST API Database  
│── package.json                  # Project Dependencies  
│── README.md                     # Project Documentation  
```

---

## ⚡ How to Run the Project  
Follow these steps to **set up and run the project**:  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/react-agile-track-system.git
cd react-agile-track-system
```
OR Extract the Project if you have a ZIP file.

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Start JSON Server (Fake API Backend)  
```bash
npm run json-start
```
🔹 The API will be available at: `http://localhost:4000`  

### 4️⃣ Start the React Application  
```bash
npm start
```
🔹 The App will run on: `http://localhost:3000`  

---

## 📌 User Roles & Permissions  
| Role     | Permissions  |
|----------|-------------|
| **Admin** | Add/Manage Users, Assign Tasks, Change Task Status |
| **Employee** | View Assigned Tasks, Track Progress |

---

## 🤝 Contribution  
✅ Fork the repository  
✅ Create a new branch (`feature-branch`)  
✅ Commit your changes (`git commit -m "Added new feature"`)  
✅ Push to GitHub (`git push origin feature-branch`)  
✅ Submit a Pull Request  

---

## 📬 Contact  
📩 **Email**: makodeharsh28@gmail.com  
🌐 **GitHub**: [your-github-profile](https://github.com/makodeharsh) 
