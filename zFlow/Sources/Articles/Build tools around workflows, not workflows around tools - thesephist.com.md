---
id: 519d4e4b-f661-4bf1-b3b0-7d5a63d9d4e6
fileClass: omnivore
title: Build tools around workflows, not workflows around tools | thesephist.com - thesephist.com
author:
  - unknown
date_saved: 2024-09-18 11:44:58
date_published: 2020-08-03 20:00:00
url: https://thesephist.com/posts/tools/
omnivore_url: https://omnivore.app/me/build-tools-around-workflows-not-workflows-around-tools-thesephi-19205cee587
site_name: thesephist.com
status: Unknown
tags:
  - highlights
  - source/article
---

# Build tools around workflows, not workflows around tools | thesephist.com

_This March, I spent a couple of days traveling through western Iceland._

![Iceland, part 1](https://proxy-prod.omnivore-image-cache.app/0x0,ssp6Nnvm6SRsyjm_LixbcJHMcUmduQgpaJkkU5iHc7h0/https://thesephist.com/img/iceland.jpg)

While I was there, I thought a lot about tools – mechanical tools, software tools, tools that last, and tools that are fragile. The somber snow-covered scenery made me think about how quickly most of the tools we use today get outdated or replaced, and I thought about the kinds of tools that I’ve been building for myself for the last few years to help organize my life.

I took a walk around _Smábátahöfnin í Keflavík_ (a small marina nearby) that night, unraveled myself into my hotel room, and started writing this post.

I want to share why I build my own tools and how I think we should think about building tools for life. It’s long, so here’s a roadmap. Feel free to jump around.

1. [My tools, today](#my-tools-today)
2. [Workflows > tools](#workflows--tools)  
   1. [Tasks and notes, a false dichotomy](#tasks-and-notes-a-false-dichotomy)  
   2. [Tools that grow with your workflows](#tools-that-grow-with-your-workflows)
3. [Own your load-bearing tools of life](#own-your-load-bearing-tools-of-life)
4. [Cost and other smaller benefits](#cost-and-other-smaller-benefits)
5. [Your tools are an extension of you](#your-tools-are-an-extension-of-you)
6. [Appendix: the technical nitty-gritty](#appendix-the-technical-nitty-gritty)

---

For the last few years, I’ve been on a journey to replace all of the essential digital tools I use for organizing my life with tools I develop, maintain, and deploy myself.

What started with a single-page notes app I made in high school has grown into a constellation of home-grown productivity tools I now rely on for my day-to-day work and learning. Here’s a sample.

**[Ligature](https://github.com/thesephist/polyx#ligature)**, for long-term notes and tasks, goals, brainstorming, project planning, and other important writing.

![Ligature](https://proxy-prod.omnivore-image-cache.app/0x0,su5kVRu_NsY6K7i9ZDVtqf8DGKYwU2QFB0OSgCDd4zbM/https://thesephist.com/img/ligature.jpg) **[Pico](https://github.com/thesephist/pico)**, for more ephemeral notes and tasks that change on a daily basis. I split up my notes into two apps (Ligature and Pico) because it works better for my workflow. (More on this later.)

![Pico](https://proxy-prod.omnivore-image-cache.app/0x0,syyllDIfjAG4Vt8Ew3GvG4rPWAd9sbLj0k3_rqj4SIFE/https://thesephist.com/img/pico.jpg) **[Mira](https://github.com/thesephist/mira)** for keeping track of people I know, why they’re interesting, and what we’ve talked about.

![Mira](https://proxy-prod.omnivore-image-cache.app/0x0,siXpkv2-kULYn1Mt21-PZtMwNGUASq5BopF5Z5hHa-ng/https://thesephist.com/img/mira.png) **[Lovecroft](https://github.com/thesephist/lovecroft)** for managing and sending emails to my [mailing lists](https://thesephist.com/#newsletter).

![Lovecroft](https://proxy-prod.omnivore-image-cache.app/0x0,sdN1kRpoEqB0TXp_uRu7LbISN_vLNgaB6vssl7bG2Ro0/https://thesephist.com/img/lovecroft.jpg) **[Noct](https://github.com/thesephist/polyx#noct)** for backing up and syncing all my files across computers and the cloud. Noct doesn’t have a graphical UI, just a command-line tool.

**[Frieden](https://thesephist.com/posts/frieden/)** as a public availability calendar, showing when I’m free or busy.

![Frieden](https://proxy-prod.omnivore-image-cache.app/0x0,syYtUv9eawcAzupPk-bAa4TqquqL9MmgYCOOt3ZDpk7w/https://thesephist.com/img/frieden.png) **[Thingboard](https://github.com/thesephist/thingboard)** for more free-form Post-its-on-the-wall style brainstorming.

![Thingboard](https://proxy-prod.omnivore-image-cache.app/0x0,s3CwQnnzRQXhnyUjewbH52Wk4SKGaeUYCKWKWMk8952c/https://thesephist.com/img/thingboard.jpg) **[Codeframe](https://codeframe.co/)** for spinning off simple JavaScript experiments like [the word plotter](https://thesephist.com/posts/word-experiments/#word-plotter).

![Codeframe](https://proxy-prod.omnivore-image-cache.app/0x0,sQiU6WFc9dL0NfOYz5XFYrIjwdHsvT1Fd5b5YVAu3jtQ/https://thesephist.com/img/codeframe.jpg) **[draw](https://github.com/thesephist/draw)**, a collaborative whiteboard, best used with my iPad Pro and Apple Pencil.

![Draw](https://proxy-prod.omnivore-image-cache.app/0x0,s8sZpM1Sgtde93qPmCc-mtN9AHceTei5EO5jKXNTqaE4/https://thesephist.com/img/draw.jpg)

Taken together, these apps do almost everything I need to do on my computer to keep myself organized. I don’t use any third-party notes, task management, or contacts apps, though I used to be a big fan of Simplenote and Todoist. I’ve used Notion, Dropbox Paper, Google Docs, and Airtable, but only for working in teams that centralized on them. These days, besides email and calendar, I live within a system of my own tools, and it works well for me.

I don’t want to imply that my tools are objectively better than the professional tools on the market like Notion and Dropbox. Those latter services have more features, and might even be more reliable today. But I think my tools fit me better for a different reason.

## Workflows > tools

Each person’s mind works a little differently, and each person remembers and processes information a little differently. I think we all work at our best when we work with tools that fit how our minds work.

The Eureka moment that some of us feel when we finally find a notes app or todo system that fits our brains – that epiphany happens when the tools we use mirror the way our minds work, and how we want to move information through our lives. Good tools fit perfectly around our workflows, bad tools don’t.

When we resort to having other people build tools for us, the tools they build might never quite perfectly fit our workflows, because they’re not built for our individual minds. When other people build tools for us to use, they either design tools after their own workflows and mental models, or worse, they design it for a mass market of millions of people who all sort-of-but-not-really work and think in similar ways. The result is that mass-market productivity tools don’t fit the way our individual minds are predisposed to work. Instead, to use these tools, we need to bend our workflows to fit around the tools.

My biggest benefit from writing my own tool set is that **I can build the tools that exactly conform to my workflows, rather than constructing my workflows around the tools available to me.** This means the tools can truly be an extension of the way my brain thinks and organizes information about the world around me. My tools aren’t perfect yet, but as they grow and evolve, they’ll only become better reflections of my personal mental models.

For example, one place where my mind works differently than the tools on the market is the task/notes distinction.

### Tasks and notes, a false dichotomy

My workflow used to differentiate between tasks and notes. Tasks were action items that I could reference, take action on, and complete, and then erase from my list. Notes were things that were indefinitely relevant. I would take notes and then come back to reference them many times. A note by itself isn’t actionable.

But once I started building my own tools, I realized this distinction isn’t really the way my brain worked. For me, a huge grey area exists between actionable, completable tasks and purely encyclopedic notes. Here are some things that fall in the grey area for me, pulled from my real, actual notes I took this week.

1. I recently learned some really useful tips about how to grow leaders within a community from the book _[Get Together](https://gettogetherbook.com/)_. I definitely want to act on these learnings at some point in the communities I lead, but I don’t want them cluttering up my todo list because they’re not things I can just complete and check off quickly. I also want to remember these tips forever, even after the first time I act on them.
2. I’ve been brainstorming an idea for a side project related to [symbolic mathematics](https://en.wikipedia.org/wiki/Computer%5Falgebra). I’ve been writing down my inspirations related to this project. I don’t want to tuck it away in my notes, because this is something I want to build soon, but I also don’t want to shove paragraphs of notes into a todo list item.
3. I keep a running list of ideas I have for future blog posts, but I don’t really have a “write the next blog post” task item under which I’d normally put these ideas, because I don’t write on schedule – I just write when I can. Where should these ideas go? They’re sort-of notes and sort-of tasks.

You might think that these are either very clearly todo items or very clearly notes, and that’s ok. But I certainly felt differently, and I realized I was only separating things into these two buckets because my tools forced me to. Before I wrote my own tools, I had a todo app (Todoist) and I had a notes app (Simplenote), and there was nothing in between.

Eventually, I discovered a better mental model for my working style: I ask myself _how immediately_ I need to take action on something.

The way that I see it, everything I learn and jot down is something for me to act on at some point in my life. If I read something that I never thought would influence the way I lived, it wouldn’t have value to me, and I simply wouldn’t write it down. Armed with this insight, these days, I have two different notes apps, and I don’t use a todo list app. These two apps are Ligature and Pico, mentioned above.

One is for notes that are changing often. Day-to-day tasks, things to remember for the next week, even long notes and links related to what I’m working on _now_. The other app is for notes that grow over time, like notes I take while reading books or watching talks, my annual goals, financial planning, reading list, and project outlines. **My two notes apps mirror the way my brain works best – one is my short-term, working memory, the other is my long-term memory.**

I’ve had this system for a few months now, and haven’t felt any need for something better. It doesn’t have the crazy features of some notes services on the market today, but it just works the way my brain does.

But what if I need something different later on in life?

### Tools that grow with your workflows

The other benefit of building homebrew tools is that **tools you build yourself can grow and change as your workflow changes over time**. So if my needs do change over time, my tools can grow to accommodate exactly what I need.

When I first started keeping more organized notes on the interesting people I met, I started with a document in my notes app. Over time, I noticed that these notes followed a pattern: I wrote down their name and primary contact info, how I first met them, what school they went to, and what we talked about the last time we spoke.

So when I built Mira, my own people-manager app, I designed it around that exact workflow I had developed. When I later realized I was also recording people’s Twitter usernames in the description field, I just added a Twitter username field to each contact.

==This is typical of the way I== _==discover==_ ==my workflows.== **==I start with a minimal, bare-bones solution, and try to pick up on patterns and tricks I create for myself. And then I encode those patterns and tricks into the tools over time.==**

This way, my tools can grow organically as my workflows evolve. Neither of them gets in the way of each other most of the time, and I think that was hard to appreciate before I started relying wholly on my own tools.

## Own your load-bearing tools of life

My productivity tools, especially my notes and contacts, are the load-bearing tools of my life. If they break or disappear, it’ll take a long time and a lot of effort for me to rebuild those same workflows and tools, so it’s important that they’re reliable, and that I can depend on them working for me for a long time (measured in years and decades, not quarters).

I’ve written at length about [the importance of ownership](https://thesephist.com/posts/ownership/) before. I want to own the pieces of my life that are most critical, and I want agency over how these tools change over time.

I want these notes and ideas and workflows to stick with me as I grow as a person through the next decades. If I had to bet, I would not put much money on companies like Notion and Airtable serving the same customers and use cases in five years’ time. Perhaps they will, perhaps they won’t – but with my own tools, I have some extra guarantee that I won’t have to migrate away on short notice.

## Cost and other smaller benefits

Besides these more ideological reasons for me to build my own tools, I also enjoy some incidental benefits of creating and hosting my own software. Among them are

**Satisfaction**. Honestly, it just gives me a nice feeling to know that the information most important to me – my journals, notes, reading logs – are stored and managed through code that I wrote, and interfaces I built. It just gives me a nice warm feeling inside, and that counts for something.

**Cost**. I spend a total of $6/month for a single small DigitalOcean server in hosting all of my personal tools, and if DO happens to raise their price, there are many competitive Linux server providers out there. Compared to the cost of paying for software on the market, I like the guarantee of a low price, and the ability to migrate away with no changes to my workflow if prices do change.

**Speed**. My tools don’t have any code or graphics for onboarding, tracking, analytics, upselling, or features I don’t need. My apps have just the code I need for the tool to do the things I need it to do, and that makes all of my tools fast. Even on slower connections, I can get work done no problem. (Have you tried loading Notion on a 3G connection?)

## Your tools are an extension of you

I think it’s easy to underestimate the extent to which our tools can constrain our thinking, if the way they work goes against the way _we_ work. Conversely, great tools that parallel our minds can multiply our creativity and productivity, by removing the invisible friction of translating between our mental models and the models around which the tools are built.

I’m an extreme case. I don’t think everyone needs to go out and build their own productivity tools from the ground-up. But I _do_ think that it’s important to think of the tools you use to organize your life as extensions of your mind and yourself, rather than trivial utilities to fill the gaps in your life.

**Search for tools that view the world and your work the way your mind does, and prefer tools that can grow with you over time, the way that works best for you.**

I think it’s in this kind of a harmonious symbiosis between our tools and our minds that we can do great work and imagine our best futures.

![Iceland, part 2](https://proxy-prod.omnivore-image-cache.app/0x0,s9vV5st1Bqw4Wy3sEwwQS0AHnFmJ6eHf3ONW1b8uYG-Y/https://thesephist.com/img/iceland-2.jpg)

---

## Appendix: the technical nitty-gritty

While writing this post, I also asked [Twitter](https://twitter.com/thesephist/status/1290265986105409537) for any questions related to my personal software suite. Many of them were technical, so I couldn’t address them in the post. Instead, I’ll respond to them here.

> What’s your tech stack? What tools/frameworks are you using?

I host most of my tools on an Ubuntu server on DigitalOcean, and a small minority (static sites) on Vercel and Surge.sh. I used to write backend services in Node.js but have preferred Go recently because it offers a better operations / deployment experience. Some of my apps, like Ligature and Noct, are written in [Ink](https://github.com/thesephist/ink), which is a language I wrote myself and has a runtime also written in Go.

On the frontend, my tools use a web framework I wrote called [Torus](https://github.com/thesephist/torus). For building UI, I frequently reach for [blocks.css](https://thesephist.github.io/blocks.css/) or [paper.css](https://thesephist.github.io/paper.css/), CSS libraries I also built myself.

All web apps are fronted by an Nginx reverse proxy with domains configured on Google Domains and Cloudflare. I depend on my own file sync service for backup and redundancy.

> Is there any service for which you don’t expect to be able to build an alternative?

Email, calendar, and collaborative tools like Google Drive and Figma. A web browser also probably falls in this category, but I have a pipe dream of building a browser from scratch at some point in my life.

> How long do you expect these tools to work? Years? Decades?

Longevity is constantly on my radar as I design these tools, and I want them to last. I don’t use experimental technologies for most of my important tools, and some of them are built on a completely custom stack – everything from the programming language-up is custom written with [Ink](https://github.com/thesephist/ink) and [Torus](https://github.com/thesephist/torus). A bit overkill, but it does guarantee I can easily maintain the software for at least a decade, if not more.

My only hard dependencies are Linux, Node.js, the Go language toolchain, and a web browser.

> Where do you store your data? Are you using a third-party database?

Most of my tools are web apps, and store their data on a SQLite database or in plain text files on the server. But the server’s file storage is synchronized with my other computers (laptops, desktops, and so on) through my file syncing tool called Noct (Dropbox alternative), so I have those files available everywhere.

> How do you handle authentication and security?

Since I’m the only user of these tools, most of my tools are gated behind [HTTP basic auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) and TLS. Some tools have additional security layers.

> How many hours of work have you put into it?

I don’t know, and I don’t really have any way of knowing. If I _had_ to guess, probably at least 1700 hours in total, across 5-6 years. But a lot of that work is redundant, since I’ve re-written some of my tools over time.

---

 ←[_A cellular theory of communities_](https://thesephist.com/posts/cellular-communities/) 

[_It's the programming environment, not the programming language_](https://thesephist.com/posts/programming-environment/) →

 I share new posts on my [newsletter.](https://thesephist.com/#newsletter) If you liked this one, you should consider joining the list.

Have a comment or response? You can [email me.](https://thesephist.com/#get-in-touch)


## Highlights

highlight:: This is typical of the way I _discover_ my workflows. **I start with a minimal, bare-bones solution, and try to pick up on patterns and tricks I create for myself. And then I encode those patterns and tricks into the tools over time.** [⤴️](https://omnivore.app/me/build-tools-around-workflows-not-workflows-around-tools-thesephi-19205cee587#a098bd77-be9a-45ce-b97f-2c4637953694) #highlight


---


[View in Omnivore](https://omnivore.app/me/build-tools-around-workflows-not-workflows-around-tools-thesephi-19205cee587)
