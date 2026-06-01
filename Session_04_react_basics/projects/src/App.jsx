import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import UserProfile from "./components/UserProfile";
import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Tier 0 — Demo các component</h1>

      <hr />
      <h2>Bài 1: UserProfile</h2>
      <UserProfile />

      <hr />
      <h2>Bài 2: ProductInfo</h2>
      <ProductInfo />
    </div>
  );
}

export default App;