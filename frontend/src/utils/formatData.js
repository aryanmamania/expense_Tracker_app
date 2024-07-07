export function formatdate(timestamp) {
    const date = new Date(parseInt(timestamp));

    const options = { day: "2-digit", month: "short", year: "numeric"};
    return date.toLocaleDateString("en-us", options);
}

const timestamp = 1704067200000;
const formattedDate = formatdate(timestamp);
console.log(formattedDate)