---
title: Logbook
created: 2024-09-20T15:03:24.000-04:00
updated: 2024-10-20T16:45:33.769-04:00
---

# Logbook

[[Calendar/Calendar|<< 📆 Calendar]]

This logbook aggregates logs recorded in your daily notes, it uses the `Gratitude::`, `Motivation::`, `Achievement::`, `Title::` and `Summary::`.
In Weekly note, `highlight::` is used.

---

> [!Rainbow]- Gratitude Log
> ```dataview
> TABLE WITHOUT ID
> date AS "Date",
> Gratitude as "Gratitude"
> FROM "Calendar/2024/Daily"
> WHERE Gratitude
> SORT file.mtime DESC
> ```

> [!Rocket]- Motivation Log
> ```dataview
> TABLE WITHOUT ID
> date AS "Date",
> Motivation as "Motivation"
> FROM "Calendar/2024/Daily"
> WHERE Motivation
> SORT file.mtime DESC
> ```

> [!Award]- Achievements Log
> ```dataview
> TABLE WITHOUT ID
> date AS "Date",
> Achievement as "Achievement"
> FROM "Calendar/2024/Daily"
> WHERE Achievement
> SORT file.mtime DESC
> ```

> [!Sun]- Daily Reviews
> ```dataview
> TABLE WITHOUT ID
> date AS "Date",
> Title AS "Review Title",
> Summary as "Day Summary"
> FROM "Calendar/2024/Daily"
> WHERE Title AND Summary
> SORT file.mtime DESC
> ```
