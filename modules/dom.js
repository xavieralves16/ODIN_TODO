import projectController from "./projectController.js";
import Todo from "./todo.js";

const dom = (() => {

  let projectList;
  let todoList;
  let addProjectBtn;
  let addTodoBtn;

  function init() {
    projectList = document.querySelector("#project-list");
    todoList = document.querySelector("#todo-list");
    addProjectBtn = document.querySelector("#add-project-btn");
    addTodoBtn = document.querySelector("#add-todo-btn");

    addProjectBtn.addEventListener("click", newProject);
    addTodoBtn.addEventListener("click", newTodo);

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

      projectList.appendChild(div);
    });
  }

  function renderTodos() {
    const project = projectController.getCurrentProject();
    todoList.innerHTML = "";

    project.todos.forEach((todo, index) => {
      const div = document.createElement("div");
      div.classList.add("todo");
      div.textContent = `${todo.title} (${todo.dueDate})`;

      div.addEventListener("click", () => {
        if (confirm("Apagar tarefa?")) {
          projectController.removeTodo(index);
          renderTodos();
        }
      });

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
    const title = prompt("Título:");
    if (!title) return;

    const dueDate = prompt("Data (YYYY-MM-DD):", "2025-12-31");
    const description = prompt("Descrição:");
    const priority = prompt("Prioridade:");

    const todo = Todo(title, description, dueDate, priority);
    projectController.addTodoToCurrent(todo);

    renderTodos();
  }

  return { init };

})();

export default dom;
