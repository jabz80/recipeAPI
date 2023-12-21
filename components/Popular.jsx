import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide'; //used for carousel
import '@splidejs/react-splide/css'; //used for the carousel
import { Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_KEY;

function Popular() {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const cachedPopular = localStorage.getItem('popularRecipes');
      if (cachedPopular) {
        setPopular(JSON.parse(cachedPopular));
      } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`);
        if (!api.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await api.json();
        localStorage.setItem('popularRecipes', JSON.stringify(data.recipes));
        setPopular(data.recipes);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching the popular recipes:', err);
    }
  };


    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div className='popular-page'>
          <Wrapper>
            <div>
              <h3 className='heading-line'><span>Browse our most popular recipes</span></h3>
            </div>
            <Splide options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: 'free',
              gap: "1.5rem",
            }}>
            {popular.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title}/>
                  <Gradient />
                  </Link>
                </Card>
                </SplideSlide>
              )
            })}
            </Splide>
          </Wrapper>
    </div>
  )
};

const Wrapper = styled.div`
   margin: rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  overflow: hidden;
  position: relative;
  border-radius: 5px;

  img{
  border-radius: 5px;
  position: absolute;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.1); 
  }

  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Popular;