import Project from "./project.js";
import { saveToStorage } from "./storage.js";

const projectController = (() => {
  let projects = [];
  let currentProjectIndex = 0;

  function getProjects() {
    return projects;
  }

  function getCurrentProject() {
    return projects[currentProjectIndex];
  }

  function setCurrentProject(index) {
    currentProjectIndex = index;
    saveToStorage();
  }

  function addProject(name) {
    projects.push(Project(name));
    saveToStorage();
  }

  function removeProject(index) {
    projects.splice(index, 1);
    saveToStorage();
  }

  function addTodoToCurrent(todo) {
    getCurrentProject().todos.push(todo);
    saveToStorage();
  }

  function removeTodo(index) {
    getCurrentProject().todos.splice(index, 1);
    saveToStorage();
  }

  function loadProjects(data) {
    projects = data;
  }

  return {
    getProjects,
    getCurrentProject,
    setCurrentProject,
    addProject,
    removeProject,
    addTodoToCurrent,
    removeTodo,
    loadProjects,
  };
})();

export default projectController;