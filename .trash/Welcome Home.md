---
title: ""
created: 2024-10-06T09:57:21.000-04:00
updated: 2024-10-08T17:49:56.224-04:00
---


> [!Training]+ Efforts
> > *What can you work on?*
>
> For a concentrated view, go to [[Efforts]].
>
> Use this to keep priorities in order and quickly adjust your bandwidth as needed.

> [!Box]+ ### 🔥 On
> ```dataview
> TABLE WITHOUT ID
> file.link as "Effort",
> type as "Type",
> rank as "Rank"
> FROM "Efforts"
> WHERE contains(type, "On")
> SORT rank desc
> ```


> [!Box]+ ### ♻️ Ongoing
> ```dataview
> TABLE WITHOUT ID
> file.link as "Effort",
> type as "Type",
> rank as "Rank"
> FROM "Efforts"
> WHERE contains(type, "Ongoing")
> SORT rank desc
> ```

> [!Box]- ### 〰️ Simmering
> Efforts can easily move from `On` to `Simmering` in the background.
>
> ```dataview
> TABLE WITHOUT ID
> file.link as "Effort",
> type as "Type",
> rank as "Rank"
> FROM "Efforts"
> WHERE contains(type, "Simmering")
> SORT rank desc
> ```


> [!Box]- ### 💤 Sleeping
> Efforts in the background, resting until needed.
>
> ```dataview
> TABLE WITHOUT ID
> file.link as "Effort",
> type as "Type",
> rank as "Rank"
> FROM "Efforts"
> WHERE contains(type, "Sleeping")
> SORT rank desc
> ```

![[robert-mccall-black-hole-concept-art copy.jpg|400]]

![[pale-blue-dot-banner.jpg]]
