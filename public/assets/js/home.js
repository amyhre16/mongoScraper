$(document).ready(function () {
    $(document).on('click', '#scrapeNewArticles', function () {
        $.get('/scrapedArticles', function (articles) {
            console.log(articles);
            if (articles !== "No new articles") {
                for (var i = 0; i < articles.length; i++) {
                    var newdiv = $('<div>');
                    newdiv.addClass('articleTitle panel panel-default');
                    newdiv.attr('id', articles[i]._id);

                    var panelBody = $('<div>');
                    panelBody.addClass('panel-body');

                    var link = $('<a>');
                    link.attr('href', articles[i].link);
                    link.attr('target', '_blank');

                    var title = $('<h2>');
                    title.text(articles[i].title);

                    var button = $('<div>');
                    button.addClass('btn btn-primary save-article');
                    button.text("Save article");

                    /*
                        <a href="link">
                            <h2>Title Text</h2>
                        </a>
                    */
                    link.append(title);

                    /*
                        <div class="panel-body">
                            <a href="link">
                                <h2>Title Text</h2>
                            </a>
                            <div class="btn btn-primary save-article">Save article</div>
                        </div>
                    */
                    panelBody.append(link).append(button);

                    /*
                        <div class="articleTitle panel panel-default">
                            <div class="panel-body">
                                <a href="link">
                                    <h2>Title Text</h2>
                                </a>
                                <div class="btn btn-primary save-article">Save article</div>
                            </div>
                        </div>
                    */
                    newdiv.append(panelBody);
                    $('#articleContainer').append(newdiv);
                }
            }
        });
    });

    $(document).on('click', '.save-article', function () {
        // var title = $(this).parent().find('h2').text();
        // var link = $(this).parent().find('a').attr('href');
        // console.log({title: title, link: link});
        var id = $(this).parent().parent().attr('id');
        $(this).parent().parent().remove();
        $.post('/saveNewArticle', { _id: id }).done(function (postedData) {
            console.log(postedData);
        });
    });
});