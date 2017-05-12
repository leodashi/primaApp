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
                $$('#titolo').html("<h2>" + response.Title + "</h2>");
                $$('#immagine').html("<img class='pagina' src=getimg.php?s=" + response.Poster + "/>");
                $$('#dataRil').html("<p>Data di rilascio: " + response.Released + "</p>");
                $$('#regista').html("<p> Regista: " + response.Director + "</p>");
                $$('#tipologia').html("<p> Tipologia: " + response.Genre + "</p>");
                $$('#durata').html("<p> Durata: " + response.Runtime + "</p>");
                var res = response.Actors.split(",");
                var actors = '';
                for(i=0;i<res.length;i++){
                    actors += '<a class="external" href="https://it.wikipedia.org/wiki/'+res[i].trim()+'">'+res[i].trim()+'</a>';
                    if( i != ( res.length - 1 )  ){
                        actors += ', ';
                    }
                }
                $$('#cast').html("<p> Cast: " + actors + "</p>");
                $$('#trama').html("<h3> Trama: </h3></br><p>" + response.Plot + "</p>");
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




});

var numeroPag = 1;
var index2 = myApp.onPageInit('index2', function (page) {
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
            page: numeroPag,
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
                $$('.copertine').on('click', function(){
                    var tmpImg = '<div class="tmpDiv" style="display:none;"><img class="tmpImg" src="'+$$(this).attr('src')+'" /><div ><button class="closeImg">X</button></div></div>';
                    
                    $$('body').append(tmpImg);
                    $$('.closeImg').css({
                        position:'absolute',
                        top: '71px',
                        left: '304px',
                        'background-color': 'red'
                    });
                    $$('.tmpDiv').css({
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,.5)',
                        top: 0,
                        left: 0,
                        zIndex: 6000
                    });
                    $$('.tmpImg').css({
                        position: 'relative',
                        margin: '20% 8%'
                    });
                    $$('.tmpDiv').show();
                
                    $$('.closeImg').on('click', function(){
                        console.log('inside');
                        $$('.tmpDiv').remove();
                    });
                });
                
                
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
});
index2.trigger();

$$('.btn-paginator').on('click', function () {
    numeroPag = $$(this).html();
    $$("#griglia").html("");
    index2.trigger();
});
           
           
           
           