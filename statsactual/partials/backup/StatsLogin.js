/* 
 *Login class for Stats
 *validates un/pwd then based on success navigates to report page
 *@author potluri 
 * 
 */
function StatsLogin() {
     this.un = '';
    this.pw = '';
    this.valid = false;
    this.doneajax = '';

    //        this.unArray = ["Philip", "George", "Sarah", "Michael"];  // as many as you like - no comma after final entry
    //        this.pwArray = ["Password1", "Password2", "Password3", "Password4"];  // the corresponding passwords;


}
StatsLogin.prototype.set_un_pwd = function() {
    this.un = $("#username").val();
    this.pw = $("#password").val();
}



StatsLogin.prototype.donewithajax= function(){
 
       $.when(this.doneajax).then(function(){
        
        if(this.valid.result.length != 0){
          
               this.hideallerrormessages();
      
           

            this.navigate_to_report_page();
        }else{//un pwd combination wrong.
           
             $("#usererror").show();
        }
    }.bind(this));
}
StatsLogin.prototype.hideallerrormessages = function(){
      $('#userreq').hide();
      $('#pwdreq').hide();           
      $("#usererror").hide(); //hide wrong username password error before checking 
}
StatsLogin.prototype.req = function() {
    this.hideallerrormessages();
    if(!this.un){
        $('#userreq').show();
    }
 
     if(!this.pw){
        $('#pwdreq').show();
    }
  
}
StatsLogin.prototype.validate = function() {
   
    this.set_un_pwd();//setting un and pwd from dom to class vars
    this.req();//required fields are checked and error messages are shown
    this.callajax();
   
    
//if this.valid is true or 0 based on backend api then call  this.navigate_to_report_page

}
StatsLogin.prototype.t = function(){
    alert("click worked in second page. rebind click events");
}
StatsLogin.prototype.navigate_to_report_page = function(){
    
        $.ajax({
            url: "/login",//next page
            type: "POST",
            data: {
                "p1": this.valid.result.customerid,
               
            },
            success: function(data) {
                $(".container").html(data);//erase first page html from DOM
               //load second page html from DOM
               
    

            }

        });
    
}
StatsLogin.prototype.callajax = function() {

   // var self = this;

    if (this.un && this.pw) {

      this.doneajax =  $.ajax({
            url: "/reportdata",
            type: "POST",
            data: {
                "request":"getCustomerInfo",
                "p1": this.un,
                'p2': this.pw
            },
            success: function(data) {

                this.valid = data;
               //   console.log(self.valid);

            }.bind(this)

        });
       this.donewithajax();
    }
}