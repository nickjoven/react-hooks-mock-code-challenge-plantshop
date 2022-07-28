import React, { useState } from "react";

const PlantCard = ({ id, name, image, price, onRemovePlant, onUpdatePlant }) => {
  const [isInStock, setIsInStock] = useState(true)
  const [newPrice, setNewPrice] = useState(price)

  const handleToggleStock = () => {
    setIsInStock(isInStock => !isInStock)
  }

  const handleClickRemove = async () => {
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(onRemovePlant(id))
  }

  const handleSubmitPrice = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"price": newPrice})
    })
    .then(req => req.json())
    .then(res=> {
      onUpdatePlant(res)
    })
  }

  const handleChangePrice = (e) => {
    setNewPrice(e.target.value)
  }


  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button onClick={handleToggleStock} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <form onSubmit={handleSubmitPrice}>
        <input
        type="number"
        name="newPrice"
        step="0.01"
        placeholder="Price"
        value={newPrice}
        onChange={handleChangePrice}
        />
        <button onClick={handleClickRemove}>Delete</button>
        <button type='submit'>Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
