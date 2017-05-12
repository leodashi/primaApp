// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

myApp.onPageInit('AggFilm', function (page) {
    $$('.back').on('click', function (e) {
        $$('#bo').css("display", "flex");
        $$('#camb').css("display", "inline-block");
        rotatePlus();
    });
    // Do something here for "about" page
    $$('#ciao').on('touchend', function (e) {
        // $$('#pro').html("Funziona");
        var input = document.createElement('input');
        input.type = "text";
        input.placeholder = "Jason Statham";
        var q = document.getElementById("qui");
        q.appendChild(input);
    });

});
function rotatePlus() {
    if ($$('#camb').css('transform') == 'none') {
        $$('#camb').transform('rotate(45deg)');
    } else {
        $$('#camb').transform('none');
    }
}
$$('#bo').on('click', function (e) {
    console.log("transf: " + $$('#camb').css('transform'));
    rotatePlus();
});

$$('a#ba').on('click', function (e) {
    $$('#bo').hide();
//    myApp.closeModal(".demo-popover", false);
    myApp.closeModal();
    //$$('#ba').hide();
});

myApp.onPageInit('ff8', function (page) {
    $$('.external').each(function (e) {
        $$(this).on('click', function (e) {
            var num1 = $$(this).html();
            var nomiwiki = "https://it.wikipedia.org/wiki/";
            var fin = nomiwiki + num1;
            $$(this).attr({
                href: fin
            });
        });
    });
});

myApp.onPageInit('TC', function (page) {
    $$('.external').each(function (e) {
        $$(this).on('click', function (e) {
            var num1 = $$(this).html();
            var nomiwiki = "https://it.wikipedia.org/wiki/";
            var fin = nomiwiki + num1;
            $$(this).attr({
                href: fin
            });
        });
    });
});


myApp.onPageInit('Gold', function (page) {
    $$('.external').each(function (e) {
        $$(this).on('click', function (e) {
            var num1 = $$(this).html();
            var nomiwiki = "https://it.wikipedia.org/wiki/";
            var fin = nomiwiki + num1;
            $$(this).attr({
                href: fin
            });
        });
    });
});

myApp.onPageInit('Kong', function (page) {
    $$('.external').each(function (e) {
        $$(this).on('click', function (e) {
            var num1 = $$(this).html();
            var nomiwiki = "https://it.wikipedia.org/wiki/";
            var fin = nomiwiki + num1;
            $$(this).attr({
                href: fin
            });
        });
    });
});
myApp.onPageInit('Arthur', function (page) {
    $$('.external').each(function (e) {
        $$(this).on('click', function (e) {
            var num1 = $$(this).html();
            var nomiwiki = "https://it.wikipedia.org/wiki/";
            var fin = nomiwiki + num1;
            $$(this).attr({
                href: fin
            });
        });
    });
});

myApp.onPageInit('GDG2', function (page) {
    $$('.external').each(function (e) {
        $$(this).on('click', function (e) {
            var num1 = $$(this).html();
            var nomiwiki = "https://it.wikipedia.org/wiki/";
            var fin = nomiwiki + num1;
            $$(this).attr({
                href: fin
            });
        });
    });
});

myApp.onPageInit('index', function (page) {
    var mySearchbar = app.searchbar('.searchbar', {
        searchIn: '.titolo'
    });
});


