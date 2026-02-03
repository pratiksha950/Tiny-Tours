import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
    <div className="relative min-h-screen w-screen overflow-y-auto">

      <div className="relative z-20">
        <Navbar />
      </div>

      <video
        src="https://americathebeautiful.com/wp-content/uploads/2026/01/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover z-0"
      /> <br />
  

    </div>

         <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, esse optio officia iusto harum molestiae in mollitia quia ducimus ex, quod cum distinctio rem quidem doloremque, natus aliquid ut culpa.
     Dolorem sint esse aperiam natus ipsam nobis ab cum ipsum non architecto earum doloribus voluptates culpa quisquam, repudiandae perspiciatis sapiente rem quae quidem aliquid ducimus ullam dignissimos expedita maxime. Iusto!
     Nemo in accusamus officiis praesentium velit reprehenderit nobis commodi quia provident mollitia dicta nam incidunt impedit asperiores voluptas dolorum rem assumenda, ipsa molestiae quis fugit saepe? Ipsam repellat dolor iure.
     Obcaecati consectetur a perferendis harum cumque odio fuga dicta neque praesentium libero id molestias reprehenderit mollitia reiciendis amet iste sequi adipisci, incidunt earum? Pariatur, aut dolor unde modi minus cumque.
     Odit quod inventore ex odio excepturi, corporis nam ut tempore eos amet dolor asperiores maxime illo ullam laudantium dolorum omnis, suscipit, dolore et quas facilis. Perferendis nostrum minus aut delectus?</h1>

     <Footer />
</>
  );
}

export default Home;
