define([
  'jquery-loader', 
  'underscore', 
  'backbone-loader',
  'app/util/prefix',
], function($, _, Backbone, prefix){
         
    var CalendarView = Backbone.View.extend({
        initialize: function() {
            if (!this.model) {
                this.model = {};
            }
            var that = this;
            $.ajax({
                url: prefix + '/widget/google_calendar/get',
                type: 'GET',
                success: function(data) {
                    that.model.data = data;
                    that.render()
                    
                }
            });
        },
        render: function() {
            this.$el.html(this.model.data);
        },
    });

    return CalendarView;
});
