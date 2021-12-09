# 강태규 201740102

## [12월 08일]
#### 학습내용

#### 합성 (Composition) vs 상속 (Inheritance)
React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋습니다.

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
} 
```
이러한 방식으로 다른 컴포넌트에서 JSX를 중첩하여 임의의 자식을 전달할 수 있습니다.
```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

##### 특수화
- 경우에 따라 어떤 컴포넌트는 “특수한 경우”를 고려해야 하는 경우가 있습니다. 예를
들어, WelcomeDialog는 Dialog의 특수한 경우라고 할 수 있다
-React에서는 이 역시 합성을 통해 해결할 수 있다.

#### state 끌어올리기 (lifting-state-up)
- React에서 state를 공유하는 일은 그 값을 필요로 하는 컴포넌트 간의 가장 가까운
공통 조상으로 state를 끌어올림으로써 구현할 수 있습니다. 이 방법을 “state 끌어올
리기”라고 부른다.
- 이제 TemperatureInput이 개별적으로 가지고 있던 지역 state를 지우는 대신
Calculator로 그 값을 옮기도록 한다.


#### Form
- HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가지기 때문에, React의 다른 DOM 엘리먼트와 다르게 동작합니다.

##### textarea
React에서 textarea는 value 어트리뷰트를 대신 사용합니다. 이렇게하면 textarea 를 사용하는 폼은 한 줄 입력을 사용하는 폼과 비슷하게 작성할 수 있습니다.
```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };//부분

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }//부분

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />//부분
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```


##### select
```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>//이부분
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
```

##### 다중 입력 제어하기
여러 input 엘리먼트를 제어해야할 때, 각 엘리먼트에 name 어트리뷰트를 추가하고 event.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해줍니다



#### Key
- Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다
- key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해한다.
- 일반적으로 항목이 고정적일 경우는 배열의 index값을 사용한다
- 다만 항목의 순서가 바뀔 수 있는 경우는 index사용을 권장하지 않는다
- 이 것 때문에 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생될 수 있다.

Key 로 컴포넌트 추출하기
```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // 틀렸습니다! 여기에는 key를 지정할 필요가 없습니다.
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 틀렸습니다! 여기에 key를 지정해야 합니다.
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
map() 함수 내부에 있는 엘리먼트에 key를 넣어 주는 게 좋다


###### Key는 배열내 요소 사이에서만 고융한 값이면 된다.
- Key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요가 없다. 두개의 다른 배열을 만들때 동일한 key값을 사용할 수 있다.
###### JSX에 map() 포함시키기
- 이 방식을 사용하면 코드가 더 깔끔해 지지만, 이 방식을 남발하는 것은 좋지 않습니다.



## [12월 01일]
#### 학습내용
###### 조건부 랜더링
React에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있다. 이렇게 하면 애플리케이션의 상태에 따라서 컴포넌트 중 몇 개만을 렌더링할 수 있다.

- 엘리먼트 변수
엘리먼트를 저장하기 위해 변수를 사용할 수 있습니다. 출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링 할 수 있습니다.

-논리 && 연산자로 If를 인라인으로 표현하기
JSX 안에는 중괄호를 이용해서 표현식을 포함 할 수 있다
```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && //이부분
        <h2>
          You have {unreadMessages.length} unread messages. //이부분
        </h2>
      }
    </div>
  );
}
```

###### React 이벤트 처리
엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사하다.

###### 데이터는 아래로 흐릅니다.
부모 컴퍼넌트에서 자식으로 데이터가 흘러간다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있습니다.
###### state 업데이트는 병합됩니다.
setState()를 호출할 때 React는 제공한 객체를 현재 state로 병합합니다


###### state를 올바르게 사용하기
- 직접 state를 수정하지 말기
```jsx
this.state.comment = 'Hello';//이렇게 하지 마세요
```
```jsx
this.setState({comment: 'Hello'}); //이렇게 하세요 느낌은 java primary 변수 getter,setter 해주는 느낌
```
- state 업데이트는 비동기적일 수도 있다.

React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있습니다.

this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 됩니다.

###### 클래스에 로컬 State 추가하기
- render() 메서드 안에 있는 this.props.date를 this.state.date로 변경합니다.
- 초기 this.state를 지정하는 class constructor를 추가합니다.
- 요소에서 date prop을 삭제합니다.
```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
바뀐 후
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

