
```dataviewjs
const today = moment(); // Get today's date
const year = today.format("YYYY"); // Get the current year
const month = today.format("MM");  // Get the current month in MM format

dv.view("Calendar/Tasks", {
    pages: `"Calendar/${year}/Daily/${month}" OR "Calendar/Tasks/Inbox.md"`,  // Dynamic folder path for daily notes and inbox
    dailyNoteFolder: `Calendar/${year}/Daily/${month}`,  // Dynamic daily note folder path
    dailyNoteFormat: "YYYY-MM-DD",  // Daily note format as YYYY-MM-DD
    inbox: "Calendar/Tasks/Inbox.md",  // Set the inbox file path
    section: "## Daily Log",  // Specify the section in the file where tasks are located
    forward: true,  // Carry forward overdue tasks
    options: "noYear todoFilter todayFocus"  // Filter to show uncompleted tasks and focus on today's tasks
});
```
