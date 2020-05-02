const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption =document.querySelector(".filter-todo");

//Event listeners

todoButton.addEventListener('click',addToDo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener("click",filterToDo);
document.addEventListener('DOMContentLoaded',getTODO);


function addToDo(e){
	e.preventDefault();


	//create todo div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	const newToDo = document.createElement("li");
	newToDo.innerText = todoInput.value;
	
	newToDo.classList.add("todo-item");
	todoDiv.appendChild(newToDo);
  	
  	//Save to local Storage
   	saveLocalTodos(todoInput.value);
   	
   	//Clear Input Value
   	clearToDoInput();




	//Buttons
	const completedButton = document.createElement("button");
	completedButton.innerHTML="<i class='fa fa-check'></i>	";
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);


	const trashButton = document.createElement("button");
	trashButton.innerHTML="<i class='fa fa-trash'></i>	";
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);



	//Add to container
	todoList.appendChild(todoDiv);


}

function clearToDoInput(){
	todoInput.value = "";
}

function deleteCheck(e){
	const item = e.target;
	if(item.classList[0] === "trash-btn"){
		const toDo = item.parentNode;

		//animation
		toDo.classList.add("fall");
		removeLocalToDO(toDo);

		//remove
		toDo.addEventListener('transitionend',function(){
			toDo.remove();
		
		});
		// 
		// const parent = toDo.parentNode;
		// parent.removeChild(toDo);
	}

	if(item.classList[0] === "complete-btn"){
		const toDo = item.parentNode;
		toDo.classList.toggle("completed");
	}


}


function filterToDo(e){
	const todos  = todoList.childNodes;
	todos.forEach(function(todo){
	 switch (e.target.value){
	 	case "all":
	 	todo.style.display = "flex";
	 	break;
	 	case "Completed":
	 	if(todo.classList.contains("completed")){
	 			todo.style.display = "flex";
	 		}
	 	else{
	 			todo.style.display ="none";
	 		}
	 		break;
	 	case "Uncomplete":		
	 	if(!todo.classList.contains("completed")){
	 			todo.style.display = "flex";
	 		}
	 	else{
	 			todo.style.display ="none";
	 		}
	 		break;	

	 		
	 }
	});

}





function saveLocalTodos(todo){

	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));

	}
	todos.push(todo);
	console.log(todos);
	localStorage.setItem("todos",JSON.stringify(todos));
}


function getTODO (){
	let todos;
		if(localStorage.getItem('todos')===null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));


	}
	todos.forEach(function(todo){



	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	const newToDo = document.createElement("li");
	newToDo.innerText = todo;
	
	newToDo.classList.add("todo-item");
	todoDiv.appendChild(newToDo);
  	
  	//Save to local Storage
   	
   	
   	//Clear Input Value
   	




	//Buttons
	const completedButton = document.createElement("button");
	completedButton.innerHTML="<i class='fa fa-check'></i>	";
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);


	const trashButton = document.createElement("button");
	trashButton.innerHTML="<i class='fa fa-trash'></i>	";
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);



	//Add to container
	todoList.appendChild(todoDiv);



	});

}


function removeLocalToDO (todo){
	let todos;
		if(localStorage.getItem('todos')===null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));


	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos));//overrides


}