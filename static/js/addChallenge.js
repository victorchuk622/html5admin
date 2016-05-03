var questioncount = 1;
$( "#addChallenge" ).submit(function( event ) {
    //event.preventDefault();
    $(":not(.active).question-answer").remove();

});

function addquestion() {
    if (questioncount < 5) {
        $('<li id="li-q' + (questioncount + 1) + '"><a data-toggle="tab" href="#tab-q' + (questioncount + 1) + '">' + (questioncount + 1) + '</a></li>').insertAfter('#li-q' + questioncount);
        $('#tab-q' + questioncount).after(`
        <div id="tab-q`+ (questioncount + 1) +`" class="tab-pane fade">

    <h3>Question `+ (questioncount + 1) +`</h3>
    <ul class="nav nav-tabs question-type">
        <li class="active"><a data-toggle="tab" class="multiple-choices" href="#mc-q`+ (questioncount + 1) +`">Multiple Choices</a></li>
        <li><a data-toggle="tab" class="fill-in-the-blanks" href="#fitb-q`+ (questioncount + 1) +`">Fill in the Blank</a></li>
    </ul>
    <div class="tab-content">
        <fieldset class="form-group">
            <br/>
                    <textarea class="form-control" id="content[`+ questioncount +`][question]" name="content[`+ questioncount +`][question]"
                              placeholder="Question" required></textarea>
        </fieldset>
        <br/>
        <input type="hidden" class="form-control" id="content[`+ questioncount +`][questionNo] " name="content[`+ questioncount +`][questionNo]"
               value="`+ (questioncount + 1) +`">

        <div id="mc-q`+ (questioncount + 1) +`" class="tab-pane fade in active question-answer multiple-choices">
            <input type="hidden" class="form-control" id="content[`+ questioncount +`][qType]" name="content[`+ questioncount +`][qType]"
                   value="mc">
            <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" id="content[`+ questioncount +`][ans][0][correct]" name="content[`+ questioncount +`][ans][0][correct]" value="true">
      </span>
                <input type="text" class="form-control" id="content[`+ questioncount +`][ans][0][content]"
                       name="content[`+ questioncount +`][ans][0][content]" placeholder="Answer">
            </div>
            <br/>
            <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" id="content[`+ questioncount +`][ans][1][correct]" name="content[`+ questioncount +`][ans][1][correct]" value="true">
      </span>
                <input type="text" class="form-control" id="content[`+ questioncount +`][ans][1][content]"
                       name="content[`+ questioncount +`][ans][1][content]" placeholder="Answer">
            </div>

            <br/>
            <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" id="content[`+ questioncount +`][ans][2][correct]" name="content[`+ questioncount +`][ans][2][correct]" value="true">
      </span>
                <input type="text" class="form-control" id="content[`+ questioncount +`][ans][2][content]"
                       name="content[`+ questioncount +`][ans][2][content]" placeholder="Answer">
            </div>
            <br/>
            <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" id="content[`+ questioncount +`][ans][3][correct]" name="content[`+ questioncount +`][ans][3][correct]" value="true">
      </span>
                <input type="text" class="form-control" id="content[`+ questioncount +`][ans][3][content]"
                       name="content[`+ questioncount +`][ans][3][content]" placeholder="Answer">
            </div>
            <br/>
        </div>

        <div id="fitb-q`+ (questioncount + 1) +`" class="tab-pane fade question- fill-in-the-blanks">
            <input type="hidden" class="form-control" id="content[`+ questioncount +`][qType]" name="content[`+ questioncount +`][qType]"
                   value="fitb">
            <p>
                <input type="text" class="form-control" id="content[`+ questioncount +`][ans][0][content]" name="content[`+ questioncount +`][ans][0][content]" placeholder="Answer"  required>
                <input type="hidden" class="form-control" id="content[`+ questioncount +`][ans][0][correct]" name="content[`+ questioncount +`][ans][0][correct]"
                       value="true">
            </p>

        </div>
    </div>
</div>
`);
        /*$("a[href='#fitb-q"+ (questioncount + 1) +"']").on('show.bs.tab', function(e) {
            console.log('fitb-q'+ (questioncount + 1));
        });
        $("a[href='#mc-q"+ (questioncount + 1) +"']").on('show.bs.tab', function(e) {
            console.log('mc-q'+ (questioncount + 1));
        });*/
        
        $('.tab-content').on('click', '.tab-pane ul.nav.nav-tabs li a.multiple-choices', function(evt){
            $($(test).attr('href').slice(1))
        });
        $('.tab-content').on('click', '.tab-pane ul.nav.nav-tabs li a.fill-in-the-blanks', function(evt){
            var targetId = $(test).attr('href').slice(1);
        });
        
        questioncount++;
    }
};
