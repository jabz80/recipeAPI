import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_KEY;


function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [error, setError] = useState(null);
  let params = useParams();

  const getCuisine = async (name) => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`
      );
      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
      const recipes = await data.json();
      localStorage.setItem(`cuisine_${name}`, JSON.stringify(recipes.results)); // Store data with a key specific to the cuisine type
      setCuisine(recipes.results);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const checkCuisine = localStorage.getItem(`cuisine_${params.type}`);

    if (checkCuisine) {
      setCuisine(JSON.parse(checkCuisine));
    } else {
      getCuisine(params.type);
      console.log('new fetch call made for cuisine')
    }
  }, [params.type]);

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <Grid
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    >
      {cuisine.slice(0, 9).map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 8rem;
  `;

  const Card = styled.div`
    img {
      width: 100%;
      border-radius: 5px;
      transition: transform 0.3s ease;
    }

    img:hover {
      transform: scale(1.1); 
    }

    a {
      text-decoration: none;
    }

    h4 {
      text-align: center;
      padding: 1rem;
    }


  `;


export default Cuisine