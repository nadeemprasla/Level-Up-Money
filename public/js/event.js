$(function() {

    var categoryid;
    var userid;


    $(document).on("keyup", "#budget", function(event) {
        console.log("inside update ")
        var updatedBudget = $(this).val();
        if (event.which === 13) {
            updatedBudget.text = $(this).children("input").val().trim();
          $(this).blur();
          updatedBudget(updateBudget);
        }
      });


    $(document).on("blur", "#budget", function(){
        console.log("inside cancle ")
        var currentBudget = $(this).val();
    //     if (currentBudget) {
    //     $(this).hide();
        
        
    // }
  });


    $(document).on("click", "#budget", function() {
        console.log("inside edit ")
        var currentBudget = $(this).val();
        $(this).val(currentBudget.text);
    });

   
    $(".addItem").on("click",function(e){
        
        e.preventDefault();
        if(validator()){
            console.log("-------inside add item------")
            categoryid = 1;
            userid=1;
            $("#enteriesModal").modal("toggle");
        }
        else{
            alert("Please fill all mandatory fields")
        }
        

    })


    $("#submit").on("click",function(e){

        e.preventDefault();
        var name = $("#entryName").val();
        var category = 1;
        var amount = $("#amount").val();
        var memo = $("#memo").val();
        

        var data ={
            entry_name:name,
            category_id:category,
            amount:amount,
            memo:memo,
            CategoryId:categoryid,
            UserId:userid
        }

        $.post("/api/addItem",data).then(function(result){

            console.log("----------------")
            console.log(result);
            console.log("-----adding item-----");
            
            $.get("/api/allEntries",function(data){
                
                document.documentElement.innerHTML=data;
                
            })

        })



    })

    function updateBudget(budget) {
        $.ajax({
          method: "PUT",
          url: "/api/budget",
          data: budget
        }).then(getBudget);
      }

      function validator() {
        var isFilled = true;
        $(".form-control").each(function() {
          if ($(this).val() === "") {
            isFilled = false;
          }
          
        });

        return isFilled;
      }  
})