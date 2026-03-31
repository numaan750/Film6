import { validateFile } from "@/utils/fileValidation";
import React from "react";

const FestivalCards = ({
  cards,
  mainTitle,
  setMainTitle,
  showCardPopup,
  setShowCardPopup,
  popupIndex,
  tempCard,
  setTempCard,
  openCardPopup,
  saveCard,
}) => {
  return (
    <div className="border p-4 mt-12">
      <div className="my-6">
        <h1 className="text-center text-3xl pb-3">Data For Awards</h1>
        <label className="block mb-2">Main Title</label>
        <input
          type="text"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          className="border px-3 py-2 w-full"
        />
        <h3 className="mt-4 text-red-600">
          Kindly Click to the input for editing Awards data
        </h3>
        <div className="mt-2 grid max-sm:grid-cols-1 grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="border p-2">
              <button
                type="button"
                onClick={() => openCardPopup(idx)}
                className="w-full text-left"
              >
                {cards[idx]?.title || `Add Card ${idx + 1}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showCardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="mb-4 text-xl">Edit Card {popupIndex + 1}</h2>
            <div className="mb-2">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                value={tempCard.title}
                onChange={(e) =>
                  setTempCard({ ...tempCard, title: e.target.value })
                }
                className="border px-3 py-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Description</label>
              <textarea
                value={tempCard.description}
                onChange={(e) =>
                  setTempCard({ ...tempCard, description: e.target.value })
                }
                className="border px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              {/* <label className='block mb-1'>Image</label>
              <input
                type='file'
                onChange={(e) =>
                  setTempCard({ ...tempCard, image: e.target.files[0] })
                }
              /> */}
              <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
                <label
                  htmlFor="upload56"
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
                  type="file"
                  // onChange={(e) =>
                  //   setTempCard({ ...tempCard, image: e.target.files[0] })
                  // }
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const result = validateFile(file);
                    if (!result.valid) {
                      alert(result.message);
                      return;
                    }
                    setTempCard({ ...tempCard, image: file });
                  }}
                  id="upload56"
                  accept="image/*,video/*"
                  className="hidden"
                />
              </div>
              {tempCard.image && (
                <img
                  src={
                    typeof tempCard.image === "string"
                      ? tempCard.image
                      : URL.createObjectURL(tempCard.image)
                  }
                  alt="Preview"
                  className="mt-2 h-24"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCardPopup(false)}
                className="px-4 py-2 cursor-pointer "
              >
                Cancel
              </button>
              <button
                onClick={saveCard}
                className="bg-blue-600 text-white px-4 py-2 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FestivalCards;
