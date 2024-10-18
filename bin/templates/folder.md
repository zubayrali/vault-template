---
tags: folder
title: <% tp.file.title %>
created: <% moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
updated: <% moment(tp.file.last_modified_date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
---

```dataview
TABLE 
  file.ctime as "Created"
FROM "<% tp.file.folder(true) %>"
SORT file.name ASC
```

---

*Generated on: <% moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>*
