import { editForm } from "./editTodo"

// Function to retrieve the todo list from localStorage
function getProjectsFromLocalStorage() {
  const projects = localStorage.getItem("projects")
  return projects ? JSON.parse(projects) : {} // Parse the string back into an array, or return an empty array if none exist
}

export function displayTodos(project) {
  const todoContainer = document.getElementById("todos")
  const projectsContainer = document.getElementById("projects")
  const projects = getProjectsFromLocalStorage()

  projectsContainer.textContent = ""
  todoContainer.textContent = ""

  const projectsButton = document.createElement("button")
  projectsButton.textContent = "ALL"
  projectsButton.addEventListener("click", () => {
    displayTodos()
  })
  projectsContainer.appendChild(projectsButton)

  for (const project in projects) {
    const button = document.createElement("button")
    button.textContent = project
    button.addEventListener("click", () => {
      displayTodos(project)
    })
    projectsContainer.appendChild(button)
  }

  if (!project) {
    for (const project in projects) {
      for (const todo in projects[project]) {
        const todoList = document.createElement("li")
        const todoCheckbox = document.createElement("input")
        const todoCheckboxLabel = document.createElement("label")
        todoCheckbox.type = "checkbox"
        todoCheckbox.value = `${projects[project][todo].id}`
        todoCheckboxLabel.textContent = `Task: ${projects[project][todo].title} Description:${projects[project][todo].description}`
        todoList.addEventListener("click", () => {
          displayTodo(project, projects[project][todo].id)
        })
        todoList.appendChild(todoCheckbox)
        todoList.appendChild(todoCheckboxLabel)
        todoContainer.appendChild(todoList)
      }
    }
  } else {
    for (const todo in projects[project]) {
      const todoList = document.createElement("li")
      const todoCheckbox = document.createElement("input")
      const todoCheckboxLabel = document.createElement("label")
      todoCheckbox.type = "checkbox"
      todoCheckbox.value = `${projects[project][todo].id}`
      todoCheckboxLabel.textContent = `${projects[project][todo].title} ${projects[project][todo].description}`
      todoList.addEventListener("click", () => {
        displayTodo(project, projects[project][todo].id)
      })
      todoList.appendChild(todoCheckbox)
      todoList.appendChild(todoCheckboxLabel)
      todoContainer.appendChild(todoList)
    }
  }
}

export function displayTodo(project, id) {
  const projects = getProjectsFromLocalStorage()
  editForm(projects[project][id])
}
