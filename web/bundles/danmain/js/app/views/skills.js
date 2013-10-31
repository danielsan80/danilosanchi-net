define([
  'jquery-loader', 
  'underscore', 
  'backbone-loader',
  'd3',
], function($, _, Backbone, d3){
         
    var SkillsView = Backbone.View.extend({
        el: $("div.canvas"),
        events: {
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            if (!this.$el.length) {return false;}

            var defaultSize = 1000,
            chargeRatio = 0.45,
            linkDistanceMin = 60,
            linkDistanceMax = 80,
            sizeRatio = 0.9,
            
            w = this.$el.css('width').replace('px', ''),
            h = 500;
    
            var node, link, text, root;
            
            var nodes;
            
            var pointer = {size: 0, fixed: true, pointer: true, color: 'blue', x: w*0.5, y: h*0.5};
            
            var force = d3.layout.force()
                .on("tick", tick)
                .charge(function(d) {return (d.pointer ? -defaultSize * chargeRatio * pulse() : ( d.children ? -d._size * chargeRatio : -d.size * chargeRatio))})
                .linkDistance(function(d) {return d.target.children ? linkDistanceMin : linkDistanceMax;})
                .size([w, h]);
        
            var vis = d3.select(".canvas").append("svg")
                .attr("width", '100%')
                .attr("height", h);
                
            d3.json("widget/skills/data", function(json) {
                root = json;
                root.fixed = true;
                
                root.x = w * 0.5;
                root.y = h * 0.5;
                update();
            });
            
            function pulse() {
                var precision = 500;
                var time = new Date().getTime();
                var x = ((time % precision)/precision)*2*Math.PI;
                return 1 + Math.sin(x)*0.5;
            }
            
            vis.on("mousemove", function() {
                    var point = d3.mouse(this);
                    pointer.x = point[0];
                    pointer.y = point[1];
                    update();
                });
                

            function update() {
                nodes = flatten(root);
                nodes.push(pointer);
                
                var links = d3.layout.tree().links(nodes);

                // Restart the force layout.
                force
                    .nodes(nodes)
                    .links(links)
                    .start();
                    
                // Update the links…
                link = vis.selectAll("line.link")
                    .data(links, function(d) {return d.target.id;});

                // Enter any new links.
                link.enter().insert("line", ".node")
                    .attr("class", "link")
                    .attr("x1", function(d) {return d.source.x;})
                    .attr("y1", function(d) {return d.source.y;})
                    .attr("x2", function(d) {return d.target.x;})
                    .attr("y2", function(d) {return d.target.y;})
                    .attr("stroke-dasharray", "5,5");

                // Exit any old links.
                link.exit().remove();

                // Update the nodes…
                node = vis.selectAll("g.node")
                    .data(nodes, function(d) {return d.id;});
                    
                node.select("circle")
                    .transition()
                    .attr("r", r)
                    .style("fill", color)
                    .attr("fill", color)
                
                var g = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function(d) {return "translate(" +d.x + "," + d.y + ")";})
                        .on("click", click)
                        .call(force.drag)
                    
                    g.append("circle")
                        .attr("r", r)
                        .style("fill", color)                
                        .attr("fill", color)
                        
                
                    g.append("text", "circle")
                        .text(function(d) {return d.name;})
                        .attr("class", "label")
                        .attr("text-anchor", "middle")
                        .attr("x", 0)
                        .attr("y", 4)
                        
                    g.append("title")
                        .text(function(d) {return d.description;});
                

                // Exit any old nodes.
                node.exit().remove();
                
            }
            
            function r(d) {
                return Math.sqrt(d.children ? d._size : d.size) * sizeRatio; 
            }

            function tick() {
                link.attr("x1", function(d) {return d.source.x;})
                .attr("y1", function(d) {return d.source.y;})
                .attr("x2", function(d) {return d.target.x;})
                .attr("y2", function(d) {return d.target.y;});
                node.attr("transform", function(d) {return "translate(" +d.x + "," + d.y + ")";});
            }

            // Color leaf nodes orange, and packages white or blue.
            function color(d) {
                if (d.level) {
                    var ranges = [50,80,100];
                    var white = d3.rgb('#ffffff');
                    var bronze = d3.rgb('#db8367');
                    var silver = d3.rgb('#bdbdbd');
                    var gold = d3.rgb('#ffc800');
                    var red = d3.rgb('#ff0000');
                    var green = d3.rgb('#00ff00');
                    var gray = d3.rgb('#cccccc');
                    
                    var interpolator = d3.interpolateRgb(gray.brighter(10), gray);
                    interpolator = interpolator(d.level/100);
                    return interpolator.toString();

                    if (d.level<=ranges[0]) {
                        var interpolator = d3.interpolateRgb(bronze.brighter(2), bronze);
                        interpolator = interpolator(d.level/ranges[0]);
                        return interpolator.toString();
                    }
                    if (d.level<=ranges[1]) {
                        var interpolator = d3.interpolateRgb(silver.brighter(2), silver);
                        interpolator = interpolator((d.level-ranges[0])/(ranges[1]-ranges[0]));
                        return interpolator.toString();
                    }
                    if (d.level<=ranges[2]) {
                        var interpolator = d3.interpolateRgb(gold.brighter(2), gold);
                        interpolator = interpolator((d.level-ranges[1])/(ranges[2]-ranges[1]));
                        return interpolator.toString();
                    }
                }
                
                if (d.color) {
                    return d.color;
                }
                return d._children ? "#cccccc" : d.children ? "#eeeeee" : "#9ed472";
//                return d._children ? "#cccccc" : d.children ? "#eeeeee" : "#ffdfdf";
            }

            // Toggle children on click.
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update();
            }

            // Returns a list of all nodes under the root.
            function flatten(root) {
                var nodes = [], i = 0;

                function recurse(node) {
                    if ( root && !root.initialized) {
                        node._size = defaultSize;
                        if (node.size) node._size = node.size;
                    }
                    if (node.children) node.size = node._size + node.children.reduce(function(p, v) {return p + recurse(v);}, 0);
                    if (!node.id) node.id = ++i;
                    nodes.push(node);
                    return node.size;
                }

                recurse(root);
                root.initialized = true;
                return nodes;
            }
            
            
        },
    });

    return SkillsView;
});
