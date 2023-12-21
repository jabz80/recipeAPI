import React from 'react';
import Pages from '../pages/Pages';
import Category from '../components/Category';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

function App() {

  return (
    <>
    <BrowserRouter>
      <Category />
      <Pages />
    </BrowserRouter>
    <Footer />
    </>
  )
}



export default App
