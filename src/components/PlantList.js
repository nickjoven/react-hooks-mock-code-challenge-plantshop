import React from "react";
import PlantCard from "./PlantCard";

// include passed prop in parameter
const PlantList = ({plants}) => {
  return (
    <ul className="cards">
      {/* render PlantCards components in here 
       we have an array. We will .map over the array and return <PlantCard */}
       {plants.map((element, index) => {
         const { id, name, image, price } = element
        return (
          <PlantCard 
            key={index}
            id={id}
            name={name}
            image={image}
            price={price}
          />
        )
       })}
      
    </ul>
  );
}

export default PlantList;
