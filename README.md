```
# HoloMorph - Real-Time 3D Avatar Face & Body Tracker

**HoloMorph** is a real-time, browser-based 3D avatar that mimics a user’s motion using a webcam.  
Powered by **React 19 + TypeScript + Three.js + GSAP + MediaPipe**, this project brings skeletal tracking to life with subtle animation, eye blinking, and idle-aware behavior.

---

## ✨ Features

- 🎥 Live face, body, and hand tracking (MediaPipe Holistic)
- 🦴 3D avatar bone mapping (Three.js + R3F)
- 💨 GSAP idle animation (breathing, head bob)
- 👀 Random eye blinking animation
- 🎯 Motion detection to pause idle
- ⚙️ Modular, performant (React, TypeScript, Tailwind)
- 🧪 Automated tests with Vitest + Testing Library + GitHub Actions

---

## 🔧 Tech Stack

| Layer       | Tools                                         |
|-------------|-----------------------------------------------|
| Frontend    | React 19, TypeScript, Tailwind CSS            |
| 3D Graphics | react-three-fiber, drei, three.js             |
| Animation   | GSAP                                          |
| Tracking    | MediaPipe Holistic, camera_utils              |
| Assets      | `.glb` skinned 3D humanoid avatar             |
| Testing     | Vitest, @testing-library/react, jsdom, CI via GitHub Actions |

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

> 🧠 **Note:**  
> The avatar requires a skinned `.glb` model file.  
> By default, the project uses the model listed in `public/modelCredits.txt`.  
> If you replace the model with a different one, make sure to **update the bone mappings** in `src/components/Avatar.tsx` to match the new skeleton.

---

## 🧪 Tests

Run automated tests:

```bash
npm run test
```

---

## 📁 Structure

```
holoform/
├── public/
│   ├── avatar.glb
│   └── modelCredits.txt
├── src/
│   ├── __tests__/
│   │   ├── Avatar.test.tsx
│   │   ├── Controls.test.tsx
│   │   └── WebcamFeed.test.tsx
│   ├── components/
│   │   ├── Avatar.tsx          # Avatar logic with GSAP & motion tracking
│   │   ├── WebcamFeed.tsx      # MediaPipe camera integration
│   │   ├── Controls.tsx        # UI toggles for face/body/hands
│   │   └── AvatarScene.tsx     # Canvas + environment setup
│   ├── utils/
│   │   ├── mapLandmarksToBones.ts
│   │   └── applyIdleAnimation.ts
```
