const initialState = [];
export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "INSERT_TASK":
      return [
        ...state,
        {
          id: state.length + 1,
          title: action.title,
          description: action.description,
        },
      ];
    case "DELETE_TASK":
      return state.filter((task) => {
        return task.id !== action.id;
      });

    case "UPDATE_TASK":
      return state.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            title: action.title,
            description: action.description,
          };
        }
        return task;
      });
    default:
      return state;
  }
};
