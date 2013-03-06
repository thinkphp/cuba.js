cuba.js - a micro JavaScript Framework
--------------------------------------

A micro-library for basic domready, JSON with padding, AJAX, DOM manipulation, YQL (Yahoo! Query Language) and CSS3 Animation(transition and transforms)

## cuba API Documentation

### cuba Global Object

    Provides a single global namespace within all cuba library code resides.

### cuba.lang

    Contains language utilities and extensions that are used in the cuba.js

* static boolean isArray( object )
* static boolean isBoolean( object )
* static boolean isFunction( object )
* static boolean isNull( object )
* static boolean isNumber( object )
* static boolean isObject( object )
* static boolean isString( object )
* static boolean isUndefined( object )
* static boolean isValue( object )
* static string  trim( string )
* static string  camelize( string )
* static string  escapeHTML( html )
* static object  augmentObject(child, parent)
* static object  hasOwnProperty(ob, property)

### DOM Ready

    Lets you define a function that will execute as soon as the DOM is in a usable state.

* .ready( fn )

### DOM

* .select( selector )
* .one( id )
* .grab( id )
* .getOne( id )
* .getAll( selector )
* .each(arr, fn)
* .some(arr, fn, scope)
* .getStyle(elem, prop)
* .css( v )
* .html( h, text )
* .attr( a, v )
* .removeAttr( k )
* .addClass(elem, c)
* .removeClass(elem, c)
* .hasClass(elem, c)
* .toggleClass( c )
* .is( node )

### Events Handling

* .on(evType, handlerFn, useCapture)
* .off(evType, handlerFn, useCapture)
* .attach(elem, evType, fn, useCapture)
* .detach(elem, evType, fn, useCapture)
* .elem.Click( fn )
* .stopPropagation( event )

### Event Delegation

* .delegate(elem, selector, evType, fn, useCapture)

### Custom Events

* .addEvent(evType, handler)
* .removeEvent(evType, handler)
* .fireEvent(evType)

### Effects Fading

* .fadeIn(elem || id,speed,callback)
* .fadeOut(elem || id,speed,callback)
* .fadeInById(elem || id,speed,callback)
* .fadeOutById(elem || id,speed,callback)
* .elem.fadeIn(speed, callback)
* .elem.fadeOut(speed, callback)


### More

* .script(url, callback)
* .loadLink(url, callback)
* .yql(query, callback, format, diagnostics)
* .jsonp(url, callback, params, callbackName)
* .ajax(method, url, callback, postData)
* .animate( selector )

### Micro-Template Engine

* cuba.template
 
### Cache using localStorage

* cuba.cache.get( key )
* cache.set( key, data)
* cache.remove( key )

### cuba UI

* .accordion(accordionID, hiddenClass, urlCSS)
* .autosuggest (elem, array_of_suggestions)
* .tabview (work in progress)

### cuba Router

    Provides URL-based same-page routing using location hash. This makes it easy to wire up route handlers for different app
    states while providing full stack back/forward navigation support.

* cuba.router.get(pattern, handler)
* cuba.router.run()
 
##How it works

### cuba.lang - contains language extensions that are used in the library.

