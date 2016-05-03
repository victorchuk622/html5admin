var questioncount = 1;
function addquestion() {
    if (questioncount < 5) {
        $('<li id="li-q' + (questioncount + 1) + '"><a data-toggle="tab" href="#tab-q' + (questioncount + 1) + '">' + (questioncount + 1) + '</a></li>').insertAfter('#li-q' + questioncount);
        $('#tab-q' + questioncount).after('test');






        questioncount++;
    }
};
