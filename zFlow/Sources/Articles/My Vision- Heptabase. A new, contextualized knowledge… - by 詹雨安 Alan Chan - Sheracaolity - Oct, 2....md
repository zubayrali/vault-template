---
id: 14b454be-1f54-491a-8ef8-550c71a11137
fileClass: Omnivore
title: "My Vision: Heptabase. A new, contextualized knowledge… | by 詹雨安 Alan Chan | Sheracaolity | Oct, 2021 | Medium | Heptabase - Heptabase"
author:
  - 詹雨安 Alan Chan
date_saved: 2024-09-26 10:06:27
date_published: 2021-10-29 02:37:59
url: https://medium.com/heptabase/my-vision-project-meta-e0bedd1467b2
omnivore_url: https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1
site_name: Heptabase
status: Unknown
tags:
  - highlights
  - source/article
---

# My Vision: Heptabase. A new, contextualized knowledge… | by 詹雨安 Alan Chan | Sheracaolity | Oct, 2021 | Medium | Heptabase

## My Vision: The Knowledge Lifecycle

[**English Version**](#38a2) / [**中文版請點擊或往下滑**](#1266)

![](https://proxy-prod.omnivore-image-cache.app/700x376,sWvurAAQRJQaJTLrncE0guyDLJ4laMEsLXe08NfoZJeI/https://miro.medium.com/v2/resize:fit:700/1*qkOAkTe4j5KZKlYjZLLMAA.png)

## Foreword

After finishing the first three articles ([My Vision: The Context](https://medium.com/sheracaolity/my-vision-the-context-c73e29981685), [My Vision: A New City](https://medium.com/sheracaolity/my-vision-a-new-city-c7010f5871d), [My Vision: A Forgotten History](https://medium.com/sheracaolity/my-vision-a-forgotten-history-67ee77e969da#5911)), I will begin introducing the next generation of the internet that I am building, [Heptabase](http://heptabase.com/), from different perspectives starting with this article.

[Heptabase](http://heptabase.com/)’s vision is to create a contextualized knowledge internet, and an ecosystem of tools surrounding this knowledge internet, to augment the individual and collective intelligence of knowledge workers around the world. In this article, I will introduce this vision from the perspective of “The lifecycle of human knowledge work.”

## The lifecycle of human knowledge work

Human knowledge work has a lifecycle: exploring → collecting → thinking → creating → sharing. For example, I explore ideas from Google and [Are.na](http://are.na/) and collect valuable ones to Roam Research. I use Miro to make sense of these ideas, Notion to create content based on my thinking, Medium and Facebook to share it for others to explore.

The drawback to the process is that I’m constantly switching tools. The context of an idea is scattered across different tools, making it hard to trace and integrate. Humans have bad memories. An idea loses most of its meaning if I can’t remember the context behind it.

==[Heptabase](http://heptabase.com/)== ==helps knowledge workers bridge the gaps between different parts of the knowledge lifecycle and preserve the thinking context behind all ideas. The knowledge internet we’re building focuses on optimizing three dimensions:== **==information interoperability, context retrieval, and collective knowledge creation.==**

## Information Interoperability

To build a contextualized knowledge internet, the first step is to ensure information interoperability at all stages in the lifecycle. The current approach to this problem in the software world has two main directions. The first direction is to improve the ability of a single software, common practices are all-in-one apps and plugins. The second direction is to integrate multiple software information, common practices are API and vault.

An **all-in-one app** packs many features to integrate different parts of the lifecycle. Using Notion, for example, users can collect, think, create and share information. The disadvantage is that too many features cause a steep learning curve and make it not particularly good at doing anything.

**Plugins** are extensions that add specific features to the software. In Obsidian, for example, you can use different plugins to display the relation between Markdown files in different ways. Its disadvantages are the plugins are difficult to manage, getting started requires domain knowledge, and too many plugins lead to a lack of usability.

**API** is an interface that allows the software to expose data to others. For example, you can import Github’s data into Discord via the Github API and import Discord’s data into Notion via the Discord API. The disadvantage of APIs is the lack of a unified data interface among all software. If one software wants to connect with ten other software, it has to develop ten customized APIs, wasting a lot of development time.

**==Vault==** ==refers to using File System as a common API for software, allowing different software to read and present the same data differently. For example, Obsidian and Logseq can share Markdown files in the same folder. The disadvantage is that there is no common protocol that defines what software can or cannot do to a vault. If one software has a serious bug that causes data damage, the damage is universal. The more software you use on the same data, the greater the risk.==

==After a thorough study of the above four practices, we came up with three principles for building a contextualized knowledge internet: first, all software must share the== **==same==** **==data schema==**==. Second, all software must adhere to a== **==common protocol==** ==about how to handle data. Third, software must be== **==decoupled from the data==** ==as much as possible, avoiding direct ownership of the data.== ==[Heptabase](http://heptabase.com/)== ==is a system based on these three principles.==

In [Heptabase](http://heptabase.com/), all Meta-apps share the same card database. Each Meta-app presents and uses these cards differently, adding application-specific metadata to the cards as necessary.

==Meta-apps have a lower learning curve than all-in-one apps and higher ease of use than plugins. As the operating system of Meta-apps,== ==[Heptabase](http://heptabase.com/)== ==ensures that all Meta-apps adhere to the same protocol, share the same database and data schema. Such an approach solves the shortcomings of API and Vault.==

## Context retrieval

==To build a contextualized knowledge internet, the second step is to ensure that the thinking context behind all knowledge and ideas can be fully preserved and traced. When you see an idea, you should be able to find how it was created and in what context it was used.==

==For all human knowledge and ideas, there is always an input before there is an output. “Tracing the thinking context” helps us understand what kind of input leads to what kind of output. To achieve this goal, we must integrate the “collecting,” “thinking,” and “creating” stages of the knowledge lifecycle.==

The principle of collecting is “fast.” Ideas are fleeting, and a good collecting tool should have very low friction and can capture ideas as they arise. In [Heptabase](http://heptabase.com/), the Meta-app responsible for this task is called **Journal**. You can pour ideas into it anytime without creating an actual note.

![](https://proxy-prod.omnivore-image-cache.app/700x437,sSb88HR8-iWvmDrdOykLpnZpfQEx1ZrO5xeQ0pHNP-jA/https://miro.medium.com/v2/resize:fit:700/1*Qevok85rMvW341oXnQXPcw.png)

Journal

The principle of thinking and creating is “visual.” To clarify our thinking, we often have to visualize the big picture of our ideas. Moving and reorganizing information on visual space is a critical process to augment thinking. In [Heptabase](http://heptabase.com/), the Meta-app responsible for this task is called **Map**. You can pull out contents from Journal onto an infinity whiteboard space to create cards and arrange these cards to clarify your thinking structure. A card can appear on multiple whiteboards at the same time.

![](https://proxy-prod.omnivore-image-cache.app/700x376,sWvurAAQRJQaJTLrncE0guyDLJ4laMEsLXe08NfoZJeI/https://miro.medium.com/v2/resize:fit:700/1*qkOAkTe4j5KZKlYjZLLMAA.png)

Cards on a whiteboard

Journal and Map, as Meta-apps, do not own the data of cards. They read and reference the card database of [Heptabase](http://heptabase.com/), and the only data they have is metadata for presenting cards. For example, Map does not own the cards’ contents but store the cards’ spatial attributes (shape, color, arrow) on different whiteboards.

This sharing of card databases ensures that each Meta-app is not overly complex but is well integrated into a workflow, avoiding untraceable gaps between different stages of the knowledge lifecycle. When you see a card, you can trace when it was created, what other cards have mentioned it, what whiteboards it appears on, and its position in different mental frameworks.

![](https://proxy-prod.omnivore-image-cache.app/700x438,s8a-uadfXvFZ1CrIUC1f3fghLHqCizYR1UuVZ5de5sys/https://miro.medium.com/v2/resize:fit:700/1*ps-fw_lEUiO2mRQw3JKyfQ.png)

Shared Card Database

## Collective knowledge creation

To build a contextualized knowledge internet, the final step is to let individual thinking interact and enable collective knowledge creation that can’t be done with any individual mind on their own. To achieve this goal, we must integrate the “sharing” and “exploring” stages of the knowledge lifecycle.

When it comes to collective intelligence, the examples that come to our mind are software like Notion and Miro, which put “shared workspace” and “real-time collaboration” in their value proposition. However, there are three main problems with such products that make collective intelligence difficult to emerge.

First, these shared workspaces force everyone in the team to use the same information architecture from the top-down, rather than letting everyone use the one that works for them.

Second, it’s easy to result in disorder when everyone’s thinking overlaps in the same workspace. It’s hard to know which documents are outdated and which are still in use. If many people have edited a document, it’s hard to trace why they edited it and the thinking context behind each editing.

Third, it’s easy to result in groupthink when entering real-time collaboration before the ideas from individuals get matured, which is terrible for independent thinking. For efficiency reasons, collaboration often takes a majority decision approach to develop ideas, resulting in an individual’s unique ideas being unexpressed and stifled early.

At [Heptabase](http://heptabase.com/), we advocate bottom-up “asynchronous sharing” based on “personal workspace.” When knowledge workers want to collaborate, asynchronous sharing from a personal workspace allows them to track each other’s thinking clearer and reuse each other’s ideas and knowledge without disturbing anyone’s independent thinking process.

Instead of sharing an idea, we can share an entire thinking context that uses ideas as a unit. Every idea in each thinking context can be used by other thinking contexts. [Heptabase](http://heptabase.com/)’s context-tracing ability allows you to explore different thinking contexts behind any idea you see.

## Summary

In short, from the perspective of “The lifecycle of human knowledge work,” we are building an ecosystem of tools to help knowledge workers integrate their knowledge lifecycle of exploring → collecting → thinking → creating → sharing. Our guiding principle is to optimize information interoperability, context retrieval, and collective knowledge creation, with the ultimate aim of evolving a contextualized knowledge internet.

In the next article, I will provide a detailed introduction to the structure of the Heptabase system, as well as the roadmap of our iterations for this system.

![](https://proxy-prod.omnivore-image-cache.app/700x376,sWvurAAQRJQaJTLrncE0guyDLJ4laMEsLXe08NfoZJeI/https://miro.medium.com/v2/resize:fit:700/1*qkOAkTe4j5KZKlYjZLLMAA.png)

## 前言

在完成 [My Vision: The Context](https://medium.com/sheracaolity/my-vision-the-context-c73e29981685)、[My Vision: A New City](https://medium.com/sheracaolity/my-vision-a-new-city-c7010f5871d)、[My Vision: A Forgotten History](https://medium.com/sheracaolity/my-vision-a-forgotten-history-67ee77e969da#5911) 這三篇文章後，從這篇文章開始，我將開始用不同的維度去介紹我正在打造的新一代網際網路：[Heptabase](http://heptabase.com/)。

[Heptabase](http://heptabase.com/) 的願景是打造出一個脈絡化的知識網路，以及圍繞在這個知識網路周圍的工具生態，進而強化全世界知識工作者的個體和集體智能。在這篇文章裡，我會用「知識的生命週期」這個維度去介紹這個願景。

## 知識的生命週期

人類的知識工作有固定的生命週期：探索 → 收集 → 思考 → 創作 → 分享。舉例來說，我會從 Google 和 are.na 「探索」想法，將有價值的想法「收集」到 Roam Research，用 Miro 來建立「思考」的架構，在思想成形後用 Notion 來「創作」內容，並將成果「分享」到 Medium 和 Facebook 讓其他人「探索」。

以上這個流程最致命的缺點在於：我不斷地在切換不同的工具，每個想法背後的來龍去脈也散落在不同工具裡，難以追蹤和整合。人類的記憶力很差。當我看到一個想法時，如果無法想起它背後的思考脈絡，這個想法就失去了大部分的意義。

[Heptabase](http://heptabase.com/) 會幫助知識工作者串連知識生命週期中的不同環節，並保存所有想法背後的思考脈絡。我們打造的知識網路會著重在優化以下三個維度：**資訊的互用性、脈絡的回溯、集體知識的創建**。

## 資訊的互用性

要打造一個脈絡化的知識網路，第一件事情是要確保生命週期中所有環節的資訊都能被互相使用。當前軟體世界針對此問題的解法有兩個大方向。第一，提高單一軟體的能力，常見做法有：All-in-one app、Plugins。第二，整合多個軟體的資訊，常見做法有：API、Vault。

**All-in-one app** 指的是在一個軟體中塞入大量功能，滿足盡可能多地使用場景，將生命週期的不同環節整合在一起。舉例來說，Notion 可以收集、思考、創作和分享資訊。缺點是要兼顧太多功能，學習曲線陡峭，單點功能無法做到特別突出。

**Plugins** 指的是以一個軟體為基礎，針對不同場景去擴充特定的功能插件。舉例來說，在 Obsidian 裏，你可以透過不同的插件，將 Markdown 檔案之間的關聯性用不同的方式呈現。缺點是難以管理、對不具備程式基礎的大眾不易理解，無止盡的擴充插件也容易降低軟體的易用性。

**API** 指的是讓軟體對外曝露資料的接口。舉例來說，你可以透過 Github 的 API 將資料導入 Discord、透過 Discord 的 API 將資料導入 Notion。API 的缺點是不同軟體之間缺乏統一的資料接口格式。如果一個軟體想跟另外十個軟體對接，它就必須開發十個客製化的 API 接口，浪費大量的開發時間。

**Vault** 指的是將 File System 當作軟體通用的 API，讓不同軟體用不同的方式呈現、讀寫相同的資料。舉例來說，Obsidian 和 Logseq 可以共用相同資料夾的 Markdown 檔。Vault 的缺點是軟體間缺乏通用協議，只要一個軟體有嚴重的 Bug 導致資料毀損，損失就是全面性的。資料共用的軟體愈多，風險愈大。

在深入研究了以上四種作法後，我們提出了打造脈絡化知識網路的三大原則：第一，所有軟體必須共用相同的**資料格式**。第二，所有軟體必須遵守一套資料處理原則的**通用協議**。第三，軟體必須盡可能地**與資料解耦**，避免直接擁有資料。[Heptabase](http://heptabase.com/) 就是基於這三個原則打造的一個系統。

在 [Heptabase](http://heptabase.com/) 中，所有的 Meta-app 共享著同一個基於卡片的資料庫。每個 Meta-app 都會用不同的方式呈現和使用這些卡片，並在必要時替這些卡片加上 application-specific metadata。

Meta-app 的學習曲線比 All-in-one app 低，易用性比 Plugins 高。而 [Heptabase](http://heptabase.com/) 作爲乘載 Meta-app 的作業系統，可以確保所有 Meta-app 共用相同的資料庫和資料格式、遵循相同的協議，解決 API 和 Vault 的缺點。

## 脈絡的回溯

要打造一個脈絡化的知識網路，第二件事情是要確保所有知識和想法背後的思考脈絡都能被完整保存和追蹤。當你看到一個想法時，你必須能回憶起這個想法是怎麼產生的、又在哪些場景下被使用。

人類創造出的所有知識和想法，都是先有輸入，才有輸出。「追蹤思考脈絡」其實就是在幫助我們暸解什麼樣的輸入造成了什麼樣的輸出。也因此，我們必需打通生命週期中的「收集」、「思考」、「創作」這三個環節。

收集環節的原則是「快」。想法總是一閃即逝的，好的收集工具應有非常低的阻力，在想法產生的當下就能將其捕捉。在 [Heptabase](http://heptabase.com/) 裏，負責這項任務的 Meta App 叫 **Journal**。你隨時打開就可以將想法直接倒入，連創建筆記都不需要。

![](https://proxy-prod.omnivore-image-cache.app/700x437,sSb88HR8-iWvmDrdOykLpnZpfQEx1ZrO5xeQ0pHNP-jA/https://miro.medium.com/v2/resize:fit:700/1*Qevok85rMvW341oXnQXPcw.png)

Journal

思考、創作環節的原則是「視覺」。人的思維架構通常都是在視覺化後才得以明瞭，在空間中移動和重組資訊更是輔助思考的重要程序。在 [Heptabase](http://heptabase.com/) 裏，負責這項任務的 Meta-app 叫 **Map**。你可以將 Journal 的資訊拖曳到無限的白板空間上製作卡片，並透過卡片的排版來釐清思維架構。一張卡片可以同時出現在多個白板裡頭。

![](https://proxy-prod.omnivore-image-cache.app/700x376,sWvurAAQRJQaJTLrncE0guyDLJ4laMEsLXe08NfoZJeI/https://miro.medium.com/v2/resize:fit:700/1*qkOAkTe4j5KZKlYjZLLMAA.png)

白板上的卡片

Journal 和 Map 作為 Meta-app 並不擁有卡片的資料，而是會去引用 [Heptabase](http://heptabase.com/) 的卡片資料庫。它們唯一會擁有的資料，只有一些在呈現卡片機制上需要用的 metadata。舉例來說，Map 不直接擁有卡片內容，但是會存取卡片 Id 在不同白板裡的空間屬性（形狀、顏色、箭頭）。

這種共享資料庫的作法能確保每個 Meta-app 都不過於複雜，但又能很好地整合成一個工作流，避免資訊在不同環節間產生無法追蹤的斷層。當你看到一張卡片時，你既可以追蹤它被創建的時間、它被哪些其他卡片給提及，亦可以追蹤它出現在哪些白板裡頭、處在哪一些思維架構中的什麼位置。

![](https://proxy-prod.omnivore-image-cache.app/700x438,s8a-uadfXvFZ1CrIUC1f3fghLHqCizYR1UuVZ5de5sys/https://miro.medium.com/v2/resize:fit:700/1*ps-fw_lEUiO2mRQw3JKyfQ.png)

共享的卡片資料庫

## 集體知識的創建

要打造一個脈絡化的知識網路，最後一步是讓不同的個體思考能互相激盪，進而讓集體智慧浮現，產出任何人都無法單靠自己創造出的知識。這裡必需打通的是生命週期中的「分享」、「探索」環節。

提到集體智慧，我們第一個聯想到的軟體往往是 Notion、Miro 這類提倡「共同工作區」和「即時協作」的產品。然而，這類產品往往有以下三大問題，讓集體智慧不易浮現。

第一，它們自上而下地強迫大家使用一套相同的資訊架構來整理資訊，而不是讓每個人使用真正適合自己的資訊架構。

第二，每個人的思考狀態互相重疊在同個工作區，容易造成資訊系統的紊亂。你很難知道哪些文檔已經過期了，哪些則還在使用。一份協作文檔如果被很多人編輯過，你也難以追蹤每個人編輯的理由和背後的思考脈絡。

第三，在想法尚未成熟時就進入即時協作狀態，容易造成群體盲思，不利於獨立思考。基於效率考量，協作通常會採多數決的方式去發展想法，導致個人的獨特想法無從表達、受到壓抑，在最初期就被扼殺。

在 [Heptabase](http://heptabase.com/)，我們提倡的是以「個人工作區」為基礎，自下而上的「非同步分享」。當知識工作者們要協作時，他們可以以個人工作區出發去做非同步分享，在不打擾彼此思緒、不犧牲獨立思考的前提下，更好地去追蹤其他人的想法、復用彼此的知識。

人們不再只能分享零散的想法，而是能分享以想法為單位構成的思維架構。每個思維架構中的每個想法，都可以被其他思維架構使用，而 [Heptabase](http://heptabase.com/) 的脈絡追蹤機制將允許你以想法為起點去探索所有使用到特定想法的思維架構。

## 總結

總結來說，在「知識的生命週期」這個維度上，我們希望能透過 [Heptabase](http://heptabase.com/) 的工具來幫助全世界的知識工作者打通「探索 → 收集 → 思考 → 創作 → 分享」的知識生命週期，讓資訊具備原生的互用性、讓想法的脈絡可被追蹤、讓集體知識的創建更為容易，進而演化出一個脈絡化的知識網路。

在下一篇文章，我將深入介紹 Heptabase 這個系統的結構，以及我們迭代這個系統的路線圖。


## Highlights

highlight:: [Heptabase](http://heptabase.com/) helps knowledge workers bridge the gaps between different parts of the knowledge lifecycle and preserve the thinking context behind all ideas. The knowledge internet we’re building focuses on optimizing three dimensions: **information interoperability, context retrieval, and collective knowledge creation.** [⤴️](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1#3c8739eb-81ec-4d62-beb2-35931f6c6cbc) #highlight

highlight:: **Vault** refers to using File System as a common API for software, allowing different software to read and present the same data differently. For example, Obsidian and Logseq can share Markdown files in the same folder. The disadvantage is that there is no common protocol that defines what software can or cannot do to a vault. If one software has a serious bug that causes data damage, the damage is universal. The more software you use on the same data, the greater the risk. [⤴️](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1#fffcc148-133f-4ed3-a86b-6a56ed942f34) #highlight

highlight:: After a thorough study of the above four practices, we came up with three principles for building a contextualized knowledge internet: first, all software must share the **same** **data schema**. Second, all software must adhere to a **common protocol** about how to handle data. Third, software must be **decoupled from the data** as much as possible, avoiding direct ownership of the data. [Heptabase](http://heptabase.com/) is a system based on these three principles. [⤴️](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1#f50eff01-9724-4076-8e2a-e5efaafef245) #highlight

highlight:: Meta-apps have a lower learning curve than all-in-one apps and higher ease of use than plugins. As the operating system of Meta-apps, [Heptabase](http://heptabase.com/) ensures that all Meta-apps adhere to the same protocol, share the same database and data schema. Such an approach solves the shortcomings of API and Vault.

##  [⤴️](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1#84c1b73b-b30f-4f54-8fd5-91dde968a8c1) #highlight

highlight:: To build a contextualized knowledge internet, the second step is to ensure that the thinking context behind all knowledge and ideas can be fully preserved and traced. When you see an idea, you should be able to find how it was created and in what context it was used. [⤴️](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1#db590fdf-870f-4144-a75d-56f90b602e21) #highlight

highlight:: For all human knowledge and ideas, there is always an input before there is an output. “Tracing the thinking context” helps us understand what kind of input leads to what kind of output. To achieve this goal, we must integrate the “collecting,” “thinking,” and “creating” stages of the knowledge lifecycle. [⤴️](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1#a8a4f154-1e41-44d6-bbc6-b9e692ee56c8) #highlight


---


[View in Omnivore](https://omnivore.app/me/my-vision-heptabase-a-new-contextualized-knowledge-by-alan-chan--1922ea793c1)
