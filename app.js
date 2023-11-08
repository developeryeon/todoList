'use strict';

const container = document.getElementById('container');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');
const todoUL = document.querySelector('.todo-ul');

const TODO_KEY = "todo";

// todo array로 담기
let toDos = [];


function saveTodo() {
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}


function deleteTodo(event) {
    const li = event.target.parentElement;
    //console.log(li.id);
    li.remove();
    toDos = toDos.filter((item) => item.id !== parseInt(li.id));
    saveTodo();
    //한번 더 저장
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
    li.appendChild(span);

    const xButton = document.createElement('button');
    xButton.innerText="❌";
    xButton.addEventListener("click", deleteTodo); 
   

    li.appendChild(xButton); 
    todoUL.appendChild(li);

}


function handleTodoSubmit(event) {
    
    //form 새로고침 막기
    event.preventDefault();
  
    //input 값을 담는 변수(바구니), input의 value
    const newTodo = todoInput.value;

    //화면에 어떻게 띄우지? -> **해결책 : todoForm.addEventListener("submit", handleBtnClick)으로
        
    todoInput.focus();
    todoInput.value='';

    const newTodoObject = {
        text:newTodo, 
        id:Date.now(),
    };

    toDos.push(newTodoObject); 
    makeTodo(newTodoObject);    
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
//forEach 함수로 배열 안에 있는 item 들을 하나씩 꺼내서 적용
