---
fields:
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🟥 Backlog
        "2": 🟨 Active
        "3": 🟩 Finished
    path: ""
    id: J7PB73
  - name: dueDate
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: pILvzF
  - name: eol
    type: Boolean
    options: {}
    path: ""
    id: bffaJb
  - name: title
    type: Input
    options: {}
    path: ""
    id: xqusWE
  - name: description
    type: Input
    options: {}
    path: ""
    id: ZH5F9h
  - name: type
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": On
        "2": Ongoing
        "3": Simmering
        "4": Sleeping
    path: ""
    id: D9VfYc
  - name: efforts
    type: MultiFile
    options:
      dvQueryString: dv.pages("#type/effort")
    path: ""
    id: iuQfrE
version: "2.17"
limit: 40
mapWithTag: false
icon: package
tagNames:
  - initiatives
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - iuQfrE
  - D9VfYc
  - ZH5F9h
  - xqusWE
  - bffaJb
  - pILvzF
  - J7PB73
title: Projects
created: 2024-09-13T23:32:26.000-04:00
updated: 2024-09-15T10:06:38.026-04:00
up:
  - "[[Classes]]"
---