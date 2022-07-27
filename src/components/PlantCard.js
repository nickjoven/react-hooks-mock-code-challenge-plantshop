import React, { useState } from "react";

const PlantCard = ({name, image, price}) => {
  const [isInStock, setIsInStock] = useState(true)

  const handleIsInStock = () => {
    setIsInStock((isInStock) => !isInStock)
  }
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleIsInStock} className="primary">In Stock</button>
      ) : (
        <button onClick={handleIsInStock}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
