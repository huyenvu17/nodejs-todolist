const yargs = require("yargs");
const fs = require("fs"); // file system built in nodejs
const chalk = require("chalk");

const {
  readAll,
  createTask,
  readDetail,
  updateTask,
  deleteTask,
} = require("./model/task");

yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});
// node app/index.js create --title="HTML" --description="Basic Language to create template"
yargs.command({
  command: "create",
  builder: {
    title: { type: "string" },
    description: { type: "string" },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("New task created ", newTask);
  },
});

// node app/index.js read-all
yargs.command({
  command: "read-all",
  handler: () => {
    const allTasks = readAll();
    console.log(chalk.blue("all tasks"));
    console.log(allTasks);
  },
});

// node app/index.js read-detail --id="2"
yargs.command({
  command: "read-detail",
  builder: {
    id: { type: "string" },
  },
  handler: (args) => {
    const { id } = args;
    const taskItem = readDetail(id);
    if (taskItem) {
      console.log(taskItem);
    } else {
      console.log(chalk.red("No task found."));
    }
  },
});

// node app/index.js update --id="1" --title="Nodejs" --description="New course"
yargs.command({
  command: "update",
  builder: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log(chalk.green("Task edited successfully"), task);
    } else {
      console.log(chalk.red("No task found."));
    }
  },
});

// node app/index.js delete --id="2"
yargs.command({
  command: "delete",
  builder: {
    id: { type: "string" },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log(chalk.green("Task deleted successfully: "), task);
    } else {
      console.log(chalk.red("No task found."));
    }
  },
});

// save created commands
yargs.parse();
