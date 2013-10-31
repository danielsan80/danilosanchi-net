define([
  'jquery-loader', 
  'underscore', 
  'backbone-loader',
  'app/views/skills',
], function($, _, Backbone, SkillsView){
         
    var IndexView = Backbone.View.extend({
        el: $("body"),
        events: {
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var skillsView = new SkillsView({});

            this.$(".skills").append(skillsView.el);
        },
    });

    return IndexView;
});
