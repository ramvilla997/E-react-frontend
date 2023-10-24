import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import Skincancerml from './screens/skincancerml';
import Header from './components/Header-new';
import Footer from './components/footer-new';
import Kidney_stone_ml from './screens/eir_kidney_stone_checker';
import Cdkml from './screens/eir_kidney_cdk_checker';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/searchpatient" element={<Searchpatient />} />
        <Route path="/skincancerml" element={<Skincancerml />} />
        <Route path="/kidneystoneml" element={<Kidney_stone_ml />} />
        <Route path="/cdkml" element={ <Cdkml />}/>
        <Route path="/Searchresult" element={<Searchresult />} />
        <Route path="/DBConnection" element={<DBConnection />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


