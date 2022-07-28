import React, { useState } from "react";

const PlantCard = ({id, name, image, price, handleRemovePlant, handleUpdatePlant}) => {
  const [isInStock, setIsInStock] = useState(true)
  const [newPrice, setNewPrice] = useState(price)

  const handleStockToggle = () => {
    setIsInStock(isInStock => !isInStock)
  }

  const handleDeleteClick = async () => {
    // console.log(id)
    // console.log(`http://localhost:6001/plants/${id}`)
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(handleRemovePlant(id))
  }

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value)
  }

  const handleNewPrice = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({price: newPrice})
    })
    .then(req => req.json())
    .then(res => {
      handleUpdatePlant(res)
    })
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleStockToggle} className="primary">In Stock</button>
      ) : (
        <button onClick={handleStockToggle} >Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Remove</button>
      <form onSubmit={handleNewPrice}>
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={newPrice}
          onChange={handlePriceChange}
          />
        <input type='submit' value='Update Price' />
      </form>
    </li>
  );
}

export default PlantCard;
