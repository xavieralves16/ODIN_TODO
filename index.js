import { loadFromStorage } from "./modules/storage.js";
import projectController from "./modules/projectController.js";
import dom from "./modules/dom.js";


document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();

  if (projectController.getProjects().length === 0) {
    projectController.addProject("Default");
  }

  dom.init(); 
});