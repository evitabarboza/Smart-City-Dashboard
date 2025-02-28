#  TRACK - A Smart City Dashboard for Mangalore  

![Homepage Screenshot](/frontend/public/one.png) <!-- Replace # with the actual image path -->

## 📌 About TRACK  

**TRACK** is a smart city dashboard built for **Mangalore**, powered by **Google Maps API** and **OpenWeather API**. It provides real-time traffic congestion data, weather updates, and on-click traffic alerts, helping residents and travelers make informed decisions.  

### 🌍 Problem Statement  

Mangalore is a rapidly growing city with increasing traffic congestion. The lack of **real-time traffic monitoring** makes it difficult for commuters to plan their journeys efficiently. Additionally, unpredictable weather conditions further impact daily travel.  

### ✅ How TRACK Solves This  

TRACK provides:  
✔ **Live Traffic Updates** – Get real-time congestion levels directly on an interactive map.  
✔ **Weather Monitoring** – The latest weather conditions update every **minute** for better planning.  
✔ **Traffic Alerts** – Click on any road to view traffic severity levels.  
✔ **Smart Recommendations** – Alerts about high traffic congestion and weather conditions affecting travel.  

---

## ✨ Features  

- 📍 **Live Traffic Updates** – Click on roads to get real-time congestion updates.  
- 🌦️ **Weather Updates** – Updates every **minute** with the latest weather data.  
- 🚦 **Traffic Severity Indications** –  
  - 🟥 **Severe Traffic**  
  - 🟧 **Moderate Traffic**  
  - 🟩 **Low Traffic**  

| Severe Traffic | Moderate Traffic | Low Traffic |
|---------------|----------------|------------|
| ![Severe](/frontend/public/t1.png) | ![Moderate](/frontend/public/t1.png) | ![Low](/frontend/public/t1.png) |  

---

## 📂 Folder Structure  

```
TRACK/
│── README.md
│── package.json
│── package-lock.json
│── .gitignore
│── node_modules/
│── frontend/
│   │── package.json
│   │── package-lock.json
│   │── .gitignore
│   │── public/
│   │   │── fonts/
│   │   │── index.html
│   │   │── favicon.ico
│   │── src/
│   │   │── components/
│   │   │   │── CityMap.js
│   │   │   │── CityTrafficMap.js
│   │   │   │── TrafficAlert.js
│   │   │   │── Weather.css
│   │   │   │── Weather.js
│   │   │── App.css
│   │   │── App.js
│   │   │── index.css
│   │   │── index.js
│   │   │── reportWebVitals.js
│── backend/
│   │── node_modules/
│   │── routes/
│   │   │── server.js
│   │   │── weather.js
│   │── .gitignore
│   │── package.json
│   │── package-lock.json
│   │── server.js
│   │── trafficData.json
```



---

## 🔧 Installation & Setup  

1. **Clone the repository**  
   ```sh
   git clone repo url
   cd track
   ```

2. **Set up the Backend**  
   ```sh
   cd backend
   node server.js
   ```

   - This starts the backend server.

3. **Set up the Frontend**  
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

   - This installs dependencies and starts the frontend.

4. **Stop Both Servers**  
   - Once the backend and frontend are verified running, **stop both terminals** (`Ctrl + C`).

5. **Configure the Routes Folder**  
   ```sh
   cd backend/routes
   npm init -y
   ```

   - This creates `package.json` and `package-lock.json`.

6. **Install Concurrently**  
   ```sh
   npm install concurrently --save-dev
   ```

7. **Update `package.json`**  
   - Open `package.json` in the root folder and replace the `scripts` section with:  

   ```json
   "scripts": {
     "start": "concurrently \"npm run server\" \"npm run client\"",
     "server": "cd backend && npm start",
     "client": "cd frontend && npm start",
     "test": "echo \"Error: no test specified\" && exit 1"
   }
   ```

8. **Start the Project**  
   ```sh
   npm start
   ```

   - This will run both frontend and backend together.

---

This ensures a structured and complete setup process. Let me know if you need any tweaks! 🚀

## 🏗️ Technologies Used  

- **Frontend:** React, Google Maps API, Framer Motion  
- **Backend:** Node.js, Express.js  
- **APIs:** Google Maps API, OpenWeather API  
- **Styling:** CSS  

---

## 📷 Screenshots  

![Dashboard](/frontend/public/two.png) <!-- Replace # with actual image path -->  
![Map Integration](/frontend/public/three.png)  

---

## 👥 Contributors  

This project is developed by:  
- **[@evitabarboza](https://github.com/evitabarboza)**  
- **[@aaronfernandes21](https://github.com/aaronfernandes21)**  

---


## 📜 License  

This project is licensed under the **MIT License**. See the full license text in the [LICENSE](LICENSE) file.  

---




