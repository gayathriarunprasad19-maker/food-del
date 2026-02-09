import React from "react";
import { useParams } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "120px", textAlign: "center" }}>
      <h1>Food Details Page</h1>
      <p>Food ID: {id}</p>
    </div>
  );
};

export default FoodDetails;
