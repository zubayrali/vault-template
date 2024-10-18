---
title: Tasks View
created: 2024-09-23T19:27:35.000-04:00
updated: 2024-09-26T13:03:35.515-04:00
---
# Tasks View

```dataviewjs
const today = moment(); // Get today's date
const year = today.format("YYYY"); // Get the current year
const month = today.format("MM");  // Get the current month in MM format

// Define the folders where tasks might reside
const dailyNoteFolder = `Calendar/${year}/Daily/${month}`;  // Dynamic daily note folder path
const effortsFolder = "Efforts";
const initiativesFolder = "Efforts/Initiatives";

// Function to extract tasks from specified folders
function getTasksFromFolder(folderPath) {
    let tasks = [];
    for (let page of dv.pages(`"${folderPath}"`)) {
        for (let task of page.file.tasks) {
            if (!task.completed) {  // Only include incomplete tasks
                tasks.push({
                    task: task.text,
                    dueDate: task.due ? moment(task.due).format("YYYY-MM-DD") : "No due date",
                    origin: page.file.link
                });
            }
        }
    }
    return tasks;
}

// Collect tasks from Daily Notes, Efforts, and Initiatives
const dailyTasks = getTasksFromFolder(dailyNoteFolder);
const effortTasks = getTasksFromFolder(effortsFolder);
const initiativeTasks = getTasksFromFolder(initiativesFolder);

// Combine all tasks into a single array
const allTasks = [...dailyTasks, ...effortTasks, ...initiativeTasks];

// Display the tasks in a timeline format
dv.table(
    ["Task", "Due Date", "Origin"],
    allTasks
        .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))  // Sort tasks by due date
        .map(t => [t.task, t.dueDate, t.origin])  // Format the output for display
);

```


```dynamic-embed
[[Tasks]]
```


