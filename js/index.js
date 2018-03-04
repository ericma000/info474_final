$(document).ready(function() {


    var related_gene = 
        [
            [0, 15489, 11842, 11565, 11949, 4725, 795, 3420, 276],  // cow
            [15489, 0, 11347, 11150, 11311, 4479, 2700, 3152, 235],  // chimp   
            [11842, 11347, 0, 11262, 10882, 4017, 2491, 2864, 232],  // turtle
            [11565, 11150, 11262, 0, 10526, 4135, 2432, 2879, 228],  // chicken
            [11949, 11311, 10882, 10526, 0, 4248, 2742, 3119, 245],  // frog
            [4725, 4479, 4017, 4135, 4348, 0, 2243, 2587, 232],  // Fruit Flies
            [2915, 2700, 2491, 2432, 2742, 2243, 0, 8175, 315],  // potato
            [3420, 3152, 2864, 2879, 3119, 2587, 8175, 0, 431],  // moss
            [276, 235, 232, 228, 245, 232, 335, 431, 0]   // m.jan
        ]

    console.log(related_gene);

    var state = 0;

    var width = 1110, height = 600;

    var svg = d3.select("#visualization_1").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append('g')
        .attr('transform', 'translate(50, 50)');

    var tree = d3.layout.tree()
        .size([400, 400]);

    var species_1 = $('#sp_1');
    var species_2 = $('#sp_2');

    var c1;
    var c2;

    d3.json('../data/data.txt', function(data) {

        var nodes = tree.nodes(data);     
        var links = tree.links(nodes);

        var node = svg.selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
                .attr('class', 'node')
                .attr('transform', function(d) { return 'translate(' + (d.y + 300)  + ',' + (d.x + 100) + ')';})
                .on('click', function(d) {
                    show_descrip(d);
                })




        node.append('circle')
            .attr('r', function(d) {return d.radius})
            .attr('fill', 'steelblue');

        node.append('text')
            .text(function(d) { return d.name;})
            .attr('x', 17)
            .attr('y', 6)
            .style('font-weight', 'bold');
  

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y + 290, d.x + 100]; });


        svg.selectAll('path.link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('d', diagonal);

       // svg.append('circle')
       //      .attr('id', 'species_1')
       //      .attr('cx', '850px')
       //      .attr('cy', '302px')
       //      .attr('r', 0)
       //      .transition()
       //      .duration(1000)
       //      .attr('fill', 'purple')
       //      .style('opacity', 0.5)
       //      .attr('r', 55);
        
       //  svg.append('circle')
       //      .attr('id', 'species_2')
       //      .attr('cx', '895px')
       //      .attr('cy', '302px')
       //      .attr('r', 0)
       //      .transition()
       //      .duration(1000)
       //      .attr('fill', 'blue')
       //      .style('opacity', 0.5)
       //      .attr('r', 55)

        // svg.append('text')
        //     .text('15489 GENES IN COMMON')
        //     .attr('x', '720px')
        //     .attr('y', '310px' )
        //     .style('font-size', '1.5rem')

        // $('.node').on('click', function(d) {



        // })




    })




    function show_descrip(data) {

        if (state == 0) {

            c1 = data;

            $('#sp_1 h4').text(data.name.toUpperCase());            
            $('#sp_1 p').text(data.description);
            $('#sp_1 h6').text(data.genes + " GENES");


            // shift tree to the left
            var diagonal_new = d3.svg.diagonal()  
                .projection(function(d) { return [d.y + 75, d.x + 100]; });
            svg.selectAll('path.link')
                .transition()
                .duration(500)
                .attr('d', diagonal_new)


            d3.selectAll('.node')
                .transition()
                .duration(500)
                .attr('transform', function(d) { return 'translate(' + (d.y + 85)  + ',' + (d.x + 100) + ')';})


            $('#sp_1').animate({
               top: '195px',
               opacity: 1
            })

        }

        if (state == 1) {
            var filled_display;
            var empty_display;


            if ($('#sp_1 h4').text().length > 0) { 
                filled_display = '#sp_1';
                empty_display = '#sp_2';
            }

            if ($('#sp_2 h4').text().length > 0) {
                filled_display = '#sp_2';
                empty_display = '#sp_1';
            }

            if ($(filled_display + ' h4').text() == data.name.toUpperCase()) {
                state = -1;
                $(filled_display + ' h4').empty();
                $(filled_display + ' p').empty();
                $(filled_display + ' h6').empty();

                // shift tree back to the center
                var diagonal_new = d3.svg.diagonal()  
                    .projection(function(d) { return [d.y + 290, d.x + 100]; });
                svg.selectAll('path.link')
                    .transition()
                    .duration(500)
                    .attr('d', diagonal_new)


                d3.selectAll('.node')
                    .transition()
                    .duration(500)
                    .attr('transform', function(d) { return 'translate(' + (d.y + 300)  + ',' + (d.x + 100) + ')';})

                if (filled_display == '#sp_1') {
                    $('#sp_1').animate({
                       top: '-100px',
                       opacity: 0
                    })
                } else {
                    $('#sp_2').animate({
                       top: '370px',
                       opacity: 0
                    })
                }

            } else {

                if (empty_display == '#sp_1') {
                    c1 = data
                } else {
                    c2 = data
                }


                $(empty_display + ' h4').text(data.name.toUpperCase());
                $(empty_display + ' p').text(data.description);
                $(empty_display + ' h6').text(data.genes + " GENES");


                $('#sp_1').animate({
                   top: '25px',
                   opacity: 1
                })

                $('#sp_2').animate({
                   top: '370px',
                   opacity: 1
                })

                svg.append('circle')
                    .attr('id', 'species_1')
                    .attr('cx', '850px')
                    .attr('cy', '302px')
                    .attr('r', 0)
                    .transition()
                    .duration(1000)
                    .attr('fill', c1.color)
                    .style('opacity', 0.5)
                    .attr('r', c1.gene_rad);
                
                svg.append('circle')
                    .attr('id', 'species_2')
                    .attr('cx', '895px')
                    .attr('cy', '302px')
                    .attr('r', 0)
                    .transition()
                    .duration(1000)
                    .attr('fill', c2.color)
                    .style('opacity', 0.5)
                    .attr('r', c2.gene_rad)

                // show related genes
                d3.select('#rg_left')
                    .transition()
                    .duration(1000)
                    .style('opacity', 1)

                setTimeout(function() {
                    d3.select('#rg_left h5')
                        .text(related_gene[c1.id][c2.id]);
                }, 250)
 


                d3.select('#rg_right')
                    .transition()
                    .duration(1000)
                    .style('opacity', 1);
            }
        }

        if (state == 2) {
            if (data.name.toUpperCase() == $('#sp_1 h4').text()) {
                $('#sp_1 h4').empty();
                $('#sp_1 p').empty();
                $('#sp_1 h6').empty();

                $('#sp_1').animate({
                   top: '-100',
                   opacity: 0
                })

                $('#sp_2').animate({
                   top: '195',
                   opacity: 1
                })

            } else if (data.name.toUpperCase() == $('#sp_2 h4').text()) {
                $('#sp_2 h4').empty();
                $('#sp_2 p').empty();
                $('#sp_2 h6').empty();

                $('#sp_1').animate({
                   top: '195',
                   opacity: 1
                })

                $('#sp_2').animate({
                   top: '490',
                   opacity: 0
                })

            } else {
                c1 = data;

                $('#sp_2 h4').empty();
                $('#sp_2 p').empty();
                $('#sp_2 h6').empty();

                $('#sp_1 h4').text(data.name.toUpperCase());
                $('#sp_1 p').text(data.description);
                $('#sp_1 h6').text(data.genes + " GENES");

                $('#sp_1').animate({
                   top: '195px',
                   opacity: 1
                })

                $('#sp_2').animate({
                   top: '490px',
                   opacity: 0
                })
            }

            d3.select('#species_1')
                .transition()
                .duration(500)
                .attr('r', 0)
                .remove()

            d3.select('#species_2')
                .transition()
                .duration(500)
                .attr('r', 0)
                .remove()

            d3.select('#rg_left')
                .transition()
                .duration(500)
                .style('opacity', 0)

            d3.select('#rg_right')
                .transition()
                .duration(500)
                .style('opacity', 0);



            state = 0;

        }


        console.log(c1);
        console.log(c2);


        state++;
        console.log('after: ' + state);

    }













    

});