```js
       //true, an array literal is an array
       console.log(cuba.lang.isArray([1, 2]));

       //false, an object literal is not an array
       console.log(cuba.lang.isArray({"one": "two"}));

       //however, when declared as an array, it is true
       var a = new Array();
       a["one"] = "two";
       console.log(cuba.lang.isArray(a));

       //false, a collection of elements is like an array, but isn't
       console.log(cuba.lang.isArray(document.getElementsByTagName("body")));

       //true, false is a boolean
       console.log(cuba.lang.isBoolean(false));

       //false, 1 and the string "true" are not booleans
       console.log(cuba.lang.isBoolean(1));
       console.log(cuba.lang.isBoolean("true"));

       // null is null, but false, undefined and "" are not
       console.log(cuba.lang.isNull(null)); // true
       console.log(cuba.lang.isNull(undefined)); // false
       console.log(cuba.lang.isNull("")); // false

       //a function is a function, but an object is not
       console.log(cuba.lang.isFunction(function(){})); // true
       console.log(cuba.lang.isFunction({foo: "bar"})); // false

       //true, ints and floats are numbers
       console.log(cuba.lang.isNumber(0));//true
       console.log(cuba.lang.isNumber(123.123));//true

       //false, strings that can be cast to numbers aren't really numbers
       console.log(cuba.lang.isNumber("123.123"));


       //false, undefined numbers and infinity are not numbers we want to use
       console.log(cuba.lang.isNumber(1/0));

       // true, objects, functions, and arrays are objects
       console.log(cuba.lang.isObject({}));
       console.log(cuba.lang.isObject(function(){}));
       console.log(cuba.lang.isObject([1,2]));

       // false, primitives are not objects
       console.log(cuba.lang.isObject(1)); //false
       console.log(cuba.lang.isObject(true)); //false
       console.log(cuba.lang.isObject("{}"));//false

       //strings
       console.log(cuba.lang.isString("{}")); // true
       console.log(cuba.lang.isString({foo: "bar"})); // false
       console.log(cuba.lang.isString(123)); // false
       console.log(cuba.lang.isString(true)); // false

       // undefined is undefined, but null and false are not
       console.log(cuba.lang.isUndefined(undefined)); // true
       console.log(cuba.lang.isUndefined(false)); // false
       console.log(cuba.lang.isUndefined(null)); // false

       //hasOwnProperty
       var F = function(){}
       F.prototype.foo = 'foo'
       var a = new F();
       a.moo = "moo";
       console.log(cuba.lang.hasOwnProperty(a,"moo"))//true
       console.log(cuba.lang.hasOwnProperty(a,"foo"))//false
```

