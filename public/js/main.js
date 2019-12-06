$(document).ready(function() {

    var userid =  $("#navbarDropdown").attr("data-userid");
    

    getAllData();
    
    function getAllData() {
        if(userid){
            $.get("/api/allUserInfo/"+userid,function(result){
        
                document.documentElement.innerHTML=result;
             });
        }

        
        
    }

    


    




})