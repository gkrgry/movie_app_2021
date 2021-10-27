# 강태규 201740102
## [10월 27일]
#### 학습내용

React-Router는 페이지를 새로 불러오지 않는 상황에서
각각의 선택에 따라서 선택된 데이터를 하나의 페이지에서
렌더링 해주는 라이브러리 입니다.

라우터 하는법

```jsx
import "./App.css"
import { HashRouter, Route} from 'react-router-dom'
import About from './routes/About'
import Home from "./routes/Home"

function App() {
  return(
    <HashRouter> //exact 는 오직 '/' 일때만 없으면 '/' 포함된것 모두 출현
      <Route path='/' exact={true} component={Home}>
      </Route>
      <Route path='/about' component={About}>
      </Route>
    </HashRouter>
  )
}

export default App;
```

라우터 설치
react-router-dom
보통 간단한 메뉴 만들때 설치

app.css , movie.css 파일 가져오기
```
https://github.com/easysIT
```

movie.js 장르 추가
```jsx
function Movie({title ,year ,summary ,poster, genres}) {
    return(
        <div className='movie'>
         <img src={poster} alt={title} title={title}/>
         <div className='movie-data'>
             <h3 className='movie-title'>{title}</h3>
             <h5 className='movie-year'>{year}</h5>
             <ul className='movie-genres'> //장르 가져오기
                {genres.map((genre,index) => { //map 함수는 배열 가져올 수 있다.
                    return( // index는 키값
                    <li key={index} className='movie-genre'>{genre}</li>
                    )
                })}
             </ul>
             <p className='moive-summary'>{summary.slice(0,180)}...</p>
             
         </div>
        </div>
    )
}
```

## [10월 13일]
#### 학습내용
프록시 서버 : 서버와 클라이언트 사이에 있는 또다른 서버

코딩시 표기법
```
//첫문자 첫글자 소문자 다음 문자부터 첫글자 대문자
//카멜 표기법: 변수명, 함수명에 사용
camelCase
//파스칼 표기법: 클래스명 가끔 함수명에 사용
//모든 문자 첫글에 대문자
PascalCase
//모든 문자는 소문자 사용 문자 사이에 '_'(언더바) 이어서 사용
snake_case
```

movie.js 
```jsx
import PropTypes from 'prop-types'
import "./Movie.css"


function Movie({title ,year ,summary ,poster, genres}) {
    return(
        <div className='movie'>
         <img src={poster} alt={title} title={title}/>
         <div className='movie-data'>
             <h3 className='movie-title'>{title}</h3>
             <h5 className='movie-year'>{year}</h5>
             <p className='moive-summary'>{summary}</p>
             
         </div>
        </div>
    )
}
// propTypes 소문자 주의!
// Proptypes는 impoet한건데 propTypes는 어디서 정의된건지 모르겠다 내장 함수인가?
Movie.propTypes = {
    year: PropTypes.number.isRequired, 
    //import 한 Proptypes 안에 number인 year을 필수로 가져와라
    title: PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
    //배열로 저장된 정보를 가져오기
}

export default Movie
```

App.js 안에 render 함수
Moive.js에서 가져온 정보 뿌려주기
```jsx
render() {
    const {isLoading, movies} = this.state
    return( 
      <section className='container'>
        { isLoading ?( //삼함 연산자 로딩중이라면
          <div className='loader'>
            <span className='loader-text'>Loading...</span>
            //참일때 Loading...
          </div>
        ) : ( //여기서부터 로딩중이 아니면 
          <div className='movies'>
            {
               movies.map((movie) =>{ 
                console.log(movie); 
                //소문자로 된 movie 가 어디서 정의된건지 모르겠다. import Movie 인가? 확실치 않아 주석남김
                return( 
                <Movie
                  key = {movie.id}
                  id = {movie.id}
                  year = {movie.year}
                  title = {movie.title}
                  summary = {movie.summary}
                  poster = {movie.medium_cover_image}
                  genres = {movie.genres}
                  />
                )})
            }
          </div>
        ) 
        }
        </section>
    )
  }

}
```






## [10월 06일]
#### 학습내용
axios 설치
npm install axios

https://yts.mx/api
영화관련 API 사이트 내용중 토랜트 관련 불법이 있다.

```jsx
render() {
    const {isLoading} = this.state
    return(
      <div>
        { isLoading ? 'Loading....' : '영화 데이터 출력' }
        </div>
    )
  }
```
삼항 연산자 를 이용하여 isLoading 함수로 로딩중인지 확인하는 함수
트루면 'Loading....' 출력 아니면 '영화 데이터 출력' 출력



## [09월 29일]
#### 학습내용
정적엔 PropType
동적엔 state

생명주기 함수 <br>
```
<     컴포넌트 생성     ><      생성직후       >
constructor ->      render-> componentDidMount

< props/state의 변화 ><        update 처리              ><  처리 직후     >
    없어진메소드?      ->  shouldComponentUpdate render -> componentDidUpdate

<    컴포넌트 제거  >
componentWillUnmount
```

return 값에 태그 하나만 들어갈 수 있지만 div 태그로 여러 넣음
```jsx
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
```jsx
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
```jsx
function Food({name, picture}/){

  return  (<div>
  <h1>I like {name} </h1> 
  <img src={picture} />
  </div>)
}
```
Food 함수의 매개변수에 대가로 안넣고 (props)를 쓸경우
```jsx
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
```jsx
<div id="Potato"></div>
);
```
아이디가 Potato인 값을 div 에 불러오라

###### index.js
```jsx
ReactDOM.render(
    <App /> ,document.getElementById('Potato')
);
```

Potato 란 요소에 App 함수를 집어 넣어라

###### App.js
```jsx
function App() {
  return (
    <div className="App">
      Hello React!!!!! 
    </div>
  );
}
```


