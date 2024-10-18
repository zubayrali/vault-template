---
aliases: 
tags: 
title: Tracker
created: 2024-09-08T12:04:54.000-04:00
updated: 2024-09-08T18:00:10.862-04:00
weight: 108.8
up:
  - "[[views]]"
---

### Weight Tracker (Meta Bind + Tracker Plugin)

%% ```js-engine  
const mb = engine.getPlugin('obsidian-meta-bind-plugin').api;

const weightInput = `\`INPUT[slider(minValue(40), maxValue(150), stepSize(0.1)):weight]\``;  
return engine.markdown.create(`## Weight Log for Today\n\nToday's Weight: ${weightInput}`);  
%% ```

```tracker
searchType: frontmatter
searchTarget: weight
folder: "Calendar/2024/Daily"
summary:
  template: |
    - Minimum Weight: {{min()}} kg
    - Maximum Weight: {{max()}} kg
    - Average Weight: {{average()}} kg
    - Median Weight: {{median()}} kg
```

```tracker
searchType: frontmatter
searchTarget: weight
folder: "Calendar/2024/Daily"
datasetName: Weight
line:
    title: "Weight Progress"
    yAxisLabel: "Weight"
    yAxisUnit: kg
    lineColor: "#d65d0e"
    showPoint: true
    pointColor: "yellow"
    showLegend: false
    yMin: 40  # Minimum value on Y-axis to match typical weight ranges
    yMax: 150  # Maximum value on Y-axis
    yAxisTickInterval: 5  # Interval between ticks on the Y-axis
    xAxisLabel: "Date"
    xAxisTickInterval: 7  # Interval between date ticks (every week)
```

```tracker
searchType: frontmatter
searchTarget: pomodoros
folder: "Calendar/2024/Daily"
datasetName: Pomodoros
line:
    title: "Pomodoro Progress"
    yAxisLabel: "Completed"
    yAxisUnit: "Pomodoros"
    lineColor: "#ff4500"
    showPoint: true
    pointColor: "#ff6347"
    showLegend: false
    yMin: 0
    yMax: 20
    yAxisTickInterval: 1
```

```tracker
searchType: frontmatter
searchTarget: pomodoros
folder: "Calendar/2024/Daily"
summary:
  template: |
    🔥 **Pomodoro Summary**:
    - Minimum Pomodoros: {{min()}}
    - Maximum Pomodoros: {{max()}}
    - Average Pomodoros: {{average()}}
    - Total Pomodoros: {{sum()}}
```

```tracker
searchType: frontmatter
searchTarget: pomodoros, focus
folder: "Calendar/2024/Daily"
line:
	title: "Pomodoro Progress and Focus"
	lineColor: "#ff4500", "#1e90ff"
	yAxisLocation: left, right
	yAxisLabel: "Pomodoros Completed", "Focus Level"
	yMin: 0, 1
	yMax: 20, 10
	showLegend: true
	legendPosition: bottom
```

```tracker
searchType: fileMeta
searchTarget: numWords
folder: "Calendar/2024/Daily"
line:
    title: "Word Count Tracker"
    yAxisLabel: "Words"
    lineColor: red
    showLegend: false
```

```tracker
searchType: fileMeta
searchTarget: numWords
folder: "Calendar/2024/Daily"
summary:
    template: |
        - Total Words: {{sum()}}
        - Average Words per Day: {{average()}}
        - Minimum Words in a Day: {{min()}}
        - Maximum Words in a Day: {{max()}}
```
