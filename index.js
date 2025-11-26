import { loadFromStorage } from "./modules/storage.js";
import projectController from "./modules/projectController.js";
import dom from "./modules/dom.js";

loadFromStorage();

if (projectController.getProjects().length === 0) {
  projectController.addProject("Default");
}

dom.renderProjects();
dom.renderTodos();