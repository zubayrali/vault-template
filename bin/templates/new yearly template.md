---
fileClass: calendar
title: <% tp.file.title %>
created: <% moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
updated: <% moment(tp.file.last_modified_date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ") %>
journal: calendar
journal-start-date: <% moment().startOf('year').format("YYYY-MM-DD") %>
journal-end-date: <% moment().endOf('year').format("YYYY-MM-DD") %>
journal-section: year
date: <% moment().format("YYYY") %>
tags:
  - calendar/yearly
---

## Year Overview - <% tp.file.title %>

- **Focus Areas**:
  - [ ] Personal Goals
  - [ ] Professional Goals
  - [ ] Learning and Development
  - [ ] Health and Wellbeing
  - [ ] Financial Goals

## **Objectives & Key Results | 3-4 & 1-4**

- [ ] January: [Goal/Project]
- [ ] February: [Goal/Project]
- [-] ... ❌ 2024-09-25


[Future Log Archive] | [Ideas 2023] | [Vision Board 2024]

**Key Actions | 1+**


## Reflection

- What went well?
- What can be improved?
- Lessons learned?

## Gratitude

- List of things you're grateful for this year.
