import React from "react";
import { Typography, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import heroImage from "../assets/heroimage.jpg";

const HeroSection = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        color: "white",
      }}
    >
    
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          zIndex: 2,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          maxWidth: "90%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            lineHeight: "1.2",
            marginBottom: "12px",
          }}
        >
          Taste the World on Your Plate!
        </Typography>

        <Typography
          variant="body1"
          style={{
            fontSize: "1rem",
            marginBottom: "16px",
            opacity: 0.9,
          }}
        >
          Explore trending recipes, quick bites, and delicious flavors. Find your next favorite dish today!
        </Typography>

        <Button
          variant="contained"
          color="warning"
          endIcon={<FaArrowRight />}
          style={{
            fontSize: "1rem",
            padding: "12px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
