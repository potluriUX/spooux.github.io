
        <script type = "text/javascript">

            //this where the StatsLogin class is called. this is the controller of the JS class.
            //rebind js events to dom. redrawing the dom
          
            $(function() {
                $("#submit2").click(function() {

                    statslogin.t();

                });
            });
            

        </script>





       
<!-- below is the view for report page-->
           
                <h2 class="form-signin-heading">Hello <?php echo $_POST['p1'];?>, this is  Stats Home Page</h2>
               
                

             
                <button class="btn btn-lg btn-primary btn-block" type="button" id='submit2'>Home page click</button>
          

     





