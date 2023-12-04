import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoContainer from './components/TodoContainer';
import { Hourglass } from 'react-loader-spinner';
import { SetPage, SetTotalTasks } from './components/redux/action';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // Redux setup
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);

  // Local state for managing JSON data and loading state
  const [json, setJson] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalTasks = useSelector((state) => state.totalTasks);

  // Fetch data from the server when the component mounts or when the page changes
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${itemsPerPage}`)
      .then((response) => {
        // Extract total task count from headers and update Redux store
        const totalCountHeader = response.headers.get('X-Total-Count');
        dispatch(SetTotalTasks(Number(totalCountHeader)));
        return response.json();
      })
      .then((json) => {
        // Simulate a delay for loading effect and update local state
        setTimeout(() => {
          setJson(json);
          setLoading(false);
        }, 1000);
      });
  }, [currentPage, itemsPerPage, dispatch]);

  // Function to handle page changes triggered by pagination component
  const handlePageChange = (pageNumber) => {
    dispatch(SetPage(pageNumber, itemsPerPage));
  };

  return (
    <div>
      {/* Conditionally render loading spinner or TodoContainer */}
      {loading ? (
        // Loading spinner component
        <Hourglass visible={true} height="80" width="80" ariaLabel="hourglass-loading" wrapperStyle={{}} wrapperClass="loading" colors={['#306cce', '#72a1ed']} />
      ) : (
        // Main TodoContainer component
        <TodoContainer
          jsonTodos={json}
          handlePageChange={handlePageChange}
          totalTasks={totalTasks}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          SetTotalTasks={SetTotalTasks}
          SetPage={SetPage}
        />
      )}
    </div>
  );
}

export default App;
