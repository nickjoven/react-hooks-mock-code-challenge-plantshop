import React, { useState } from "react";

const PlantCard = ({ id, name, image, price, handleRemovePlant, handleUpdatePlant }) => {
  const [isInStock, setIsInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState(price)

  const handleIsInStock = () => {
    setIsInStock((isInStock) => !isInStock)
  }

  const handleRemoveClick = async () => {
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    handleRemovePlant(id)
  }

  const handleSubmitPrice = async () => {
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: updatedPrice })
    })
      .then(req => req.json())
      .then((res => {
        handleUpdatePlant(res)
      }))
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
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmitPrice()
      }}>
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={updatedPrice}
          onChange={(e) => {
            setUpdatedPrice(e.target.value)
          }}
        />
        <input
          type='submit'
          value='Update Price'
        />
      </form>
      <button onClick={handleRemoveClick}>Delete</button>
    </li>
  );
}

export default PlantCard;