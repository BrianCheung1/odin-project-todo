import { displayTodos } from "./displayTodos"
import { makeTodo } from "./todo.factory"

export function toDoForm() {
  const container = document.getElementById("form-container")

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

  form.id = "makeTodo"

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

    // Create the todo object
    makeTodo(
      titleInput.value,
      descriptionInput.value,
      dueDateInput.value,
      priorityInput.value,
      projectInput.value
    )

    // Display the todos for the specified project
    displayTodos(projectInput.value)
  })

  form.appendChild(title)
  form.appendChild(description)
  form.appendChild(dueDate)
  form.appendChild(priority)
  form.appendChild(project)
  form.appendChild(submitButton)

  container.appendChild(form)
}
