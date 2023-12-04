import React from "react";

// Functional component for the Add Task form
const AddTaskForm = (props) => {
    return (
        <>
            <div className="row mb-3">
                <div className="col">
                    <input className="form-control form-control-lg" value={props.newTask} onChange={(e) => props.setNewTask(e.target.value)} type="text" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-lg btn-primary" onClick={props.AddTask}>
                        Add task
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddTaskForm