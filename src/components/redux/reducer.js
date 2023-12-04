// Initial state for the Redux store
const initialState = {
  currentPage: 1,
  itemsPerPage: 5,
  jsonTodos: [],
  totalTasks: 0,
  loading: false,
};

// Redux reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Set the current page and items per page
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
        itemsPerPage: action.itemsPerPage,
      };

    // Set the total number of tasks and update current page if necessary
    case 'SET_TOTAL_TASKS':
      return {
        ...state,
        totalTasks: action.payload,
        currentPage: Math.min(state.currentPage, Math.ceil(action.payload / state.itemsPerPage)),
      };

    // Set the JSON representation of todos
    case 'SET_JSON_TODOS':
      return {
        ...state,
        jsonTodos: action.payload,
      };

    // Set the loading state
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    // Add a new task to the state
    case 'ADD_TASK':
        const newTotalTasks = state.totalTasks + 1;
        const newTotalPages = Math.ceil(newTotalTasks / state.itemsPerPage);
        const newCurrentPage = Math.min(state.currentPage, newTotalPages);
    
        return {
            ...state,
            jsonTodos: [action.payload, ...state.jsonTodos],
            totalTasks: newTotalTasks,
            currentPage: newCurrentPage,
        };
    
    // Delete a task from the state
    case 'DELETE_TASK':
        const updatedJsonTodos = state.jsonTodos.filter(task => task.id !== action.payload);
        return {
            ...state,
            jsonTodos: updatedJsonTodos,
            totalTasks: state.totalTasks - 1,
        };

    // Default case: return the current state if the action type is not recognized
    default:
      return state;
  }
};

export default reducer;
