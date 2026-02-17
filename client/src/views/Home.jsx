import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

function Home() {
  return (
    <>
      <div className="relative min-h-screen w-screen overflow-hidden">

        <div className="relative z-20">
          <Navbar />
        </div>

        <video
          src="https://americathebeautiful.com/wp-content/uploads/2026/01/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center gap-6 mt-85 pacifico-regular">
          <h1 className="text-4xl md:text-6xl font-bold">
            Explore The World
          </h1>

          <Button
            title="Get Started"
            size="md"
            varient="primary"
            onClick={() => { window.location.href = "/newTour";}}
          />
        </div>
      </div>

      <div className="px-6 py-16 max-w-6xl mx-auto">
        <p className="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Eius, esse optio officia iusto harum molestiae in mollitia quia ducimus ex...
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Home;
