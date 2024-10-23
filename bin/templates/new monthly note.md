---
fileClass: calendar
title: <% tp.file.title %>
created: <% moment(tp.file.creation_date()).format("YYYY-MM-DD") %>
updated: <% moment(tp.file.last_modified_date()).format("YYYY-MM-DD") %>
journal: <% tp.file.title %>
journal-start-date: <% moment().startOf('month').format("YYYY-MM-DD") %>
journal-end-date: <% moment().endOf('month').format("YYYY-MM-DD") %>
journal-section: month
date: <% moment().format("YYYY-MM-DD") %>
tags:
  - calendar/monthly
cssclasses:
---

[[Calendar/Calendar|<< 📆 Calendar]] | [[Logbook|📖 Logbook >>]]

```calendar-nav
```

<br />

---

## Monthly Initiatives

- [ ] Get a certification
- [ ] Write one blog series
- [ ] Fast for 2 days every week

#### Myself

- Planning for the next week: Key actions for self-improvement.

## Evening Review
## Wheel of Life

%% Use QuickAdd for wheekly weel of life %%

## Stand-Out Days

```dataviewjs
// Get today's date
let today = dv.date("today");

// Get the start and end of the current month
let startOfMonth = today.startOf("month");
let endOfMonth = today.endOf("month");


// Get all daily notes within the current month that have aliases
let pages = dv.pages('"Calendar/' + today.year + '/Daily/' + today.toFormat("MM") + '"')
    .where(p => p.aliases && p.aliases.length > 0 && p.file.day >= startOfMonth && p.file.day <= endOfMonth)
    .sort(p => p.file.day, 'asc');  // Sort by date ascending

// Display the table with date and aliases
dv.table(["Date", "What stood out"], 
    pages.map(p => [p.file.day.toFormat("yyyy-MM-dd"), p.aliases.join(", ")])
);

```