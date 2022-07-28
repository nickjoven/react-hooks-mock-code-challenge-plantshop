import React from "react";
import PlantCard from "./PlantCard";

const PlantList = ({ plants, handleUpdatePlant, handleRemovePlant }) => {
  
  return (
    <ul className="cards">
      {plants.map((element, index) => {
        const {id, name, image, price} = element
        return (
          <PlantCard 
            key={index}
            id={id}
            name={name}
            image={image}
            price={price}
            handleUpdatePlant={handleUpdatePlant}
            handleRemovePlant={handleRemovePlant}
          />
        )
      })}
    </ul>
  );
}

export default PlantList;
