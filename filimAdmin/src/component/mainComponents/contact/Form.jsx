"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data using async/await
  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/form/getform`,
      );
      setForms(response.data.forms);
    } catch (err) {
      console.error("Error fetching forms:", err);
      setError("Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );

  return (
    <div className=" mb-12 mt-24 min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Form Submissions
        </h1>
        <div className=" mt-24 grid gap-8 md:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-lg shadow-lg p-6 transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">FirstName:</span>{" "}
                  {form.firstName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">LastName:</span>{" "}
                  {form.lastName}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Topic:</span> {form.topic}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {form.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone:</span> {form.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Salon Name:</span>{" "}
                  {form.salonName}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">Order Number:</span>{" "}
                  {form.orderNumber}
                </p>

                <div className="">
                  <p className="text-gray-700">
                    <span className="font-semibold">Message:</span>{" "}
                    {form.message}
                  </p>{" "}
                </div>
                {/* space-y-2 closing div se pehle ye add karo: */}
                <div className="border-t pt-2 mt-2">
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Date:</span>{" "}
                    {form.createdAt
                      ? new Date(form.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Time:</span>{" "}
                    {form.createdAt
                      ? new Date(form.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
