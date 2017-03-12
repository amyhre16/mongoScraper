$(document).ready(function(){ 
    $(document).on('click', '#scrapeNewArticles', function() {
        $.get('/scrapedArticles', function(articles) {
            for (var i = 0; i < articles.length; i++) {
                var newdiv = $('<div>');
                newdiv.addClass('articleTitle');

                var link = $('<a>');
                link.attr('href', articles[i].link);
                test
                var title = $('<h2>');
                title.text(articles[i].title);

                var button = $('<div>');
                button.addClass('btn btn-primary save-article');
                button.text("Save article");

                link.append(title);
                newdiv.append(link).append(button);
                $('#articleContainer').append(newdiv);
            }
        });
    });

    $(document).on('click', 'save-article', function() {
        
    });
});