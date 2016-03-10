$('document').ready(function () {
    $("#login-form").submit(function (event) {

            var data = $("#login-form").serialize();

            $.ajax({

                type: 'POST',
                url: 'auth/admin',
                //dataType:'json',
                data: data,

                success: function (response) {
                    console.log(response.success);
                    if (response.success) {
                        console.log(response.success);
                        console.log(response.token);
                        localStorage.setItem('token',response.token);

                        //$("#btn-login").html('<img src="btn-ajax-loader.gif" /> &nbsp; Signing In ...');
                        //setTimeout(' window.location.href = "portal"; ', 4000);
                    }
                    else {
                        /*

                         $("#error").fadeIn(1000, function () {
                         $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' + response + ' !</div>');
                         $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
                         });
                         */
                    }
                }
            });
            return false;

    })
})