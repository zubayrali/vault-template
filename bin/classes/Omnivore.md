---
fields:
  - name: id
    type: Input
    options: {}
    path: ""
    id: qfwpUj
  - name: title
    type: Input
    options: {}
    path: ""
    id: FRmjig
  - name: author
    type: MultiFile
    options:
      dvQueryString: dv.pages("#people or fileClass = 'people'")
    path: ""
    id: eHkAD7
  - name: date_saved
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: EKyycl
  - name: date_published
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 6N0ISx
  - name: url
    type: Input
    options: {}
    path: ""
    id: 2qwnaj
  - name: omnivore_url
    type: Input
    options: {}
    path: ""
    id: IGhedR
  - name: site_name
    type: Input
    options: {}
    path: ""
    id: RPPape
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": ongoing
        "2": finished
        "3": abandoned
    path: ""
    id: riiKHr
version: "2.19"
limit: 40
mapWithTag: true
icon: package
tagNames:
  - source/article
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - riiKHr
  - RPPape
  - IGhedR
  - 2qwnaj
  - 6N0ISx
  - EKyycl
  - eHkAD7
  - FRmjig
  - qfwpUj
up:
  - "[[Classes]]"
---