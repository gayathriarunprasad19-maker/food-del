import React from "react";
import { useParams } from "react-router-dom";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const MenuCategory = () => {
  const { category } = useParams();

  return (
    <div style={{ marginTop: "120px", padding: "0 5%" }}>
      <h1 style={{ textAlign: "center", textTransform: "capitalize" }}>
        {category}
      </h1>

      <FoodDisplay category={category} />
    </div>
  );
};

export default MenuCategory;
