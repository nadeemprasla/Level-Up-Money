$(function() {


    $("#loginId").on("click", function(){ 
        
        var username = $("#user").val();

    console.log(username);

        console.log("clicked login ");

        var name = {
            username:username
        }

        $.ajax("/api/dashboard",
            { type:"POST",
            data: name} ).then(function(result){
            console.log("inside dashboard")
        })
    })

})