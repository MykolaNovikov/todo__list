// Action creator to set the current page and items per page
export const SetPage = (pageNumber, itemsPerPage) => ({
  type: 'SET_PAGE',
  payload: pageNumber,
  itemsPerPage: itemsPerPage,
});

// Action creator to set the total number of tasks
export const SetTotalTasks = (totalTasks) => ({
  type: 'SET_TOTAL_TASKS',
  payload: totalTasks,
});

// Action creator to set the JSON representation of todos
export const SetJsonTodos = (json) => ({
  type: 'SET_JSON_TODOS',
  payload: json,
});

// Action creator to set the loading state
export const SetLoading = (loading) => ({
  type: 'SET_LOADING',
  payload: loading,
});

// Action creator to set the data for updating a task
export const SetUpdateData = (updateData) => ({
  type: 'SET_UPDATE_DATA',
  payload: updateData,
});

// Action creator to add a new task
export const AddTask = (newTask) => ({
  type: 'ADD_TASK',
  payload: newTask,
});

// Action creator to delete a task
export const DeleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});
