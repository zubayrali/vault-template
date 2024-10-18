---
title: Initiatives
created: 2024-09-11T01:40:44.000-04:00
updated: 2024-10-08T10:34:36.211-04:00
searchTerm:
---

# Initiatives

[[Flow|<< 🌊 Flow]]

> [!increase] Initiatives Summary
> ```dataviewjs
> let totalInitiatives = dv.pages('"Efforts/Initiatives"').where(p => p.tags && p.tags.includes("type/initiative")).length;
> let backlogInitiatives = dv.pages('"Efforts/Initiatives"').where(p => p.status === "🟥 Backlog").length;
> let planningInitiatives = dv.pages('"Efforts/Initiatives"').where(p => p.status === "🟦 Planning").length;
> let activeInitiatives = dv.pages('"Efforts/Initiatives"').where(p => p.status === "🟨 Active").length;
> let finishedInitiatives = dv.pages('"Efforts/Initiatives"').where(p => p.status === "🟩 Finished").length;
> dv.paragraph(`You have **${totalInitiatives} Initiatives** in total.`);
> dv.paragraph(`🟥 **${backlogInitiatives}** initiatives are in the backlog.`);
> dv.paragraph(`🟦 **${planningInitiatives}** initiatives are in the planning phase.`);
> dv.paragraph(`🟨 **${activeInitiatives}** initiatives are currently active.`);
> dv.paragraph(`🟩 **${finishedInitiatives}** initiatives have been successfully completed.`);
> ```


````tabs
top, multi
tab: 🟥 Backlog
```dataviewjs
dv.table(
    ["Initiative Name", "Status", "Due Date", "In Efforts Of", "Progress"],
    dv.pages('"Efforts/Initiatives"')
        .filter(p => p.tags && p.tags.includes("type/initiative"))
        .filter(p => p.status === "🟥 Backlog") // Show only Backlog initiatives
        .map(p => [
            dv.fileLink(p.file.path), // Initiative Name as a link
            p.status,
            p.dueDate ? p.dueDate : "No Due Date",
            p.efforts ? p.efforts.join(", ") : "No efforts listed",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}%`
                : "No tasks"
        ])
);
```

tab: 🟦 Planning
```dataviewjs
dv.table(
    ["Initiative Name", "Status", "Due Date", "In Efforts Of", "Progress"],
    dv.pages('"Efforts/Initiatives"')
        .filter(p => p.tags && p.tags.includes("type/initiative"))
        .filter(p => p.status === "🟦 Planning") // Show only Planning initiatives
        .map(p => [
            dv.fileLink(p.file.path), // Initiative Name as a link
            p.status,
            p.dueDate ? p.dueDate : "No Due Date",
            p.efforts ? p.efforts.join(", ") : "No efforts listed",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}%`
                : "No tasks"
        ])
);
```

tab: 🟨 Active
```dataviewjs
dv.table(
    ["Initiative Name", "Status", "Due Date", "In Efforts Of", "Progress"],
    dv.pages('"Efforts/Initiatives"')
        .filter(p => p.tags && p.tags.includes("type/initiative"))
        .filter(p => p.status === "🟨 Active") // Show only Active initiatives
        .map(p => [
            dv.fileLink(p.file.path), // Initiative Name as a link
            p.status,
            p.dueDate ? p.dueDate : "No Due Date",
            p.efforts ? p.efforts.join(", ") : "No efforts listed",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}%`
                : "No tasks"
        ])
);
```

tab: 🟩 Finished
```dataviewjs
dv.table(
    ["Initiative Name", "Status", "Completion Date", "Progress"],
    dv.pages('"Efforts/Initiatives"')
        .filter(p => p.tags && p.tags.includes("type/initiative"))
        .filter(p => p.status === "🟩 Finished") // Show only Finished initiatives
        .map(p => [
            dv.fileLink(p.file.path), // Initiative Name as a link
            p.status,
            p.dueDate ? p.dueDate : "No Due Date",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}%`
                : "All tasks complete!"
        ])
);
```
````
