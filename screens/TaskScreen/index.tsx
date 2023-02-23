import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  status: string;
}

const initialTasks: Task[] = [
  { id: "task-1", title: "Task 1", status: "To Do" },
  { id: "task-2", title: "Task 2", status: "In Progress" },
  { id: "task-3", title: "Task 3", status: "Done" },
];

const useLocalStorage = (key: string, initialValue: any) => {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const Task = ({ task, index, handleDeleteTask }: { task: Task; index: number; handleDeleteTask: Function }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {task.title}
            </Typography>
            <Typography color="textSecondary">{task.status}</Typography>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

const AddTask = ({ handleAddTask }: { handleAddTask: Function }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask = { id: uuidv4(), title: title.trim(), status: "To Do" };
      handleAddTask(newTask);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add a task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

// const UpdateTask = ({ task, handleUpdateTask }: { task: Task; handleUpdateTask: Function }) => {
//   const [title, setTitle] = useState(task.title);
//   const [status, setStatus] = useState(task.status);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (title.trim()) {
//       const updatedTask = { ...task, title: title.trim(), status };
//       handleUpdateTask(updatedTask);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Update task" value={title} onChange={(e) => setTitle(e.target.value)} />
//       <select value={status} onChange={(e) => setStatus(e.target.value)}>
//         <option value="To Do">To Do</option>
//         <option value="In Progress">In Progress</option>
//         <option value="Done">Done</option>
//       </select>
//       <





const TaskScreen = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    const sourceColumn = tasks.find((task: { status: any; }) => task.status === source.droppableId);
    const destinationColumn = tasks.find((task: { status: any; }) => task.status === destination.droppableId);

    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [removedTask] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removedTask);

    setTasks((prevState: Task[]) => {
      const newTasks = [...prevState];
      newTasks.map((task) => {
        if (task.id === draggableId) {
          task.status = destination.droppableId;
        }
        return task;
      });
      return newTasks;
    });
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevState: Task[]) => {
      const newTasks = [...prevState];
      const taskIndex = newTasks.findIndex((task) => task.id === updatedTask.id);
      newTasks.splice(taskIndex, 1, updatedTask);
      return newTasks;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevState: Task[]) => {
      const newTasks = prevState.filter((task) => task.id !== taskId);
      return newTasks;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container spacing={3}>
        {["To Do", "In Progress", "Done"].map((status) => {
          const statusTasks = tasks.filter((task: { status: string; }) => task.status === status);
          return (
            <Grid item key={status} xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {status}
              </Typography>
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {statusTasks.map((task: Task, index: number) => (
                      <Task key={task.id} task={task} index={index} handleDeleteTask={handleDeleteTask} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <AddTask handleAddTask={handleAddTask} />
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
};

export default TaskScreen;
