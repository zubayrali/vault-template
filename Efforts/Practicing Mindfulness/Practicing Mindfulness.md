---
title: Practicing Mindfulness
fileClass: effort
description: Integrating mindfulness into my daily routine to improve focus and reduce stress.
type: On
created: 2024-10-06T00:00:00.000-04:00
updated: 2024-10-06T19:00:55.738-04:00
rank: 4
eol: false
tags: [type/effort, health, mental]
---

# Practicing Mindfulness

> `VIEW[Integrating mindfulness into my daily routine to improve focus and reduce stress.][text]`


> [!year] Time
> - What time-consuming activities should I reduce to stay focused on this effort?
> - How will I allocate my time each week to ensure consistent progress toward this effort?

> [!training] Energy
> - What activities energize me, and how can I incorporate them into my routine while pursuing this effort?
> - How can I change my environment to make progress on this effort more effortless?

> [!brain] Mindset
> - What limiting beliefs might slow my progress, and how can I reframe them to support this effort?
> - How can I develop a mindset that embraces challenges and learns from obstacles during this effort?

> [!increase] Process
> - What setbacks might I encounter, and how can I prepare for them?
> - What specific daily or weekly actions will keep me on track with this effort?

> [!trophy] Long-term Impact
> - What habits or actions can I consistently maintain for 10 days? 30 days? 100 days?
> - How will progress on this effort contribute to my broader objectives or overall life direction?

> [!example]+ Tasks
> - [ ] Meditate for 10 minutes 🔁 every morning 🛫 2024-10-08
> - [ ] Take a mindful walk 🔁 weekly 🛫 2024-10-10
> - [ ] Attend a mindfulness workshop 🛫 2024-11-01


> [!summary]- Files
>
> ```dataview
> TABLE file.ctime AS "Created On", file.mtime AS "Updated On"
> FROM "Efforts/Practicing Mindfulness"
> WHERE file.name != this.file.name
> SORT file.mtime DESC
> ```

> [!multi-column]
>
> > [!todo]- Todo
>> ```tasks
>> not done
>> path includes {{query.file.path}}
>> (status.type is not IN_PROGRESS)
>> short mode
>> hide due date
>> hide backlink
>> hide edit button
>> hide start date
>> hide scheduled date
>> hide recurrence rule
>> sort by urgency, scheduled
>> ```
>
> > [!warning]- Doing
>> ```tasks
>> not done
>> path includes {{query.file.path}}
>> (status.type is IN_PROGRESS)
>> short mode
>> hide due date
>> hide backlink
>> hide edit button
>> hide start date
>> hide scheduled date
>> hide recurrence rule
>> sort by urgency, due
>> ```
>
> > [!summary]- Done
>> ```tasks
>> done
>> path includes {{query.file.path}}
>> short mode
>> hide due date
>> hide backlink
>> hide edit button
>> hide start date
>> hide scheduled date
>> hide recurrence rule
>> hide priority
>> sort by done reverse
>> ```
