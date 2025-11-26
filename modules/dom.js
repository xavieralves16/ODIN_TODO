import projectController from "./projectController.js";
import Todo from "./todo.js";

const dom = (() => {
  const projectList = document.querySelector("#project-list");
  const todoList = document.querySelector("#todo-list");
  const newTodoBtn = document.querySelector("#new-todo-btn");

  function renderProjects() {
    const projects = projectController.getProjects();
    projectList.innerHTML = "";

    projects.forEach((project, i) => {
      const el = document.createElement("div");
      el.textContent = project.name;

      el.addEventListener("click", () => {
        projectController.setCurrentProject(i);
        renderTodos();
      });

      projectList.appendChild(el);
    });
  }

  function renderTodos() {
    const project = projectController.getCurrentProject();
    todoList.innerHTML = "";

    project.todos.forEach((todo, i) => {
      const el = document.createElement("div");
      el.classList.add("todo");

      el.innerHTML = `
        <div class="todo-title">${todo.title}</div>
        <div class="todo-date">${todo.dueDate}</div>
      `;

      el.addEventListener("click", () => expandTodo(todo));

      todoList.appendChild(el);
    });
  }

  function expandTodo(todo) {
    alert(`
      Title: ${todo.title}
      Description: ${todo.description}
      Due: ${todo.dueDate}
      Priority: ${todo.priority}
    `);
  }

  return {
    renderProjects,
    renderTodos,
  };
})();

export default dom;