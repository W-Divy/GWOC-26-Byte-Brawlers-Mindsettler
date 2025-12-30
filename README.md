# MindSettler

MindSettler is a modern productivity and mindfulness web application built with **Next.js**, **React**, **TypeScript**, **MongoDB Atlas**, and enhanced with smooth, high-performance animations using **GSAP**.

---

##  Tech Stack

* **Next.js** – Full‑stack framework for server-side rendering and API routes.
* **React.js** – Component‑based UI library.
* **TypeScript** – Strongly typed JavaScript for scalable development.
* **MongoDB Atlas** – Cloud database for secure and flexible data storage.
* **GSAP (GreenSock Animation Platform)** – Industry‑leading library for advanced animations.

---

##  Features

* Smooth GSAP‑powered page transitions and UI animations
* Fully typed codebase with TypeScript
* REST API endpoints (Next.js API routes)
* MongoDB Atlas database integration for persistent storage
* Responsive and modern UI built with React components

---


## 🧵 GSAP Integration

GSAP is used for animated transitions, smooth scroll effects, and interactive UI motion.

**Example GSAP usage:**

```ts
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const AnimatedComponent = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return <div ref={elementRef}>Welcome to MindSettler</div>;
};

export default AnimatedComponent;
```

### ✨ Built with passion — MindSettler
