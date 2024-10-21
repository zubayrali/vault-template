---
cssclasses:
  - cards
  - cards-readline-off
up:
  - "[[views]]"
title: Articles Cardview
created: 2024-10-20T20:08:21.000-04:00
updated: 2024-10-20T20:08:33.020-04:00
---
# Articles Cardview

````tabs
tab: Unfinished Reading
```dataview
TABLE WITHOUT ID
file.link AS "Article",
"<span class='cards-icon'>Author</span> " + choice(author, author, "Unknown") AS Author,
"<span class='cards-icon'>Saved On</span> " + date_saved AS "Date Saved",
"<span class='cards-icon'>Published</span> " + date_published AS "Published",
"<span class='cards-icon'>Site</span> " + site_name AS Site,
"<span class='cards-icon'>Status</span> " + choice(status, status, "Unknown") AS Status
FROM "zFlow/Sources/Articles"
WHERE status = "unfinished"
```

tab: Planned Reading
```dataview
TABLE WITHOUT ID
file.link AS "Article",
"<span class='cards-icon'>Author</span> " + choice(author, author, "Unknown") AS Author,
"<span class='cards-icon'>Saved On</span> " + date_saved AS "Date Saved",
"<span class='cards-icon'>Published</span> " + date_published AS "Published",
"<span class='cards-icon'>Site</span> " + site_name AS Site,
"<span class='cards-icon'>Status</span> " + choice(status, status, "Unknown") AS Status
FROM "zFlow/Sources/Articles"
WHERE status = "planned"
```

tab: Finished Reading
```dataview
TABLE WITHOUT ID
file.link AS "Article",
"<span class='cards-icon'>Author</span> " + choice(author, author, "Unknown") AS Author,
"<span class='cards-icon'>Saved On</span> " + date_saved AS "Date Saved",
"<span class='cards-icon'>Published</span> " + date_published AS "Published",
"<span class='cards-icon'>Site</span> " + site_name AS Site,
"<span class='cards-icon'>Status</span> " + choice(status, status, "Unknown") AS Status
FROM "zFlow/Sources/Articles"
WHERE status = "read"
```

tab: Haven't Read
```dataview
TABLE WITHOUT ID
file.link AS "Article",
"<span class='cards-icon'>Author</span> " + choice(author, author, "Unknown") AS Author,
"<span class='cards-icon'>Saved On</span> " + date_saved AS "Date Saved",
"<span class='cards-icon'>Published</span> " + date_published AS "Published",
"<span class='cards-icon'>Site</span> " + site_name AS Site,
"<span class='cards-icon'>Status</span> " + choice(status, status, "Unknown") AS Status
FROM "zFlow/Sources/Articles"
WHERE status = "unread"
```

tab: All Articles
```dataview
TABLE WITHOUT ID
file.link AS "Article",
"<span class='cards-icon'>Author</span> " + choice(author, author, "Unknown") AS Author,
"<span class='cards-icon'>Saved On</span> " + date_saved AS "Date Saved",
"<span class='cards-icon'>Published</span> " + date_published AS "Published",
"<span class='cards-icon'>Site</span> " + site_name AS Site,
"<span class='cards-icon'>Status</span> " + choice(status, status, "Unknown") AS Status
FROM "zFlow/Sources/Articles"
```
````
