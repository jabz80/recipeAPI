import React, {useState} from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + input)
    }


  return (
    <FormStyle>
        <form onSubmit={submitHandler}>
            <div>
                <FaSearch></FaSearch>
                <input 
                onChange={(e) => setInput(e.target.value)} // get value of input.
                type='text' 
                value={input} 
                placeholder='Search your favorite dish'
                />
            </div>
        </form>
    </FormStyle>
  )
}



const FormStyle = styled.div`
    margin: 3rem;
    display: flex;
    justify-content: center;

    div {
        position: relative;
        width: 500px;

    }

    input {
        border: 1px solid #ffff;
        font-size: 1rem;
        color: black;
        padding: 0.5rem 0.5rem;
        border-radius: 1rem;
        outline: none;
        width: 100%;
        text-align: center;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    }
    svg{
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: rgb(26, 153, 87);
    }
`;

export default Search
