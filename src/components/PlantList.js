import React from "react";
import PlantCard from "./PlantCard";

const PlantList = ({plants, handleRemovePlant, handleUpdatePlant}) => {
  return (
    <ul className="cards">
      {plants.map((element, index) => {
        const { id, name, image, price } = element
        return (
          <PlantCard 
            key={index} 
            id={id}
            name={name} 
            image={image} 
            price={price}
            handleRemovePlant={handleRemovePlant}
            handleUpdatePlant={handleUpdatePlant} 
          />
        )
      })}
      </ul>
  );
}

export default PlantList;
