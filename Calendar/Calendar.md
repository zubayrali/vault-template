---
up:
down: 
prev: 
related: 
aliases: 
  - "Journal"
AutoNoteMover: disable
created: 2023-09-13T17:00:12.079Z
tags:
  - folder
title: Calendar
updated: 2024-10-06T22:45:11.871-04:00
---

# Calendar

[[Logbook|<< 📖 Logbook]]

> [!Calendar] Recent Entries (Past 7 Days)
>
> ```dataviewjs
> const dailyNotesFolder = "Calendar/2024/Daily"; // Path to your daily notes folder
> const dailyNotes = dv.pages(`"${dailyNotesFolder}"`)
> .where(p => p.file.path.includes("Calendar/2024/Daily")) // Filter files within the Daily folder
> .where(p => !['Calendar', 'Logbook'].includes(p.file.name)) // Exclude index and logbook
> .sort(p => p.file.ctime, 'desc') // Sort by creation date
> .limit(7); // Limit to the most recent 7 entries
>
> dv.table(
> ["Date", "Entries"],
> dailyNotes.map(p => [
> p.date || p.file.name, // Show the date or filename if date field doesn't exist
> `<strong>${p.Title || p.file.name}</strong><br> ${p.Summary || ""}<br> ${dv.fileLink(p.file.path)}`
> ])
> );
> ```

## History

> [!Tldr]- All Entries
>
> ```dataviewjs
> const dailyNotesFolder = "Calendar/2024/Daily"; // Path to your daily notes folder
> const dailyNotes = dv.pages(`"${dailyNotesFolder}"`)
> .where(p => p.file.path.includes("Calendar/2024/Daily")) // Filter files within the Daily folder
> .where(p => !['Calendar', 'Logbook'].includes(p.file.name)) // Exclude index and logbook
> .sort(p => p.file.ctime, 'desc'); // Sort by creation date
>
> dv.table(
> ["Date", "Entries"],
> dailyNotes.map(p => [
> p.date || p.file.name, // Show the date or filename if date field doesn't exist
> `<strong>${p.Title || p.file.name}</strong><br> ${p.Summary || ""}<br> ${dv.fileLink(p.file.path)}`
> ])
> );
> ```

---

Why do I journal?

## Journal Prompts

1. Share a dream you've had.
2. Is there anything you regret?
3. Things that inspire you.
4. How have you changed in the past year?
5. Things that you are grateful for this week.
6. Where were you one year ago?
7. Daily gratitude.
8. Where were you five years ago?
9. Priorities for: life, year, month, week, today.
10. Write about a book that shaped you.
11. What are you proud of?
12. Favorite books/movies/artists/songs.
13. What was the last thing you celebrated?
14. All the movies/shows you've watched.
15. Happiest memories.
16. When did you last feel truly alive?
17. Favorite people and why.
18. What is a challenge you've overcome?
19. Places to visit.
20. Things to do less often.
21. Things to do more often.
22. The best meals you've cooked.
23. Five odd things you like.
24. Victories and struggles of the past week.
25. List all the possible goals you have for the future, no matter how crazy.
26. Bucket list.
27. Positive affirmations about your body.
28. Positive affirmations about life.
29. Happiest memories. Then refer back to these to write about later.
30. Good deed ideas.
31. Letter to yourself.
32. Letter to those important to me.
33. Letter to someone who you need to forgive.
34. Letter to past self.
35. Letter to future self.
36. Time capsule entry - seal it in an envelope to open in a year or two.
37. Share a childhood memory.
38. What is your earliest memory?
39. What were your favorite activities as a child?
40. What is causing you stress?
41. How do you feel in this moment?
42. What would make me happy right now?
43. What is going right in my life?
44. What do I need to get off my chest?
45. What are you thankful for?
46. What are you scared of?
47. What are you passionate about?
48. What are your values? How could you live more in line with your values?
49. How do you relax?
50. What are the small things that make you happy?
51. Write about your favorite season.
52. How would you like people to describe you?
53. Who do you admire?
54. Who do you love?
55. What gives you a sense of satisfaction?

## References

- [[2023-10-22]] 01:50:39 am ― [The Journalling Techniques that Changed My Life - YouTube](https://youtu.be/dArgOrm98Bk?si=v4eo1zdkA12QCwN0)
