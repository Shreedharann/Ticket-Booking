import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-5 ">
      <p>
        © {new Date().getFullYear()} Bus Ticket Booking. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
