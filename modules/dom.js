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
    addTodoBtn.addEventListener("click", () => openModal());

    modalSaveBtn.addEventListener("click", saveTodo);
    modalCancelBtn.addEventListener("click", closeModal);

    renderProjects();
    renderTodos();
  }

  function renderProjects() {
    projectList.innerHTML = "";

    projectController.getProjects().forEach((project, index) => {
      const div = document.createElement("div");
      div.classList.add("project-item");
      div.textContent = project.name;

      div.addEventListener("click", () => {
        projectController.setCurrentProject(index);
        renderTodos();
      });

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove-btn");
      removeBtn.textContent = "X";

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Remover projeto?")) {
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
    todoList.innerHTML = "";
    const project = projectController.getCurrentProject();

    project.todos.forEach((todo, index) => {
      const div = document.createElement("div");
      div.classList.add("todo-item");

      div.innerHTML = `<span><strong>${todo.title}</strong> (${todo.dueDate})</span>`;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.classList.add("edit-btn");

      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        editingTodoIndex = index;
        openModal(todo);
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "X";
      removeBtn.classList.add("remove-btn");

      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm("Apagar tarefa?")) {
          projectController.removeTodo(index);
          renderTodos();
        }
      });

      div.appendChild(editBtn);
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
      projectController.getCurrentProject().todos[editingTodoIndex] = todo;
    }

    closeModal();
    renderTodos();
  }

  return { init };

})();

export default dom;
