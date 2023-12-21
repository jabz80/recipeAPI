import React from 'react';
import Veggie from '../components/Veggie';
import Popular from '../components/Popular';
import {motion} from 'framer-motion';
import  Search  from '../components/Search';
import backgroundImage from '/anna-pelzer-IGfIGP5ONV0-unsplash.jpg'
import secondBackgroundImage from '/ella-olsson-KPDbRyFOTnE-unsplash.jpg'

export default function Home() {
  return (
    <motion.div
    animate={{ opacity: 1 }}
      initial={{ opacity: 0} }
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
         <div className="hero-section">
            <div className="hero-content">
              <div className="hero-images">
                <div className="hero-image">
                  <img src={backgroundImage} alt="Delicious Food" />
                </div>
                <div className="hero-image">
                  <img src={secondBackgroundImage} alt="Delicious Food" />
                </div>
              </div>
              <div className="hero-overlay">
                <div className="hero-text">
                  <h1>THE BEST</h1>
                  <h1 className='green-text'>MEAL PLANS AND RECIPES</h1>
                  <p>Find the best recipes for fresh vegetables and popular dishes.</p>
                  <Search />
                </div>
              </div>
            </div>
          </div>
      <div className='intro-text'>
          <p>Welcome to our website dedicated to delicious and healthy meals! Explore a wide range of recipes that feature fresh vegetables and popular dishes. Whether you're a seasoned chef or just starting your culinary journey, our collection of meal plans and recipes is here to inspire and satisfy your taste buds. From quick and easy weekday dinners to gourmet weekend feasts, you'll find something for every occasion. Join us in discovering the joy of cooking and savoring delightful flavors.</p>
      </div>
      <Veggie />
      <Popular />
    </motion.div>
  )
};
