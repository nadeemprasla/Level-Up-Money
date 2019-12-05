$(document).ready(function() {

    

    //getAllData();
    
    function getAllData() {

        $.get("/allCategories",function(result){
            document.documentElement.innerHTML=result;
        });
        
    }


    




})