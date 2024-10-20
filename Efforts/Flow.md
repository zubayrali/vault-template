---
title: Flow
created: 2024-10-06T12:24:12.000-04:00
updated: 2024-10-18T10:33:23.034-04:00
---


Your launchpad and home base. That's here. That's **home**.

> [!question] What does the Flow Dashboard do?
> This dashboard provides a bird's-eye view of your current **Efforts** and **Initiatives**, guiding you to take meaningful actions. Click on any entry to drill down into tasks and details.
>
> Use this to keep priorities in order and quickly adjust your bandwidth as needed.

> [!Map]- zFlow
> > *Where would you like to go?*
>
> - To do inspired work, go to [[Add]], [[Relate]], and [[Communicate]].
>
> ![[mckie-ship-and-sea-mid-narrow-.jpg|400]]
> - To launch into your knowledge, try out: [[Library]] | [[People Map]] | [[Sources Map]].
> - To catalyze your mind, go to your [[Thinking Map]] and [[Concepts Map]].
> - For grounding, [[Life Map]]. For training, [[Ideaverse Map]]. For rules, [[Meta PKM]].

> [!Calendar]- Calendar
> > *What's on your mind?*
>
> - To journal, focus your day, or to capture a spark, hit `Cmd-d` or `Ctrl-d`.
> - To capture specific type of things, go to [[Calendar/Logbook|Logbook]].
>
> ![[robert-mccall-space-ship-launch-narrower.png|400]]
> - To broadly reflect, go to [[Plan and Review]].
> - To learn more about time travel, go to [[Calendar/Calendar]].

> [!Training]- Efforts
> > *What can you work on?*
>
> For a concentrated view, go to [[Efforts]].
>
> Use this to keep priorities in order and quickly adjust your bandwidth as needed.
>
>
> ```dynamic-embed
> [[Efforts]]
> ```
>
> ```dynamic-embed
> [[Initiatives]]
> ```

> [!note] Stats 📊
> ```dataviewjs
> let totalEfforts = dv.pages('"Efforts"').length;
> let totalInitiatives = dv.pages('"Efforts/Initiatives"').length;
> let totalTasks = dv.pages().file.tasks.length;
> let completedTasks = dv.pages().file.tasks.filter(t => t.completed).length;
> let progressRate = Math.round((completedTasks / totalTasks) * 100);
> dv.header(2, "Current Flow Summary");
> dv.paragraph(`You have **${totalEfforts} Efforts** and **${totalInitiatives} Initiatives** currently active.`);
> dv.paragraph(`There are **${totalTasks} tasks** in total, with **${completedTasks} tasks** completed (${progressRate}% completion rate).`);
> ```


[[Efforts|<< 🪄 Efforts]] | [[Efforts/Initiatives/Initiatives|🎖️ Initiatives >>]]
