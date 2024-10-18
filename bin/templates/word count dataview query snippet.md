---
up:
  - "[[templates]]"
---
```dataview
TABLE 
  file.name as "File Name", 
  round(0.95 * file.size - length(string(file.frontmatter))) as "Est. Character Count", 
  round((0.95 * file.size - length(string(file.frontmatter))) / 5.1) as "Est. Word Count", 
  round(((0.95 * file.size - length(string(file.frontmatter))) / 5.1) / 300) as "Est. Page Count", 
  file.ctime as "Created", 
  file.mtime as "Last Modified"
FROM "blog"
SORT file.name ASC
```
