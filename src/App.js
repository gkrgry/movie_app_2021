

const foodLike = [
  {
    name: "chikin",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2VIPw7JbEM8zeFPd9Llveo8Io2jINQoiHg&usqp=CAU"
  },
  {
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

        foodLike.map(dish => (<Food name={dish.name} image={dish.image} />))
        
      }
    </div>
  );
}

function Food(props){
  // console.log(props);
  // const { fav} = name
  return  (<div>
  <h1>I like {props.name} </h1> 
  <img src={props.image} />
  </div>)
  

  // return <h1>I like {props.fav}</h1>
}

export default App;

