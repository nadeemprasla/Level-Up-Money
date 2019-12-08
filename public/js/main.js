$(document).ready(function () {
    var currentMonth = new Date().getMonth() + 1;

    $("#monthChoice").val(currentMonth);

    userId = $("#navbarDropdown").attr("data-userid")

    console.log(userId, "id")

    $(document).on("click",".categorySbtn", handleSubmit);

    $(document).on("click","#addCat", function (e) {
        e.preventDefault();
        if (validator()) {
            $("#categoryModel").modal("toggle");
        }

     })

    function validator() {
        var isFilled = true;
        if ($("#budget").val() === "") {
            isFilled = false;
        }
        return isFilled;
    }

    function handleSubmit(event) {
        event.preventDefault()
        // userId = categoryInput.attr("data-userid")
        newCategory = $("#categoryName").val();
        var month_name = $("#monthChoice").val();
        
        submitPost(userId, newCategory,month_name)
    }

    function submitPost(userId, newCategory,month_name) {
        
        $.post("/api/category/posts", {
            category_name: newCategory,
            UserId: userId,
            AllowanceId: month_name
        }, (e) => {
            console.log(e)
            location.reload();

        })
    }


    // ADD ITEM
    // -----------------------------------------------------------------
    $(document).on("click", "#addItem", function (e) {

        e.preventDefault();
        e.stopPropagation();
        console.log(e.which); 
        if (validator()) {
            categoryid = e.target.dataset.catid;
            $("#enteriesModal").modal("toggle");
            $("#currentcategorychoice").val(categoryid)
        }
        else {
            alert("Please fill all mandatory fields")
        }
    })


    $(document).on("click","#submit", function (e) {
        e.preventDefault();
        var name = $("#entryName").val();
        var amount = $("#amount").val();
        var memo = $("#memo").val();
        var currentcat = $("#currentcategorychoice").val().trim()
        var amountType = $("#addedAmountType").val().trim();
        var month = $("#monthChoice").val();
        var data = {
            entry_name: name,
            amountType: amountType,
            amount: amount,
            memo: memo,
            CategoryId: currentcat,
            UserId: userId,
            AllowanceId:month
        }
        
        $.post("/api/addItem", data).then(function (result) {

            $("#enteriesModal").modal("hide");
            location.reload();
        })

    })

    // -----------------------------------------------------------------
    // ADD ITEM ENDS




    // Budget
    // -----------------------------------------------------------
    var currentBudget = $("#budget").val();
    var othrIncome = $("#othrIncome").val();
    var categoryAmt = $("#plannedAmt").val();
    

    $(document).on("blur", "#budget", function (e) {
        
        e.stopPropagation();
        e.preventDefault();
        
        var data = {};
        var total_budget = $(this).val();
        var month_name = $("#monthChoice").val();
        console.log(e.which)
        
        data = {
            total_budget: total_budget,
            month_name: month_name,
            UserId: userId
        }
        newBudget =total_budget;
        
        updateBudget(data);
        ;
    });
    
    $(document).on("click","#budget",function(e){
       
        var total_budget = $(this).val();
        $("#budget").val(total_budget);
        
    });

    $(document).on("blur", "#othrIncome", function (e) {
        e.stopPropagation();
        e.preventDefault();
        
        var data = {};
        var extra_income = $(this).val();
        var total_budget = currentBudget
        var month_name = $("#monthChoice").val();
        
        data = {
            extra_income: extra_income,
            month_name: month_name,
            UserId: userId,
            total_budget: total_budget
        }

        othrIncome = extra_income;
        updateBudget(data);
        
    });


    function updateBudget(data) {
        
        $.ajax({
            method: "PUT",
            url: "/api/budget",
            data: data
        }).then(function (result) {
            
        
        });

    }

    // Month change
    //----------------------------------------------------
    $(document).on("change",'#monthChoice',function() {
        var month = $("#monthChoice option:selected").val();
        var id = userId;
        $.get("/api/"+id+"/"+month,function(result){
            
            document.documentElement.innerHTML=result;
            $("#monthChoice").val(month);
            
        })

    });

    // Category amount
    //----------------------------------------

    

    $(document).on("blur", "#plannedAmt", function (e) {
        e.preventDefault();
        event.stopPropagation();
        var data = {};
        var categoryId=$(this).parent().parent().attr('id');
        var category_amount = $(this).val();
        var month_name = $("#monthChoice").val();
        
        data = {
            category_amount: category_amount,
            month_name: month_name,
            UserId: userId,
            id:categoryId
        }
        categoryAmt = category_amount;
        updateCategory(data);
        

    });

    $(document).on("click",".card-header",function(e){
        var currentBudget = $(this).val();
       // $(this).children().hide();
        $(this).children("input#plannedAmt").val(currentBudget);
        $(this).children("input#plannedAmt").show();
        $(this).children("input#plannedAmt").focus();
    })

    function updateCategory(data) {
        
        $.ajax({
            method: "PUT",
            url: "/api/categoryAmt",
            data: data
        }).then(function (result) {
            
        });

    }
    


});


