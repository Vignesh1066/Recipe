import React from 'react';
import { Typography } from '@mui/material';
import heroImage from '../assets/heroimage.jpg';

const HeroSection = () => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: '20px',
        margin: '0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      ></div>

      <div style={{ zIndex: 2 }}>
        <Typography variant="h3" component="h1" className="font-bold text-4xl md:text-6xl mb-4">
          Discover Delicious Recipes
        </Typography>
        <Typography variant="h5" component="p" className="mb-6">
          Explore hundreds of mouthwatering recipes from around the world. Find your next favorite dish!
        </Typography>
      </div>
    </div>
  );
};

export default HeroSection;
