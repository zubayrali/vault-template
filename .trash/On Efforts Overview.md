---
title: On Efforts Overview
created: 2024-10-06T19:28:36.000-04:00
updated: 2024-10-06T19:32:17.544-04:00
---

# On Efforts Overview

> ```dataviewjs
> dv.table(
>     ["Effort Name", "Priority", "Progress", "Next Action"],
>     dv.pages('"Efforts"')
>         .filter(p => p.tags && p.tags.includes("type/effort") && p.type === "On")
>         .map(p => [
>             dv.fileLink(p.file.path),
>             p.rank ? p.rank : "Unranked",
>             p.file.tasks.length > 0
>                 ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}% Complete`
>                 : "No tasks",
>             p.file.tasks.find(t => !t.completed) ? `Next Task: [ ] ${p.file.tasks.find(t => !t.completed).text}` : "All tasks complete!"
>         ])
> );
> ```
