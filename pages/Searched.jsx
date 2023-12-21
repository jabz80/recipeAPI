import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {motion} from 'framer-motion';


const apiKey = import.meta.env.VITE_API_KEY;

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [error, setError] = useState(null); 
  let params = useParams();

  const getSearched = async (name) => {
    try {
      const cachedSearch = localStorage.getItem(`search_${name}`);
      if (cachedSearch) {
        setSearchedRecipes(JSON.parse(cachedSearch));
      } else {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const recipes = await response.json();
        localStorage.setItem(`search_${name}`, JSON.stringify(recipes.results));
        setSearchedRecipes(recipes.results);
      }
    } catch (err) {
      setError(err.message); 
      console.error('Error fetching search results:', err);
    }
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <Grid
    animate={{ opacity: 1 }}
      initial={{ opacity: 0} }
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {searchedRecipes.slice(0, 9).map((item) => {
        return(
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

  h4{
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched