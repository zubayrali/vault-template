function quarterNavigation(tp) {
    function getQuarter(offset = 0) {
        const date = new Date();
        date.setMonth(date.getMonth() + offset * 3);
        const year = date.getFullYear();
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `${year}-Q${quarter}`;
    }

    const lastQuarter = getQuarter(-1);
    const currentQuarter = getQuarter();
    const nextQuarter = getQuarter(1);

    return `<< [[${lastQuarter}|Last Quarter]] | [[${currentQuarter}|Current Quarter]] | [[${nextQuarter}|Next Quarter]] >>`;
}

module.exports = quarterNavigation;
