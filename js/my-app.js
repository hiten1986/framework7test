// Initialize app
var myApp = new Framework7({
	precompileTemplates: true,
	template7Pages: true,
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
});


var langTemplate = $$('script#languageTemplate').html();
var compiledLanguageTemplate = Template7.compile(langTemplate);



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	console.log(page.name);
    if (page.name === 'languages2') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
		//var langTemplate = $$('script#peopleTemplate').html();
		//var langTemplate = $$('script#usersTemplate').html();
		
		
		var url = 'http://localhost/test/languages.json';
		//var url = 'http://localhost/test/people.json';
		//var url = 'http://localhost/test/users.json';
		var url = 'https://unsubstantial-deplo.000webhostapp.com/languages.json';
		$$.getJSON(url,function(json){
			//myApp.alert('hi');
			console.log(json);
			var langHTML = compiledLanguageTemplate(json);
			console.log(langHTML);
			$$(page.container).find('.page-content').append(compiledLanguageTemplate(json));
		});
		
		//var langHTML = Template7.templates.languageTemplate(lang);
		//console.log(langHTML);
		
    }
	if (page.name === 'languages') {
		//var url = 'https://unsubstantial-deplo.000webhostapp.com/languages.json';
		var url = 'http://localhost/test/languages.php';
		$$.getJSON(url,function(json){
			console.log(json);
			
			myApp.template7Data({'languages':json});
			mainView.router.load({
				url: 'languages.html',
				contextName: Template7.data.languages
			});
			console.log('loaded');
		});
	}
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
	var carHTML = Template7.templates.carTemplate({
		vendor: 'Ford',
		model: 'Mustang',
		power: 300,
		speed: 280
	});
	console.log(carHTML);
	console.log(e.detail.page.name);
	var page = e.detail.page;
	$$(page.container).find('.content-block').append(carHTML);
});
