# 🌾 Apna Kisaan - Your Farming Partner

**اپنا کسان - کسان خوشحال، پاکستان خوشحال**

A premium, ultra-modern React Native mobile application designed specifically for Pakistani farmers to revolutionize agriculture through AI-powered technology.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 🚀 Features

### 🤖 AI-Powered Plant Disease Detection
- **Real-time crop scanning** using Google Gemini AI
- **Accurate disease diagnosis** with 95%+ confidence
- **Specific medicine recommendations** (Pakistani brands: Antracol, Topsin-M, etc.)
- **Bilingual cure instructions** (English + Urdu)
- **Disease severity levels** and expected recovery time
- **Preventive measures** for future protection

### 💬 Agriculture-Only AI Chat Assistant
- **Strict agriculture-focused** responses (refuses off-topic questions)
- **Pakistani context expertise** (local climate, soil, brands)
- **Crop cultivation guidance** (Wheat, Rice, Cotton, Corn, etc.)
- **Fertilizer recommendations** (NPK, DAP, Urea)
- **Pest management solutions**
- **Market price insights**
- **Bilingual support** (English + Roman Urdu)

### 🛒 Kisaan Market - Agricultural Products Store
- **10+ authentic Pakistani agriculture products**
- **Premium fertilizers**: Engro, Fauji, Sarsabz
- **Pesticides & fungicides**: Antracol, Neem Oil, Cypermethrin
- **Certified seeds**: Wheat, Corn varieties
- **WhatsApp ordering integration**
- **Real-time pricing in PKR**

### 🌤️ Real-Time Weather Integration
- **Live weather data** from OpenWeatherMap API
- **Temperature, humidity, wind speed**
- **Pakistani cities support**
- **Farming advice based on weather**

### 👤 User Profile & History
- **Scan history tracking**
- **Personalized recommendations**
- **Language toggle** (English/Urdu)
- **Authentication system**

## 🎨 Design Highlights

- **Ultra-vibrant Next-Gen UI** with glassmorphism effects
- **Premium gradients** (Emerald Green, Golden Amber, Purple Violet)
- **Glowing shadows & 3D effects**
- **HD agriculture imagery** throughout the app
- **Warm, emotional Pakistani farming theme**
- **Responsive design** for all devices

## 🛠️ Tech Stack

### Frontend
- **React Native** with Expo
- **NativeWind** (Tailwind CSS for React Native)
- **React Navigation** (Tab & Stack navigators)
- **Expo Camera** for image capture
- **Expo Image Picker** for gallery access
- **Expo Linear Gradient** for premium UI effects

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Google Gemini AI API** for disease detection & chat
- **OpenWeatherMap API** for weather data
- **JWT** for authentication
- **CORS** enabled for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Expo CLI
- Android Studio / Xcode (for native builds)

### Frontend Setup

```bash
cd agri-gen-app
npm install
npx expo start
```

### Backend Setup

```bash
cd backend-agri-gen
npm install
node server.js
```

### Environment Variables

Create a `.env` file in `backend-agri-gen/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/agrigen
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweather_key_here
JWT_SECRET=your_jwt_secret_here
```

## 🌐 API Endpoints

### Scan & Disease Detection
```
POST /api/scan
Body: { imageBase64, userId, location }
Returns: Comprehensive disease analysis with medicine recommendations
```

### AI Chat
```
POST /api/chat
Body: { message, history }
Returns: Agriculture-focused AI response
```

### Weather
```
GET /api/weather?city=Multan
Returns: Real-time weather data
```

## 📱 Screens

1. **Splash Screen** - Animated logo with pulsing glow effect
2. **Home Screen** - Hero section with weather widget & crop status
3. **Scan Screen** - Camera interface for disease detection
4. **Chat Screen** - AI farming assistant
5. **Store Screen** - Agricultural products marketplace
6. **Profile Screen** - User account & settings

## 🔐 Security

- JWT-based authentication
- Secure password hashing
- Environment variable protection
- CORS configuration
- Input validation & sanitization

## 🌍 Supported Languages

- **English**
- **Urdu** (اردو)

## 📊 Disease Detection Capabilities

### Supported Crops
- Wheat (گندم)
- Rice (چاول)
- Cotton (کپاس)
- Corn (مکئی)
- Sugarcane (گنا)

### Common Diseases Detected
- Wheat Rust
- Rice Blast
- Cotton Bollworm
- Corn Maize Streak
- Powdery Mildew
- Leaf Blight
- And 20+ more...

## 🎯 Target Users

- Small-scale Pakistani farmers
- Agricultural students
- Farming communities
- Agriculture consultants
- Rural development organizations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Muneeb Khan**
- GitHub: [@mk6783336](https://github.com/mk6783336)

## 🙏 Acknowledgments

- Google Gemini AI for advanced plant pathology
- OpenWeatherMap for weather data
- Unsplash for HD agriculture images
- Pakistani farming community for inspiration

---

**کسان خوشحال، پاکستان خوشحال** 🌾🇵🇰

*Happy Farmer, Happy Pakistan*
