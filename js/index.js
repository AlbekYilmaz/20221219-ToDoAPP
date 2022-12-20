const divTodos = document.getElementById("todos");
const frmTodo = document.getElementById("frmTodo");
const txtTitle = document.getElementById("title");


let todos = [];

function listTodos() {
    todos.sort((a, b) => a.done - b.done);
    saveData();

    divTodos.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        let div = document.createElement("div");
        let input = document.createElement("input");
        let span = document.createElement("span");
        let buttonDelete = document.createElement("button");
        let buttonEdit = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;
        input.className = "me-2";
        input.onchange = function () {

            todo.done = input.checked;
            listTodos();
        };
        span.textContent = todo.title;
        span.className = "me-auto";
        if (todo.done)
            span.classList.add("text-decoration-line-through");

        buttonDelete.innerHTML = '<i class="fa-solid fa-remove"></i>';
        buttonDelete.className = "me-2 btn btn-danger";
        buttonDelete.onclick = function () {
            todos.splice(i, 1);
            listTodos();
        };
        buttonEdit.innerHTML = '<i class="fa-solid fa-edit"></i>';
        buttonEdit.className = "btn btn-warning";
        buttonEdit.onclick = function () {
            let newTitle = prompt(todo.title);
            if (newTitle) {
                todo.title = newTitle;
                listTodos();
            }
        };
        div.className = "p-2 bg-light my-3 d-flex align-items-center";
        div.append(input, span, buttonDelete, buttonEdit);
        divTodos.append(div);

    }
}

function saveData() {
    let json = JSON.stringify(todos);
    localStorage["data"] = json;
}

function loadData() {
    let json = localStorage["data"];
    if (json) {
        todos = JSON.parse(json);
    }
    else {
        todos = [
            { title: "Haircut", done: false },
            { title: "Do Laundry", done: false },
            { title: "Do your homework", done: true },
            { title: "Eat, Pray, Love", done: true }
        ];
    }
}
frmTodo.onsubmit = function (event) {
    event.preventDefault();
    let title = txtTitle.value.trim();
    let todo = { title: title, done: false };
    todos.push(todo);
    listTodos();
    txtTitle.value = "";
};
loadData();
listTodos();