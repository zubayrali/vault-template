---
category: '<% tp.file.creation_date("YYYY") %>'
created: <% moment(tp.file.creation_date("YYYY-MM-DDTHH:mm:ss.SSSZ")).toISOString() %>
id: <% tp.user.new_uuid() %>
tags:
  - {{VALUE:devlog,archive,topics,swipes,people,projects,meta}}
title: <% tp.file.title %>
updated: <% moment(tp.file.last_modified_date("YYYY-MM-DDTHH:mm:ss.SSSZ")).toISOString() %>
---
