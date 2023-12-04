import React from 'react';

// Functional component for the update form
const UpdateForm = (props) => {

  return (
    <>
        <div className="row mb-3">
            <div className="col">
                {/* Input field for updating the task title */}
                <input
                    className="form-control form-control-sm"
                    value={props.updateData?.title || ''}
                    onChange={props.changeTask}
                    type="text"
                />
            </div>
            <div className="col-auto">
                {/* Button to update the task */}
                <button className="btn btn-sm btn-info mr-20" onClick={props.updateTask}>
                    Update
                </button>
                {/* Button to cancel the task update */}
                <button className="btn btn-sm btn-danger" onClick={props.cancelUpdate}>
                    Cancel
                </button>
            </div>
        </div>
    </>
  );
}

export default UpdateForm;
