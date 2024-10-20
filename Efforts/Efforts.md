---
title: Efforts
created: 2024-10-06T12:24:12.000-04:00
updated: 2024-10-20T15:12:46.943-04:00
---

## Tabs

````tabs
top, multi
tab: 🔥 On
```dataviewjs
dv.table(
    ["Effort Name", "Priority", "Progress", "Next Action"],
    dv.pages('"Efforts"')
        .filter(p => p.tags && p.tags.includes("type/effort") && p.type === "On")
        .map(p => [
            dv.fileLink(p.file.path), // Effort Name as a link
            p.rank ? p.rank : "Unranked",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}% Complete`
                : "No tasks",
            p.file.tasks.find(t => !t.completed) ? `Next Task: [ ] ${p.file.tasks.find(t => !t.completed).text}` : "All tasks complete!"
        ])
);
```

tab: ♻️ Ongoing
```dataviewjs
dv.table(
    ["Effort Name", "Priority", "Progress", "Next Action"],
    dv.pages('"Efforts"')
        .filter(p => p.tags && p.tags.includes("type/effort") && p.type === "Ongoing")
        .map(p => [
            dv.fileLink(p.file.path), // Effort Name as a link
            p.rank ? p.rank : "Unranked",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}% Complete`
                : "No tasks",
            p.file.tasks.find(t => !t.completed) ? `Next Task: [ ] ${p.file.tasks.find(t => !t.completed).text}` : "All tasks complete!"
        ])
);
```

tab: 〰️ Simmering
```dataviewjs
dv.table(
    ["Effort Name", "Priority", "Progress", "Next Action"],
    dv.pages('"Efforts"')
        .filter(p => p.tags && p.tags.includes("type/effort") && p.type === "Simmering")
        .map(p => [
            dv.fileLink(p.file.path), // Effort Name as a link
            p.rank ? p.rank : "Unranked",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}% Complete`
                : "No tasks",
            p.file.tasks.find(t => !t.completed) ? `Next Task: [ ] ${p.file.tasks.find(t => !t.completed).text}` : "All tasks complete!"
        ])
);
```

tab: 💤 Sleeping
```dataviewjs
dv.table(
    ["Effort Name", "Priority", "Progress", "Next Action"],
    dv.pages('"Efforts"')
        .filter(p => p.tags && p.tags.includes("type/effort") && p.type === "Sleeping")
        .map(p => [
            dv.fileLink(p.file.path), // Effort Name as a link
            p.rank ? p.rank : "Unranked",
            p.file.tasks.length > 0
                ? `${Math.round(p.file.tasks.filter(t => t.completed).length / p.file.tasks.length * 100)}% Complete`
                : "No tasks",
            p.file.tasks.find(t => !t.completed) ? `Next Task: [ ] ${p.file.tasks.find(t => !t.completed).text}` : "All tasks complete!"
        ])
);
```
````

## Stats

> [!increase] Efforts Stats 📊
> ```dataviewjs
> let totalEfforts = dv.pages('"Efforts"').where(p => p.tags && p.tags.includes("type/effort")).length;
> let activeEfforts = dv.pages('"Efforts"').where(p => p.type === "On").length;
> let ongoingEfforts = dv.pages('"Efforts"').where(p => p.type === "Ongoing").length;
> let simmeringEfforts = dv.pages('"Efforts"').where(p => p.type === "Simmering").length;
> let sleepingEfforts = dv.pages('"Efforts"').where(p => p.type === "Sleeping").length;
> dv.paragraph(`You have **${totalEfforts} Efforts** in total.`);
> dv.paragraph(`🔥 **${activeEfforts}** efforts are currently active.`);
> dv.paragraph(`♻️ **${ongoingEfforts}** efforts are ongoing, sustaining your long-term projects.`);
> dv.paragraph(`〰️ **${simmeringEfforts}** efforts are simmering, waiting for the right time to be reignited.`);
> dv.paragraph(`💤 **${sleepingEfforts}** efforts are currently sleeping or in cold storage.`);
> ```


> [!example]- Tasks
> - [ ] Maintenance
