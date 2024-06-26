export function extractTime(dateString) {
    if (!dateString) {
        return "Invalid date";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
    return number.toString().padStart(2, "0");
}
