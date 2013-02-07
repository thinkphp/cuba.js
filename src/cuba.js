/*
 * cuba.js: a micro-framework JavaScript
 * copyright Adrian Statescu 2013 (@thinphp)
 * http://thinkphp.ro
 * MIT License
 */

var cuba = {

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

    select: function( selector ) {
 
            this.value = Array.prototype.slice.call( document.querySelectorAll( selector ) )

         return this
    },

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

    addClass: function() {

    },

    removeClass: function() {

    },

    toggleClass: function() {

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
    }
};
