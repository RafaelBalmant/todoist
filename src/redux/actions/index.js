export const insertTask = (title, description) => ({
  type: "INSERT_TASK",
  title,
  description,
});

export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  id,
});

export const updateTask = (id, title, description) => ({
  type: "UPDATE_TASK",
  id,
  title,
  description,
});
