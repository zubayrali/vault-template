---
fileClass: Post
tags:
  - type/post
  - theme/xyz
  - target/linkedin
  - target/post
title: <% tp.file.title %>
created: <% moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
updated: <% moment(tp.file.last_modified_date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
aliases: 
visual:
lead:
published: 
views: 0
feedbacks: 0
---

# Post -  <% tp.file.title %>

<!-- Main content of this story -->
✨ Title ✨
...

**References**
...


## Tags for LinkedIn

```
--- TAGS FOR PUBLISHING ---
#edmund2024 #agile #agilität #agilemindset #learning #lernos #lernossketchnoting #newwork #wol #workingoutloud #digitalsketchnotes #doodle #doodles #doodleart #drawing #facilitation #handwriting #lettering #sketchnote #sketchnotes #sketchnoting #storytelling #visualization #visualnotes #visualstorytelling #visualthinking #conceptsapp #powerbi #procreate #knowledgemanagement #obsidian #obsidianmd #pkm #secondbrain #smartsketchnotes #writing #zettelkasten 
```

```
--- STRUCTURED LIST OF TAGS as input to build up list of TAGS FOR PUBLISHING. --

FROM
#edmund2024

AGILE
#agile #agilität #agilecoach #agilemindset 

LEARNING
#learning #lernos #lernossketchnoting #newwork #wol #workingoutloud 

SKETCHNOTES
#digitalsketchnotes #doodle #doodles #doodleart #drawing #facilitation #handwriting #lettering #sketchnote #sketchnotes #sketchnoting #storytelling #visualization #visualnotes #visualstorytelling #visualthinking

TOOLS
#ai #chatgpt #conceptsapp #powerbi #obsidian #obsidianmd #procreate 

ZETTELKASTEN
#knowledgemanagement #pkm #secondbrain #smartsketchnotes #writing #zettelkasten 
```

---
# Back Matter
**Source**
<!--Always keep a link to the source. -->
- based_on::

**References**
<!-- Links to pages not referenced in the content -->
- 

**Terms**
<!-- Links to definition pages. -->
- 

**Target**
<!-- Link to project note or externaly published content. -->
- 

**Feedback**
<!-- Any critique, ideas or questions from social media or other audience? --> 
- 


**Tasks**
<!-- What remains to be done do get the final version? --> 
- [ ] Prepare final version 


**Questions**
<!-- What remains for you to consider in the draft version? --> 
- 

**Latest Posts**
<!-- Links to chapters from e-book -->

```dataview
TABLE 
	file.cday AS "Date"
FROM #target/linkedin 
SORT file.cday DESC
LIMIT 10
```

**Target**
- target::
