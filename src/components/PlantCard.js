import React, { useState } from "react";

// TAKE PROPS AS PARAMETERS, USE TO RENDER THINGS THAT ALREADY EXIST
// THAT'S IT FOR DELIVERABLE ONE * JUMP TO PLANTPAGE *

// THIS IS FOR DELIVERABLE 3:
// I CAN MARK A PLANT AS SOLD OUT

// THIS IS FOR EXTRA DELIVERABLES: HANDLER FUNCTIONS
const PlantCard = ({id, name, image, price, handleRemovePlant, handleUpdatePlant}) => {
  // SOUNDS LIKE WE NEED SOME STATE
  const [isInStock, setIsInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState(price)

  // make a handler function to toggle the state
  const handleToggleStock = () => {
    setIsInStock(isInStock => !isInStock)
  }

  // make a handler function for the delete button for adv deliverable 1
  // method needs to be delete, endpoint should use the id that is passed to this PlantCard
  // in the props
  const handleDelete = async () => {
    console.log('id', id)
    await fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(handleRemovePlant(id))
  }

  // Rather than patching based on a change listener I am using a submit event, this seems like the better UI
  // choice, no?
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
    <li className="card" id={id}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? ( // track the boolean state and give call the handler functions on click 
        <button onClick={handleToggleStock} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      {/* made a delete button */}
      <button onClick={handleDelete}>Delete</button>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmitPrice()
      }}>
      {/* made an entire form for the damn price */}
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
    </li>
  );
}

// that's deliverable 3, * JUMP TO PLANTPAGE *

export default PlantCard;
