//enable calculate button only if user has enter an input date
$(function () {
    $('#dayOfWeekForm').mousemove(function () {
        if (!$('#inputDate').val()) {
            $('#calcDay').prop('disabled', true);
        } else {
            $('#calcDay').prop('disabled', false);
        }
    });
}); 

//get base url with date appended in MMMM-DD format
function getDateUrl (inputDate, baseUrl) {
    const months = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];
    var monthString = months[inputDate.getUTCMonth()];

    var dayString = String(inputDate.getUTCDate());
    if (dayString.length == 1){
        dayString = "0" + dayString;
    }

    return baseUrl + monthString + "-" + dayString;
}

//calculate and display results
document.getElementById('calcDay').addEventListener('click', function(event){
    var inputDate = new Date(document.getElementById("inputDate").value);
    
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"];
    document.getElementById('dayOfWeek').textContent = days[inputDate.getDay()];

    const textGetterBaseUrl = "https://polar-thicket-58913.herokuapp.com/datescraper/";
    var dayInHistoryText;
    fetch(getDateUrl(inputDate,textGetterBaseUrl)).then(function(response) {
        response.text().then(function(text) {
            dayInHistoryText = text;
            document.getElementById('dayInHistoryText').textContent = dayInHistoryText;
        });
    });
    
    const dayInHistoryBaseUrl = "https://www.loc.gov/item/today-in-history/"
    var dayInHistoryLink = getDateUrl(inputDate, dayInHistoryBaseUrl);
    document.getElementById('dayInHistoryLink').href = dayInHistoryLink;
    
    document.getElementById('results').classList.remove('d-none');
    event.preventDefault();
});