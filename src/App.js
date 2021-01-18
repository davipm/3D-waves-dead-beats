import { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { ResizeObserver } from "@juggle/resize-observer";

import calli from "./images/calli.jpeg";

import Dots from "./components/dots";
import Effects from "./components/effects";
import Loading from "./components/loading";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoading = () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 2000)
      );
    };

    handleLoading().then(() => setLoading(false));
  }, []);

  return (
    <div id="app">
      {loading && <Loading />}

      <div className="content">
        <h3 className="content__title">Dead Beats</h3>
      </div>

      <img src={calli} alt="Calli" className="calli" />

      <Canvas
        orthographic
        camera={{ zoom: 20 }}
        colorManagement={false}
        resize={{ polyfill: ResizeObserver }}
        style={{ opacity: "0.7" }}
        id="canvas"
      >
        <color attach="background" args={["black"]} />
        <Effects />
        <Dots />
      </Canvas>

      <footer className="footer">
        <p>
          find this project on{" "}
          <a
            href="https://github.com/davipm"
            target="_blank"
            rel="nofollow noreferrer"
          >
            Github
          </a>
        </p>
      </footer>
    </div>
  );
}
