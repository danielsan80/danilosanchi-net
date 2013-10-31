define([
  'jquery-loader', 
  'underscore',
  'backbone-loader',
  'app/views/skills',
  'app/views/jobs',
  'app/views/calendar',
  'app/views/rss',
], function($, _, Backbone, SkillsView, JobsView, CalendarView, RssView){
         
    var IndexView = Backbone.View.extend({
        el: $("body"),
        events: {
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var skillsView = new SkillsView({});
            var jobsView = new JobsView({});
            var calendarView = new CalendarView({});
            var rssView = new RssView({});

            this.$(".google-calendar").append(calendarView.el);
            this.$(".rss-feeds").append(rssView.el);
            this.$(".jobs").append(jobsView.el);
            this.$(".skills").append(skillsView.el);
        },
    });

    return IndexView;
});
