//enable calculate button only if user has enter an input date
$(function () {
    $('#timeBetweenForm').mousemove(function () {
        if (!$('#startDate').val() || !$('#endDate').val()) {
            $('#calcTimeBetween').prop('disabled', true);
        } else {
            $('#calcTimeBetween').prop('disabled', false);
        }
    });
}); 

//return a num as a string rounded to nearest tenth
function getRoundedString(num) {
    if (num < 0.05) {
        return "<0.1";
    } 
    return String(Math.round(num * 10) / 10);
}

//return the workdays between two days including the end day if applicable
function getWorkDays(startDate, endDate, endDayAdjustment) {
    var count = 0;
    var curDate = new Date(startDate.getTime());
    var lastDate = new Date(endDate.getTime());
    lastDate.setUTCDate(lastDate.getUTCDate() + endDayAdjustment)
    while (curDate < lastDate) {
        var dayOfWeek = curDate.getUTCDay();
        if (dayOfWeek > 0 && dayOfWeek < 6) {
            count++;
         }
        curDate.setUTCDate(curDate.getUTCDate() + 1);
    }
    return count;
}

//return the months between two days
function getMonths(startDate, endDate) {
    var months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months += endDate.getMonth() - startDate.getMonth();
    return months;
}

//calculate and display results
document.getElementById('calcTimeBetween').addEventListener('click', function(event){
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    var endDayAdjustment = 0;
    if (document.getElementById("includeEnd").checked == true) {
        endDayAdjustment = 1;
    }
    var differenceMilliseconds = endDate.getTime() - startDate.getTime();

    var workDays = String(getWorkDays(startDate, endDate, endDayAdjustment));
    document.getElementById('workDays').textContent = workDays;
    
    var days = String(differenceMilliseconds / (1000 * 3600 * 24) + endDayAdjustment);
    document.getElementById('days').textContent = days;

    var weeks = displayString((differenceMilliseconds / (1000 * 3600 * 24) + endDayAdjustment) / 7.0);
    document.getElementById('weeks').textContent = weeks;
    
    var months = displayString(getMonths(startDate, endDate));
    document.getElementById('months').textContent = months;

    var years = displayString((differenceMilliseconds / (1000 * 3600 * 24) + endDayAdjustment) / 365.0);
    document.getElementById('years').textContent = years;
    
    document.getElementById('timeBetweenResults').classList.remove('d-none');
    event.preventDefault();
});