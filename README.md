# 강태규 201740102

## [09월 29일]
#### 학습내용
정적엔 PropType
동적엔 state

생명주기 함수
<     컴포넌트 생성     ><  생성직후       >
constructor -> render -> componentDidMount

< props/state의 변화 ><    update 처리              > <  처리 직후     >
                      shouldComponentUpdate render  componentDidUpdate

<    컴포넌트 제거  >
componentWillUnmount

return 값에 태그 하나만 들어갈 수 있지만 div 태그로 여러 넣음
```
render(){
      console.log("render");
    return (
        <div>
            
        <h1>The number is: {this.state.count} </h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
        </div> 
    )
  }
}

```




## [09월 15일]
#### 학습내용
id 값을 넣어 유일성을 확보하는 key props 방법
```
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
```
Food 함수의 매개변수에 대가로 넣고 ({name, picture})를 쓸경우
```
function Food({name, picture}/){

  return  (<div>
  <h1>I like {name} </h1> 
  <img src={picture} />
  </div>)
}
```
Food 함수의 매개변수에 대가로 안넣고 (props)를 쓸경우
```
function Food(props){

return (<h1>I like {props.fav}</h1>)
}
```
화살표 함수는 익명 함수로 일회용일 경우가 크다

## [09월 08일]
#### 학습내용
.gitignore 파일은 특정 파일 깃에 저장 방지

npx create-react-app 파일명 (간단한 리엑트 파일 생성)
리엑트 파일 순정으로 만들기 위해 파일 삭제
 
 App.js 파일을 고치면 화면에 뜨는 이유

###### index.html
```
<div id="Potato"></div>
);
```
아이디가 Potato인 값을 div 에 불러오라

###### index.js
```
ReactDOM.render(
    <App /> ,document.getElementById('Potato')
);
```

Potato 란 요소에 App 함수를 집어 넣어라

###### App.js
```
function App() {
  return (
    <div className="App">
      Hello React!!!!! 
    </div>
  );
}
```