* [http://thinkphp.github.com/cuba.js/cuba.lang.test.html](http://thinkphp.github.com/cuba.js/cuba.lang.test.html)

### Specify a function to execute when the DOM is fully loaded.

```js
          //cuba.ready( fn );
          cuba.ready(function(){

               cuba.select("#in").html(arr.join(","))

               cuba.select("#action").on("click", function(){

                    cuba.select("#out").html( sorting.insert( arr ).join(",") )
               })  
          })
```

### Event Handling - bind a handler to the event for the elements.
    
```js

    //#1
    //handler function
    var f = function(){ alert('click') }

    //bind a handler to the event click for an element
    cuba.attach($('btn'),'click', f, false)

    window.setTimeout(function(){
 
           //unbind the handler to the event click
           cuba.detach($('btn'),'click', f, false)

           cuba.select('#msg').html('event removed')

    },2000)
       
    //#2  
    //attach a handler to the event 'click' for an element
    cuba.select("#btn").on('click', function(){
         alert('clicked')
    })

```

* [http://thinkphp.github.com/cuba.js/events.html](http://thinkphp.github.com/cuba.js/events.html)


### Custom Events

```js

    var arr = [9,8,7,5,4,3,2,1,0,-1,-2,-3]

        cuba.select("#btn").on('click', function( event ){
 
        evt.fireEvent("start");    

         doBubble(0, 0, arr.length-1, function(i,j){

            var aux; 

            if(arr[j] > arr[j+1]) {
               aux = arr[j]
               arr[j] = arr[j+1]
               arr[j+1] = aux       
            }
 
            draw();
         })
       });

       function doBubble(i, j, len, callback) {

         callback(i,j);
 
         if(++j>=len) {
            j = 0
            i++ 
         } 

         if(i<len) window.setTimeout(function(){
                          doBubble(i, j, len, callback)

                   }, 100); else  evt.fireEvent('sorted')
       } 
 
       function draw() {

          cuba.select("#input").html(arr.join(", "))
       }

       draw()

       var evt = cuba.util.CustomEvent;

           evt.addEvent("start", function(){
               console.log('start sorting!!!');
           })

           evt.addEvent("sorted", function(){
               console.log('end sorting!!!');
              alert('sorted!!!');
           })
```

* [http://thinkphp.github.com/cuba.js/customEvent.html](http://thinkphp.github.com/cuba.js/customEvent.html)


### Event Delegation

```html

<ul id="menu">

<li>
   <a href="#">Event Delegation List 1</a>
   <ul>
       <li>item1</li>
       <li>item2</li>
       <li>item3</li>
       <li>item4</li>
       <li>item5</li>
   </ul>
</li>

<li>
   <a href="#">Event Delegation List 2</a>
   <ul>
       <li>item1</li>
       <li>item2</li>
       <li>item3</li>
       <li>item4</li>
       <li>item5</li>
   </ul>
</li>

<li>
   <a href="#">Event Delegation List 3</a>
   <ul>
       <li>item1</li>
       <li>item2</li>
       <li>item3</li>
       <li>item4</li>
       <li>item5</li>
   </ul>
</li>


</ul>

```

```js

   cuba.ready(function(){
 
         cuba.delegate($('#menu'), 'li a', 'click', function( e ){

              var ul = e.target.parentNode.querySelector("ul")

                  if(ul.style.display == "none") {

                     ul.style.display = "block"

                  } else {

                    ul.style.display = "none"
                  }

                  console.log(e.target)

         }, false);
   })
```

* [http://thinkphp.github.com/cuba.js/delegate.html](http://thinkphp.github.com/cuba.js/delegate.html)


### DOM manipulation

```js

         //added label to the button
         cuba.select("#div").html("content")  

         //select an element, then invoke the methods: html() and css()
         cuba.select("#out")
             .html("Jean Baptiste Poquelin")
             .css("width: 100px; height: 100px;border: 1px solid #ccc;background: #393;color: #fff")
```

### JSONP stands for "JSON with Padding" and it is a workaround for loading data from different domains.

```js
         //creates a JSON request using script tag injection and handles the callbacks for you.
         //CORS can be used as a modern alternative to the JSONP)
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
```

* [http://thinkphp.github.com/cuba.js/jsonp.html](http://thinkphp.github.com/cuba.js/jsonp.html)
* [http://thinkphp.github.com/cuba.js/search.html](http://thinkphp.github.com/cuba.js/search.html)
* [http://thinkphp.github.com/cuba.js/flickr.html](http://thinkphp.github.com/cuba.js/flickr.html)

### AJAX functionality - the transport for requests is XMLHttpRequest.

```js
         //load data from the server using HTTP GET request
         cuba.ajax('GET','README.md', function( data ){

                   //do stuff with data
                   console.log(data)
         })
```

* [http://thinkphp.github.com/cuba.js/ajax.html](http://thinkphp.github.com/cuba.js/ajax.html)
* [http://thinkphp.github.com/cuba.js/ajax2.html](http://thinkphp.github.com/cuba.js/ajax2.html)


### YQL - Yahoo! Query Language YQL is an expressive SQL-like language.

```js
         //Lets you query, filter, and join data across Web Services.
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
```

* [http://thinkphp.github.com/cuba.js/yql.html](http://thinkphp.github.com/cuba.js/yql.html)



### CSS3 Animation

```js
  
         //CSS3 Animation (transition and transform)
         cuba.animate("#sandbox .box").set('margin-left',200).end()

         window.setTimeout(function(){
                        cuba.animate("#sandbox .box").set('background-color','#69c').end()
                        cuba.animate("#sandbox .box").set('border','10px solid #ccc').end()
                        cuba.animate("#sandbox .box").set('margin-left',0).end()
         }, 1200) 
```

* [http://thinkphp.github.com/cuba.js/bubble-sort-visualization.html](http://thinkphp.github.com/cuba.js/bubble-sort-visualization.html)
* [http://thinkphp.github.com/cuba.js/bubble-sort.html](http://thinkphp.github.com/cuba.js/bubble-sort.html)
* [http://thinkphp.github.com/cuba.js/select-by-min.html](http://thinkphp.github.com/cuba.js/select-by-min.html)
* [http://thinkphp.github.com/cuba.js/select-by-min-visualization.html](http://thinkphp.github.com/cuba.js/select-by-min-visualization.html)
* [http://thinkphp.github.com/cuba.js/rotate.html](http://thinkphp.github.com/cuba.js/rotate.html)
* [http://thinkphp.github.com/cuba.js/translate.html](http://thinkphp.github.com/cuba.js/translate.html)
* [http://thinkphp.github.com/cuba.js/skew.html](http://thinkphp.github.com/cuba.js/skew.html)
* [http://thinkphp.github.com/cuba.js/scale.html](http://thinkphp.github.com/cuba.js/scale.html)
* [http://thinkphp.github.com/cuba.js/padx.html](http://thinkphp.github.com/cuba.js/padx.html)
* [http://thinkphp.github.com/cuba.js/multibox.html](http://thinkphp.github.com/cuba.js/multibox.html)


### Fading Effects

```html
        <div id="div1" style="width:80px;height:80px;opacity:0;background-color:red;"></div><br>
        <div id="div2" style="width:80px;height:80px;opacity:0;background-color:green;"></div><br>
        <div id="div3" style="width:80px;height:80px;opacity:0;background-color:blue;"></div>
```

```js

        $('btn').Click(function( event ){

                 $('div1').fadeIn()
                 $('div2').fadeIn()
                 $('div3').fadeIn()
        })

        $('btn2').Click(function( event ){

                 $('div1').fadeOut()
                 $('div2').fadeOut()
                 $('div3').fadeOut()
        })

        $('btn3').Click(function( event ){

                 cuba.fadeIn('div1')
                 cuba.fadeIn('div2')
                 cuba.fadeIn('div3')
        })
```

* [http://thinkphp.github.com/cuba.js/fading.html](http://thinkphp.github.com/cuba.js/fading.html)

### Template Engine

```html

   <p id="title"></p>
```

```js
      var tmp = 'This {project} presents a very {compact} micro-templating {solution} creating for learning purposes';

      var ob = {
             'project': 'MooTools',
             'compact': "extra",
             'solution': "miss"  
      };

      cuba.select("#title").html(cuba.template(tmp, ob))

```

* [http://thinkphp.github.com/cuba.js/template.html](http://thinkphp.github.com/cuba.js/template.html)
      
### Cache using localStorage

```js
     if(cache.get( key )) {

        var photos_cached = cache.get( key )

        cuba.select('#results').html( photos_cached )
 
        cuba.select('#status').html('(read from cache)')

     } else {

        cuba.ajax('GET', url, function(data){

           cuba.select('#results').html( data )

           cache.set(key, data)

           cuba.select('#status').html('Read from api (fresh)')
             
        }.binding(this));
     }
```

* [http://thinkphp.ro/apps/js-hacks/cuba.js/cache.html](http://thinkphp.ro/apps/js-hacks/cuba.js/cache.html)


### cuba Router

```js
    cuba.router.get("/search/:what", function( data ){

                console.log( data )
    });

    cuba.router.run()
```

* [http://thinkphp.github.com/cuba.js/router.html](http://thinkphp.github.com/cuba.js/router.html)

      
### cuba UI


#### Accordion  

HTML Structure
```html

    <div id="accordion" class="accordion ui-accordion ui-widget">
    <section id="item1" class="acc_hidden">
    <p class="pointer">&#9654;</p><h1><a href="#">Class Abstraction1</a></h1>
    <p>content1</p>
    </section>
    <section id="item1" class="">
    <p class="pointer">&#9654;</p><h1><a href="#">Class Abstraction2</a></h1>
    <p>content3</p>
    </section>
    <section id="item1" class="acc_hidden">
    <p class="pointer">&#9654;</p><h1><a href="#">Class Abstraction3</a></h1>
    <p>content3</p>
    </section>
    </div>

```

JS Code
```js
     
    //Accordion based on CSS3
    //syntax: cuba.UI.accordion(accordionID, hiddenClass, urlCSS);
    cuba.UI.accordion('accordion','acc_hidden', 'link.css');   

```

* [http://thinkphp.github.com/cuba.js/accordion.html](http://thinkphp.github.com/cuba.js/accordion.html)

#### Autosuggest

The autosuggest widget provides suggestions while you type into the field.

```html
  
   <input type="text" id="tags" name="tags" />

```

```js

var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"];

      var suggest = cuba.UI.autosuggest($('tags'), availableTags)

```

* [http://thinkphp.github.com/cuba.js/autosuggest.html](http://thinkphp.github.com/cuba.js/autosuggest.html)


#### Tabview

## Browsers Support

* IE6+
* Chrome 1+
* Safari 3+
* Firefox 2+
* Opera 

