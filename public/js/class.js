$(document).ready(function() {
    $('table').heavyTable();
});

$("table").keypress(function(event) {
    var keyCode = event.keyCode;
    var which = event.which;
    if (keyCode == 13 || which == 13) return true;
        if (keyCode == 46 || which == 46) return true;
    if ((keyCode >= 48 && keyCode <= 57) || (which >= 48 && which <= 57)) {
        return true
    };
    return false;
});

