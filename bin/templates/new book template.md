---
fileClass: book
id: {{DATE:YYYYMMDDHHmmss}}
title: "{{title}}"
aliases:
lead: "{{subtitle}}"
author: "[[<%= book.authors.map(author => author.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')).join(', ') %>]]"
authors: {{authors}}
category: {{category}}
cover: "{{coverUrl}}"
isbn10: "{{isbn10}}
isbn13: "{{isbn13}}"
publisher: "{{publisher}}"
publish_date: {{publishDate}}
total: 0
created: {{DATE:YYYY-MM-DDTHH:mm:ss.SSSZ}}
updated:
started: {{DATE:YYYY-MM-DD}}
finished:
genres: "[[{{categories}}]]"
status: queue
bibliography:  +++ Copy here from Zotero +++
rating: ⭐️⭐️⭐️
volume: {{totalPage}}
timestamp: 0
units: pages
tags:
  - source/book
aliases:
---

![cover|150]({{coverUrl}})

# {{Title}}

by [[{{author}}]]

> [!summary]
{{description}}

## Table of Contents
<!--Link to table of contents (TOC) -->

## Notes

### Thesis

- **Definition**:
- **Key Points**:
- **Arguments/Support**:

### Antithesis

- **Definition**:
- **Key Points**:
- **Arguments/Support**:

### Synthesis

- **Definition**:
- **Key Points**:
- **Arguments/Support**:


## Highlights

## Quotes

<!-- Notable quotes with reference to their page or location -->

## Bibliography

> `VIEW[{bibliography}][text]`

## Backmatter


---

> [!sticky]+ Notes Cited
>
> ```dataview
> TABLE WITHOUT ID file.link AS "Links to this page" FROM "" WHERE contains(file.outlinks, this.file.link)
> ```
