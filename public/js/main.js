$(document).ready(function () {
    
    userId = $("#navbarDropdown").attr("data-userid")
    
    console.log(userId, "id")

    var categoryInput = $("#categoryName")

    $(".categorySbtn").on("click", handleSubmit);

    function handleSubmit(event) {
        event.preventDefault()
        // userId = categoryInput.attr("data-userid")
        newCategory = categoryInput.val().trim()

        submitPost(userId, newCategory)
    }

    function submitPost(userId, newCategory) {
        $.post("/api/category/posts", {
            category_name: newCategory,
            UserId: userId
        }, (e) => {
            console.log(e)
            location.reload();

        })
    }




    // ADD ITEM
    // -----------------------------------------------------------------
    $(".addItem").on("click", function (e) {

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





});
