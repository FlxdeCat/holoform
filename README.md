# 🧠 HoloMorph - Real-Time 3D Avatar Face & Body Tracker

**HoloMorph** is a real-time, browser-based 3D avatar that mimics a user’s motion using a webcam.  
Powered by **React 19 + TypeScript + Three.js + GSAP + MediaPipe**, this project brings skeletal tracking to life with subtle animation, eye blinking, and idle-aware behavior.

---

## ✨ Features

- 🎥 **Live Webcam Tracking** (face, body, and hands)
- 🦴 **3D Avatar Bone Mapping** with MediaPipe Holistic
- 💨 **Idle Animations** (head bobbing, spine breathing)
- 👀 **Random Eye Blinking** for realism
- 🎯 **Motion Detection** to pause idle animation
- ⚙️ Modular & Performant architecture (React + Fiber + GSAP)

---

## 🔧 Tech Stack

| Layer       | Tools                                 |
|-------------|----------------------------------------|
| Frontend    | React 19, TypeScript, Tailwind CSS     |
| 3D Graphics | react-three-fiber, drei, three.js      |
| Animation   | GSAP                                   |
| Tracking    | MediaPipe Holistic + camera_utils      |
| Assets      | `.glb` skinned 3D humanoid avatar      |

---

## 🚀 Getting Started

```bash
# Clone and install
git clone https://github.com/your-username/holomorph-avatar.git
cd holomorph-avatar
npm install

# Start the dev server
npm run dev
```

---

## 📁 Structure

```
holoform/
├── public/
│   └── avatar.glb
├── src/
    ├── components/
    │   ├── Avatar.tsx          # Avatar logic with GSAP & motion tracking
    │   ├── WebcamFeed.tsx      # MediaPipe camera integration
    │   └── Controls.tsx        # UI toggles for face/body/hands
    │   ├── AvatarScene.tsx     # Canvas + environment setup
    ├── utils/
    │   ├── mapLandmarksToBones.ts
    │   └── applyIdleAnimation.ts
```
