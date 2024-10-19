---
title: Books Dataview
created: 2024-10-19T11:58:58.000-04:00
updated: 2024-10-19T12:03:31.349-04:00
---

# Books Dataview

```dataview
TABLE WITHOUT ID
embed(link(cover)) as "Cover",
file.link as Title,
"<span class='cards-icon'>Author</span>" + author as Author,
"<span class='cards-icon'>Started</span>" + started as Started,
"<span class='cards-icon'>Genres</span>" + genres as Genres,
"<span class='cards-icon'>Rating</span>" + rate as Rating,
"<progress max=100 value=" + round((number(total) / number(volume)) * 100, 2) + "></progress> " +
number(total) + " of " + number(volume) + " " + units +
" (" + round((number(total) / number(volume)) * 100, 2) + "%)" as Progress
FROM #source/book
WHERE volume > 0
SORT file.name ASC
```
