---
title: Tasks in Efforts
created: 2024-09-13T17:22:13.000-04:00
updated: 2024-09-21T11:44:09.135-04:00
---
# Tasks in Efforts

```dataviewjs
const excludedFiles = ["Initiatives"];
const pages = dv.pages('"Efforts/Initiatives"')
    .filter(p => !excludedFiles.includes(p.file.name)) 
    .filter(p => p.file.path.startsWith("Efforts/Initiatives"));

dv.table(
    ["Initiatives", "Tasks"],
    pages
        .map(p => [p.file.link, p.file.tasks.length ? p.file.tasks.length : 0]) 
);
```

```dataviewjs
const excludedFiles = ["Tasks in Efforts", "Tasks", "Tasks in Daily Note", "Efforts", "Initiatives"];
const excludedDirs = ["Efforts/Initiatives"]; 
const pages = dv.pages('"Efforts"')
    .filter(p => !excludedFiles.includes(p.file.name)) 
    .filter(p => !excludedDirs.some(dir => p.file.path.startsWith(dir)))

dv.table(
    ["Efforts", "Tasks"],
    pages
        .map(p => [p.file.link, p.file.tasks.length ? p.file.tasks.length : 0])
);
```