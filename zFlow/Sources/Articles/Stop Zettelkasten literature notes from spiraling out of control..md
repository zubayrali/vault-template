---
id: 595dcb7b-9b0a-4722-9f9b-ae5bf8ad0fd6
fileClass: omnivore
title: Stop Zettelkasten literature notes from spiraling out of control. - The Digital Organization Dad
author:
  - Matt Chung
date_saved: 2024-09-18 11:44:31
date_published: 2022-09-07 18:17:19
url: https://digitalorganizationdad.substack.com/p/stop-zettelkasten-literature-notes
omnivore_url: https://omnivore.app/me/stop-zettelkasten-literature-notes-from-spiraling-out-of-control-19205ce7aae
site_name: The Digital Organization Dad
status: Unknown
tags:
  - highlights
  - source/article
---

# Stop Zettelkasten literature notes from spiraling out of control.

### A data driven approach for monitoring your knowledge management system

Is your knowledge management system becoming a scary place? Are you taking too many notes that never make their way into your [Zettelkasten](https://zettelkasten.de/posts/overview/)/Knowledge Management System? Below I describe my mechanism — metrics, alarms, dashboards — for putting my digital organization system on cruise control.

[![](https://proxy-prod.omnivore-image-cache.app/1456x543,shDEovQ0DCEH6yLeI2i4pc48_ec63fxbavvh_2wQnst4/https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F471c719b-d42b-48db-9c8d-400f0784fb32_2728x1018.png)](https://substackcdn.com/image/fetch/f%5Fauto,q%5Fauto:good,fl%5Fprogressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F471c719b-d42b-48db-9c8d-400f0784fb32%5F2728x1018.png)

Dashboard view for my reference manager: Zotero

By design, Zettelkasten, a system for note-taking and personal knowledge management, aims to help you produce large volumes of written work. This methodical approach was invented by [Luhmann](https://en.wikipedia.org/wiki/Niklas%5FLuhmann) for increasing your number of written publications. With this system, you take a bottom-up approach to writing, starting with conducting research. As you pour through references, you scribble down notes: literature notes. Then, after allowing some time (see below for ideal amount of time) to pass, you reflect on these notes and think about where they might fit fit within your larger knowledge management system. Finally,you process these information bites and convert them into permanent notes that live in your knowledge database.

**But** it's easy to get stuck in research mode.

> _==“The idea is not to collect, but to develop ideas, arguments and discussions”==_
> 
> ==Sönke Ahrens==

While conducting research and expanding our personal knowledge base is instrumental to amassing knowledge and forming building blocks for our writing, it's not our primary objective. Don't let your mind trick you into believing that research alone moves the needle on creating written work. It's a trap.

And you're not alone.

You need a way to break out of the loop, a way to prevent an ever expanding mountain of literature notes building up.

## Not a tooling problem

When stuck in research mode, I end up with an insurmountable number of unprocessed notes - it’s a digital mess. I find myself creating distance from my knowledge management system. My brain tricks me into believing that the root of the problem is that I haven't discovered the right tool or application.

My mind wanders and attention drifts away from writing (my only real goal), and I start procrastinating. I'll go online and search forums for the latest and greatest tools that promise to solve all of my organization woes. I'll search [reddit](https://www.reddit.com/r/Zettelkasten/). Then the [Zettelkasten forum](https://forum.zettelkasten.de/). Then I start tinkering with different note taking applications: [Bear](https://bear.app/). [Obsidian](https://obsidian.md/). [Zettlr](https://www.zettlr.com/). [Roam Research](https://roamresearch.com/). Back to Bear.

Ah — so frustrating!

Because here's the thing ... it's not a tooling problem.

What's missing?

A mechanism for managing literature notes.

## Bye good intentions. Hello mechanism

Ideally, we never let our literature notes go beyond the point that they become unmanageable. But simply reminding ourselves to regularly process them relies on good intentions.

> _==“Good intentions never work, you need good mechanisms to make anything happen”==_
> 
> _==- Jeff Bezos==_

Sonke Ahrin, author of "[How to take Smart Notes](https://www.soenkeahrens.de/en/takesmartnotes)", suggests that you go through and process your notes "ideally once a day and before you forget what you meant."

But what happens when you do forget?

Allowing too much time (i.e. beyond 2 days) to pass before processing puts you in a precarious position. You’ll likely find yourself in one of the following situations:

1. You no longer understand what you originally meant in the note
2. The contents of the note now seem irrelevant.

I no longer rely on my good intentions. Instead, here's the mechanism I put together:

* Publish **metrics** that track various metadata within my digital organization system
* Trigger **alarms** and **notifications** that notify me when specific metrics breach thresholds that I have tuned over time
* **Dashboard** to periodically review digital organization trends

## Metrics, alarms, dashboard

Since building a monitoring system, my literature notes have stopped spiraling out of control. The system tracks my digital organization system and follows key metrics (e.g. number of unprocessed notes, maximum age of unprocessed note), alarms on certain thresholds (e.g. no more than 5 unprocessed notes at a given time, no more than 2 days elapsed since a note has been created), and displays a web based dashboard for me to review historical trends.

### Metrics

These metrics are measured, collected, and published in the background. This requires no intervention on my part: that's deliberate — the entire analytics system needs to be as hands off and as frictionless as possible.

[![](https://proxy-prod.omnivore-image-cache.app/1456x556,s9-O_4kNCJR7ns43VTQPABzNVS_IvUS_mEQem3V4Ucxs/https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Feafa488e-4e11-4dc6-bddb-8ebb124c1b00_1600x611.png)](https://substackcdn.com/image/fetch/f%5Fauto,q%5Fauto:good,fl%5Fprogressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Feafa488e-4e11-4dc6-bddb-8ebb124c1b00%5F1600x611.png)

Unprocessed note age climbing towards threshold

### Alarms

When I receive the slack notification, I know that my digital organization system requires my attention. In the example above, an alarm fired because more than two days had passed since I created some notes, unreviewed and unprocessed.

[![](https://proxy-prod.omnivore-image-cache.app/1394x810,sFx292rYyBJXD_IyYYXxvA66t7TfixkAwz_kzK6opOYQ/https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf7dc448-93ca-4b7c-894f-a999793188af_1394x810.png)](https://substackcdn.com/image/fetch/f%5Fauto,q%5Fauto:good,fl%5Fprogressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf7dc448-93ca-4b7c-894f-a999793188af%5F1394x810.png)

Cloudwatch Alarm firing off due to threshold (2 days) triggering

### Web dashboard for Zotero

Once I receive that notification, I log into my web based reference ([Zotero](http://zotero.org/)) manager dashboard and pinpoint which notes need to be processed. The dashboard lists all the notes I've created, along with their title, the number of days they've been unprocessed, and the body of the note:

[![](https://proxy-prod.omnivore-image-cache.app/1318x366,sKdPPr4EnVwRzIcIofL40Hv32PtP75NkfCI-cvEJ-jTw/https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F74b5056a-d40f-463f-a57e-a76b687fec62_1318x366.png)](https://substackcdn.com/image/fetch/f%5Fauto,q%5Fauto:good,fl%5Fprogressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F74b5056a-d40f-463f-a57e-a76b687fec62%5F1318x366.png)

Web dashboard for managing literature notes

## Closing the gap

Once the unprocessed notes have been identified, I process them.

I launch Zotero reference manager, find the note, and process it, converting the note(s) into permanent note(s). Once all the notes that require processing have been processed (by adding a _note\_status:processed_ tag in Zotero), the alarm will eventually recover and I get positive confirmation in the form of another Slack message:

[![](https://proxy-prod.omnivore-image-cache.app/1456x816,sn3_vaoR2icHIhozCR3ekag9ipHXx_Muilge73CuRX6M/https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd76e797f-a96b-40af-8ac6-952b9c077659_1496x838.png)](https://substackcdn.com/image/fetch/f%5Fauto,q%5Fauto:good,fl%5Fprogressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd76e797f-a96b-40af-8ac6-952b9c077659%5F1496x838.png)

## Summary

I no longer rely on good intentions when it comes to digital organization hygiene. Instead, I've developed a robust mechanism that monitors my knowledge management system fitness and when it needs my attention, I'm notified and engaged.

What systems or mechanisms have you put in place to keep your digital organization strategy in check?

## References

Ahrens, Sönke. _How to Take Smart Notes: One Simple Technique to Boost Writing, Learning and Thinking_, 2022.


## Highlights

highlight:: _“The idea is not to collect, but to develop ideas, arguments and discussions”_

Sönke Ahrens [⤴️](https://omnivore.app/me/stop-zettelkasten-literature-notes-from-spiraling-out-of-control-19205ce7aae#ef8e749c-ae5b-4b36-83bb-96cc0e91c7e9) #highlight

highlight:: _“Good intentions never work, you need good mechanisms to make anything happen”_

_\- Jeff Bezos_ [⤴️](https://omnivore.app/me/stop-zettelkasten-literature-notes-from-spiraling-out-of-control-19205ce7aae#3f1e3519-37fb-406f-922e-9fd366b31f4d) #highlight


---


[View in Omnivore](https://omnivore.app/me/stop-zettelkasten-literature-notes-from-spiraling-out-of-control-19205ce7aae)
