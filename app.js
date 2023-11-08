'use strict';

const container = document.getElementById('container');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');
const todoUL = document.querySelector('.todo-ul');

const TODO_KEY = "todo";

// todo array로 담기
let toDos = [];
//newTodo.value들 저장하기 
//화면 새로고침 했을 때 localStorage에서 저장된 정보 가지고 나오기.
   
function saveTodo() {
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

/* ** 오답노트 어떻게 saveTodo를 그릴건지에 대해
단계별로 시작해보자. 
1단계 : 먼저 todo 들을 저장하고 싶어.
2단계 : 그 다음에 todo들을 불러오고 싶어.

무슨 의미냐면, 
1. 만약 내가 input box에  a.b,c를 입력했어.
2. 먼저 이것들을 localStorage에 저장하고
3. 그 후에 새로고침하면(새로고침 동작을 막은 것뿐, 기존 form의 기본동작임)
4. localStorage에서 그것들을 불러와서, 
5. 화면에 그려주고 싶은거야.*/


function deleteTodo(event) {
    const li = event.target.parentElement;
    //console.log(li.id);
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    //이 문장의 의미는 우리가 클릭한 li.id와 다른 toDo는 남겨두고 싶어.
    //오답노트 : 왜 toDo? 이거 왜???
    saveTodo();
    //한번 더 저장해야해. 
}

function completeTodo(event) {
    const span = event.target;
    span.style.textDecoration = "line-through";
    span.style.color = '#fbc2eb';  
    saveTodo();
}

function clearTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((item) => item.text !== li.text);
    saveTodo();
}

//todo-list를 화면에 보이게 만들어보자.
//function()에 text를 주자. newTodo라고 하자.
//handleTodoSubmit function이 makeTodo를 사용한다.

function makeTodo(newTodo) {
    //create li
    const li = document.createElement('li');
    li.id = newTodo.id;
    li.text = newTodo.text;

    //create span
    const span = document.createElement('span');
    span.innerText=newTodo.text;
    span.addEventListener("click", completeTodo);
    span.addEventListener("dblclick", clearTodo);
    //오답노트!!!!!!다음부턴 addEventListener부터 만들고 하기.
    //오답노트 !!!!!! 깨달은점!!!!!!! EventListener가 2개가 되네
    li.appendChild(span);

    const xButton = document.createElement('button');
    xButton.innerText="❌";
    xButton.addEventListener("click", deleteTodo); 
    //**오답노트 : xButton이 완성되어 있는 곳에서 addEventListener 해줘야해

    li.appendChild(xButton);
    //**오답노트: 마지막에 todoUL의 자식요소 li를 넣어주기 
    todoUL.appendChild(li);

}


function handleTodoSubmit(event) {
    
    //form 새로고침 막기
    event.preventDefault();
  
    //input 값을 담는 변수(바구니), input의 value
    const newTodo = todoInput.value;

    //todoInput의 값을 newTodo에 담아놓고
    //화면에 어떻게 띄우지? -> **해결책 : todoForm.addEventListener("submit", handleBtnClick)으로 떴다.
        
    todoInput.focus();
    todoInput.value='';

    const newTodoObject = {
        text:newTodo, 
        id:Date.now(),
    };

    toDos.push(newTodoObject); //**왜???? newTodo를 그리기전에 toDos array를 가지고 와서 newTodo를 push할거다.
    makeTodo(newTodoObject); //**왜??? makeTodo라는 새로운 function에 그 값을 보내는거야.    
    saveTodo();
}


   
todoForm.addEventListener("submit", handleTodoSubmit);


const savedTodo = localStorage.getItem(TODO_KEY); 
//오답노트: localStorage에 저장된 value(toDOs)들의 key를 가져온다.


if(savedTodo){
    const parsedTodo = JSON.parse(savedTodo);
     toDos = parsedTodo;
    parsedTodo.forEach(makeTodo);    
}
//오답노트 : forEach 함수로 배열 안에 있는 item 들을 하나씩 꺼내서
//명령을 적용시켜준다.

//** 문제 : 근데 새로고침하니까 다시 전에 있던게 생겨난다!! */