$(document).ready(function () {
    var currentMonth = new Date().getMonth() + 1;

    $("#monthChoice").val(currentMonth)

    userId = $("#navbarDropdown").attr("data-userid")

    console.log(userId, "id")

    var categoryInput = $("#categoryName")

    $(".categorySbtn").on("click", handleSubmit);

    $("#addCat").on("click", function (e) {
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
        month = 

        submitPost(userId, newCategory)
    }

    function submitPost(userId, newCategory) {
        $.post("/api/category/posts", {
            category_name: newCategory,
            UserId: userId,
            AllowanceId: currentMonth
        }, (e) => {
            console.log(e)
            location.reload();

        })
    }




    // ADD ITEM
    // -----------------------------------------------------------------
    $(document).on("click", "#addItem", function (e) {

        e.preventDefault();
        console.log("cat id for add item", e.target.dataset.catid)
        if (true) {
            console.log("-------inside add item------")
            categoryid = e.target.dataset.catid;
            $("#enteriesModal").modal("toggle");
            $("#currentcategorychoice").val(categoryid)
        }
        else {
            alert("Please fill all mandatory fields")
        }


    })


    $("#submit").on("click", function (e) {
        e.preventDefault();
        var name = $("#entryName").val();
        var amount = $("#amount").val();
        var memo = $("#memo").val();
        var currentcat = $("#currentcategorychoice").val().trim()
        var amountType = $("#addedAmountType").val().trim()


        var data = {
            entry_name: name,
            amountType: amountType,
            amount: amount,
            memo: memo,
            CategoryId: currentcat,
            UserId: userId
        }
        console.log(data)
        $.post("/api/addItem", data).then(function (result) {

            console.log("----------------")
            console.log(result);
            console.log("-----adding item-----");
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

    $(document).on("keyup", "#budget", function (e) {
        console.log("here")
        e.stopPropagation();
        e.preventDefault();
        console.log($("#monthChoice").val());
        var data = {};
        var total_budget = $(this).val();
        var month_name = $("#monthChoice").val();
        if (e.which === 13) {
            data = {
                total_budget: total_budget
                , month_name: month_name,
                UserId: userId
            }
            currentBudget = total_budget;
            updateBudget(data);
        }
    });

    $(document).on("keyup", "#othrIncome", function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log($("#othrIncome").val());
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
            othrIncome = othrIncome;
            updateBudget(data);
        }
    });


    $(document).on("blur", "#budget", function (e) {
        e.preventDefault();
        event.stopPropagation();
        $("#budget").val(currentBudget);

    });

    $(document).on("blur", "#othrIncome", function (e) {
        e.preventDefault();
        event.stopPropagation();
        $("#othrIncome").val(othrIncome);

    });

    function updateBudget(data) {
        console.log(data)
        $.ajax({
            method: "PUT",
            url: "/api/budget",
            data: data
        }).then(function (result) {
            console.log(result)
        
        });

    }


});


