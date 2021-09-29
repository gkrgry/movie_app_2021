import PropType from 'prop-types'




const foodLike = [
  {
    id: 1,
    name: "dosirack",
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2VIPw7JbEM8zeFPd9Llveo8Io2jINQoiHg&usqp=CAU",
    alt: '도시락',
    rating: 5.0
  },
  {
    id: 2,
    name: "lice",
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZZWRIyHxRCTzh93aDrt7inRRh9tRlKYGWw&usqp=CAU",
    alt: 'lice',
    rating: 4.5
  }

]

/*function renderFood(dish){
  return (
    <Food name={dish.name} image={dish.image} />
  )
}*/

function App() {
  // console.log(foodLike.map(renderFood));
  return (
    <div className="App">
      {
        // foodLike.map(renderFood)

        foodLike.map(dish => (<Food
          key={dish.id}
          name={dish.name}
          picture={dish.picture}
          alt={dish.alt}
          rating={dish.rating}
          />))
        
      }
    </div>
  );
}


function Food({name, picture}/*props*/){
  // console.log(props);
  // const { fav} = name
  return  (<div>
  <h1>I like {name} </h1> 
  <img src={picture} />
  </div>)
  

  // return <h1>I like {props.fav}</h1>
}

export default App;

