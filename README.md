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
         //added label
         cuba.select("#btn").html("Click Me")  

OR

         //select an element, then invoke the methods: html() and css()
         cuba.select("#out")
             .html("Jean Baptiste Poquelin")
             .css("width: 100px; height: 100px;border: 1px solid #ccc;background: #393;color: #fff")

OR

         //load data from the server using HTTP GET request
         cuba.ajax('GET','README.md', function( data ){

                   console.log(data)
         })


## Demos: