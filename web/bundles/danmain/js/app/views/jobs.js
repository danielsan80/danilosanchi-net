define([
    'jquery-loader',
    'underscore',
    'backbone-loader',
    'app/util/prefix'
], function($, _, Backbone, prefix){
         
    var JobsView = Backbone.View.extend({
        el: $(".gantt"),
        events: {
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.gantt({
                source: prefix + "/widget/jobs/data",
                scale: "months",
                minScale: "days",
                maxScale: "years",
                months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
                dow: ["D", "L", "M", "M", "G", "V", "S"],
                navigate: "scroll",
                itemsPerPage: 10,
                scrollToToday: true,
                onItemClick: function(data) {

                }
            });

//                    $(".gantt").popover({
//                            selector: ".bar",
//                            title: "I'm a popover",
//                            content: "And I'm the content of said popover."
//                    });
            
            
        },
    });

    return JobsView;
});
