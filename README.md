cuba.js - a micro JavaScript Framework
--------------------------------------

A library for basic domready, script tag injection, AJAX, DOM CSS manipulation!
 
##Syntax

          //specify a function to execute when the DOM is fully loaded
          cuba.ready(function(){

               cuba.select("#in").html(arr.join(","))

               cuba.select("#action").on("click", function(){

                    cuba.select("#out").html( sorting.insert( arr ).join(",") )
               })  
          })
          // cuba.ready( fn ) => fn - a function to execute after the DOM is ready

OR

         //select an element and added a handler on event 'click'
         cuba.select("#btn").on('click', function(){
               alert('clicked')
         })

OR

         //added label to the button
         cuba.select("#btn").html("Click Me")  

OR

         //select an element, then invoke the methods: html() and css()
         cuba.select("#out")
             .html("Jean Baptiste Poquelin")
             .css("width: 100px; height: 100px;border: 1px solid #ccc;background: #393;color: #fff")

OR


         // JSONP or JSON with padding is a communication technique (CORS can be used as a modern alternative to the JSONP)
         // creates a JSON request using script tag injection and handles the callbacks for you.
         var url = 'http://ajax.googleapis.com/ajax/services/search/web?gl=en'+
                   '&userip=&'+
                   'hl=en&'+
                   'v=1.0&'+
                   'start=0&'+
                   'rsz=8&'+
                   'callback=googlesearch.incoming'+
                   '&q='+searchterm;

          cuba.script(url, function(){});


OR

         //load data from the server using HTTP GET request
         cuba.ajax('GET','README.md', function( data ){

                   console.log(data)
         })

OR

         //Yahoo! Query Language YQL is an expressive SQL-like language that lets you query, filter, and join data across Web Services.
         //With YQL apps run faster with fewer lines of code and smaller network footprint.
         var query = "select * from flickr.photos.search where has_geo='true' and text='san francisco' and api_key='e407090ddb7d7c7c36e0a0474289ec74'"
        
         //@param - query (String) - A query YQL
         //@param - callback (Function) - A callback function that receives the result of the query
         cuba.yql(query, function(data){

                      var photos = data.query.results.photo,

                          n = photos.length;

                      var out = '<ul>';

                      for(var i=0; i<n; i++) {

                          out += template( tpl, photos[i] )
                      }  

                      out += '</ul>';

                      cuba.select('#flickr').html( out )
         })


## Demos: