import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="notfound-wrapper">
      <div className="notfound-container">
        <img
          src="/src/assets/Images/404.webp"
          alt="404 Not Found"
          className="notfound-image"
        />

        <h1>Oops! Page Not Found</h1>

        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>

        <button
          className="notfound-btn"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </div>
    </section>
  );
};

export default Error;
