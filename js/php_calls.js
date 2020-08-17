$(document).ready(function(){

    $(".submit_button").click(function(pd){
        pd.preventDefault();
        $('.append_breach').empty();
        $('.what_to_do').empty();

        
        var email_to_check = $("#email_to_check").val();
        if(email_to_check.length!=0){
            $.ajax({
                url: 'ajaxsubmit.php',
                type: 'post',
                data: { "callFunc1": email_to_check},   
                success: function(response) { 

                    if(response.length > 10){

                        $("<p style=\"font-weight: bold\">Uh oh.. Your email has been compromised in the following incident(s):<p>").appendTo(".append_breach");

                        var obj = JSON.parse(response);
                        for(i=0;i<obj.length;i++)
                        {
                            //console.log(obj[i]);
                            var breach = obj[i];
                            console.log(breach.Description);
                            $("<p>"+breach.Description+"</p>").appendTo(".append_breach");


                        }

                        
                        $("<p style=\"font-weight: bold\">What to do:</p>").appendTo(".what_to_do");
                        var str = "<p>Unfortunately in this situation you aren't at fault. If you're email address has been compromised it means that your email address and potenitally"
                                    +" other personal information is available to hackers. Conider doing the following:</p>"
                        $(str).appendTo(".what_to_do");
                        var str = "<ul> <li>Change password frequently</li><li>Get a new email address</li><li>Use a different email for personal and banking matters</li></ul>";
                        $(str).appendTo(".what_to_do");

                    } else {
                        var str = "<p style=\"font-weight: bold\">It appears your email hasn't been compromised in any documented breach incidents.</p>";
                        $(str).appendTo(".what_to_do");
                        var str = "<p>To conitinue to keep yourself safe, consider changing the password to this email frequently and limit yourself to the number of websites you sign up for. ";
                        str += "Consider signing up for multiple email addresses to seperate their uses, such as banking, shopping, and social media.</p>";
                        $(str).appendTo(".what_to_do");
                    }
                },
                error:function(jqXhr, textStatus, errorThrown) {
                    console.error(textStatus, errorThrown) 

                }
            });
        }
    }); //end of email checker


    //pwned pw checker
    $(".submit_pw").click(function(pd){
        pd.preventDefault();        
        $("#pw-results").empty();

        var pw_to_check = $("#pw_to_check").val();
        
        // AJAX Code To Submit Form.
        console.log("pw check button clicked here "+ pw_to_check);
        if(pw_to_check.length!=0){
        $.ajax({
            url: 'ajaxsubmit.php',
            type: 'post',
            data: { "callFunc2": pw_to_check},   
            success: function(response) { 

                //console.log(response);
                
                var list1 = response.split('\n');
                var pw_sha = list1[0].toUpperCase();
                pw_sha = pw_sha.substring(5,40);

                var flag = 0;

                for(i=1;i<list1.length;i++){
                    console.log("test");
                    if(list1[i].substring(0,35)==pw_sha){
                        flag = list1[i].substring(36);
                        break;
                    }
                }

                if(flag){ //password compromised
                    $("<p style=\"font-weight: bold\">This password has been exposed a number of "+flag+" time(s).</p>").appendTo("#pw-results");
                    $("<p>The reason for this could be that it is a weak password and/or it was compromised in a known attack.</p>").appendTo("#pw-results");
                    $("<p>Never use this password even if it is considered strong.</p>").appendTo("#pw-results");
                } else { //password okay 
                    $("<p>This password doesn't seem to be compromised from any known resources. Make sure this password is strong using the tool above regardless.</p>").appendTo("#pw-results");

                }                
            },
            error:function(jqXhr, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
             }
         });         
    
        }
    });
       
});