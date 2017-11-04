var started;
var playing;

$(document).ready(function() {
    // alert("main.js imported.");
    $('audio').audioPlayer();

});

function play() {
    $(".audioplayer-playpause>a").click();
    playing = !playing;
}

function begin() {
    var totalMins = checkInput();
    if (totalMins) {
        $("#totalMins")
            .attr("disabled", true)
            .attr("style", "background-color:Lavender;");

        $("#iconSpan").attr("class", "glyphicon glyphicon-pause")

        started = true;

        if (started) {
            drawCountdown(totalMins * 60);
        }
        $("#begin").toggle();
        $("#reset").toggle();
    }
}

function checkInput(obj) {
    var obj = $("#totalMins");
    var val = parseInt(obj.val());
    if (val) {
        obj.attr("style", "background-color:default;");
    } else {
        obj.attr("style", "background-color:yellow;");
        alert("请输入有效的时间数值！");
    }
    return val;
}

function reset() {
    $("#totalMins").attr("style", "background-color:default;").removeAttr("disabled");
    if (playing) {
        play();
    }
    $("#iconSpan").attr("class", "glyphicon glyphicon-play").removeAttr('disabled');
    $("#main").html("");

    $("#begin").toggle();
    $("#reset").toggle();
    started = false;
}

function drawCountdown(total) {
    var div = document.createElement("div");
    div.style.height = "600px";
    var main = document.getElementById("main");
    main.appendChild(div);
    var mainChart = echarts.init(div);
    var options = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                var hh = pad2(parseInt(params.value / 3600));
                var mm = pad2(parseInt(params.value % 3600 / 60));
                var ss = pad2(params.value % 60);
                return params.seriesName + "</br>" + params.name + " " + hh + ":" + mm + ":" + ss;
            }
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: ['剩余时间']
        },
        series: [{
            name: '计时',
            type: 'pie',
            clockwise: false,
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    textStyle: {
                        fontSize: '20',
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: total,
                name: '剩余时间',
                itemStyle: {
                    normal: {
                        color: 'rgb(129, 227, 238)'
                    }
                }
            }, {
                value: 0,
                name: '已经过',
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(251, 118, 123)'
                    }
                }
            }]
        }]
    };
    mainChart.setOption(options);

    var si = setInterval(function() {
        if (started) {
            var option = mainChart.getOption();
            option.series[0].data[0].value = option.series[0].data[0].value - 1;

            // var value = option.series[0].data[0].value;
            // var hh = pad2(parseInt(value / 3600));
            // var mm = pad2(parseInt(value % 3600 / 60));
            // var ss = pad2(value % 60);
            // option.series[0].data[0].name = "剩余时间 " + hh + ":" + mm + ":" + ss;

            option.series[0].data[1].value = option.series[0].data[1].value + 1;
            mainChart.setOption(option);
            if (option.series[0].data[0].value == 0) {
                clearInterval(si);
                play();
            }
        }
    }, 1000);
}

function pad2(digit) {
    return digit * 1 < 10 ? ("0" + digit) : digit;
}
