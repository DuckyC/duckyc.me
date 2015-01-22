var gitpull = require('git-pull')

var router = {};

router.path = "/git/webhook/:command";

router.func = function($){
	if($.params.command == "pull"){
		gitpull(__dirname, function (err, consoleOutput) {
		    if (err) {
		        $.send("Error: " +  err + "  -  " + consoleOutput);
		    } else {
		        $.send("Success " + consoleOutput);
		        console.log("Updated from git");
		    }
		    $.end('\nUpdated!');

		});
	}else{
		$.end('Unknown command');
	}
    
}

module.exports = router;