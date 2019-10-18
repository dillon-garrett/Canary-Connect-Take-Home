import React from 'react';
import MainContainer from './containers/MainContainer';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <section id="app">
      <Header />
      <hr />
      <MainContainer />
      <Footer />
    </section>
  );
};

export default App;
