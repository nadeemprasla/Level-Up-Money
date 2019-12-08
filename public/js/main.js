$(document).ready(function () {
    var currentMonth = new Date().getMonth() + 1;

    $("#monthChoice").val(currentMonth);

    userId = $("#navbarDropdown").attr("data-userid")

    console.log(userId, "id")

    $(document).on("click", ".categorySbtn", handleSubmit);

    $(document).on("click", "#addCat", function (e) {
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

        submitPost(userId, newCategory, month_name)
    }

    function submitPost(userId, newCategory, month_name) {

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


    $(document).on("click", "#submit", function (e) {
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
            AllowanceId: month
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
            newBudget = total_budget;

            updateBudget(data);
        };
    });

    $(document).on("click", "#budget", function (e) {

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


        });

    }

    // Month change
    //----------------------------------------------------
    $(document).on("change", '#monthChoice', function () {
        var month = $("#monthChoice option:selected").val();
        var id = userId;
        $.get("/api/" + id + "/" + month, function (result) {

            document.documentElement.innerHTML = result;
            $("#monthChoice").val(month);

        })

    });

    // Category amount
    //----------------------------------------

    $(document).on("keyup", "#plannedAmt", function (e) {

        e.stopPropagation();
        e.preventDefault();

        var categoryId = $(this).parent().parent().attr('id');

        var data = {};
        var category_amount = $(this).val();

        var month_name = $("#monthChoice").val();
        if (e.which === 13) {
            data = {
                category_amount: category_amount,
                month_name: month_name,
                UserId: userId,
                id: categoryId
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

        });

    }





    // Chart
    // ----------------------------------------------------------
    var chartType = "doughnut";

    $("#expenseChart").on("click", () => {
        $("#chartModal").modal("toggle");
        chartType = "doughnut"
        var monthChoice = $("#monthChoice").val();
        runChart(userId, monthChoice);
    })

    $(document).on("click","#btnChartType", (e) => {
        chartType = e.target.value
    console.log(chartType)
        $("#chartcontainer").html("")
        var monthChoice = $("#monthChoice").val();
        runChart(userId, monthChoice);
    })

    function runChart(userId, monthChoice) {
        $.get("/chart/" + userId + "/" + monthChoice, (e) => {
            console.log(e)
            chartLabel = e.chartLabel
            chartName = e.chartName
            chartLabel.map((e) => {
                console.log(e)
                console.log(chartName[e])
                createChart(e, chartType, chartName[e], chartName[e + "Price"])
            });

        })
    }


    function createChart(id, type, labels, data) {
        $("#chartcontainer").append(`<div class="row chartrow"><div class="col colchart"><canvas id="${id}" class="myCharts"></canvas></div></div>`);
        var ctx = document.getElementById(id).getContext('2d');
        
        var chart = new Chart(ctx, {
            type: type,

            data: {
                labels: labels,
                datasets: [{
                    backgroundColor: ['rgb(255, 99, 132)','rgb(0, 0, 255)','RGB(181,114,129)','RGB(118,255,122)','RGB(200,8,21)','RGB(48,213,200)','RGB(255,29,206)','RGB(255,248,220)','RGB(64,130,109)' ],
                    borderColor: 'rgb(255, 199, 132)',
                    data: data,

                }]
            },

            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        })
    }





    // -----------------------------------------------------------
    // Chart Ends


});
