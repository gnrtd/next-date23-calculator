// Function to add 23 calendar days and adjust for weekend
function getNextAvailableDate(startDate, daysToAdd) {
    const result = new Date(startDate);
    result.setDate(result.getDate() + daysToAdd);

    const dayOfWeek = result.getDay();
    if (dayOfWeek === 6) { // Saturday
        result.setDate(result.getDate() + 2);
    } else if (dayOfWeek === 0) { // Sunday
        result.setDate(result.getDate() + 1);
    }

    return result;
}

// Format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format date as a readable string
function formatReadableDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Calculate and display the result
function calculateWorkDays() {
    const startDateInput = document.getElementById('startDate');
    const resultText = document.getElementById('resultText');

    if (!startDateInput.value) {
        resultText.textContent = 'Please select a start date.';
        return;
    }

    // Parse as local date to avoid time zone issues
    const [year, month, day] = startDateInput.value.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);

    const resultDate = getNextAvailableDate(startDate, 23);

    resultText.innerHTML = `
        Start Date: <strong>${formatReadableDate(startDate)}</strong><br>
        + 23 Calendar Days<br>
        Result Date: <strong>${formatReadableDate(resultDate)}</strong><br>
        (YYYY-MM-DD: ${formatDate(resultDate)})
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    const formattedToday = formatDate(today);
    const startDateInput = document.getElementById('startDate');
    startDateInput.value = formattedToday;

    document.getElementById('calculateBtn').addEventListener('click', calculateWorkDays);

    // Calculate using today's date on load
    calculateWorkDays();
});
