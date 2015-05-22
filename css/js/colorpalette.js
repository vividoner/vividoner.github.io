function getColorPalette(id, color, text) {
    var id1 = "#" + id;
    var text1 = "#" + text;
    $(".sp-picker-container").width(280);
    $(".sp-hue").css("left", (103 - 20) + "%");
    $(".sp-color").css("right", 20 + "%");
    $(".sp-fill").css("padding-top", (100 - 20) + "%");
    $(id1).spectrum("reflow");
    $(id1).spectrum({
        color: color,
        showInput: true,
        showInitial: true,
        change: function(color) {
            $(text1).val(color.toHexString());
            $(text1).change()
        }
    })
}

