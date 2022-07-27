import React, { useState } from "react";

const PlantCard = ({id, name, image, price, handleRemovePlant}) => {
  const [isInStock, setIsInStock] = useState(true)
  const [updatePrice, setUpdatePrice] = useState(price)

  const handleIsInStock = () => {
    setIsInStock((isInStock) => !isInStock)
  }

  const handleRemoveClick = async () => {
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
    handleRemovePlant(id)
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
      <button onClick={handleRemoveClick}>Delete</button>
    </li>
  );
}

export default PlantCard;