###### 다섯단계로 함수 컴포넌트를 클래스로 변화 가능
- React.Component를 확장하는 동일한 이름의 ES6 class를 생성합니다.
- render()라고 불리는 빈 메서드를 추가합니다.
- 함수의 내용을 render() 메서드 안으로 옮깁니다.
- render() 내용 안에 있는 props를 this.props로 변경합니다.
```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {/*여기에 this*/this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

## [11월 24일]
#### 학습내용

  
  jsx 란 js를 확장한 문법
  ```jsx
  const element = <h1>Hello, world!</h1>;
  ```
  jsx 는 표현식
  jsx 는 자식을 포함할 수 있습니다.
  JSX는 객체를 표현합니다
  위 특징들의 대한 간단한 코드들은
  https://ko.reactjs.org/docs/introducing-jsx.html 
  
  
  엘리먼트 는 react 에서 가장 작은 단위
  ```jsx
  <div id="root"></div>
  ```


  컴포넌트 정의 가장 간단한 방법 js 함수를 작성하는것
  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  ```

## [11월 17일]
#### 학습내용

 외부 플러그인은 remarkable을 사용함으로 cdn으로 링크를 추가한다,
 https://github.com/jonschlinkert/remarkable

외부 컴포넌트
install 할건지
>npm install remarkable

링크 따올건지
```jsx
<script src="https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.1/remarkable.min.js" integrity="sha512-skYYbQHAuOTpeJTthhUH3flZohep8blA+qjZOY0VqmfXMDiYcWxu29F5UbxU4LxaIpGkRBk+3Qf8qaXfd9jngg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>title</title>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script crossorigin src="..."></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/remarkable@2.0.1/dist/remarkable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/remarkable/2.0.1/remarkable.min.js" integrity="sha512-skYYbQHAuOTpeJTthhUH3flZohep8blA+qjZOY0VqmfXMDiYcWxu29F5UbxU4LxaIpGkRBk+3Qf8qaXfd9jngg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/babel">
        class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault(); //내부적으로 가지고있는 메소드
    // 폼테그의 리프레쉬를 못하게 만드는 메소드 Why? 리엑트의 비동기실을 사용하기 위해
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todos-example') //todos-example 아이디에 저장
);
    </script>
</head>
<body>
    <div id="todos-example"></div> //todos-example 뿌려줌
</body>
</html>
```

간단한 리엑트 컴포넌트
https://ko.reactjs.org/


## [11월 10일]
#### 학습내용
실질적으로 베포!
npm install gh-pages 하고
npm run build 하면 build 파일 생성후 깃허브에 올라가는거 확인 후 베포끝

package.json 파일 추가
```jsx
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build", //추가
    "deploy": "gh-pages -d build" //추가
  }
```
package.json 파일
```jsx
//마지막 전에 추가
"homepage": "https://gkrgry.github.io/movie_app_2021" //깃허브 아이디.github.io/레포지토리 이름
```
## [11월 03일]
#### 학습내용

생명주기 함수를 이용한 리다이렉트 코딩
Detail.js 
```jsx
class Detail extends React.Component{
    componentDidMount(){ //render() 이후
        const{ location, history } = this.props
        if(location.state === undefined){
            history.push('/') //값이 없다면 홈으로 가라는 리다이렉트 기능
        }
    }
    render(){
        const { location } = this.props // 바인딩 해서 가져온 값 뿌리기
        if(location.state){ //값이 있으면
            return(
                <span>{location.state.title}</span>
            )
        }
        else{ //location.state 값이 없으면 
            return null //DidMount 쪽으로 가서 리다이랙트
        }
    }
}

```

변수에 내용 저장해서 보내기
jsp에서 바인딩과 비슷해 보임
App.js
```jsx
function App() {
  return(
    <HashRouter>
      <Navigation/>
      <Route path='/' exact={true} component={Home}>
      </Route>
      <Route path='/about' component={About}>
      </Route>
      <Route path='/movie-detail' component={Detail}> //movie-detail 인 url로 Detail 변수로 뿌려주기
      </Route>
    </HashRouter>
  )
}
```

movie.js
```jsx
function Movie({title ,year ,summary ,poster, genres}) {
    return(
        <div className='movie'>
        <Link 
            to={{
                pathname: 'movie-detail', //movie-detail 로 이동
                state: {year, title, summary, poster, genres} // state 형식으로 내용 넣고 보내기
                }}>
         <img src={poster} alt={title} title={title}/>
         <div className='movie-data'>
             <h3 className='movie-title'>{title}</h3>
             <h5 className='movie-year'>{year}</h5>
             <ul className='movie-genres'>
                {genres.map((genre,index) => {
                    return(
                    <li key={index} className='movie-genre'>{genre}</li>
                    )
                })}
             </ul>
             <p className='moive-summary'>{summary.slice(0,180)}...</p>
             
         </div>
         </Link>
        </div>
    )
}
```

package.json 과 package-lock.json 차이
```
이상적인 npm install은 동일한 package.json에 동일한 node_modules 아웃풋 트리가 작성되는 것 이지만
그러나, 많은 경우에서 이러한 경우들이 실현되지 못하는 경우가 대부분이다
node_modules 폴더의 의존성 트리 구조를 기록하는 파일이 package-lock.json 파일
```




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


