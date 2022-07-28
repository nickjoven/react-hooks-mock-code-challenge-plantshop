import React, { useState } from "react";

// Default Plant Object
const defaultPlant = {
  name: '',
  image: '',
  price: '',
}
const NewPlantForm = ({ handleAddPlant }) => {
  const [newPlant, setNewPlant] = useState(defaultPlant)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant) // adds to db
    })
    .then(req => req.json())
    .then(res => {
      handleAddPlant(res)
      setNewPlant(defaultPlant)
    })
  }

  const handleFormChange = (e) => {
    setNewPlant({
      ...newPlant,
      [e.target.name]: e.target.value
    })
    // console.log(newPlant)
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          onChange={handleFormChange}
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          onChange={handleFormChange}
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          onChange={handleFormChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
