import React, { useEffect, useState, useRef } from "react";
import { setPageTitle } from "../utils.jsx";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";

function About() {
  useEffect(() => {
    setPageTitle("About-TourExplorer");
  }, []);

  const [review, setReview] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved
      ? JSON.parse(saved)
      : [
          "Amazing tour experience and great guides!",
          "Beautiful destinations and affordable packages!"
        ];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const reviewContainerRef = useRef(null);

  useEffect(() => {
    if (reviewContainerRef.current && reviews.length > 4) {
      reviewContainerRef.current.scrollTo({
        top: reviewContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [reviews]);

  const handleAddReview = () => {
    if (review.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...reviews];
      updated[editIndex] = review;
      setReviews(updated);
      setEditIndex(null);
    } else {
      setReviews([...reviews, review]);
    }

    setReview("");
  };

  const handleDelete = (index) => {
    const filtered = reviews.filter((_, i) => i !== index);
    setReviews(filtered);
  };

  const handleEdit = (index) => {
    setReview(reviews[index]);
    setEditIndex(index);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full py-12 px-4 bg-[#f5f3ff]">
        <div className="text-center mb-12">
            <h1>
                About Trip Spotter
            </h1>
          <p className="text-gray-600 mb-3 md:text-xl">
            TourExplorer helps you discover amazing destinations and unforgettable travel experiences.
          </p>

          <p className="text-gray-600 leading-relaxed mb-3 md:text-xl">
            TourExplorer is a modern travel platform designed to help travelers explore
            beautiful destinations, book tour packages, and plan perfect vacations.
            We provide domestic and international tour packages at affordable prices.
          </p>

          <p className="text-gray-600 leading-relaxed md:text-xl">
            Our goal is to make traveling easy, safe, and enjoyable for everyone.
            Whether you love adventure, nature, or cultural trips, we have the perfect tour for you.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold philosopher-regular mb-6 text-black-600">
            Vision & Mission
          </h2>

          <p className="text-gray-600 leading-relaxed mb-3 md:text-xl">
            <span className="font-semibold">Vision:</span>
            Our vision is to become a trusted travel partner worldwide, inspiring people
            to explore new places and cultures. We aim to create memorable travel experiences
            that last a lifetime.

            <br /><br />

            <span className="font-semibold">Mission:</span>
            Our mission is to provide affordable, safe, and high-quality tour packages with excellent
            customer support. We strive to deliver the best travel services, experienced guides,
            and personalized travel plans to make every journey memorable.
          </p>
        </div>

        {/* Reviews Section */}
        <div>
          <div
            ref={reviewContainerRef}
            className={`rounded-xl p-6 space-y-4 transition-all
            ${reviews.length > 3 ? "max-h-72 overflow-y-auto pr-2" : ""}`}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
              >
                <span>⭐ {r}</span>

                <div className="flex space-x-2">
                  <Button title="Edit" size="sm" variant="primary" onClick={() => handleEdit(i)} />
                  <Button title="Delete" size="sm" variant="primary" onClick={() => handleDelete(i)} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Write your travel review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddReview}
              className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-800 transition"
            >
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;