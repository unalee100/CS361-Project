//enable calculate button only if user has enter a start date
$(function () {
    $('#daysFromForm').mousemove(function () {
        if (!$('#startDate').val()) {
            $('#calcDate').prop('disabled', true);
        } else {
            $('#calcDate').prop('disabled', false);
        }
    });
});

//return the date the specified number of months after the inputDate
//Source: https://stackoverflow.com/questions/12793045/adding-months-to-a-date-in-javascript
function addMonths(date, months) {
    var inputDate = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != inputDate) {
        date.setDate(0);
    }
    return date;
}

// calculate and return results
document.getElementById('calcDate').addEventListener('click', function(event){
    var startDate = new Date(document.getElementById("startDate").value);
    var addOrSubtract = 1;
    if (document.getElementById('subtract').checked) {
        addOrSubtract = -1;
    }

    var monthsToAdd = parseInt(document.getElementById("months").value);
    monthsToAdd += parseInt(document.getElementById("years").value) * 12
    monthsToAdd *= addOrSubtract;
    var endDate = new Date(addMonths(startDate, monthsToAdd));

    var daysToAdd = parseInt(document.getElementById("days").value);
    daysToAdd += parseInt(document.getElementById("weeks").value) * 7;
    daysToAdd *= addOrSubtract;
    endDate.setUTCDate(endDate.getUTCDate() + daysToAdd);

    document.getElementById('date').textContent = endDate.toDateString();
    document.getElementById('results').classList.remove('d-none');
    event.preventDefault();
});