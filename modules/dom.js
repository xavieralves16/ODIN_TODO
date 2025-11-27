import projectController from "./projectController.js";
import Todo from "./todo.js";

const dom = (() => {

  let projectList, todoList;
  let addProjectBtn, addTodoBtn;


  let modal, modalTitle, modalSaveBtn, modalCancelBtn;
  let inputTitle, inputDescription, inputDate, inputPriority;


  let editingTodoIndex = null;

  function init() {
    projectList = document.querySelector("#project-list");
    todoList = document.querySelector("#todo-list");

    addProjectBtn = document.querySelector("#add-project-btn");
    addTodoBtn = document.querySelector("#add-todo-btn");

    modal = document.querySelector("#modal");
    modalTitle = document.querySelector("#modal-title");
    modalSaveBtn = document.querySelector("#modal-save-btn");
    modalCancelBtn = document.querySelector("#modal-cancel-btn");

    inputTitle = document.querySelector("#todo-title");
    inputDescription = document.querySelector("#todo-description");
    inputDate = document.querySelector("#todo-date");
    inputPriority = document.querySelector("#todo-priority");

    addProjectBtn.addEventListener("click", newProject);
    addTodoBtn.addEventListener("click", newTodo);

    modalSaveBtn.addEventListener("click", saveTodo);
    modalCancelBtn.addEventListener("click", closeModal);

    renderProjects();
    renderTodos();
  }

  function renderProjects() {
    const projects = projectController.getProjects();
    projectList.innerHTML = "";

    projects.forEach((project, index) => {
      const div = document.createElement("div");
      div.classList.add("project-item");
      div.textContent = project.name;

      div.addEventListener("click", () => {
        projectController.setCurrentProject(index);
        renderTodos();
      });

      // Botão remover
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.background = "red";
      removeBtn.style.color = "white";
      removeBtn.style.borderRadius = "5px";

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Remover este projeto?")) {
          projectController.removeProject(index);
          renderProjects();
          renderTodos();
        }
      });

      div.appendChild(removeBtn);
      projectList.appendChild(div);
    });
  }

  function renderTodos() {
    const project = projectController.getCurrentProject();
    todoList.innerHTML = "";

    project.todos.forEach((todo, index) => {
      const div = document.createElement("div");
      div.classList.add("todo");

      div.innerHTML = `
        <strong>${todo.title}</strong> (${todo.dueDate})
      `;

      div.addEventListener("click", () => {
        editingTodoIndex = index;
        openModal(todo);
      });


      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.background = "red";
      removeBtn.style.color = "white";
      removeBtn.style.borderRadius = "5px";

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Apagar esta tarefa?")) {
          projectController.removeTodo(index);
          renderTodos();
        }
      });

      div.appendChild(removeBtn);
      todoList.appendChild(div);
    });
  }

  function newProject() {
    const name = prompt("Nome do projeto:");
    if (!name) return;

    projectController.addProject(name);
    renderProjects();
  }

  function newTodo() {
    editingTodoIndex = null;
    openModal();
  }

  function openModal(todo = null) {
    modal.classList.remove("hidden");

    if (todo) {
      modalTitle.textContent = "Editar Tarefa";
      inputTitle.value = todo.title;
      inputDescription.value = todo.description;
      inputDate.value = todo.dueDate;
      inputPriority.value = todo.priority;
    } else {
      modalTitle.textContent = "Nova Tarefa";
      inputTitle.value = "";
      inputDescription.value = "";
      inputDate.value = "";
      inputPriority.value = "low";
    }
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  function saveTodo() {
    const title = inputTitle.value.trim();
    if (!title) return;

    const description = inputDescription.value.trim();
    const dueDate = inputDate.value;
    const priority = inputPriority.value;

    const todo = Todo(title, description, dueDate, priority);

    if (editingTodoIndex === null) {
      projectController.addTodoToCurrent(todo);
    } else {
      const project = projectController.getCurrentProject();
      project.todos[editingTodoIndex] = todo;
    }

    closeModal();
    renderTodos();
  }

  return { init };
})();

export default dom;

