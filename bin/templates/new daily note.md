---
fileClass: calendar, daily
title: <% tp.file.title %>
created: <% moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
updated: <% moment(tp.file.last_modified_date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
journal: calendar
journal-start-date: <% moment().format("YYYY-MM-DD") %>
journal-end-date: <% moment().format("YYYY-MM-DD") %>
journal-section: day
date: <% moment().format("YYYY-MM-DD") %>
tags:
  - calendar/daily
---

[[Calendar/Calendar|<< 📆 Calendar]] | [[Logbook|📖 Logbook >>]]

```calendar-nav
```

<br />

> [!multi-column]
>
> > [!Recycle]- This Day
> > 
> > ```dynamic-embed
> > ![[Tasks Tabs Today]]
> > ```
> > ```dynamic-embed
> > ![[view Memento Mori Day]]
> > ```
>
> > [!Calendar]- Upcoming
> >
> > ```dynamic-embed
> > ![[Tasks Tabs Upcoming]]
> > ```

> [!Focus] Daily Focus
> What is the one thing I can do that will make everything else easier or unnecessary?

> [!Work] Work
> Timeblock 1 hour of deep work (focus block)

## Daily Log

%%
Thoughts, Ideas & Tasks
%%

## Evening Review



## Recent Activity

> [!multi-column]
>
> > [!Cone] Recently Created
> >
> > ```dataview
> > list
> > from "" and !"zFlow/Sources"
> > Sort file.ctime DESC
> > limit 7
> > ```
>
> > [!Todo] Recently Updated
> >
> > ```dataview
> > 	list
> > 	from ""
> > 	Sort file.mtime DESC
> > 	limit 7
> > ```
