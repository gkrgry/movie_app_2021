

const foodLike = [
  {
    id: 1,
    name: "chikin",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2VIPw7JbEM8zeFPd9Llveo8Io2jINQoiHg&usqp=CAU"
  },
  {
    id: 2,
    name: "lameyn",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZZWRIyHxRCTzh93aDrt7inRRh9tRlKYGWw&usqp=CAU"
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

        foodLike.map(dish => (<Food key={dish.id} name={dish.name} picture={dish.image} />))
        
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

