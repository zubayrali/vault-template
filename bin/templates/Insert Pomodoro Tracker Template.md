<%\*
// Get the current year and month
let currentYear = moment().format("YYYY");
let currentMonth = moment().format("MM");
let currentMonthStart = moment().startOf('month').format("YYYY-MM-DD");
let currentMonthEnd = moment().endOf('month').format("YYYY-MM-DD");

// Prompt for yMin and yMax values for Pomodoro tracking if you want dynamic range, otherwise use defaults
let defaultYMin = "0";
let defaultYMax = "20";

let yMin = await tp.system.prompt(`Enter the minimum Pomodoro value for the Y-axis (default is ${defaultYMin}):`, defaultYMin);
let yMax = await tp.system.prompt(`Enter the maximum Pomodoro value for the Y-axis (default is ${defaultYMax}):`, defaultYMax);

// Tracker template for the Pomodoro tracking progress (line chart)
let pomodoroTrackerBlock = `\`\`\`tracker
searchType: frontmatter
searchTarget: pomodoros
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
datasetName: Pomodoros
line:
title: "Pomodoro Progress for ${currentMonth}/${currentYear}"
yAxisLabel: "Pomodoros Completed"
lineColor: "#ff4500"
showPoint: true
pointColor: "#ff6347"
showLegend: false
yMin: ${yMin}
    yMax: ${yMax}
    yAxisTickInterval: 1
\`\`\`
\`\`\`tracker
searchType: frontmatter
searchTarget: pomodoros
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
datasetName: Pomodoros
startDate: ${currentMonthStart}
endDate: ${currentMonthEnd}
summary:
template: |

    - Minimum Pomodoros: {{min()}}
    - Maximum Pomodoros: {{max()}}
    - Average Pomodoros: {{average()}}
    - Total Pomodoros: {{sum()}}

\`\`\``;

// Add the Pomodoro tracker block to the template result
tR += pomodoroTrackerBlock;
%>
