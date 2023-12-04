import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

// Functional component for displaying the ToDo list
const ToDo = (props) => {
  // Destructure props
  const toDoList = props.toDo || [];
  const currentPage = props.currentPage;
  const itemsPerPage = props.itemsPerPage;

  return (
    <>
      {/* Map through the ToDo list and display each task */}
      {toDoList.map((task, index) => {
        // Calculate the task number based on current page and items per page
        const taskNumber = (currentPage - 1) * itemsPerPage + index + 1;
        
        return (
          <React.Fragment key={task.id}>
            <div className="col taskBg">
              {/* Task content with conditional styling for completed tasks */}
              <div className={task.completed ? 'done' : ''}>
                <span className="taskNumber">{taskNumber}</span>
                <span className="taskText">{task.title}</span>
              </div>
              <div className="iconsWrap">
                {/* Icon to mark task as completed or not completed */}
                <span
                  title="Completed / Not Completed"
                  onClick={(e) => props.markDone(task.id)}
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                {/* Icon to edit task (shown only for incomplete tasks) */}
                {task.completed ? null : (
                  <span
                    title="Edit"
                    onClick={() =>
                      props.setUpdateData({
                        id: task.id,
                        title: task.title,
                        completed: task.completed ? true : false,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}
                {/* Icon to delete task */}
                <span title="Delete" onClick={() => props.deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ToDo;
