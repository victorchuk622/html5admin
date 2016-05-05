//transpiled
"use strict";

var questioncount = 1;
$("#addChallenge").submit(function (event) {
    //event.preventDefault();
    $(":not(.active).question-answer").remove();
});

$('.tab-content').on('click', '.tab-pane ul.nav.nav-tabs li a', function (evt) {
    var target = $(evt.target).attr('href');
    if (target.slice(0, 5) == '#mc-q') {
        $('#fitb-q' + target.slice(5) + ' input:text').removeAttr('required');
        $(target + ' input:text').attr('required', true);
    }
    if (target.slice(0, 7) == '#fitb-q') {
        $('#mc-q' + target.slice(7) + ' input:text').removeAttr('required');
        $(target + ' input:text').attr('required', true);
    }
});

function addquestion() {
    if (questioncount < 5) {
        $('<li id="li-q' + (questioncount + 1) + '"><a data-toggle="tab" href="#tab-q' + (questioncount + 1) + '">' + (questioncount + 1) + '</a></li>').insertAfter('#li-q' + questioncount);
        $('#tab-q' + questioncount).after("\n        <div id=\"tab-q" + (questioncount + 1) + "\" class=\"tab-pane fade\">\n\n    <h3>Question " + (questioncount + 1) + "</h3>\n    <ul class=\"nav nav-tabs question-type\">\n        <li class=\"active\"><a data-toggle=\"tab\" href=\"#mc-q" + (questioncount + 1) + "\">Multiple Choices</a></li>\n        <li><a data-toggle=\"tab\" href=\"#fitb-q" + (questioncount + 1) + "\">Fill in the Blank</a></li>\n    </ul>\n    <div class=\"tab-content\">\n        <fieldset class=\"form-group\">\n            <br/>\n                    <textarea class=\"form-control\" id=\"content[" + questioncount + "][question]\" name=\"content[" + questioncount + "][question]\"\n                              placeholder=\"Question\" required></textarea>\n        </fieldset>\n        <br/>\n        <input type=\"hidden\" class=\"form-control\" id=\"content[" + questioncount + "][questionNo] \" name=\"content[" + questioncount + "][questionNo]\"\n               value=\"" + (questioncount + 1) + "\">\n\n        <div id=\"mc-q" + (questioncount + 1) + "\" class=\"tab-pane fade in active question-answer\">\n            <input type=\"hidden\" class=\"form-control\" id=\"content[" + questioncount + "][qType]\" name=\"content[" + questioncount + "][qType]\"\n                   value=\"mc\">\n            <div class=\"input-group\">\n      <span class=\"input-group-addon\">\n        <input type=\"checkbox\" id=\"content[" + questioncount + "][ans][0][correct]\" name=\"content[" + questioncount + "][ans][0][correct]\" value=\"true\">\n      </span>\n                <input type=\"text\" class=\"form-control\" id=\"content[" + questioncount + "][ans][0][content]\"\n                       name=\"content[" + questioncount + "][ans][0][content]\" placeholder=\"Answer\" required>\n            </div>\n            <br/>\n            <div class=\"input-group\">\n      <span class=\"input-group-addon\">\n        <input type=\"checkbox\" id=\"content[" + questioncount + "][ans][1][correct]\" name=\"content[" + questioncount + "][ans][1][correct]\" value=\"true\">\n      </span>\n                <input type=\"text\" class=\"form-control\" id=\"content[" + questioncount + "][ans][1][content]\"\n                       name=\"content[" + questioncount + "][ans][1][content]\" placeholder=\"Answer\" required>\n            </div>\n\n            <br/>\n            <div class=\"input-group\">\n      <span class=\"input-group-addon\">\n        <input type=\"checkbox\" id=\"content[" + questioncount + "][ans][2][correct]\" name=\"content[" + questioncount + "][ans][2][correct]\" value=\"true\">\n      </span>\n                <input type=\"text\" class=\"form-control\" id=\"content[" + questioncount + "][ans][2][content]\"\n                       name=\"content[" + questioncount + "][ans][2][content]\" placeholder=\"Answer\" required>\n            </div>\n            <br/>\n            <div class=\"input-group\">\n      <span class=\"input-group-addon\">\n        <input type=\"checkbox\" id=\"content[" + questioncount + "][ans][3][correct]\" name=\"content[" + questioncount + "][ans][3][correct]\" value=\"true\">\n      </span>\n                <input type=\"text\" class=\"form-control\" id=\"content[" + questioncount + "][ans][3][content]\"\n                       name=\"content[" + questioncount + "][ans][3][content]\" placeholder=\"Answer\" required>\n            </div>\n            <br/>\n        </div>\n\n        <div id=\"fitb-q" + (questioncount + 1) + "\" class=\"tab-pane fade question-answer\">\n            <input type=\"hidden\" class=\"form-control\" id=\"content[" + questioncount + "][qType]\" name=\"content[" + questioncount + "][qType]\"\n                   value=\"fitb\">\n            <p>\n                <input type=\"text\" class=\"form-control\" id=\"content[" + questioncount + "][ans][0][content]\" name=\"content[" + questioncount + "][ans][0][content]\" placeholder=\"Answer\"  required>\n                <input type=\"hidden\" class=\"form-control\" id=\"content[" + questioncount + "][ans][0][correct]\" name=\"content[" + questioncount + "][ans][0][correct]\"\n                       value=\"true\">\n            </p>\n\n        </div>\n    </div>\n</div>\n");
        /*$("a[href='#fitb-q"+ (questioncount + 1) +"']").on('show.bs.tab', function(e) {
         console.log('fitb-q'+ (questioncount + 1));
         });
         $("a[href='#mc-q"+ (questioncount + 1) +"']").on('show.bs.tab', function(e) {
         console.log('mc-q'+ (questioncount + 1));
         });*/

        questioncount++;
    }
};