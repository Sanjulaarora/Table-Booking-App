"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Link from "next/link";
import BookingSummary from "@/components/booking-summary";

const ReservationForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    numberOfGuests: "",
    customerName: "",
    customerNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);


  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date) => {
    setLoading(true);

    try {
      const res = await axios.get(`https://backend-table-booking-app.onrender.com//available-slots`, {
        params: { date: date.toISOString().split("T")[0] },
      });
      setAvailableSlots(res.data?.availableSlots);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedSlot) {
      alert("Please select a time slot before submitting.");
      return;
    }
  
    try {
      const res = await fetch("https://backend-table-booking-app.onrender.com/post-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateTime: selectedSlot,
          numberOfGuests: formData.numberOfGuests,
          customerName: formData.customerName,
          customerNumber: formData.customerNumber,
        }),
      });
  
      if (res.ok) {
        const responseData = await res.json();
        setReservationDetails({
          dateTime: selectedSlot,
          numberOfGuests: formData.numberOfGuests,
          customerName: formData.customerName,
          customerNumber: formData.customerNumber,
        });
        setIsBookingConfirmed(true);
      } else if (res.status === 422) {
        const data = await res.json();
        alert(data.message || "Booking failed. Please try again.");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred while submitting your booking. Please try again later.");
    }
  };

  return (
    <div>
      {isBookingConfirmed ? (
        <BookingSummary reservationDetails={reservationDetails} />
      ) : (
        <div className="max-w-lg mx-auto p-6 bg-white">
          <div className="max-w-lg mx-auto p-6 bg-white">
            <Link href={"/"}>
              <p className="hover:text-amber-600 hover:underline mt-8 text-xs media769:text-sm">Back to Home</p>
            </Link>
            <h2 className="text-lg media769:text-2xl font-bold text-center text-gray-800 mt-4">
              Make a Reservation
            </h2>

            {/* Date Picker */}
            <div className="mt-6">
            <h4 className="text-sm media769:text-lg font-semibold text-gray-700">Select a Date:</h4>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="border rounded-md mt-2"
              />
            </div>

            {/* Available Slots */}
            {selectedDate && (
              <div className="mt-6">
                <h4 className="text-sm media769:text-lg font-semibold text-gray-700">
                  Available Slots:
                </h4>
                {loading ? (
                  <p className="text-gray-500 mt-2">Loading slots...</p>
                ) : availableSlots.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        className={`px-2 media769:px-4 py-1 media769:py-2 border rounded-lg text-[10px] media769:text-sm ${
                          selectedSlot === slot
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        } hover:bg-amber-100`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {new Date(slot).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500 mt-2">No available slots for the selected date.</p>
                )}
              </div>
            )}

            {/* Booking Form */}
            {selectedSlot && (
              <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs media769:text-sm font-medium text-gray-700">
                    Number of Guests:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.numberOfGuests}
                    onChange={(e) =>
                      setFormData({ ...formData, numberOfGuests: e.target.value })
                    }
                    className="mt-1 block w-full text-sm media769:text-base px-[6px] media769:px-3 py-1 media769:py-2 border rounded-md shadow-sm focus:ring-amber-600 focus:border-amber-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs media769:text-sm font-medium text-gray-700">Your Name:</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="mt-1 block w-full text-sm media769:text-base px-[6px] media769:px-3 py-1 media769:py-2 border rounded-md shadow-sm focus:ring-amber-600 focus:border-amber-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs media769:text-sm font-medium text-gray-700">
                    Your Mobile Number:
                  </label>
                  <input
                    type="text"
                    minLength="10"
                    maxLength="10"
                    value={formData.customerNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, customerNumber: e.target.value })
                    }
                    className="mt-1 block w-full text-sm media769:text-base px-[6px] media769:px-3 py-1 media769:py-2 border rounded-md shadow-sm focus:ring-amber-600 focus:border-amber-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white text-sm media769:text-base px-2 media769:px-4 py-1 media769:py-2 rounded-lg shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  Confirm Booking
                </button>
              </form>
            )}
         </div>
       </div>
      )}
    </div>
  );
};

export default ReservationForm;
