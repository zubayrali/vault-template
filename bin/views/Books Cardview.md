---
cssclasses:
  - cards
  - cards-readline-off
title: Books Cardview
created: 2024-09-08T21:33:52.000-04:00
updated: 2024-10-19T12:06:50.236-04:00
---
# Books Cardview

````tabs
tab: Currently Reading
```dataview
TABLE WITHOUT ID
choice(contains(cover, "http"), ("![coverimg|100](" + cover + ")"), embed(link(cover, "150"))) as "Cover",
file.link,
"<span class='cards-icon'>Author</span>" + author as Author,
"<span class='cards-icon'>Started</span>" + started as Started,
"<span class='cards-icon'>Genres</span>" + genres as Genres,
"<span class='cards-icon'>Rating</span>" + rate as Rating,
(round(number(total) / number(volume) * 100)) + " %" as "Progress %",
number(total) + " of " + number(volume) + " " + units as Progress,
"<progress max='100' value='" + round(number(total) / number(volume) * 100) + "'></progress>" as "Progress Bar"
FROM #source/book
```

tab: Want to Read
```dataview
TABLE WITHOUT ID choice(contains(cover, "http"), ("![coverimg|100](" + cover + ")"), embed(link(cover, "150")) ) as "Cover",
file.link,
"<span " + "class='cards-icon'>" + "Author" + "</span>" + author as Author,
"<span " + "class='cards-icon'>" + "Started" + "</span>" + started as Started,
"<span " + "class='cards-icon'>" + "Genres" + "</span>" + genres as Genres,
"<span " + "class='cards-icon'>" + "Rating" + "</span>"  + rate as Rating,
(round(number(total) / number(volume) * 100)) + " %" as "Progress %",
number(total) + " of " + number(volume) + " " + units as Progress,
"<progress max='100' value='" + round(number(total) / number(volume) * 100) + "'></progress>" as "Progress Bar"
FROM #source/book
WHERE status = "queue"
```

tab: Finished Reading
```dataview
TABLE WITHOUT ID choice(contains(cover, "http"), ("![coverimg|100](" + cover + ")"), embed(link(cover, "150")) ) as "Cover",
file.link,
"<span " + "class='cards-icon'>" + "Author" + "</span>" + author as Author,
"<span " + "class='cards-icon'>" + "Started" + "</span>" + started as Started,
"<span " + "class='cards-icon'>" + "Genres" + "</span>" + genres as Genres,
"<span " + "class='cards-icon'>" + "Rating" + "</span>"  + rate as Rating,
(round(number(total) / number(volume) * 100)) + " %" as "Progress %",
number(total) + " of " + number(volume) + " " + units as Progress,
"<progress max='100' value='" + round(number(total) / number(volume) * 100) + "'></progress>" as "Progress Bar"
FROM #source/book
WHERE status = "done"
```

tab: Abandoned Reading
```dataview
TABLE WITHOUT ID choice(contains(cover, "http"), ("![coverimg|100](" + cover + ")"), embed(link(cover, "150")) ) as "Cover",
file.link,
"<span " + "class='cards-icon'>" + "Author" + "</span>" + author as Author,
"<span " + "class='cards-icon'>" + "Started" + "</span>" + started as Started,
"<span " + "class='cards-icon'>" + "Genres" + "</span>" + genres as Genres,
"<span " + "class='cards-icon'>" + "Rating" + "</span>"  + rate as Rating,
(round(number(total) / number(volume) * 100)) + " %" as "Progress %",
number(total) + " of " + number(volume) + " " + units as Progress,
"<progress max='100' value='" + round(number(total) / number(volume) * 100) + "'></progress>" as "Progress Bar"
FROM #source/book
WHERE status = "abandoned"
```

tab: All Books
```dataview
TABLE WITHOUT ID choice(contains(cover, "http"), ("![coverimg|100](" + cover + ")"), embed(link(cover, "150")) ) as "Cover",
file.link,
"<span " + "class='cards-icon'>" + "Author" + "</span>" + author as Author,
"<span " + "class='cards-icon'>" + "Started" + "</span>" + started as Started,
"<span " + "class='cards-icon'>" + "Genres" + "</span>" + genres as Genres,
"<span " + "class='cards-icon'>" + "Rating" + "</span>"  + rate as Rating,
(round(number(total) / number(volume) * 100)) + " %" as "Progress %",
number(total) + " of " + number(volume) + " " + units as Progress,
"<progress max='100' value='" + round(number(total) / number(volume) * 100) + "'></progress>" as "Progress Bar"
FROM #source/book
```
````
