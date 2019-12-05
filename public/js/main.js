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




});