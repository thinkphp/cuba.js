cuba.js - a micro JavaScript Framework
--------------------------------------

A library for basic domready, script tag injection, AJAX, CSS, DOM manipulation!
 
##Syntax

          cuba.ready(function(){

               cuba.select("#in").html(arr.join(","))

               cuba.select("#action").on("click", function(){

                    cuba.select("#out").html( sorting.insert( arr ).join(",") )
               })  
          })

OR

         //select an element and added a handler on event 'click'
         cuba.select("#btn").on('click', function(){
               alert('clicked')
         })

OR
         //added label
         cuba.select("#btn").html("Click Me")  

OR

         //select an element, then called the methods: html and css
         cuba.select("#out")
             .html("Jean Baptiste Poquelin")
             .css("width: 100px; height: 100px;border: 1px solid #ccc;background: #393;color: #fff")


## Demos: