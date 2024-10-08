// Retrieve the current counter from localStorage or initialize it to 0
let todoCounter = localStorage.getItem("todoCounter")
  ? parseInt(localStorage.getItem("todoCounter"), 10)
  : 0

// Function to save the current counter back to localStorage
function updateTodoCounter() {
  localStorage.setItem("todoCounter", todoCounter)
}

// Function to save the todo list to localStorage
function saveProjectsToLocalStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects)) // Save as a string in localStorage
}

// Function to retrieve the todo list from localStorage
function getProjectsFromLocalStorage() {
  const projects = localStorage.getItem("projects")
  return projects ? JSON.parse(projects) : {} // Parse the string back into an array, or return an empty array if none exist
}

export function makeTodo(title, description, dueDate, priority, project) {
  const id = ++todoCounter
  updateTodoCounter()
  const newTodo = {
    id,
    title,
    description,
    dueDate,
    priority,
    project,
  }

  const projects = getProjectsFromLocalStorage() // Retrieve current projects
  // Check if the project already exists, if not, create it
  if (!projects[project]) {
    projects[project] = {}
  }

  // Add the todo to the project by ID
  projects[project][id] = newTodo

  // Save the updated projects structure to localStorage
  saveProjectsToLocalStorage(projects)
}
