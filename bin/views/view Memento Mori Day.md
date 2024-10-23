---
up:
  - "[[views]]"
---
```dataviewjs
const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const totalSecondsInDay = 86400;
const secondsPassed = (now - midnight) / 1000;
const percentagePassed = (secondsPassed / totalSecondsInDay) * 100;
const hoursPassed = now.getHours();

// Create progress bars
const passedBar = `<progress value="${percentagePassed.toFixed(2)}" max="100"></progress>`;
dv.paragraph(`${passedBar} ${percentagePassed.toFixed(2)}
`);
```