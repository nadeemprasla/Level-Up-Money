$(document).ready(function() {

    var userid =  $("#navbarDropdown").attr("data-userid");
    

    getAllData();
    
    function getAllData() {

        $.get("/api/allUserInfo/"+userid,function(result){
            
            console.log("----------------_@@@@----------")
            console.log(result);

            //location.reload();
            
           document.documentElement.innerHTML=result;
        });
        
    }

    function getAllEntries(category_id){

        $.get("/api/allEntries/"+category_id+"/"+userid,function(result){
            console.log(result);
            
        })

    }


    




})