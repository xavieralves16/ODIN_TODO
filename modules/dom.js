import projectController from "./projectController.js";
import Todo from "./todo.js";

const dom = (() => {
  const projectList = document.querySelector("#project-list");
  const todoList = document.querySelector("#todo-list");

  const addProjectBtn = document.querySelector("#add-project-btn");
  const addTodoBtn = document.querySelector("#add-todo-btn");

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
        if (confirm("Apagar esta tarefa?")) {
          projectController.removeTodo(index);
          renderTodos();
        }
      });

      todoList.appendChild(div);
    });
  }

  // -------- BUTTON ACTIONS --------

  addProjectBtn.addEventListener("click", () => {
    const name = prompt("Nome do novo projeto:");
    if (!name) return;

    projectController.addProject(name);
    renderProjects();
  });

  addTodoBtn.addEventListener("click", () => {
    const title = prompt("Título da tarefa:");
    if (!title) return;

    const dueDate = prompt("Data (YYYY-MM-DD):", "2025-12-31");
    const description = prompt("Descrição:");
    const priority = prompt("Prioridade (low/medium/high):", "low");

    const todo = Todo(title, description, dueDate, priority);
    projectController.addTodoToCurrent(todo);

    renderTodos();
  });

  return {
    renderProjects,
    renderTodos,
  };
})();

export default dom;
