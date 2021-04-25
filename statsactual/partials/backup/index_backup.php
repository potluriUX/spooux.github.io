<!DOCTYPE html>
<!--
  Stats report page SPA. login page ->report selector page ->reports
 @author potluri 
  
 -->
<html lang="en">
    <head> 
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Stats Login Page</title>

        <!-- Bootstrap core CSS -->
        <link href="/css/bootstrap.css" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="/css/signin.css" rel="stylesheet">



        <!--jquery include-->
        <script type="text/javascript" src="/javascript/stats3/statsrep5/jquery-1.9.1.min.js"></script>
        <!--Stats Login JS class-->
        <script type="text/javascript" src="/javascript/stats3/statsrep5/StatsLogin.js"></script>
        <!--ask Richard for alias to the above folder-->
        <script type = "text/javascript">

            //this where the StatsLogin class is called. this is the controller of the JS class.
            var statslogin = new StatsLogin();
            $(function() {
                statslogin.hideallerrormessages();
                  
                $("#submit").click(function() {

                    statslogin.validate();

                });
    
            });

        </script>
    </head>


    <body>

        <div class="container">
<!-- below is the view for login page-->
            <form name='myform' class="form-signin">
                <h2 class="form-signin-heading">Stats Sign in</h2>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input  id="username" class="form-control" placeholder="Username" required autofocus>
                  
                  <span class='error' id="userreq"> *Username Required</span>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" required>
                 <span  class="error" id="pwdreq"> *Password Required</span>
              
                <button class="btn btn-lg btn-primary btn-block" type="button" id='submit'>Sign in</button>
                <span class='error' id="usererror">*Wrong Username/Password</span>
                <!--<button class="btn btn-lg btn-primary btn-block" type="button" id='submit2'>Sign in</button>-->
            </form>

        </div> <!-- /container -->

</div>
    </form>

</body>
</html>
<style>
    
    
    </style>