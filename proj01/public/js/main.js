/**
 * Created by fanxn on 2017/11/4.
 */

function showBold() {
    var texts = $(".plain").text();
    $(".plain").html("<strong>" + texts + "</strong>");
    $("#restore").show();
    $("#bolden").hide();
}

function restoreFont() {
    var texts = $(".plain").text();
    $(".plain").html(texts);
    $("#restore").hide();
    $("#bolden").show();
}

function changeColor() {
    var color = "#" + parseInt(Math.random() * 10 % 7) + parseInt(Math.random() * 100000);
    $(".plain").attr("style", "color: " + color);
    $("#sample").attr('style', "background-color: "+color);
}

function clearStyle() {
    $(".plain").removeAttr("style");
    $("#sample").removeAttr("style");
}
