---
title: Backlog Initiatives Overview
created: 2024-10-06T19:30:32.000-04:00
updated: 2024-10-06T19:33:31.892-04:00
---
# Backlog Initiatives Overview

> ```dataviewjs
> dv.table(
>     ["Initiative Name", "Status", "Tasks Pending", "Due Date"],
>     dv.pages('"Efforts/Initiatives"')
>         .filter(p => p.tags && p.tags.includes("type/initiative") && p.status === "🟥 Backlog")
>         .map(p => [
>             dv.fileLink(p.file.path),
>             p.status,
>             p.file.tasks.length > 0 ? `${p.file.tasks.length} tasks pending` : "No tasks",
>             p.dueDate ? p.dueDate : "No Due Date"
>         ])
> );
> ```
