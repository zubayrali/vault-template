---
fileClass: calendar
title: <% tp.file.title %>
created: <% moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
updated: <% moment(tp.file.last_modified_date("YYYY-MM-DDTHH:mm:ss.SSSZ")).format() %>
journal: calendar
journal-start-date: <% moment().startOf('week').format("YYYY-MM-DD") %>
journal-end-date: <% moment().endOf('week').format("YYYY-MM-DD") %>
date: <% moment().format("YYYY-MM-DD") %>
journal-section: week
tags:
  - calendar/weekly
cssclasses:
---

[[Calendar/Calendar|<< 📆 Calendar]] | [[Logbook|📖 Logbook >>]]

```calendar-nav
```

---

## Weekly Initiatives

- [ ] Start a new book
- [ ] Write one blog post
- [ ] Gym 4 days/week

#### Myself

- Planning for the next week: Key actions for self-improvement.


## Wheel of Life

%% Use QuickAdd for wheekly weel of life %%


## Review
> [!multi-column]
>
>> [!Training]- Monthly Trackers
>> ```dynamic-embed
>> ![[Weekly Tracker]]
>>```
>

<br />

> [!multi-column]
>
>> [!Keaton]- This Week’s Highlights
>>
>> ```dataviewjs
>> let today = dv.date("today");
>> let oneWeekAgo = today.minus({ days: 7 });
>> 
>> dv.table(["Date", "Highlight"], 
>>     dv.pages('"Calendar/2024/Daily"')
>>     .where(p => p.highlight && p.file.day >= oneWeekAgo && p.file.day <= today)
>>     .sort(p => p.file.day, 'desc') 
>>     .map(p => [p.file.day.toFormat("yyyy-MM-dd"), p.highlight])
>> );
>> ```
>
>> [!Rainbow]- This Week’s Wins
>>
>> ```dataviewjs
>> let today = dv.date("today");
>> let lastWeek = today.minus({ days: 7 });
>> 
>> let pages = dv.pages('"Calendar/2024/Daily"')
>>     .where(p => p.Achievement && p.file.day >= lastWeek && p.file.day <= today)
>>     .sort(p => p.file.day, 'desc');
>> 
>> dv.table(["Date", "Achievement"], 
>>     pages.map(p => [p.file.day.toFormat("yyyy-MM-dd"), p.Achievement])
>> );
>> ```
