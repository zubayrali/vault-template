let projects = input.projects;
let order    = input.order || 'asc';

// SORT projects by date, priority, title
projects = projects.sort(project => {

    // Get the first date or use null if no date available
    let date = moment((project.dates && Object.keys(project.dates).length) ? Object.keys(project.dates)[0] : null).unix();

    // Get priority, defaulting to 9 if undefined
    let priority = project.priority || 9;

    // Get project title or use the filename as a fallback
    let title = project.title || project.file.name;

    return `${date}-${priority}-${title}`;
}, order);

// Render the project cards
let html = `<section class="project-cards">`;

for (let i = 0; i < projects.length; i++) {

    const project = projects[i];

    // Jump ahead to get the most relevant date.
    let now = moment();

    if (project.status == 'todo' && project.dates && Object.keys(project.dates).length) {
        projectTimestamp = Object.keys(project.dates)[0];
        let projectDate  = moment(projectTimestamp);

        if (projectDate.format('YYYY MM DD') == now.format('YYYY MM DD') || projectDate.unix() <= now.unix()) {
            project.status = 'today';
        }
    }

    html += `<article class="project-card">`;

    // ICON based on status
    if (project.status) {
        html += `<span class="project-card-status" data-status="${project.status}">&nbsp;</span>`;
    }

    // TITLE
    let title = project.title || project.file.name;
    html += `<h1 class="project-card-title"><a href="${project.file.name}" data-href="${project.file.name}" class="internal-link">${title}</a></h1>`;

    // SUBTITLE
    if (project.subtitle) {
        html += `<div class="project-card-meta"><span class="project-card-subtitle">${project.subtitle}</span></div>`;
    }

    // DATES
    if (project.dates && Object.keys(project.dates).length) {
        Object.keys(project.dates).forEach(itemTimestamp => {
            const itemText = project.dates[itemTimestamp];
            const itemDate = moment(itemTimestamp);
            const sameYear = (now.format('YYYY') == itemDate.format('YYYY'));

            let displayDate = itemDate.calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: (sameYear ? 'D MMMM' : 'D MMMM YYYY'),
            });

            html += `<div class="project-card-date">
                        <span class="project-card-date-prefix" title="${itemDate}">${displayDate}</span>
                        <span class="project-card-date-text" title="${itemDate}">${itemText}</span>
                     </div>`;
        });
    }

    // LINKS
    if (project.links && Object.keys(project.links).length) {
        Object.keys(project.links).forEach(linkText => {
            let linkURL = project.links[linkText];
            html += `<a class="project-card-link" href="${linkURL}">${linkText}</a>`;
        });
    }

    html += `</article>`;
}

html += `</section>`;

return html;

