import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input.jsx";
import MultiSelect from "../components/MultiSelect.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getUserJwtToken } from "../utils.jsx";
import { useNavigate } from "react-router-dom";
import PhotoViewer from "../components/PhotoViewer.jsx";
import img from "../assets/tour.png";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

const authenticator = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth`
  );

  const data = await res.json();
  return data;
};

function NewTour() {

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [newTour, setNewTour] = useState({
    title: "",
    Description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  useEffect(() => {

    if (!getUserJwtToken()) {
      toast.error("Please login first!");
      navigate("/login");
    }

  }, []);

  const handleUpload = async () => {

    const fileInput = fileInputRef.current;

    if (!fileInput || fileInput.files.length === 0) {
      toast.error("Select image first");
      return;
    }

    const file = fileInput.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {

      const { signature, expire, token, publicKey } =
        await authenticator();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,

        useUniqueFileName: true,
        folder: "/tours",
        isPrivateFile: false,

        onProgress: (e) => {
          setProgress((e.loaded / e.total) * 100);
        },
      });

      setNewTour((prev) => ({
        ...prev,
        photos: [...prev.photos, uploadResponse.url],
      }));

      toast.success("Image uploaded successfully");

      setProgress(0);
      fileInput.value = "";

    } catch (error) {

      console.error(error);

      if (error instanceof ImageKitAbortError) {
        console.log("Upload Aborted");
      }
      else if (error instanceof ImageKitInvalidRequestError) {
        console.log("Invalid Request");
      }
      else if (error instanceof ImageKitUploadNetworkError) {
        console.log("Network Error");
      }
      else if (error instanceof ImageKitServerError) {
        console.log("Server Error");
      }

      toast.error("Upload failed");

    }

  };

  const addTour = async () => {

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tours`,
        newTour,
        {
          headers: {
            Authorization: `Bearer ${getUserJwtToken()}`,
          },
        }
      );

      if (res.data.success) {

        toast.success(res.data.message);
        navigate("/dashboard");

      } else {

        toast.error(res.data.message);

      }

    } catch (err) {

      toast.error("Error saving tour");

    }

  };

  return (

    <>
      <Navbar />

      <div className="my-10 px-4">

        <h1 className="text-3xl font-bold text-center">
          Add New Tour
        </h1>

        <div className="flex justify-center mt-6">

          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl grid md:grid-cols-2 gap-6">

            <img
              src={img}
              className="rounded-xl hidden md:block"
            />

            <div className="space-y-4">

              <Input
                type="text"
                placeholder="Title"
                value={newTour.title}
                onChange={(e) =>
                  setNewTour({
                    ...newTour,
                    title: e.target.value,
                  })
                }
              />

              <Input
                type="text"
                placeholder="Description"
                value={newTour.Description}
                onChange={(e) =>
                  setNewTour({
                    ...newTour,
                    Description: e.target.value,
                  })
                }
              />

              <MultiSelect
                selectedItems={newTour.cities}
                placeholder="City"

                onAddItem={(val) =>
                  setNewTour({
                    ...newTour,
                    cities: [...newTour.cities, val],
                  })
                }

                onRemoveItem={(val) =>
                  setNewTour({
                    ...newTour,
                    cities: newTour.cities.filter(
                      (c) => c !== val
                    ),
                  })
                }
              />

              <div className="grid grid-cols-2 gap-2">

                <Input
                  type="date"
                  value={newTour.startDate}
                  onChange={(e) =>
                    setNewTour({
                      ...newTour,
                      startDate: e.target.value,
                    })
                  }
                />

                <Input
                  type="date"
                  value={newTour.endDate}
                  onChange={(e) =>
                    setNewTour({
                      ...newTour,
                      endDate: e.target.value,
                    })
                  }
                />

              </div>

              <div className="flex gap-3 flex-wrap">

                {newTour.photos.map((file, i) => (

                  <PhotoViewer
                    key={i}
                    imgUrl={file}
                    index={i}
                    showDelete

                    onDelete={(index) =>
                      setNewTour((prev) => ({
                        ...prev,
                        photos: prev.photos.filter(
                          (_, idx) => idx !== index
                        ),
                      }))
                    }

                  />

                ))}

              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="border p-2 rounded"
              />

             <Button
  type="secondary"
  title="Upload Image"
  onClick={handleUpload}
/>

              {progress > 0 && (
                <p>
                  Uploading {progress.toFixed(0)}%
                </p>
              )}

              <Button
              type="primary"
                title="Add Tour"
                onClick={addTour}

              />

            </div>

          </div>

        </div>

        <Toaster />

      </div>

    </>
  );
}

export default NewTour;