$(function() {

    var categoryid;
    var userid =  $("#navbarDropdown").attr("data-userid");
    var currentBudget = $("#budget").val();
    var othrIncome = $("#othrIncome").val();

    $("#addItem").on("click", function(e){

        e.stopPropagation();
        e.preventDefault();
        
        if(validator())
        {
            // if($("#plannedAmt").val() !== "")
                $("#enteriesModal").modal("toggle");
        }
        else
            alert("Please fill mandatory field (*)!!")
    });

    $(document).on("click", "#submit", function(e){

        e.stopPropagation();
        e.preventDefault();
        var name = $("#entryName").val();
        var category = 1;
        var amount = $("#amount").val();
        var memo = $("#memo").val();
        var data ={
            entry_name:name,
            amountType:category,
            amount:amount,
            memo:memo,
            CategoryId:categoryid,
            UserId:userid
        }

        $.post("/api/addItem",data).then(getAllEntries)

    });

    $(document).on("keyup", "#budget", function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log($("#monthChoice").val());
        var data = {};
        var total_budget = $(this).val();
        var month_name = $("#monthChoice").val();
        if (e.which === 13) {
            data = {total_budget:total_budget
                ,month_name:month_name,
                UserId:userid}
            currentBudget=total_budget;
            updateBudget(data);
        }
      });

      $(document).on("keyup", "#othrIncome", function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log($("#budget").val());
        var data = {};
        var extra_income = $(this).val();
        var month_name = $("#monthChoice").val();
        if (e.which === 13) {
            data = {extra_income:extra_income,
                month_name:month_name,
                UserId:userid}
            othrIncome = othrIncome;   
            updateBudget(data);
        }
      });  


    $(document).on("blur", "#budget", function(e){
        e.preventDefault();
        event.stopPropagation();
        $("#budget").val(currentBudget);
       
    });

    $(document).on("blur", "#othrIncome", function(e){
        e.preventDefault();
        event.stopPropagation();
        $("#othrIncome").val(othrIncome);
       
    });

    function updateBudget(data) {
    
        $.ajax({
          method: "PUT",
          url: "/api/budget",
          data: data
        }).then(function(result){
            console.log(result)
        });
        
      }

      function validator() {
        var isFilled = true;
        if($("#budget").val()=== ""){
            isFilled = false;
        }
        return isFilled;
      }
      
      function getAllEntries(){
        
        $.get("/api/allEntries",function(data){
            document.documentElement.innerHTML=data;
        })
      }

      $("#addCat").on("click",function(e){
          e.preventDefault();
          if(validator()){
            $("#categoryModel").modal("toggle");
          }
          
      })

      $("#submit1").on("click",function(e){
          
          e.preventDefault();
          var month = $("#monthChoice").val();
          var category_name = $("#categoryName").val();
          console.log(category_name);
          
          var data = {
            category_name:category_name,
            AllowanceId:month,
            UserId:userid
          } 

          $.post("/api/addCategory",data).then(function(result){
              console.log(result)
          })
          
      })
})
    

    