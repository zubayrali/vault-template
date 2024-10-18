---
title: Tasks in Daily Note
created: 2024-09-23T19:27:35.000-04:00
updated: 2024-09-26T13:03:35.524-04:00
---
```dataviewjs
const pages = dv.pages('"Calendar/2024/Daily"');
dv.table(
    ["Journal", "Task Count"],
    pages
        .map(p => [p.file.link, p.file.tasks.length])
);
```