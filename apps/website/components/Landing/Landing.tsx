import React, { useState } from "react";
import clsx from "clsx";

import { a } from "@react-spring/web";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Anek_Latin } from "@next/font/google";
import { useSpring } from "@react-spring/core";
import Stars from "components/Landing/Stars";
import { VectisLogo } from "@vectis/components/Logos/VectisLogo";

import { Overlay } from "./Overlay";
import { Scene } from "./Scene";
import Link from "next/link";

const font = Anek_Latin({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Landing: React.FC = () => {
  const [cursor, setCursor] = useState("cursor-round");
  const [{ background, fill }, setSpringBg] = useSpring({ background: "#f0f0f0", fill: "#202020" }, []);
  const [darkMode, setDarkMode] = useState(false);

  const setBg = (bg: { background: string; fill: string }) => {
    setSpringBg(bg);
    setDarkMode(!darkMode);
  };

  return (
    <div className={clsx(font.className, "landing flex flex-1")}>
      <div className="absolute top-0 left-0  z-10 h-fit w-full overflow-hidden p-4">
        <div className="flex items-center justify-between">
          <VectisLogo className="h-[24px] w-[100px]" fill="#566fa1" />
          <Link
            href="https://testnet.app.vectis.space/"
            className={`flex items-center justify-center gap-2 rounded-md border border-transparent bg-kashmir-blue-500 px-4 py-2 font-medium text-white transition-all duration-150 ease-in hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-25`}
          >
            Launch App
          </Link>
        </div>
      </div>
      <div className="absolute h-screen w-screen cursor-round overflow-hidden">
        <Canvas className="transparent" camera={{ position: [0, 0, 1] }}>
          <Stars color={darkMode ? background.toJSON() : "#303d5c"} />
        </Canvas>
      </div>
      <a.main className={clsx("flex h-screen w-screen flex-col md:flex-row", cursor)} style={{ background }}>
        <Overlay fill={fill} />
        <Canvas className="order-2 h-[70vh] flex-1 sm:h-full" dpr={[1, 2]}>
          <Scene setBg={setBg} setCursor={setCursor} />
          <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        </Canvas>
      </a.main>
    </div>
  );
};

export default Landing;