myApp.onPageInit('singolo', function (page) {
    //Recuperare la querystring
    var urlPage = page.url;
    var idFilm;
    var data = {};
    //Recuperare l'id dalla query string
    data = {
        i: page.query.id,
        y: "2017",
        type: "movie",
        plot: 'full',
    }

    //devi scrivere codice html da inserire nel content-page
    //Chiamata AJAX a Ricerca.php
    $$.ajaxSetup({
        headers: {
            'Allow-Origin': '*'
        }
    });
    $$.ajax({
        url: 'ricerca.php',
        //Parametri t=titolo opp i=id
        data: data,
        method: "GET",
        processData: true,
        dataType: 'json',
        //riprendi la response
        //$$("#titolo").html(response.titolo)
        //Enjoy!

        success: function (response, status, xhr) {
            console.log(response);
            if (response.Response == "True") {
                //console.log(s[i].Title);
                $$('#titolo').html("<h1>" + response.Title +"</h1>");
                $$('#immagine').html("<img src=" + response.Poster + "/>");
                $$('#dataRil').html("<p>" + response.Released +"</p>");
                $$('#regista').html("<p>" + response.Director +"</p>");
                $$('#tipologia').html("<p>" + response.Genre +"</p>");
                $$('#durata').html("<p>" + response.Runtime +"</p>");
                $$('#cast').html("<p>" + response.Actors +"</p>");
                $$('#trama').html("<p>" + response.Plot +"</p>");
            } else {
                myApp.alert("Ricerca non valida");
            }
            
//                "Title":"A Ghost Story", 
//                "Year":"2017", 
//                "Rated":"N/A", 
//                "Released":"07 Jul 2017", 
//                "Runtime":"87 min", 
//                "Genre":"Drama, Fantasy, Romance", "Director":"David Lowery", 
//                "Writer":"David Lowery", "Actors":"Sonia Acevedo, Casey Affleck, Carlos Bermudez, McColm Cephas Jr.", 
//                "Plot":"In this singular exploration of legacy, love, loss, and the enormity of existence, a recently deceased, white-sheeted ghost returns to his suburban home to try and reconnect with his bereft wife.", "Language":"English", "Country":"USA", "Awards":"N/A", "Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMzcyNTc1ODQzMF5BMl5BanBnXkFtZTgwNTgzMzY4MTI@._V1_SX300.jpg", 
//                "Ratings":[
//                    {"Source":"Internet Movie Database", "Value":"7.8/10"}
//                        , {"Source":"Metacritic", "Value":"89/100"}
//                    ], 
//                    "Metascore":"89", 
//                    "imdbRating":"7.8", 
//                    "imdbVotes":"183", 
//                    "imdbID":"tt6265828", 
//                    "Type":"movie", 
//                    "DVD":"N/A", 
//                    "BoxOffice":"N/A", 
//                    "Production":"N/A", 
//                    "Website":"N/A", 
//                    "Response":"True"}
        },
        error: function (xhr, response, status) {
            myApp.alert('errore nella chiamata');
            console.log(response);

        },
        statusCode: {
            404: function (xhr) {
                alert('page not found');
            }
        }



    });




});

myApp.onPageInit('index2', function (page) {
    $$.ajaxSetup({
        headers: {
            'Allow-Origin': '*'
        }
    });
    $$.ajax({
        url: 'ricerca.php',
        data: {
            s: "a",
            y: "2017",
            type: "movie",
            plot: 'full',
            page: 2

        },
        method: "GET",
        processData: true,

        dataType: 'json',
        success: function (response, status, xhr) {
//            myApp.alert('chiamata ok');
            console.log(response);
            if (response.Response == "True") {
                var s = response.Search;
                var container = $$('#griglia');
                var ht;
                for (i = 0; i < s.length - 4; i++) {
                    //console.log(s[i].Title);
                    ht = '<li class="misura"><div><img class="copertine" src="getimg.php?s=' + s[i].Poster + '"/><br /><a href="singolo.html?id=' + s[i].imdbID + '">' + s[i].Title + '</a></div></li>'
                    container.append(ht);

                }
            } else {
                myApp.alert("Ricerca non valida");
            }

        },
        error: function (xhr, response, status) {
            myApp.alert('errore nella chiamata');
            console.log(response);

        },
        statusCode: {
            404: function (xhr) {
                alert('page not found');
            }
        }
    });
    $$('#aggNuovo').on('close', function () {
        rotatePlus();
    });

}).trigger(); //And trigger it right away