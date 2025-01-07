# Restaurant Table Booking System - Frontend

This is the frontend application for the **Restaurant Table Booking System**, developed using **Next.js**. The application allows users to reserve a table at the restaurant, view available time slots, and confirm their booking.

## Features

- **Booking Form**: Allows users to input reservation details (date, time, number of guests, name, and contact).
- **Availability Display**: Displays available time slots based on the selected date and time.
- **Booking Summary**: Displays a confirmation page after successful booking with the reservation details.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Calendar View**: Visual selection of available dates and time slots.

## Technologies Used

- **Next.js**: Framework for building the frontend.
- **React**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Axios**: HTTP client for making API requests.
- **Date-FNS**: Library for date and time manipulation (if applicable).

## Installation

To get started with the project, clone the repository and install the necessary dependencies:

```bash
# Clone the repository
git clone <repository_url>

# Navigate to the project directory
cd <project_directory>

# Install the dependencies
npm install
```

## Running development server

```bash
npm run dev
```

This will start the Next.js development server on [http://localhost:3000](http://localhost:3000) Open this URL in your browser to view the application.

## Features Breakdown

### Booking Form

- Users can input:

- Date and time for the reservation.
- Number of guests.
- Name and contact details.

- The form validates the inputs to ensure proper data entry.

### Availability Display

- Shows available time slots based on the selected date and time.
- Prevents double bookings by checking the backend availability.

### Booking Confirmation

- After a successful booking, the system displays a confirmation message and a summary of the reservation details.

### Calendar View (Bonus)

- Users can select a date and time visually from a calendar or timeline view, simplifying the booking process.

## Deployment

You can view the live version of this project using [Table Booking App Live Link](https://table-booking-app-inky.vercel.app/).

## API Integration

- Fetch available time slots based on the selected date.
- Submit booking details to create a reservation.

## Contributing

If you'd like to contribute to this project, please fork the repository, create a new branch, and submit a pull request with your changes.
