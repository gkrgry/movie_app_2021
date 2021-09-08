# 강태규 201740102

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


