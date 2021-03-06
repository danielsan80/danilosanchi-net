require.config({
    paths: {
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
        'json2': 'http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2',
        'd3': 'http://d3js.org/d3.v3.min',
        
        'jquery-ui': 'libs/jquery/jquery-ui-1.8.18.custom/js/jquery-ui-1.8.18.custom.min',
        'jquery-gantt': 'libs/jquery/jQueryGantt/js/jquery.fn.gantt',
        'jquery-jfeed': 'libs/jquery/jquery.jfeed',
        
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'backbone-relational': 'libs/backbone/backbone-relational',
        
        'backbone-loader': 'libs/loader/backbone',
        'jquery-loader': 'libs/loader/jquery',
        
        'templates': 'app/views/templates',
        
        'eventie': 'libs/bower_components/eventie',
        'doc-ready': 'libs/bower_components/doc-ready',
        'eventEmitter': 'libs/bower_components/eventEmitter',
        'get-style-property': 'libs/bower_components/get-style-property',
        'get-size': 'libs/bower_components/get-size',
        'matches-selector': 'libs/bower_components/matches-selector',
        'outlayer': 'libs/bower_components/outlayer',
        'masonry': 'libs/bower_components/masonry',
        
        'text': 'libs/bower_components/text/text',
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'backbone-relational': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        'd3': {
            exports: 'd3'
        },
        'jquery-gantt': ['jquery'],
        'jquery-feed': ['jquery']   
    }

});

require([
    'app/app',
], function(App) {
    App.initialize();
});
