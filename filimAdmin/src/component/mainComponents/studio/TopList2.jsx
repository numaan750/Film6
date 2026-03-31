"use client";
import { validateFile } from "@/utils/fileValidation";
import React from "react";

const TopList2 = ({
  toplist3,
  setToplist3,
  toplist3Image,
  setToplist3Image,
}) => {
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setToplist3((data) => ({ ...data, [name]: value }));
  };

  console.log(toplist3, "toplist3");
  console.log(toplist3Image, "toplist3Image");

  return (
    <div>
      <div className="p-4 border mt-12">
        <h1 className="mt-4 mb-12 text-center text-3xl font-semibold">
          SECTION 6
        </h1>
        <form>
          {/* File Upload Section */}
          <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
            <label
              htmlFor="upload15"
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
              <span className="text-xs text-gray-600">Max Size:5MB</span>
            </label>
            <input
              // onChange={(e) => setToplist3Image(e.target.files[0])}
              onChange={(e) => {
                const file = e.target.files[0];
                const result = validateFile(file);
                if (!result.valid) {
                  alert(result.message);
                  return;
                }
                setToplist3Image(file);
              }}
              id="upload15"
              type="file"
              accept="image/*,video/*"
              className="hidden"
            />
          </div>
          {/* Image Preview */}
          {toplist3Image && (
            <div className="mt-4">
              <img
                src={
                  typeof toplist3Image === "string"
                    ? toplist3Image
                    : URL.createObjectURL(toplist3Image)
                }
                alt="Preview"
                className="w-36 h-auto"
              />
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
                value={toplist3.alt}
                onChange={onChangeHandler}
                name="alt"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-black">TITLE</h1>
              <input
                type="text"
                placeholder="Title"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={toplist3.title}
                onChange={onChangeHandler}
                name="title"
              />
            </div>
            <div className="mb-4 mt-4">
              <h1 className="text-black">GENRE</h1>
              <input
                placeholder="genre"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={toplist3.genre}
                onChange={onChangeHandler}
                name="genre"
              />
            </div>
            <div className="mb-4 mt-4">
              <h1 className="text-black">LOGLINE</h1>
              <input
                placeholder="genre"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={toplist3.line}
                onChange={onChangeHandler}
                name="line"
              />
            </div>
            <div className="mb-4 mt-4">
              <h1 className="text-black">DESCRIPTION</h1>
              <textarea
                placeholder="Description"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={toplist3.description}
                onChange={onChangeHandler}
                name="description"
              />
            </div>
            <div className="mb-4 mt-4">
              <h1 className="text-black">DESCRIPTION TWO</h1>
              <textarea
                placeholder="Description Two"
                className="border border-black px-3 py-2 mt-2 outline-0 w-full"
                value={toplist3.description2}
                onChange={onChangeHandler}
                name="description2"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-black">BUTTON</h1>
              <input
                type="text"
                placeholder="Button"
                className="border border-black px-3 py-2 mt-2 outline-0"
                value={toplist3.button}
                onChange={onChangeHandler}
                name="button"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-black">LINK URL</h1>
              <input
                type="text"
                placeholder="link url"
                className="border border-black px-3 py-2 mt-2 outline-0"
                value={toplist3.link}
                onChange={onChangeHandler}
                name="link"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopList2;
