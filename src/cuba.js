/*
 * cuba.js: a micro-framework JavaScript
 * copyright Adrian Statescu 2013 (@thinphp)
 * http://thinkphp.ro
 * MIT License
 */

var cuba = {

    version: 1.05,

    name: 'cuba.js',
 
    select: function( selector ) {
 
            this.value = Array.prototype.slice.call( document.querySelectorAll( selector ) )

         return this
    },

    one: function( id ) { id = id.replace('#',''); this.value = [document.getElementById( id )]; return this},  

    first: function( bool ) {
 
           if(typeof bool == 'undefined') this.value = this.value.length > 0 ? [this.value[0]] : [];

              else
                    return this.value.length > 0 ? this.value[0] : null

        return this
    },

    last: function( bool ) {

           if(typeof bool == 'undefined') this.value = this.value.length > 0 ? [this.value[this.value.length-1]] : []

                   else

                     return this.value.length > 0 ? this.value[this.value.length-1]:null
         return this   
    },

    grab: function( id ) { id = id.replace('#',''); return document.getElementById( id ) },

    each: function(arr, fn) {

          var len = arr.length,

              index;

              for(index = 0; index < len; index++) {

                  fn.call(this, arr[ index ], index, arr)
              }

         return arr
    },

    css: function( v ) {

         this.value = this.each.call(this, this.value, function( elem ){

              elem.style.cssText = v 
         })

       return this
    },

    attr: function(a, v) {

         this.value = this.each.call(this, this.value, function( elem ){

              elem.setAttribute(a, v)
         })

       return this  
    },

    html: function( h, text ) {

          var specialTags = /select|fieldset|table|tbody|tfoot|td|tr|colgroup/i,

              method = text ? 

                       document.documentElement === null ? 

                                   'innerText':'innerHTML'

                                    :

                                   'innerHTML';

              typeof h !== 'undefined' ? 

                     this.each.call(this, this.value, function(elem){
                          
                          elem[method] = h
                     })

                     :

                     this.each.call(this, this.value, function(elem){

                          elem[method] = h
                     })

         return this            
 
    },

    trim: function( s ) {

          return String.prototype.trim ? s.trim() : s.replace(/(^\s*|\s*$)/g,'')    
    },

    /**
     *  Adds the specified class(es) to each of the set of matched elements.
     *  It's important to note that this method does not replace a class. It simply adds the class, appending it to any which
     *  may already be assigned to the elements.
     * 
     *  @param elem Object - the element for which add class
     *  @param c String - add specified class to the element
     *  @return (cuba) object
     */
    addClass: function(elem, c) {

          if('classList' in document.createElement('p')) {
            
              arguments.length == 1 && typeof elem == 'string' ? 

              this.value = this.each.call(this, this.value, function( el ){

                   el.classList.add( elem )

              }) : 

                   elem.classList.add( c )  

          } else {

              this.value = this.each.call(this, this.value, function( elem ){

                   elem.className = this.trim(elem.className + ' ' + c)
              })
          }

       return this
    },

    hasClass: function( el, c ) {

          if('classList' in document.createElement('p')) {

              return el.classList.contains( c )  

          } else {

              return this.classReg( c ).test(el.className)
          }

    },

    removeClass: function(elem, c ) {

         if('classList' in document.createElement('p')) {

              arguments.length == 1 && typeof elem == 'string' ? 
                      
              this.value = this.each.call(this, this.value, function( el ){

                   el.classList.remove( elem )

              }) : 
 
                   elem.classList.remove( c )                                      

         } else {

              this.value = this.each.call(this, this.value, function( elem ){

                   elem.className = this.trim(elem.className + ' ' + c)
              })
         }

       return this
    },

    classReg: function( c ) {

        return new RegExp('(^|\\s+)' + c +'(\\s+$)')
    }, 

    toggleClass: function( c ) {

        this.each.call(this, this.value, function( elem ){

             this.hasClass(elem, c) ? this.removeClass(elem, c) : this.addClass(elem, c)
        })   
    },

    on: function(ev, fn) {

       this.value = this.each.call(this, this.value, function( elem ){

                  if( elem.addEventListener ) {

                     elem.addEventListener(ev, fn, false)

                  } else if( elem.attachEvent ) {

                     elem.attachEvent( 'on' + ev, fn)  

                  } else {

                     elem[ 'on' + ev ] = fn
                  }
       })  

      return this
    },

    attach: function(elem, ev, fn, useCapture) {

                  if( elem.addEventListener ) {

                     elem.addEventListener(ev, fn, useCapture)

                  } else if( elem.attachEvent ) {

                     elem.attachEvent( 'on' + ev, fn)  

                  } else {

                     elem[ 'on' + ev ] = fn
                  }
    },

    stopPropagation: function( e ) {

        if(window.event) {

           window.event.cancelBubble = true
           window.event.returnValue = false 
        }   

        if(e.preventDefault && e.stopPropagation) {

           e.preventDefault()
           e.stopPropagation()  
        }
    },

    getTarget: function( evt ) {

         var target = window.event ? window.event.srcElement : evt ? evt.target : null  

         while(target.nodeType != 1 && target.nodeName.toLowerCase() != 'body') {

               target = target.parentNode
         }  
 
         if(!target) return false

       return target;
    },

    ajax: function(method,url,callback,postData) {

                  function handleReadyState(o,callback) { 

                       o.onreadystatechange = function() {

                           if(o.readyState == 4) {

                                 if(o.status == 200) {

                                      callback(o.responseText);

                                 }
                           }
                       }
                  }


                  var XHR = function() {   
                       var http;
                       try {
                             http = new XMLHttpRequest();
                             XHR = function(){return new XMLHttpRequest();}
                           }catch(e) {
                                try {
                                     http = new ActiveXObject("Microsoft.XMLHTTP");
                                     XHR = function(){return new ActiveXObject("Microsoft.XMLHTTP");}
                                    }catch(e){} 
                           }
                      return XHR();
                 };

                 var http = XHR();
                     http.open(method,url,true);

                       if(postData) {
                            //Send the proper header information along with the request
                            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            http.setRequestHeader("Content-length", postData.length);
                            http.setRequestHeader("Connection", "close");
                       }

                       handleReadyState(http,callback);       
                       http.send(postData || null);   
 
              return http;
     },

     script: function(url, callback) {

            var s = document.createElement('script')
                s.setAttribute('type','text/javascript')
                s.setAttribute('src',url)
                s.setAttribute('id','leach')

                if(s.readyState) {

                  s.onreadystatechange = function() {

                     if(s.readyState == 'loaded' || s.readyState == 'complete') {
 
                          s.onreadystatechange = null
                          callback( s )
                          var old = document.getElementById('leach')

                          if( old ) {
                            old.parentNode.removeChild( old ) 
                          } 

                     }
                  }
                
                } else {

                  s.onload = function() {

                    callback( s )
                    var old = document.getElementById('leach')
                        if( old ) {
                            old.parentNode.removeChild( old ) 
                        } 
                  } 
                }

                document.getElementsByTagName("head")[0].appendChild(s);
     },


     ready: function( foo ) {

           var fns = [], fn, f = false, d = document,  

               testEl = d.documentElement, hack = testEl.doScroll,

               domContentLoaded = 'DOMContentLoaded', addEventListener = 'addEventListener',

               attachEvent = 'attachEvent',detachEvent = 'detachEvent',

               readyState = 'readyState', onreadystatechange = 'onreadystatechange',

               loaded = /^loade|c/.test(d[readyState]); 

               function flush() {

                        loaded = 1

                        while( f = fns.shift() ) f()
               }

               d[addEventListener] && d[addEventListener](domContentLoaded, fn = function(){

                     d.removeEventListener(domContentLoaded, fn, f)

                     flush()

               }, f);

               hack && d.attachEvent(onreadystatechange, fn = function(){

                  if(/^c/.test(d[readyState])) { 

                    d[detachEvent](onreadystatechange, fn)

                    flush()
                  }
               });
                
               (function( foo ) {

                      loaded ? foo() : fns.push( foo ) 

               })(foo);
     },

     /**
          A method YQL client for this micro-framework;
          Yahoo! Query Language is an expressive SQL-like language that lets you query, filter, and join data across web services.
          With YQL, apps runs faster with fewer lines of codes and smaller network footprint.
          Yahoo! and other sites across the internet make much of their structured data available to developers, primarily through
          Web Services. To access and query these services, developers traditionally endure the pain and location the right URLs and 
          documentation to access and query each Web service.

          i.e: select * from twitter.usertimeline where id='YQL'

          console: http://developer.yahoo.com/yql/console/  

          @param query String - a YQL query;
          @param callback Function - a callback function that receives the result of the query;
          @param format String - the format of the result, by default 'json';
          @param diagnostics Boolean - true or false, by default to false;
          @return - return this, c`est-a-dire this object;
               
      */
     yql: function(query, callback, format, diagnostics) {

          this.query = query;

          this.format = format || 'json';

          this.diagnostics = diagnostics || false;

          this.fetch( callback )

        return this 
     },

     fetch: function( callback ) {

         var scriptEl = document.createElement("script"),

         endpoint = 'http://query.yahooapis.com/v1/public/yql?q=',

         env = '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',

         encodedURL = encodeURIComponent(this.query),

         format = this.format,

         id = 'YQL' + (+new Date()),

         src = endpoint + encodedURL + '&format='+ format + '&callback=cuba.' + id + '&diagnostics=' + this.diagnostics + env;

         cuba[ id ] = function( data ) {

              //for debug
              if(window.console) console.log( data )
 
              //invoke the callback function to execute
              callback( data ) 

              //delete from memory
              delete cuba[ id ]

              //delete script node
              document.body.removeChild( scriptEl )
         }

         //set type attribute
         scriptEl.setAttribute('type', 'text/javascript')

         //set src attribute
         scriptEl.setAttribute('src', src)

         //append to body dom
         document.body.appendChild( scriptEl ) 

       return this 
    },

    jsonp: function(url, callback, params, callbackname) {

       this.url = url

       this.callback = callback

       this.jsonCallbackName = callbackname || 'callback'

       if(params !== 'undefined' && typeof params == 'object'){

          var query = ''
                  for(var key in params) {
                       if(params.hasOwnProperty(key)) {
                          query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&' 
                       } 
                  }
          this.url = this.url + '?' + query  
       }      

       this.url = this.url + '&' + this.jsonCallbackName + '=?'
   
       this.fetchjson( callback ) 

      return this 
    },

    fetchjson: function( callback ) {

       var id = new Date().getTime(),

           doc = document,  

           fn = 'callback_' + id,

           url = this.url.replace('=?','=cuba.' + fn),

           s = doc.createElement('script');

           s.setAttribute('type','text/javascript')

           cuba[ fn ] = this.evalJSON( callback )

           s.setAttribute('src', url)

           document.getElementsByTagName('head')[0].appendChild( s )

           this.s = s

           this.fn = fn
    },

    evalJSON: function( callback ) {

          return function( data ) {

                 var validjson = false;
 
                 if( typeof data == 'string' ) {

                      validjson = JSON.parse( data )

                 } else if( typeof data == 'object' ) {

                      validjson = data

                 } else {

                      validjson = JSON.parse( JSON.stringify(data) )
                 }

                 if( validjson ) {

                      callback( validjson )

                      if(window.console) console.log('VALID JSON')

                 } else {

                      if(window.console) oonsole.log('JSONP call returned invalid JSON or empty JSON') 
                 }
          }
     }

};

HTMLElement.prototype.Click = function( fn ) {

     return cuba.attach(this, 'click', fn, false)  
}

