import { displayTodos } from "./displayTodos"
import { makeTodo } from "./todo.factory"

// Function to retrieve the todo list from localStorage
function getProjectsFromLocalStorage() {
  const projects = localStorage.getItem("projects")
  return projects ? JSON.parse(projects) : {} // Parse the string back into an array, or return an empty array if none exist
}

export function editForm(todo) {
  const todoContainer = document.getElementById("todos")
  const form = document.createElement("form")
  const title = document.createElement("label")
  const description = document.createElement("label")
  const dueDate = document.createElement("label")
  const priority = document.createElement("label")
  const project = document.createElement("label")

  const titleInput = document.createElement("input")
  const descriptionInput = document.createElement("input")
  const dueDateInput = document.createElement("input")
  const priorityInput = document.createElement("input")
  const projectInput = document.createElement("input")
  const submitButton = document.createElement("input")

  todoContainer.textContent = ""
  form.id = "editForm"

  title.textContent = "Title"
  description.textContent = "Description"
  dueDate.textContent = "Due Date"
  priority.textContent = "Priority"
  project.textContent = "Project"
  submitButton.value = "Submit"

  titleInput.type = "text"
  description.type = "text"
  dueDateInput.type = "date"
  priorityInput.type = "text"
  projectInput.type = "text"
  submitButton.type = "submit"

  titleInput.value = todo.title
  descriptionInput.value = todo.description
  dueDateInput.value = todo.dueDate
  priorityInput.value = todo.priority
  projectInput.value = todo.project

  titleInput.id = "title"
  description.id = "description"
  dueDate.id = "dueDate"
  priority.id = "priority"
  project.id = "project"

  titleInput.name = "title"
  description.name = "description"
  dueDate.name = "dueDate"
  priority.name = "priority"
  project.name = "project"

  // Add a class for styling each label and input
  title.classList.add("form-label")
  description.classList.add("form-label")
  dueDate.classList.add("form-label")
  priority.classList.add("form-label")
  project.classList.add("form-label")

  titleInput.classList.add("form-input")
  descriptionInput.classList.add("form-input")
  dueDateInput.classList.add("form-input")
  priorityInput.classList.add("form-input")
  projectInput.classList.add("form-input")
  submitButton.classList.add("form-submit")

  titleInput.required = true
  descriptionInput.required = true
  dueDateInput.required = true
  priorityInput.required = true
  projectInput.required = true

  title.appendChild(titleInput)
  description.appendChild(descriptionInput)
  dueDate.appendChild(dueDateInput)
  priority.appendChild(priorityInput)
  project.appendChild(projectInput)

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const newProject = projectInput.value // This is the possibly new project
    const editedTodo = {
      ...todo, // Copy the existing todo properties
      title: titleInput.value, // Update the title from the input field
      description: descriptionInput.value, // Update the description
      dueDate: dueDateInput.value, // Update the due date
      priority: priorityInput.value, // Update the priority
      project: projectInput.value, // Update the project
    }

    const oldProject = todo.project // The old project from which the todo might be moved
    // Update the todo in localStorage
    const projects = getProjectsFromLocalStorage() // Retrieve current projects from localStorage

    // Step 1: Check if the project has changed
    if (newProject !== oldProject) {
      if (!projects[newProject]) {
        projects[newProject] = {}
      }
      projects[newProject][todo.id] = editedTodo

      if (projects[oldProject] && projects[oldProject][todo.id]) {
        delete projects[oldProject][todo.id]

        // If the old project is empty after deletion, delete the project itself
        if (Object.keys(projects[oldProject]).length === 0) {
          delete projects[oldProject]
        }
      }
    } else {
      // If the project didn't change, simply update the todo in the same project
      projects[oldProject][todo.id] = editedTodo
    }

    // Step 4: Save the updated projects back to localStorage
    localStorage.setItem("projects", JSON.stringify(projects))
    // Step 5: Refresh the displayed todos for the new project
    displayTodos(newProject)
  })

  form.appendChild(title)
  form.appendChild(description)
  form.appendChild(dueDate)
  form.appendChild(priority)
  form.appendChild(project)
  form.appendChild(submitButton)

  todoContainer.appendChild(form)
}
