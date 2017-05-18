import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>
  <main>
    <Link className="home-login" to="/spaces">Login</Link>
  </main>

export default Home;
