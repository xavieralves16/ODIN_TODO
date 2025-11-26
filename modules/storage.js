import projectController from "./projectController.js";

export function saveToStorage() {
  localStorage.setItem(
    "odin-todo-projects",
    JSON.stringify(projectController.getProjects())
  );
}

export function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem("odin-todo-projects"));

  if (!data) return;

  projectController.loadProjects(data);
}