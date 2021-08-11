$(function () {
    $('#daysFromForm').mouseup(function () {
        if (!$('#startDate').val()) {
            $('#calcDate').prop('disabled', true);
        } else {
            $('#calcDate').prop('disabled', false);
        }
    });
});

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

document.getElementById('calcDate').addEventListener('click', function(event){
    var days = new Array(7);
    days[6] = "Sunday";
    days[0] = "Monday";
    days[1] = "Tuesday";
    days[2] = "Wednesday";
    days[3] = "Thursday";
    days[4] = "Friday";
    days[5] = "Saturday";

    var startDate = new Date(document.getElementById("startDate").value);
    var addOrSubtract = 1;
    if (document.getElementById('subtract').checked) {
        addOrSubtract = -1;
    }
    var monthsToAdd = (parseInt(document.getElementById("months").value) + parseInt(document.getElementById("years").value) * 12) * addOrSubtract;
    var daysToAdd = (parseInt(document.getElementById("days").value) + parseInt(document.getElementById("weeks").value) * 7) * addOrSubtract;

    var endDate = new Date(addMonths(startDate, monthsToAdd));
    endDate.setUTCDate(endDate.getUTCDate()+daysToAdd);
    console.log(endDate.toUTCString());

    document.getElementById('date').textContent = endDate.toUTCString();
    
    document.getElementById('results').classList.remove('d-none');
    event.preventDefault();
});