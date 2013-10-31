define([
  'jquery-loader',
  'underscore',
  'text!templates/rss/article.html',
  'app/util/prefix'
], function($, _, article, prefix){
         
    var RssView = Backbone.View.extend({
        initialize: function() {
            if (!this.model) {
                this.model = {};
            }
            var that = this;
            $.getFeed({
                url: prefix + '/feed/blog',
                max: 4,
                success: function(feed) {
                    that.model.feed = feed;
                    that.render();
                }    
            });
        },
        render: function() {
            for(var i = 0; i < this.model.feed.items.length; i++) {
                var item = this.model.feed.items[i];
                item.date = new Date(item.updated);
                item.date = item.date.getDate()+'/'+(item.date.getMonth()+1)+'/'+item.date.getFullYear();
                item.description = $.trim(item.description).substring(0, 190).split(" ").slice(0, -1).join(" ") + "...";
                this.$el.append(_.template(article,{'item': item}));
            }
        },
    });

    return RssView;
});
