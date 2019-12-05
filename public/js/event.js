$(function () {

    var categoryid;
    var userid;


    $(document).on("keyup", "#budget", function (event) {
        console.log("inside update ")
        var updatedBudget = $(this).val();
        if (event.which === 13) {
            updatedBudget.text = $(this).children("input").val().trim();
            $(this).blur();
            updatedBudget(updateBudget);
        }
    });


    $(document).on("blur", "#budget", function () {
        console.log("inside cancle ")
        var currentBudget = $(this).val();
        //     if (currentBudget) {
        //     $(this).hide();


        // }
    });


    $(document).on("click", "#budget", function () {
        console.log("inside edit ")
        var currentBudget = $(this).val();
        $(this).val(currentBudget.text);
    });





  
    function updateBudget(budget) {
        $.ajax({
            method: "PUT",
            url: "/api/budget",
            data: budget
        }).then(getBudget);
    }

    function validator() {
        var isFilled = true;
        $(".form-control").each(function () {
            if ($(this).val() === "") {
                isFilled = false;
            }

        });

        return isFilled;
    }
})