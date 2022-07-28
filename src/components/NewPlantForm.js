// IMPORT USE STATE OR ELSE
import React, { useState } from "react";

// this is for the form and state.
const defaultPlant = {
  name: '',
  image: '',
  price: '',
}

// ADD THE PROP WE PASSED
function NewPlantForm({handleAddPlant}) {
  // newPlant is an object we'll store in state. Something something controlled components.
  const [newPlant, setNewPlant] = useState(defaultPlant)

  // need an event handler that will FETCH on SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant) // we pass in newPlant whose values are derived from form changes
    })
    .then(req => req.json()) // then, to render in the DOM, we take the result of the promise 
    .then(res => {
      handleAddPlant(res) // and use our handler function to add a new plant
      setNewPlant(defaultPlant) // then we reset the form to default values
    })
  }
  
  // next, we need a handler function for change events that will occur in the input fields of the form
  // since we're using an OBJECT to store values in state, we use this cool notation to update an object's
  // existing properties: {...object, [key]: 'new value'} and we refer to the keys using the input name attributes
  // if you really wanted to, you could make 3 handler functions and 3 states. 


  const handleChange = (e) => {
    setNewPlant({...newPlant,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      {/* the form gets the handleSubmit function */}
      <form onSubmit={handleSubmit}> 
        <input 
          type="text" 
          name="name" 
          placeholder="Plant name" 
          value={newPlant.name}
          onChange={handleChange}
        />
        {/* each input gets a value based on state and a handleChange function */}
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={newPlant.image}
          onChange={handleChange}
        />
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="Price" 
          value={newPlant.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

// I have a blurb about controlled components in my intro-to-react repo, and there's plenty to read out there
// in the official docs and canvas. As long as it makes enough sense to replicate, we're good.
// That is ALL of deliverable 2. It persists. It renders. * JUMP TO PLANTPAGE *

export default NewPlantForm;
