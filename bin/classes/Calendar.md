---
fields:
  - name: journal-start-date
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: evM8Eb
  - name: journal-end-date
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: kSYYYr
  - name: journal-section
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": day
        "2": week
        "3": month
        "4": quarter
        "5": year
    path: ""
    id: Wot3wP
  - name: journal
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": calendar
    path: ""
    id: 3t8Aos
  - name: tags
    type: Multi
    options:
      sourceType: ValuesList
      valuesList:
        "1": Calendar/daily
        "2": Calendar/weekly
        "3": Calendar/monthly
        "4": Calendar/quarterly
        "5": Calendar/yearly
    path: ""
    id: yLieB6
  - name: year
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY
      defaultInsertAsLink: true
      linkPath: ""
    path: ""
    id: zzGCdb
  - name: week
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-[W]WW
      defaultInsertAsLink: true
      linkPath: ""
    path: ""
    id: 77c9ry
  - name: quarter
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-[Q]Q
      defaultInsertAsLink: true
      linkPath: ""
    path: ""
    id: JRs2zT
version: "2.33"
limit: 40
mapWithTag: false
icon: package
tagNames:
  - calendar
  - calendar/yearly
  - calendar/monthly
  - calendar/weekly
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - JRs2zT
  - 77c9ry
  - zzGCdb
  - yLieB6
  - 3t8Aos
  - Wot3wP
  - kSYYYr
  - evM8Eb
up:
  - "[[Classes]]"
---