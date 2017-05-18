import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>
  <main>
    <div className="home__login">
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <Link to="/spaces">
        <button className="login-button">Log in</button>
      </Link>
    </div>
  </main>

export default Home;
