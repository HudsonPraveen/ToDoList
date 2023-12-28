// Selecting elements from the DOM
const button = document.getElementById('add'); // Selecting the button element with the id 'add'
const inputTxt = document.getElementById('input'); // Selecting the input element with the id 'input'
const todoList = document.getElementById('todoList'); // Selecting the element with the id 'todoList'

// Initializing an array to store to-do items
let toDos = [];

// When the window is loaded, retrieve the to-do items from local storage and display them
window.onload = () => {
    // Attempt to parse the stored 'todos' from local storage; if not present, use an empty array
    toDos = JSON.parse(localStorage.getItem('todos')) || [];

    // Iterate through each to-do item and call the addtodo function to display it
    toDos.forEach(todo => addtodo(todo));
}

// Adding a click event listener to the 'add' button
button.addEventListener('click', () => {
    // Add the input value to the 'toDos' array
    toDos.push(inputTxt.value);

    // Store the updated 'toDos' array in local storage
    localStorage.setItem('todos', JSON.stringify(toDos));

    // Call the addtodo function to display the new to-do item
    addtodo(inputTxt.value);

    // Clear the input field
    inputTxt.value = '';
});

// Function to add a to-do item to the display
let addtodo = (addTodo) => {
    // Create a new paragraph element
    let para = document.createElement('p');

    // Set the inner text of the paragraph to the to-do item
    para.innerText = addTodo;

    // Append the paragraph to the 'todoList' element
    todoList.appendChild(para);

    // Add a click event listener to the paragraph to toggle line-through text decoration
    para.addEventListener('click', () => {
        para.style.textDecoration = 'line-through';
        // Note: The remove function is commented out in this event listener
    });

    // Add a double click event listener to the paragraph to remove it and update local storage
    para.addEventListener('dblclick', () => {
        todoList.removeChild(para);
        // Call the remove function to update the 'toDos' array and local storage
        remove(addTodo);
    });
}

// Function to remove a to-do item from the 'toDos' array and local storage
let remove = (addTodo) => {
    // Find the index of the to-do item in the 'toDos' array
    let index = toDos.indexOf(addTodo);

    // If the to-do item is found, remove it from the array
    if (index > -1) {
        toDos.splice(index, 1);
    }

    // Update the 'toDos' array in local storage
    localStorage.setItem('todos', JSON.stringify(toDos));
}
