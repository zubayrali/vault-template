````tabs
top, multi

tab: Today
```tasks
not done
(has start date) OR (has scheduled date) OR (has due date)
(due on today OR scheduled on today OR start on today)
(status.type is not IN_PROGRESS)
sort by priority
sort by urgency
hide due date
hide start date
hide created date
hide recurrence rule
hide tags
hide backlinks
hide depends on
hide scheduled date
```

tab: Doing
```tasks
not done
(has start date) OR (has scheduled date) OR (has due date)
(due on today) OR (scheduled on today) OR (is recurring)
status.type is IN_PROGRESS
sort by priority
sort by due
hide id
hide backlinks
hide edit button
hide depends on
hide tags
hide scheduled date
```

tab: Recurring
```tasks
not done
(has start date) OR (has scheduled date) OR (has due date)
is recurring
status.type is TODO
hide due date
hide start date
hide created date
hide recurrence rule
hide tags
hide backlinks
hide depends on
hide scheduled date
```

tab: Completed
```tasks
done on today
(has start date) OR (has scheduled date) OR (has due date)
(due on today) OR (scheduled on today) OR (is recurring)
hide done date
hide tags
hide edit button
hide depends on
hide backlinks
limit 50
short mode
```

````
