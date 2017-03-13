$(document).ready(function(){ 
    $(document).on('click', '#scrapeNewArticles', function() {
        $.get('/scrapedArticles', function(articles) {
            console.log(articles);
            for (var i = 0; i < articles.length; i++) {
                var newdiv = $('<div>');
                newdiv.addClass('articleTitle panel panel-default');

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
        });
    });

    $(document).on('click', '.save-article', function() {
        var title = $(this).parent().find('h2').text();
        var link = $(this).parent().find('a').attr('href');
        // console.log({title: title, link: link});
        $(this).parent().parent().remove();
        // console.log({title: title, link: link});
        $.post('/saveNewArticle', {title: title, link: link}).done(function(postedData) {
            console.log(postedData);
        });
    });
});