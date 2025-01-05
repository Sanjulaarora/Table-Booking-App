"use client";

import React from "react";

const BookingSummary = ({ reservationDetails }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white">
      <h2 className="text-lg media769:text-2xl font-bold text-center text-gray-800 mb-4 mt-8">
        Booking Confirmed!
      </h2>
      <p className="text-gray-700 text-center">
        Thank you for your reservation. Below are your booking details:
      </p>
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <h4 className="text-sm media769:text-lg font-semibold text-gray-700">Reservation Details:</h4>
        <div className="mt-2 text-sm media769:text-base text-gray-800">
          <span className="font-bold">Date:</span> {new Date(reservationDetails.dateTime).toLocaleDateString()}
        </div>
        <div className="mt-2 text-sm media769:text-base text-gray-800">
          <span className="font-bold">Time:</span> {new Date(reservationDetails.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="mt-2 text-sm media769:text-base text-gray-800">
          <span className="font-bold">Number of Guests:</span> {reservationDetails.numberOfGuests}
        </div>
        <div className="mt-2 text-sm media769:text-base text-gray-800">
          <span className="font-bold">Customer Name:</span> {reservationDetails.customerName}
        </div>
        <div className="mt-2 text-sm media769:text-base text-gray-800">
          <span className="font-bold">Contact Number:</span> {reservationDetails.customerNumber}
        </div>
      </div>
      <button
        className="mt-6 w-full bg-amber-600 text-white text-sm media769:text-base px-2 media769:px-4 py-1 media769:py-2 rounded-lg shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
        onClick={() => window.location.reload()}
      >
        Make Another Booking
      </button>
    </div>
  );
};

export default BookingSummary;
