import React, { useState, useEffect } from 'react';
import AddTaskForm from './tasks/AddTaskForm';
import ToDo from './tasks/ToDo';
import UpdateForm from './tasks/UpdateForm';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoContainer = (props) => {
    // State variables
    const [toDo, setToDo] = useState([]);
    const [jsonTodos, setJsonTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState('');

    // Calculate total pages for pagination
    const totalPages = Math.ceil(props.totalTasks / props.itemsPerPage);

    useEffect(() => {
        // Set initial tasks from props.jsonTodos
        setToDo(props.jsonTodos);
    }, [props.jsonTodos]);

    // Handle page change for pagination
    const handlePageChange = ({ selected }) => {
        const newPage = selected + 1;
        const newTotalPages = Math.ceil(props.totalTasks / props.itemsPerPage);
        const validPage = Math.max(1, Math.min(newPage, newTotalPages));
        props.handlePageChange(validPage);
    };

    // Handle previous page button click
    const handlePreviousPage = () => {
        const newPage = Math.max(1, props.currentPage - 1);
        props.handlePageChange(newPage);
    };

    // Handle next page button click
    const handleNextPage = () => {
        const newPage = Math.min(totalPages, props.currentPage + 1);
        props.handlePageChange(newPage);
    };

    // Add a new task
    const AddTask = () => {
        if (newTask) {
            let newEntry = {
                id: Date.now(),
                title: newTask,
                completed: false
            };

            // Update the server with the new task
            fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry),
            })
                .then(response => response.json())
                .then(() => {
                    // Fetch the updated paginated list from the server
                    fetchUpdatedData();
                })
                .catch(error => console.error('Error adding task:', error));

            setNewTask('');
        }
    };

    // Delete a task by id
    const deleteTask = (id) => {
        // Delete the task from the server
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Fetch the updated paginated list from the server
                    fetchUpdatedData();
                } else {
                    console.error('Error deleting task:', response.statusText);
                }
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    // Fetch updated data from the server
    const fetchUpdatedData = () => {
        const { dispatch, SetTotalTasks, setJson, setLoading } = props;

        // Fetch the updated list of all tasks from the server
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                const totalCountHeader = response.headers.get('X-Total-Count');
                dispatch(SetTotalTasks(Number(totalCountHeader)));
                return response.json();
            })
            .then((json) => {
                setTimeout(() => {
                    setJson(json);
                    setLoading(false);
                }, 1000);
            })
            .catch(error => console.error('Error fetching updated data:', error));
    };

    // Mark a task as done or undone
    const markDone = (id) => {
        let completeTask = toDo.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setToDo(completeTask);
    };

    // Cancel the update operation
    const cancelUpdate = () => {
        setUpdateData('');
    };

    // Change the task title during update
    const changeTask = (e) => {
        let newEntry = {
            id: updateData.id,
            title: e.target.value,
            completed: updateData.completed ? true : false
        };
        setUpdateData(newEntry);
    };

    // Update the task
    const updateTask = () => {
        let filterRecord = [...toDo].filter((task) => task.id !== updateData.id);
        let updateObject = [updateData, ...filterRecord];
        setToDo(updateObject);
        setUpdateData('');
    };

    return (
        <React.Fragment>
            {/* Todo List header */}
            <h2 className='header'>Todo List</h2>
            <div className='container App'>
                {/* Conditional rendering of AddTaskForm or UpdateForm */}
                {updateData ? (
                    <UpdateForm
                        updateData={updateData}
                        changeTask={changeTask}
                        updateTask={updateTask}
                        cancelUpdate={cancelUpdate}
                    />
                ) : (
                    <AddTaskForm
                        newTask={newTask}
                        setNewTask={setNewTask}
                        AddTask={AddTask}
                    />
                )}
                {/* Display ToDo component */}
                <ToDo
                    toDo={toDo}
                    markDone={markDone}
                    setUpdateData={setUpdateData}
                    deleteTask={deleteTask}
                    currentPage={props.currentPage}
                    itemsPerPage={props.itemsPerPage}
                />
                {/* Pagination component */}
                {totalPages > 1 && (
                    <div className="paginate">
                        <button className='prev-btn' onClick={handlePreviousPage}>Prev</button>
                        <ReactPaginate
                            previousLabel={''}
                            nextLabel={''}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageLinkClassName={'page-link'}
                            forcePage={props.currentPage - 1}
                        />

                        <button className='next-btn' onClick={handleNextPage}>Next</button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default TodoContainer;
