var graphRpS = function (series, appendToSelector) {
    $( '<div id="graphRpS" style="width: 90%; height: 90%; margin: 0 auto"></div>' )
	    .appendTo( $(appendToSelector) );
    
    $('#graphRpS').highcharts({
        chart: {
            animation: true,
            zoomType: 'x',
            defaultSeriesType: 'line',
            type: 'area'
        },
        lang: {
            loading: ''
        },
        loading: {
            labelStyle: {}
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Requests Per Second',
            style: {
                color: '#355968'
            }
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                minute: '%H:%M',
                hour: '%H:%M',
                month: '%e. %b',
                year: '%b. %y'
            },
        },
        yAxis: {
            title: {
                text: ''
            },
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                animation: true,
                shadow: false,
                marker: {
                    enabled: false
                }
            },
            area: {
                stacking: 'normal',
                color: '#bdd980',
                lineColor: '#688625',
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        legend: {
            enabled: false
        },

        series: [{
            data: series.data
        }]
    });
};