$(function () {
    $('#dayOfWeekForm').click(function () {
        if (!$('#inputDate').val()) {
            $('#calcDay').prop('disabled', true);
        } else {
            $('#calcDay').prop('disabled', false);
        }
    });
}); 

document.getElementById('calcDay').addEventListener('click', function(event){
    var inputDate = new Date(document.getElementById("inputDate").value);
    
    var days = new Array(7);
    days[6] = "Sunday";
    days[0] = "Monday";
    days[1] = "Tuesday";
    days[2] = "Wednesday";
    days[3] = "Thursday";
    days[4] = "Friday";
    days[5] = "Saturday";
    var resultDay = days[inputDate.getDay()];
    var dayInHistory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    var dayInHistoryLink = "https://www.history.com/this-day-in-history";

    document.getElementById('dayOfWeek').textContent = resultDay;
    document.getElementById('dayInHistory').textContent = dayInHistory;
    //document.getElementById('dayInHistoryLInk').href = dayInHistoryLink;
    
    document.getElementById('results').classList.remove('d-none');
    event.preventDefault();
});