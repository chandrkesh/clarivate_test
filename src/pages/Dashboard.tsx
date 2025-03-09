import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './../context/AppContext';

const Dashboard = () => {
  const { favorites } = useContext(AppContext);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Link to="/list">
        <button>Go to List Page</button>
      </Link>
      <div className="favorites">
        <h3>List Of The Favorites</h3>
        <ul className='fav_ul'>
          {favorites.map((item) => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Dashboard;
