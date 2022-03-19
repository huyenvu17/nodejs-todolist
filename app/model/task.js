const fs = require("fs"); // file system built in nodejs
const readAll = () => {
  const buffer = fs.readFileSync("task.json");
  const tasks = JSON.parse(buffer.toString());
  return tasks;
};

const readDetail = (id) => {
  const tasks = readAll();
  const taskItem = tasks.find((task) => task.id === id);
  return taskItem;
};

const createTask = (title, description) => {
  const newTask = {
    id: Math.random().toString(),
    title,
    description,
  };
  console.log(newTask);
  let taskList = readAll();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

const updateTask = (id, title, description) => {
  let taskList = readAll();
  const index = taskList.findIndex((task) => task.id === id);
  if (index !== -1) {
    const oldTask = taskList[index];
    const updateTask = { ...oldTask, title, description };
    taskList[index] = updateTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return updateTask;
  } else {
    return false;
  }
};

const deleteTask = (id) => {
  const tasks = readAll();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task = tasks[index];
    const newTasks = tasks.filter((task) => task.id !== id);
    //tasks.splice(index, 1);
    fs.writeFileSync("task.json", JSON.stringify(tasks));
    return task;
  } else {
    return false;
  }
};

module.exports = {
  readAll,
  readDetail,
  createTask,
  updateTask,
  deleteTask,
};
