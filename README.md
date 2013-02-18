cuba.js - a micro JavaScript Framework
--------------------------------------

A micro-library for basic domready, JSON with padding, AJAX, DOM manipulation, YQL (Yahoo! Query Language) and CSS3 Animation(transition and transforms)

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

### Specify a function to execute when the DOM is fully loaded.

          //cuba.ready( fn );
          cuba.ready(function(){

               cuba.select("#in").html(arr.join(","))

               cuba.select("#action").on("click", function(){

                    cuba.select("#out").html( sorting.insert( arr ).join(",") )
               })  
          })

### Event Handling 
                   
         //adding a handler for event 'click'
         cuba.select("#btn").on('click', function(){
               alert('clicked')
         })

### DOM manipulation

         //added label to the button
         cuba.select("#div").html("content")  


         //select an element, then invoke the methods: html() and css()
         cuba.select("#out")
             .html("Jean Baptiste Poquelin")
             .css("width: 100px; height: 100px;border: 1px solid #ccc;background: #393;color: #fff")

### JSNOP

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

### AJAX 

         //load data from the server using HTTP GET request
         cuba.ajax('GET','README.md', function( data ){

                   //do stuff with data
                   console.log(data)
         })

### YQL

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


### CSS3 Animation
  
         //CSS3 Animation (transition and transform)
         cuba.animate("#sandbox .box").set('margin-left',200).end()

         window.setTimeout(function(){
                        cuba.animate("#sandbox .box").set('background-color','#69c').end()
                        cuba.animate("#sandbox .box").set('border','10px solid #ccc').end()
                        cuba.animate("#sandbox .box").set('margin-left',0).end()
         }, 1200) 


### Fading Effects

        <div id="div1" style="width:80px;height:80px;opacity:0;background-color:red;"></div><br>
        <div id="div2" style="width:80px;height:80px;opacity:0;background-color:green;"></div><br>
        <div id="div3" style="width:80px;height:80px;opacity:0;background-color:blue;"></div>

        $('btn').Click(function( event ){

                 $('div1').fadeIn()
                 $('div2').fadeIn()
                 $('div3').fadeIn()
        })

##Browsers Support

* IE6+
* Chrome 1+
* Safari 3+
* Firefox 2+
* Opera

## Demos:
  
* [http://thinkphp.github.com/cuba.js/](http://thinkphp.github.com/cuba.js/)
* [http://thinkphp.github.com/cuba.js/search.html](http://thinkphp.github.com/cuba.js/search.html)
* [http://thinkphp.github.com/cuba.js/flickr.html](http://thinkphp.github.com/cuba.js/flickr.html)
* [http://thinkphp.github.com/cuba.js/bubble-sort-visualization.html](http://thinkphp.github.com/cuba.js/bubble-sort-visualization.html)
* [http://thinkphp.github.com/cuba.js/bubble-sort.html](http://thinkphp.github.com/cuba.js/bubble-sort.html)
* [http://thinkphp.github.com/cuba.js/jsonp.html](http://thinkphp.github.com/cuba.js/jsonp.html)
* [http://thinkphp.github.com/cuba.js/yql.html](http://thinkphp.github.com/cuba.js/yql.html)
* [http://thinkphp.github.com/cuba.js/ajax.html](http://thinkphp.github.com/cuba.js/ajax.html)
* [http://thinkphp.github.com/cuba.js/padx.html](http://thinkphp.github.com/cuba.js/padx.html)
* [http://thinkphp.github.com/cuba.js/multibox.html](http://thinkphp.github.com/cuba.js/multibox.html)
* [http://thinkphp.github.com/cuba.js/select-by-min-visualization.html](http://thinkphp.github.com/cuba.js/select-by-min-visualization.html)
* [http://thinkphp.github.com/cuba.js/http://thinkphp.github.com/cuba.js/select-by-min.html](http://thinkphp.github.com/cuba.js/select-by-min.html)
* [http://thinkphp.github.com/cuba.js/rotate.html](http://thinkphp.github.com/cuba.js/rotate.html)
* [http://thinkphp.github.com/cuba.js/translate.html](http://thinkphp.github.com/cuba.js/translate.html)
* [http://thinkphp.github.com/cuba.js/skew.html](http://thinkphp.github.com/cuba.js/skew.html)
* [http://thinkphp.github.com/cuba.js/scale.html](http://thinkphp.github.com/cuba.js/scale.html)
