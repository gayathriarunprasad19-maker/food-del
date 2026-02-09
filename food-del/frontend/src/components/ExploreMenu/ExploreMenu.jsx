import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';
import { Link, useLocation } from 'react-router-dom';

const ExploreMenu = () => {

  const { menu_list } = useContext(StoreContext);
  const location = useLocation();

  // get current category from URL
  const currentCategory = location.pathname.startsWith('/menu/')
    ? location.pathname.split('/')[2]
    : "all";

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>

      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes.
        Our mission is to satisfy your cravings and elevate your dining
        experience, one delicious meal at a time.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          const category = item.menu_name.toLowerCase();

          return (
            <Link
              to={`/menu/${category}`}
              key={index}
              className='explore-menu-list-item'
            >
              <img
                src={item.menu_image}
                className={currentCategory === category ? "active" : ""}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </Link>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;

