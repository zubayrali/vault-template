---
title: <% tp.file.title %>  
fileClass: effort
type: <%* await tp.system.suggester(["On", "Ongoing", "Simmering", "Sleeping"], false, "Select the effort type: ") %>
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
rank: <%* await tp.system.suggester(["1", "2", "3", "4", "5"], false, "Rank the effort: ") %>
eol: false
tags:
  - efforts
---

# <% tp.file.title %>

> [!summary]+ Files
>
> ```dataview
> TABLE file.ctime AS "Created On", file.mtime AS "Updated On"
> FROM "Efforts/<% tp.file.title %>"
> WHERE file.name != this.file.name
> SORT file.mtime DESC
> ```

> [!multi-column]
>
> > [!todo]+ Todo
> >
> > ```tasks
> > not done
> > path includes "<% tp.file.folder(true) %>"
> > (status.type is not IN_PROGRESS)
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide recurrence rule
> > sort by urgency, scheduled
> > ```
>
> > [!warning]+ Doing
> >
> > ```tasks
> > not done
> > path includes "<% tp.file.folder(true) %>"
> > (status.type is IN_PROGRESS)
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide recurrence rule
> > sort by urgency, due
> > ```
>
> > [!summary]+ Done
> >
> > ```tasks
> > done
> > path includes "<% tp.file.folder(true) %>"
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide priority
> > sort by done reverse
> > ```
