
#### Breaking down the README...

## Setup

1. Run `npm install` in your terminal.
2. Run `npm run server`. This will run your backend on port `6001`.
3. In a new terminal, run `npm start`.

Make sure to open [http://localhost:6001/plants](http://localhost:6001/plants)
in the browser to verify that your backend is working before you proceed!


# Core Deliverables: 

As a user:

1. When the app starts, I can see all plants.
2. I can add a new plant to the page by submitting the form.
3. I can mark a plant as "sold out".
4. I can search for plants by their name and see a filtered list of plants.

### Endpoint

http://localhost:6001/plants


## Advanced Deliverables

As a user:

1. I can update the price of a plant and still see the updated price after
   refreshing the page.
2. I can delete a plant and it is still gone when I refresh the page.

# Coding Through the Challenge:

### 1. What is my webpage structure? Is this reflected in the component structure, or do I need to make components/change the imports/exports?

![Structure](https://i.imgur.com/KkGiBr0.png)

Wonderful.

I got this by looking at the components (briefly) and checking the Demo GIF. No changes to import/export structure needed.

### 2. What is the data I'm working with?

```json
[
  {
    "id": 1,
    "name": "Aloe",
    "image": "./images/aloe.jpg",
    "price": 15.99
  },
  {
    "id": 2,
    "name": "ZZ Plant",
    "image": "./images/zz-plant.jpg",
    "price": 25.98
  }
]
```

Data is an array of objects. Each object has an id, name, image, and price.

### 3. Where is data being rendered && where is data being updated?

Based on the GIF and the components, PlantCard needs to receive the plant objects. The parent that renders PlantCard is PlantList, meaning PlantList should receive the array, and use an array method `(.map())` to render PlantCard while passing props based on the objects.

We have a new plant form for adding plants (POST) and a search form for filtering the plant array (NOT updating the database, but updating the display). The bonus deliverables want a way to update the price (PATCH) and remove a plant (DELETE) with persistence.

NewPlantForm updates data
Search updates data
PlantList renders data through PlantCard
PlantCard updates data (for the stretch goals)
PlantPage is the lowest common ancestor for these data-involved components.

PlantPage needs to GET the data using a useEffect hook.
<br>
<br>

## Breaking Down Deliverables

Let's revisit the deliverables one by one, real quick:

```javascript
// As a user:

// 1. When the app starts, I can see all plants.
// For sure I will have to do something like this in PlantList
<ul>
   {plants.map((element, index) => {
       const {id, name, image, price} = element
       return (
           <PlantCard 
              id={id}
              name={name}
              image={image}
              price={price}
           />
       )
   })}
</ul>
// and set up PlantCard to work with those props. plants will be fetched by PlantPage and passed as a prop to PlantList.
// In PlantPage.js
const [plants, setPlants] = useState([])
// Might as well write the useEffect:

useEffect(() => {
    const fetchPlants = async () => {
        let req = await fetch(url)
        let res = await req.json()
        setPlants(res)
    }
    fetchPlants()
}, [])

// ...
<PlantList plants={plants} />
```
```javascript
// 2. I can add a new plant to the page by submitting the form.

/* I will pass a handler function to update the plants variable to NewPlantForm. Within NewPlantForm, I will set up a POST request to add a new plant on submit.
In PlantPage.js I'll use a standard array add element method
*/

const handleAddPlant = (newPlant) => {
    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
}
// ...
<NewPlantForm handleAddPlant={handleAddPlant} />

// In NewPlantForm
// handleSubmit will do a POST request .then handleAddPlant
// the submit handler will be attached to a form 


```

```javascript
// 3. I can mark a plant as "sold out".
// This is asking for a toggle. I will need a state for isInStock
const [isInStock, setIsInStock] = useState(true)

const handleToggleStock = () => {
    setIsInStock((isInStock) => !isInStock)
}

// Attach this to some button with some ternary operator.

```
```javascript
// 4. I can search for plants by their name and see a filtered list of plants.

// Filters are funky. Here's how one might work:

`
1. searchTerm should be a state managed in PlantList.
2. searchedPlants should be a filtered version of plants that will update on every re-render caused by invocations of setSearchTerm
3. searchTerm and setSearchTerm are passed to Search.js
4. searchedPlants is passed into PlantList. User input in Search updates the value of search, forcing a re-render and passing an up-to-date searchedPlants array.
5. Within Search.js, we establish that a text input field is a controlled component by setting its value to searchTerm and giving it on onChange event to setSearchTerm as e.target.value
6. Change events in the Search.js input invoke the setSearchTerm function which means we will re-render the page, affecting the displayed plants since the array that is passed down to PlantList is filtered by searchTerm.
`

// This code might be more difficult to reproduce than the rest, but that comes with practice.

const [searchTerm, setSearchTerm] = useState('')

// ...
const searchedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes()(searchTerm.toLowerCase())
})

// ...

<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

// SUPER IMPORTANT
// earlier we passed plants={plants} into PlantList but we should alter that to reflect the filter.

<PlantList plants={searchedPlants} />

//Impossible to understate that this is necessary for the filter to work.

```

```javascript
// In Search.js

const handleSearchChange = (e) => {
    console.log('Searching...')
    setSearchTerm(e.target.value)
}
// ...

<input
   value={searchTerm}
   onChange={(e) => {}}
/>
```

That's, like, all of it. The four main deliverables.

While we're here, we might as well address the stretch ones:

:
```javascript
// 1. I can update the price of a plant and still see the updated price after refreshing the page.
// This means I do a patch request. Since this will update the plants array, I should make a handler function in PlantPage (where the plants state is managed) and pass it all the way down to the UI element that will allow this price update event, which is PlantCard.

// In PlantPage.js

const handleRemovePlant = (idToRemove) => {
    const updatedPlants = plants.filter((target) => target.id !== idToRemove)
    setPlants(updatedPlants)
}

// PlantCard will have a delete request that will also invoke handleRemovePlant

```

```javascript
// 2. I can delete a plant and it is still gone when I refresh the page.
// This means I do a delete request. Since this will update the plants array, I should make a handler function in PlantPage (where the plant state is managed) and pass it all the way down to the UI element that will allow this delete event, which is PlantCard.

// In PlantPage.js

const handleUpdatePlant = (updatedPlant) => {
    const updatedPlants = plants.map((element) => {
        if (element.id === updatedPlant.id) {
            return updatedPlant
        } else {
            return element
        }
    })
    setPlants(updatedPlants)
}
```

This would be everything. But, as always, you need to be able to walk yourself here.
