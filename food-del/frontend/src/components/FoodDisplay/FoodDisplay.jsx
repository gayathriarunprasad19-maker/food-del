import React, { useContext } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext);

  // filter foods based on category
  const filteredFoods = food_list.filter(item =>
    category === "all" ||
    item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="food-display">
      <div className="food-display-list">
        {filteredFoods.map(item => (
          <FoodItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
