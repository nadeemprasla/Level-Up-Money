$(document).ready(function () {
    var currentMonth = new Date().getMonth() + 1;

    $("#monthChoice").val(currentMonth);

    userId = $("#navbarDropdown").attr("data-userid")

    console.log(userId, "id")

    var categoryInput = $("#categoryName")

    $(".categorySbtn").on("click", handleSubmit);

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
        newCategory = categoryInput.val();
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
    var newBudget;

    $(document).on("keyup", "#budget", function (e) {
        
        e.stopPropagation();
        e.preventDefault();
        
        var data = {};
        var total_budget = $(this).val();
        var month_name = $("#monthChoice").val();
        
        if (e.which === 13) {
            data = {
                total_budget: total_budget,
                month_name: month_name,
                UserId: userId
            }
            newBudget =total_budget;
            
            updateBudget(data);
        };
    });
    
    $(document).on("click","#budget",function(e){
       
        var total_budget = $(this).val();
        $("#budget").val(total_budget);
        
    });

    $(document).on("keyup", "#othrIncome", function (e) {
        e.stopPropagation();
        e.preventDefault();
        
        var data = {};
        var extra_income = $(this).val();
        var total_budget = currentBudget
        var month_name = $("#monthChoice").val();
        if (e.which === 13) {
            data = {
                extra_income: extra_income,
                month_name: month_name,
                UserId: userId,
                total_budget: total_budget
            }

            othrIncome = extra_income;
            updateBudget(data);
        }
    });

    


    $(document).on("blur", "#budget", function (e) {
        e.preventDefault();
        event.stopPropagation();
        $("#budget").val(newBudget);

    });

    $(document).on("blur", "#othrIncome", function (e) {
        e.preventDefault();
        event.stopPropagation();
        $("#othrIncome").val(othrIncome);

    });

    function updateBudget(data) {
        
        $.ajax({
            method: "PUT",
            url: "/api/budget",
            data: data
        }).then(function (result) {
            console.log(result)
        
        });

    }

    // Month change
    //----------------------------------------------------
    $('#monthChoice').change(function() {

        var month = $("#monthChoice option:selected").val();
        var id = userId;
        $.get("/api/"+id+"/"+month,function(result){
            
            document.documentElement.innerHTML=result;
            $("#monthChoice").val(month);
            
        })


    });

    // Category amount
    //----------------------------------------

    $(document).on("keyup", "#plannedAmt", function (e) {
        
        e.stopPropagation();
        e.preventDefault();

        var categoryId=$(this).parent().parent().attr('id');
        
        var data = {};
        var category_amount = $(this).val();
        
        var month_name = $("#monthChoice").val();
        if (e.which === 13) {
            data = {
                category_amount: category_amount,
                month_name: month_name,
                UserId: userId,
                id:categoryId
            }
            categoryAmt = category_amount;
            updateCategory(data);
        }
    });

    function updateCategory(data) {
        
        $.ajax({
            method: "PUT",
            url: "/api/categoryAmt",
            data: data
        }).then(function (result) {
            console.log(result)
        
        });

    }
    


});


