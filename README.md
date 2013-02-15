cuba.js - a micro JavaScript Framework
--------------------------------------

A micro-library for basic domready, JSONP (JSON with padding and script tag injection), AJAX, DOM, CSS manipulation!

## cuba API Documentation

* select( selector )
* one( id )
* grab( id )
* getOne( id )
* getAll( selector )
* each(arr, fn)
* some(arr, fn, scope)
* getStyle(elem, prop)
* css( v )
* html( h, text )
* attr( a, v )
* removeAttr( k )
* addClass(elem, c)
* removeClass(elem, c)
* hasClass(elem, c)
* toggleClass( c )
* trim(s)
* is( node )
* camelize( s )
* on(evType, handlerFn)
* attach(elem, evType, fn, useCapture)
* elem.Click( fn )
* stopPropagation( event )
* ready( fn )
* script(url, callback)
* yql(query, callback, format, diagnostics)
* jsonp(url, callback, params, callbackName)
* ajax(method, url, callback, postData)
* animate( selector )
 
##How it works

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
         var url = 'http://search.twitter.com/search.json?q=mootools&rpp=5&callback=?'

         cuba.jsonp(url, function(data){

               var result = data.results, 

               out = '<ul>'
                
               for(var i in result) {

                   out += template(tpl,result[i])
               } 
               out += '</ul>'

               cuba.select('#result-twitter').html( out )
         })

         //you can specify the name of the jsoncallback and describing the parameters
         var urlflickr = 'http://api.flickr.com/services/rest/',      
 
              params = {api_key: 'e407090ddb7d7c7c36e0a0474289ec74',
                        per_page: 20, 
                        page: 1, 
                        text: 'beach kudos', 
                        has_geo: true, 
                        method: 'flickr.photos.search', 
                        format: 'json'};

         cuba.jsonp(urlflickr, function(data) {

                      //do something with the data
                      cuba.select('#container').html( out );  

         }, params, 'jsoncallback')

OR

         //load data from the server using HTTP GET request
         cuba.ajax('GET','README.md', function( data ){

                   //do stuff with data
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


OR
         //CSS3 Animation (transition and transform)
         cuba.animate("#sandbox .box").set('margin-left',200).end()

         window.setTimeout(function(){
                        cuba.animate("#sandbox .box").set('background-color','#69c').end()
                        cuba.animate("#sandbox .box").set('border','10px solid #ccc').end()
                        cuba.animate("#sandbox .box").set('margin-left',0).end()
         }, 1200) 

##Browser Support

* IE6+
* Chrome 1+
* Safari 3+
* Firefox 2+
* Opera

## Demos:
  
* [http://thinkphp.github.com/cuba.js/](http://thinkphp.github.com/cuba.js/)