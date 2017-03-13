$(document).ready(function(){ 
    // $(document).on('click', '.add-note', function() {
    //     $('#article-note-container').empty();
    //     $('#articleID').empty();
        
    // });
    $(document).on('click', '.delete-article', function() {
        var id = $(this).parent().parent().attr('id');
        console.log(id);
        $(this).parent().parent().remove();
        $.post('/deleteArticle', { id: id }, function(response) {
            console.log(response);
        });
    });
});