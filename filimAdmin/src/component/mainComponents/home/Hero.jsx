"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Advancing from "./Advancing";
import TopListing from "./TopListing";
import Robot from "./Robot";
import Competition from "./Competition";
import Runway from "./Runway";
import { jsxs } from "react/jsx-runtime";
import { validateFile } from "@/utils/fileValidation";

const Hero = () => {
  // Hero section states including the new alt state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [button, setButton] = useState("");
  const [alt, setAlt] = useState("");
  const [link, setLink] = useState("");

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Other section states
  const [advance, setAdvance] = useState({
    title: "",
    title2: "",
    description: "",
    alt: "",
  });
  const [advanceImage, setAdvanceImage] = useState(null);

  const [toplist, setToplist] = useState({
    title: "",
    description: "",
    button: "",
    alt: "",
    link: "",
  });
  const [toplistImage, setToplistImage] = useState(null);

  const [robot, setRobot] = useState({
    title: "",
    description: "",
    button: "",
    alt: "",
    link: "",
  });
  const [robotImage, setRobotImage] = useState(null);

  const [competate, setCompetate] = useState({
    title: "",
    button: "",
    alt: "",
    description: "",
    link: "",
  });
  const [competateImage, setCompetateImage] = useState(null);

  const [runway, setRunway] = useState({
    title: "",
    button: "",
    alt: "",
    link: "",
  });
  const [runwayImage, setRunwayImage] = useState(null);
  const [videos, setVideos] = useState(null);
  const [videoData, setVideoData] = useState("");
  const [videoData2, setVideoData2] = useState("");
  // Home ID to determine whether to create or update the home page data
  const [homeId, setHomeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/gethome`,
        );
        if (data.home && data.home.length > 0) {
          const homeData = data.home[0];
          console.log(homeData, "response get api hero");

          setHomeId(homeData._id);
          if (homeData?.hero) {
            setTitle(homeData.hero.title || "");
            setDescription(homeData.hero.description || "");
            setButton(homeData.hero.button || "");
            setAlt(homeData.hero.alt || "");
            setImage(homeData.hero.bgImage || []);
            setLink(homeData.hero.link || "");
          }
          console.log(homeData.hero.bgImage, "response get api hero bgImage");
          if (homeData?.advance) {
            setAdvance(homeData.advance);
            setAdvanceImage(homeData.advance.bgImage);
          }
          if (homeData?.toplist) {
            setToplist(homeData.toplist);
            setToplistImage(homeData.toplist.bgImage);
          }
          if (homeData?.videos) {
            setVideoData(homeData.videos.title);
            setVideoData2(homeData.videos.description);
            setVideos(homeData.videos.videoUrls);
          }
          console.log(homeData.videos, "response get api hero bgImage");

          if (homeData?.robot) {
            setRobot(homeData.robot);
            setRobotImage(homeData.robot.bgImage);
          }
          if (homeData?.competate) {
            setCompetate(homeData.competate);
            setCompetateImage(homeData.competate.bgImage);
          }
          if (homeData?.runway) {
            setRunway(homeData.runway);
            setRunwayImage(homeData.runway.bgImage);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);
  console.log(videos, "videos");

  // Function to create a new home page
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const hero = { title, description, button, alt };
      console.log(hero, "hero");
      formData.append("hero", JSON.stringify(hero));
      formData.append("advance", JSON.stringify(advance));
      formData.append("toplist", JSON.stringify(toplist));
      formData.append("robot", JSON.stringify(robot));
      formData.append("competate", JSON.stringify(competate));
      formData.append("runway", JSON.stringify(runway));
      const videoMetaData = { title: videoData, description: videoData2 };
      formData.append("videos", JSON.stringify(videoMetaData));

      if (Array.isArray(image)) {
        image.forEach((file) => {
          console.log("Appending file to FormData:", file.name);
          formData.append("heroImage", file);
        });
      }

      if (videos) formData.append("videoPlayer", videos);
      if (advanceImage) formData.append("advanceImage", advanceImage);
      if (toplistImage) formData.append("toplistImage", toplistImage);
      if (robotImage) formData.append("robotImage", robotImage);
      if (competateImage) formData.append("competateImage", competateImage);
      if (runwayImage) formData.append("runwayImage", runwayImage);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/homeRoute`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      toast.success("Home page created successfully!");
      console.log("Create Response:", response.data);
    } catch (error) {
      console.error("Error creating data:", error);
      toast.error("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  // Function to update the existing home page
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!homeId) {
      toast.error("No home page found to update.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      const hero = { title, description, button, alt, link };
      formData.append("hero", JSON.stringify(hero));
      formData.append("advance", JSON.stringify(advance));
      formData.append("toplist", JSON.stringify(toplist));
      formData.append("robot", JSON.stringify(robot));
      formData.append("competate", JSON.stringify(competate));
      formData.append("runway", JSON.stringify(runway));
      const videoMetaData = { title: videoData, description: videoData2 };
      formData.append("videos", JSON.stringify(videoMetaData));

      if (Array.isArray(image)) {
        image.forEach((file) => {
          console.log("Appending file to FormData:", file.name);
          formData.append("heroImage", file);
        });
      }

      if (videos) formData.append("videoPlayer", videos);
      if (advanceImage) formData.append("advanceImage", advanceImage);
      if (toplistImage) formData.append("toplistImage", toplistImage);
      if (robotImage) formData.append("robotImage", robotImage);
      if (competateImage) formData.append("competateImage", competateImage);
      if (runwayImage) formData.append("runwayImage", runwayImage);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/homeupdate/${homeId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      toast.success("Home page updated successfully!");
      console.log("Update Response:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
    } finally {
      setLoading(false);
    }
  };

  console.log(image, "images array");
  console.log(videos, "videos");

  return (
    <div>
      <div className="p-4 border">
        <h1 className="mt-4 mb-12 text-center text-3xl font-semibold">
          Header
        </h1>
        <form>
          <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
            <label
              htmlFor="upload2"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 fill-white stroke-indigo-500"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-600 font-medium">Upload file</span>
              <span className="text-xs text-gray-600">Max Size:20MB</span>
            </label>
            <input
              // onChange={(e) => setImage(Array.from(e.target.files))}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                for (let file of files) {
                  const result = validateFile(file);
                  if (!result.valid) {
                    alert(result.message);
                    return;
                  }
                }
                setImage(files);
              }}
              id="upload2"
              type="file"
              accept="video/*"
              multiple
              className="hidden"
            />
          </div>
          {/* Video Preview */}
          {Array.isArray(image) && image.length > 0 && (
            <div className="mt-4 flex gap-4 flex-wrap">
              {image.map((item, index) => (
                <div key={index} className="relative -z-30">
                  <video
                    src={
                      typeof item === "string"
                        ? item
                        : URL.createObjectURL(item)
                    }
                    controls
                    className="w-36 h-auto"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Text Input Fields */}
          <div className="mt-8">
            <div className="mb-4">
              <h1 className="text-black">ALT TEXT</h1>
              <input
                type="text"
                placeholder="Alt Text"
                className="border border-black px-3 py-2 mt-2 outline-0"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h1 className="text-black">TITLE</h1>
              <input
                type="text"
                placeholder="Title"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4 mt-4">
              <h1 className="text-black">DESCRIPTION</h1>
              <textarea
                placeholder="Description"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h1 className="text-black">BUTTON</h1>
              <input
                type="text"
                placeholder="Button"
                className="border border-black px-3 py-2 mt-2 outline-0"
                value={button}
                onChange={(e) => setButton(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h1 className="text-black">LINK URL</h1>
              <input
                type="text"
                placeholder="link url"
                className="border border-black px-3 py-2 mt-2 outline-0"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* Render other section components */}
      <Advancing
        advance={advance}
        setAdvance={setAdvance}
        advanceImage={advanceImage}
        setAdvanceImage={setAdvanceImage}
      />
      <TopListing
        toplist={toplist}
        setToplist={setToplist}
        toplistImage={toplistImage}
        setToplistImage={setToplistImage}
      />
      <div className="p-4 border mt-10">
        <h1 className="text-black pt-4">You Only Add One Video At A Time</h1>
        <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36 mt-4">
          <label
            htmlFor="videoUpload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-600 font-medium">Upload Videos</span>
            <span className="text-xs text-gray-600">Max Size:20MB</span>
          </label>
          <input
            id="videoUpload"
            type="file"
            name="videoPlayer"
            accept="video/*"
            multiple
            className="hidden"
            // onChange={(e) => setVideos(e.target.files[0])}
            onChange={(e) => {
              const file = e.target.files[0];
              const result = validateFile(file);
              if (!result.valid) {
                alert(result.message);
                return;
              }
              setVideos(file);
            }}
          />
        </div>
        {videos && (
          <div className="mt-4 flex gap-4 flex-wrap">
            <video
              controls
              className="w-64 h-40 object-cover"
              src={
                typeof videos === "string"
                  ? videos
                  : URL.createObjectURL(videos)
              }
            ></video>
          </div>
        )}
        <div className="mb-4 mt-6">
          <h1 className="text-black">TITLE</h1>
          <input
            type="text"
            placeholder="video Title"
            className="border border-black px-3 py-2 mt-2 outline-0 w-full"
            value={videoData}
            onChange={(e) => setVideoData(e.target.value)}
          />
        </div>
        <div className="mb-4 mt-4">
          <h1 className="text-black">DESCRIPTION</h1>
          <textarea
            placeholder="Description"
            className="border border-black px-3 py-2 mt-2 outline-0 w-full"
            value={videoData2}
            onChange={(e) => setVideoData2(e.target.value)}
          />
        </div>
      </div>

      <Robot
        robot={robot}
        setRobot={setRobot}
        robotImage={robotImage}
        setRobotImage={setRobotImage}
      />
      <Competition
        competate={competate}
        setCompetate={setCompetate}
        competateImage={competateImage}
        setCompetateImage={setCompetateImage}
      />
      <Runway
        runway={runway}
        setRunway={setRunway}
        runwayImage={runwayImage}
        setRunwayImage={setRunwayImage}
      />
      <div className="flex justify-end mt-8 mb-8">
        {homeId ? (
          <button
            onClick={handleUpdate}
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white px-12 py-2 rounded-sm"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        ) : (
          <button
            onClick={handleCreate}
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-800 cursor-pointer text-white px-12 py-2 rounded-sm"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
