// Create an app
var path = require("path")
var fs = require("fs")

var server = require("diet")
var app = server()
var auth  = require('diet-auth')(app)
    
app.listen("http://localhost:8000")

var dir = path.join(__dirname, "routes")
fs.readdirSync(dir).forEach(function(file) {
  var route = require("./routes/" + file);
  console.log(route.path)
  app.get(route.path, route.func)
});


// Setup Auth Service
var google = auth('google', {
    id        : '1097854755118-5415dgruuvifdgumbt12n79kvebdhlqp.apps.googleusercontent.com',
    secret    : 'o-5-RhA3bMpK00o3ZmHSpnsS',
    scope     : 'plus.login'
})

// Listen on GET /auth/google/redirect
app.get(google.redirect, function($){
    if($.passed){
        console.log($.data.user)
        $.end('Hello ' + $.data.user.nickname + ' !')
    } else {
        $.end('Something went wrong: ' + $.error)
    }
})

app.missing(function($){
    $.end("My Custom 404 Not Found Page")
})