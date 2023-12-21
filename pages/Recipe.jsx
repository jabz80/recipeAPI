import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {motion} from 'framer-motion';


const apiKey = import.meta.env.VITE_API_KEY;


function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [error, setError] = useState(null); 
  let params = useParams();

  const fetchDetails = async () => {
    try {
      const recipeCache = localStorage.getItem(`recipe_${params.name}`);
      if (recipeCache) {
        setDetails(JSON.parse(recipeCache));
      } else {
        const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const detailData = await response.json();
        localStorage.setItem(`recipe_${params.name}`, JSON.stringify(detailData));
        setDetails(detailData);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recipe details:', err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <motion.div className='recipe-section'
    animate={{ opacity: 1 }}
      initial={{ opacity: 0} }
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='info-section'>
        <div className='info-left'>
          <img src={details.image} alt={details.title} />
        </div>
          <div className='info-right'>
            <h2>{details.title}</h2>
            <div className="button-container">
                <button
                  className={activeTab === 'instructions' ? 'active' : ''}
                  onClick={() => setActiveTab("instructions")}
                >
                  <span>
                  Instructions
                  </span>
                </button>
                <button 
                  className={activeTab === 'ingredients' ? 'active' : ''}
                  onClick={() => setActiveTab("ingredients")}
                >
                  <span>
                  Ingredients
                  </span>
                </button>
            </div>
          </div>
      </div>  

      <div className='details-section'>
      
        {/* if instructions is clicked then render below */}
          {activeTab === "instructions" && (
            <div>
              {/* parse data that has html embedded inside */}
              <p dangerouslySetInnerHTML={{__html: details.summary}}></p> 
              <br />
              <br />
              <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
            </div>
            )}

          {/* if ingredients is clicked then render below */}
            {activeTab === "ingredients" && (
              <ul>
                {details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            )}

      </div>
    </motion.div>
  )
}

      
const DetailsWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  margin-left: 4rem;
  margin-right: 4rem;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    color: white;
  }

  ul {
    margin-top: 2rem;
  }
`;


export default Recipe
        

