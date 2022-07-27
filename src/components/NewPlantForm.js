import React, { useState } from "react";

const defaultFormValues = {
  name: '',
  image: '',
  price: '',
}
const NewPlantForm = ({handleNewPlant}) => {
  const [formData, setFormData] = useState(defaultFormValues)

  const handleSubmit = async () => {
    await fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(req => req.json())
    .then(newPlant => {
      handleNewPlant(newPlant)
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleNewPlant(formData)
        handleSubmit()
        setFormData(defaultFormValues)
      }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          value={formData.name}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={formData.image}
          onChange={handleChange} 
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          value={formData.price}
          onChange={handleChange} 
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
