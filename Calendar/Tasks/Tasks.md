---
title: Tasks 
created: 2024-10-06T20:15:12.000-04:00
updated: 2024-10-06T21:00:00.000-04:00
---

# Tasks 

[[Flow|<< 🌊 Flow]]

> [!lightbulb] Tasks Overview Insight 💡
> This dashboard provides a high-level overview of all tasks from both **Efforts** and **Initiatives**, giving you a comprehensive view of your productivity and progress across all areas.

> [!stats] Task Summary 📊
> ```dataviewjs
> let totalTasks = dv.pages().file.tasks.length;
> let completedTasks = dv.pages().file.tasks.filter(t => t.completed).length;
> let openTasks = totalTasks - completedTasks;
> let completionRate = Math.round((completedTasks / totalTasks) * 100);
> let recurringTasks = dv.pages().file.tasks.filter(t => t.text.includes('🔁')).length;
> dv.paragraph(`You have a total of **${totalTasks} tasks** across your vault.`);
> dv.paragraph(`✅ **${completedTasks} tasks** have been completed, achieving a **${completionRate}%** completion rate.`);
> dv.paragraph(`📌 **${openTasks} tasks** are currently open.`);
> dv.paragraph(`🔁 **${recurringTasks} tasks** are set to repeat.`);
> ```

> [!summary] Task Categories 📂
> ```dataviewjs
> dv.table(
>     ["Category", "Task Count"],
>     [
>         ["Efforts", dv.pages('"Efforts"').file.tasks.length],
>         ["Initiatives", dv.pages('"Efforts/Initiatives"').file.tasks.length],
>         ["Miscellaneous", dv.pages().where(p => !p.file.path.includes("Efforts") && !p.file.path.includes("Initiatives")).file.tasks.length]
>     ]
> );
> ```

> [!analysis] Task Breakdown by Status
> ```dataviewjs
> let totalTasks = dv.pages().file.tasks.length;
> let completedTasks = dv.pages().file.tasks.filter(t => t.completed).length;
> let openTasks = totalTasks - completedTasks;
> let recurringTasks = dv.pages().file.tasks.filter(t => t.text.includes('🔁')).length;
> 
> dv.table(
>     ["Task Status", "Count"],
>     [
>         ["Completed Tasks", completedTasks],
>         ["Open Tasks", openTasks],
>         ["Recurring Tasks", recurringTasks]
>     ]
> );
> ```
