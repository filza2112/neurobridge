import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TaskList({ tasks = [], setTasks }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleToggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);

    fetch("http://localhost:5000/api/tasks/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: updated[index]._id, updates: { completed: updated[index].completed } }),
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].title);
  };

  const handleSaveEdit = (index) => {
    const updated = [...tasks];
    updated[index].title = editText;
    setTasks(updated);
    setEditIndex(null);

    fetch("http://localhost:5000/api/tasks/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: updated[index]._id, updates: { title: editText } }),
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updated = Array.from(tasks);
    const [reorderedItem] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, reorderedItem);
    setTasks(updated);
  };

  const handleDelete = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/delete/${taskId}`, {
        method: "DELETE",
      });

      // Remove from state
      const updated = tasks.filter((task) => task._id !== taskId);
      setTasks(updated);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };


  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No tasks to display.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="task-list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {tasks.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded-xl shadow-md bg-white transition ${snapshot.isDragging ? "bg-blue-50" : ""
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1 mr-4">
                            {editIndex === index ? (
                              <input
                                type="text"
                                className="w-full border p-1 rounded"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                              />
                            ) : (
                              <span className={`${task.completed ? "line-through text-gray-500" : ""}`}>
                                {task.title}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => (editIndex === index ? handleSaveEdit(index) : handleEdit(index))}
                              className="btn-secondary text-sm"
                            >
                              {editIndex === index ? "💾" : "✏️"}
                            </button>

                            <button
                              onClick={() => handleToggleComplete(index)}
                              className={`text-sm px-2 py-1 rounded ${task.completed ? "bg-green-200" : "bg-gray-200"}`}
                            >
                              {task.completed ? "Undo" : "✔️"}
                            </button>

                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-sm bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-2 py-1 rounded"
                            >
                              🗑
                            </button>
                          </div>

                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default TaskList;
