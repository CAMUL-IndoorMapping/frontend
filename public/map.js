/* General Code */
var blocoOpened = "";
var mouseX = 0,
    mouseY = 0;
var xoff = 0,
    yoff = 0,
    scale = 1,
    multiplicador = 1;
var window_height = window.innerHeight,
    maxScrollHeight = window_height * 12.8;
var moveOffsetX = 0,
    moveOffsetY = 0;

function clearFloors() {
    $('g').filter(function () {
        return this.id.includes("_andar_");
    }).css("opacity", "0")

    $('path').filter(function () {
        return this.id.includes("bloco_") && this.id.includes("-2");
    }).css("opacity", "1")

}

function clearLabels() {
    if (blocoOpened != "") {
        $(document.getElementById(blocoOpened).getElementsByTagName("text")[document.getElementById(blocoOpened).getElementsByTagName("text").length - 1]).css("opacity", "1");
        $(document.getElementById(blocoOpened).getElementsByTagName("ellipse")[0]).css("opacity", "1")
    }
}

function highlightBloco(id) {
    document.getElementById(id).style.filter = "drop-shadow(0px 0px 6px " + $("#" + id).css("fill") + ")";
}

function leaveBloco(id) {
    document.getElementById(id).style.filter = "none";
}

function openFloor(andar) {
    clearFloors();
    $("#" + blocoOpened + "-2").css("opacity", "0");

    $("#" + blocoOpened + "_andar_" + andar).css("opacity", "1");
    $("#waypoints_andar_" + andar).css("opacity", "1");
    console.log("#" + blocoOpened + "_andar_" + andar);
}

function fixObjects(e) {
    var currentX = e.clientX,
        currentY = e.clientY;
    var somadorX = (currentX - initialX) / (multiplicador + 1),
        somadorY = (currentY - initialY) / (multiplicador + 1);

    var objs = document.querySelectorAll("#svgMapContainer");

    var xy = $("#svgMapContainer").attr("transform").substring($("#svgMapContainer").attr("transform").indexOf("translate(") + 10, $("#svgMapContainer").attr("transform").indexOf(")", $("#svgMapContainer").attr("transform").indexOf("translate("))).split(",");
    moveOffsetX = parseInt(xy[0]) * multiplicador
    moveOffsetY = parseInt(xy[1]) * multiplicador

    objs.forEach((el) => {
        var cx = parseInt($(el).attr("x"));
        var cy = parseInt($(el).attr("y"));

        $(el).attr({
            "x": cx + somadorX,
            "y": cy + somadorY
        });
    });
}
window.scroll({
    top: 0,
    behavior: 'smooth'
});

/* Code to run on INIT */
clearFloors();

$('path').filter(function () {
    return this.id.includes("bloco_") && this.id.includes("-2");
}).mouseover((e) => {
    highlightBloco(e.target.id)
})

$('path').filter(function () {
    return this.id.includes("bloco_") && this.id.includes("-2");
}).mouseleave((e) => {
    leaveBloco(e.target.id)
})

$('path').filter(function () {
    return this.id.includes("bloco_") && this.id.includes("-2");
}).click((e) => {
    clearLabels()
    clearFloors();
    $("#" + e.target.id).css("opacity", "0")
})

$("#bloco_B").on("click", (e) => {
    clearFloors()
    blocoOpened = "bloco_B";
    $(document.getElementById(blocoOpened).getElementsByTagName("ellipse")[0]).css("opacity", "0")
    $(document.getElementById(blocoOpened).getElementsByTagName("text")[document.getElementById(blocoOpened).getElementsByTagName("text").length - 1]).css("opacity", "0")
    $("#" + e.target.id).css("opacity", "0");
    $("#bloco_B_andar_1").css("opacity", "1");
})

$(".floorButton").on("click", (e) => {
    openFloor(e.target.dataset.floor)
});

var variaveisDinamicas = {};
var targetProxy = new Proxy(variaveisDinamicas, {
    set: function (target, key, value) {
        target[key] = value; // variaveisDinamicas[key] = value;

        multiplicador = value / (maxScrollHeight / 6); // % do scroll total

        var xs = (mouseX - xoff) / scale
        var ys = (mouseY - yoff) / scale
        scale = 1 + multiplicador

        var oldtransforms = ($("#svgMapContainer").attr("transform")) ? $("#svgMapContainer").attr("transform").substring($("#svgMapContainer").attr("transform").indexOf("translate("), $("#svgMapContainer").attr("transform").indexOf(")", $("#svgMapContainer").attr("transform").indexOf("translate(")) + 1) : ""
        $("#svgMapContainer").attr("transform", oldtransforms + " scale(" + scale + ")");

        return true;
    }
});

targetProxy.scroll = 0;

$(window).scroll(function (event) {
    targetProxy.scroll = $(window).scrollTop();
});

/* Code for D3 */
var width = window.innerWidth,
    height = window.innerHeight;


const zoom = d3.zoom().on("zoom", function () {
    var zoom_lev = d3.event.transform.k
    g.attr("transform", d3.event.transform)
})

var svg = d3.select('svg');

var g = svg.select("#svgMapContainer");
svg.attr("cursor", "grab").call(zoom);

$('#demoImg').click(function () {
    console.log('this works?')
});