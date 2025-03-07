import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './../context/AppContext';

const Dashboard = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="favorites">
        <h3>Go to the items list Page:</h3>
        <ul>
          {favorites.map((item) => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/list">
        <button>Go to List Items Page</button>
      </Link>
    </div>
  );
};

export default Dashboard;
