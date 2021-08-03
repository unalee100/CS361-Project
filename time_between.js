$(function () {
    $('#timeBetweenForm').mouseup(function () {
        if (!$('#startDate').val() || !$('#endDate').val()) {
            $('#calcTimeBetween').prop('disabled', true);
        } else {
            $('#calcTimeBetween').prop('disabled', false);
        }
    });
}); 

function displayString (num) {
    if (num < 0.05) {
        return "<0.1";
    } 
    return String(Math.round(num * 10) / 10);
}

function getWorkDays(startDate, endDate, endDayAdjustment) {
    let count = 0;
    var curDate = new Date(startDate.getTime());
    var lastDate = new Date(endDate.getTime());
    lastDate.setUTCDate(lastDate.getUTCDate() + endDayAdjustment)
    while (curDate < lastDate) {
        const dayOfWeek = curDate.getUTCDay();
        if (dayOfWeek > 0 && dayOfWeek < 6) {
            count++;
         }
    curDate.setUTCDate(curDate.getUTCDate() + 1);
    }
    return count;
}

document.getElementById('calcTimeBetween').addEventListener('click', function(event){
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    
    if (document.getElementById("includeEnd").checked == false) {
        endDayAdjustment = 0;
    } else {
        endDayAdjustment = 1;
    }

    var differenceMilliseconds = endDate.getTime() - startDate.getTime();
    var workDays = displayString(getWorkDays(startDate, endDate, endDayAdjustment));
    var days = String(differenceMilliseconds / (1000 * 3600 * 24) + endDayAdjustment);
    var weeks = displayString((differenceMilliseconds / (1000 * 3600 * 24) + endDayAdjustment) / 7.0);
    var months = displayString((endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth());
    var years = displayString((differenceMilliseconds / (1000 * 3600 * 24) + endDayAdjustment) / 365.0);
    
    document.getElementById('workDays').textContent = workDays;
    document.getElementById('days').textContent = days;
    document.getElementById('weeks').textContent = weeks;
    document.getElementById('months').textContent = months;
    document.getElementById('years').textContent = years;
    
    document.getElementById('timeBetweenResults').classList.remove('d-none');
    event.preventDefault();
});