export const insertTask = (title, description) => ({
  type: "INSERT_TASK",
  title,
  description,
});

export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  id,
});
