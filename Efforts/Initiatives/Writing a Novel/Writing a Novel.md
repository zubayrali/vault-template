---
title: Writing a Novel
description: Writing my first novel, focusing on character development and plot.
fileClass: initiative
created: 2024-10-06T00:00:00.000-04:00
updated: 2024-10-06T19:35:41.040-04:00
dueDate: 2024-10-26
status: 🟨 Active
eol: 
efforts:
tags:
  - type/initiative
---

# Writing a Novel

> `VIEW[{description}][text]`

> [!year] Time
> - What tasks or steps require immediate attention today?
> - How can I organize my time each day to make steady progress on this initiative?

> [!training] Energy
> - What activities energize me, and how can I incorporate them into my daily routine to stay engaged in this initiative?

> [!brain] Mindset
> - What challenges or uncertainties are blocking progress, and how can I tackle them?
> - What shifts in my thinking will help me stay flexible and focused on the big picture?

> [!increase] Process
> - What setbacks could arise, and how can I plan around them to keep the initiative on track?
> - What daily habits or actions will keep me moving toward completion?

> [!trophy] Long-term Impact
> - What small wins can I aim for today? This week? This month?
> - How will completing this initiative contribute to my larger objectives or overall vision?

> [!example]+ Tasks
> - [ ] Write 500 words daily 🔁 every day 🛫 2024-10-08
> - [ ] Revise character backstories 🔁 weekly 🛫 2024-10-11
> - [ ] Join a writers' group for feedback 🔁 monthly 🛫 2024-10-20

> [!summary]- Files
>
> ```dataview
> TABLE file.ctime AS "Created On", file.mtime AS "Updated On"
> FROM "Efforts/Initiatives/Writing a Novel"
> WHERE file.name != this.file.name
> SORT file.mtime DESC
> ```


> [!multi-column]
>
> > [!todo]- Todo
> >
> > ```tasks
> > not done
> > path includes {{query.file.path}}
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
> > [!warning]- Doing
> >
> > ```tasks
> > not done
> > path includes {{query.file.path}}
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
> > [!summary]- Done
> >
> > ```tasks
> > done
> > path includes {{query.file.path}}
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide recurrence rule
> > hide priority
> > sort by done reverse
> > ```
