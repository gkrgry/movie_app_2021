

const foodLink = [
  {
    name: "chikin",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2VIPw7JbEM8zeFPd9Llveo8Io2jINQoiHg&usqp=CAU"
  },
  {
    name: "lameyn",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqZZWRIyHxRCTzh93aDrt7inRRh9tRlKYGWw&usqp=CAU"
  }

]

function App() {
  return (
    <div className="App">
      Hello React!!!!! 
      <Food fav="kimchi" something = {true} papapa ={['hello', 1, 2, true]} />
      <Food fav="a" />
      <Food fav="b" />
    </div>
  );
}

function Food(props){
  // console.log(props);
  const { fav} = props
  return <h1>I like {fav}</h1>

  // return <h1>I like {props.fav}</h1>
}

export default App;

