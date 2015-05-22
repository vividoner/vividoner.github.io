var comArray = new Array();
var functionArray = new Array();
var function_obj = {};
var align_comArray = new Array();
var box = $("#main_code");
var z_index = 2;
var awleft = 0;
var awtop = 10;
function getawleft() {
    var a = awleft + "px";
    awleft += 10;
    return a
}
function getawtop() {
    var a = awtop + "px";
    awtop += 10;
    return a
}
initTools();
function initTools() {
    initToolSearch();
    initToolHotspot();
    initToolCountdown();
    initToolService();
    initToolWWGroup();
    initToolTextarea();
    initToolImage();
    initToolPocoImage();
    initToolVideo();
    initToolQRCode();
    initToolAttention();
    initToolShare();
    initToolLike();
    initToolCollection();
    initToolCart();
    initToolSliderImage()
}
GenCssCode();
HtmlShow();
$(function() {
    initToolMainSetting("0");
    initPropertyDialog()
});
$(document).ready(function() {
    $("input").iCheck({
        checkboxClass: "icheckbox_minimal-pink icheckbox_set",
        radioClass: "iradio_minimal-pink icheckbox_set"
    })
}); (function(a) {
    a(".menulist").each(function() {
        var c = a(this);
        var b = c.find(".menulistitem");
        b.css({
            opacity: 0
        });
        c.hover(function() {
            a(this).addClass("selected");
            b.stop().show().animate({
                opacity: 1
            },
            200)
        },
        function() {
            a(this).removeClass("selected");
            b.stop().animate({
                opacity: 0
            },
            200,
            function() {
                a(this).css({
                    display: "none"
                })
            })
        })
    })
})(jQuery);
$("#btn_gencode").click(function() {
    $(".btn_gencode_dialog").dialog("open");
    copycode();
    return false
});
function copycode() {
    $(function() {
        $("#btn_copy").zclip({
            path: "images/ZeroClipboard.swf",
            copy: function() {
                return $("#txt_gencode").val()
            },
            afterCopy: function() {
                $("#msg").text("复制成功");
                setTimeout(function() {
                    jQuery("#msg").text("")
                },
                5000)
            }
        })
    })
}
$(".btn_gencode_dialog").dialog({
    dialogClass: "btn_gencode_code",
    autoOpen: false,
    closeText: "关闭",
    width: 800,
    buttons: false,
    resizable: false,
    modal: true,
    show: {
        effect: "fade",
        duration: 200
    },
    hide: {
        effect: "fade",
        duration: 100
    }
});
$(".btn_gencode_dialog_close").click(function() {
    $(".btn_gencode_dialog").dialog("close");
    return false
});
$("#btn_decode").click(function() {
    $(".btn_decode_dialog").dialog("open");
    return false
});
$(".btn_decode_dialog").dialog({
    dialogClass: "btn_decode_code",
    autoOpen: false,
    closeText: "关闭",
    width: 800,
    buttons: false,
    resizable: false,
    modal: true,
    show: {
        effect: "fade",
        duration: 200
    },
    hide: {
        effect: "fade",
        duration: 100
    }
});
$("#btn_load").click(function() {
    var b = $("#txt_decode").val();
    var a = pareHTMLTOJSON(b);
    decode(a);
    $(".btn_decode_dialog").dialog("close");
    return false
});
$(".btn_decode_dialog_close").click(function() {
    $(".btn_decode_dialog").dialog("close");
    return false
});
function pareHTMLTOJSON(e) {
    var f = null;
    var g = "";
    var h = [];
    var d, j;
    while (e.length > 0) {
        d = e.indexOf("<bdo>");
        j = e.indexOf("</bdo>", 1);
        if (d > -1 && j > d) {
            h.push(e.slice(d + 5, j));
            e = e.slice(j + 6)
        } else {
            break
        }
    }
    var k = {
        com_arr: []
    };
    var e = null;
    var a = null;
    var c = null;
    var g = "";
    for (var b = 0; b < h.length; b++) {
        e = h[b];
        g = "";
        a = /data-type="([a-z]+)/ig;
        c = a.exec(e);
        if (c) {
            g = c[1];
            switch (g) {
            case "mainbackground":
                f = new MainSettingComponent();
                f.gethtmlJSON(e, k);
                break;
            case "aname":
                a = /a name="(.*)" style/ig;
                c = a.exec(e);
                if (c) {
                    k.text_mainbackground_aname = c[1]
                }
                break;
            case "search":
                f = new SearchComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "sliderimage":
                f = new SliderImageComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "hotarea":
                f = new HotspotComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "countdown":
                f = new CountdownComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "textarea":
                f = new TextareaComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "image":
                f = new ImageComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "pocoimage":
                f = new PocoImageComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "qrcode":
                f = new QRCodeComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "video":
                f = new VideoComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "service":
                f = new ServiceComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "wwgroup":
                f = new WWGroupComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "attention":
                f = new AttentionComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "collection":
                f = new CollectionComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "like":
                f = new LikeComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "share":
                f = new ShareComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break;
            case "cart":
                f = new CartComponent();
                k.com_arr.push(f.gethtmlJSON(e));
                break
            }
        }
    }
    return k
}
function decode(h) {
    var f = new MainSettingComponent();
    f.setText_Mainbackground_Width(h.text_mainbackground_width);
    f.setText_Mainbackground_Height(h.text_mainbackground_height);
    f.setText_Mainbackground_Bg(h.text_mainbackground_bg);
    f.setText_Mainbackground_Color(h.text_mainbackground_color);
    f.setText_Mainbackground_Shop_Type(h.text_shoptype);
    f.setTxt_Mainbackground_Repeat(h.text_mainbackground_repeat);
    f.setTxt_Mainbackground_Attachment(h.text_mainbackground_attachment);
    f.setTxt_Mainbackground_Positionx(h.text_mainbackground_positionx);
    f.setTxt_Mainbackground_Positiony(h.text_mainbackground_positiony);
    f.setText_Mainbackground_Aname(h.text_mainbackground_aname);
    var b = {};
    var e = new Date();
    b.id = formatDate(e);
    var d = "";
    var j = h.text_shoptype;
    if (j == "b") {
        d = "天猫"
    } else {
        d = "淘宝"
    }
    b.shop_type = d;
    b.width_height = h.text_mainbackground_width + "*" + h.text_mainbackground_height;
    b.bgvalue = f;
    f.showMainSetting();
    setCurrentMainSettingComponent(f);
    var a = [];
    var n = h.com_arr;
    for (var g = 0; g < n.length; g++) {
        var m = n[g];
        var k = m.comName;
        if (k == "search") {
            initSearch(m);
            i_search--
        } else {
            if (k == "sliderimage") {
                initSliderImage(m);
                i_sliderimage--
            } else {
                if (k == "hotarea") {
                    initHotspot(m);
                    i_hotarea--
                } else {
                    if (k == "countdown") {
                        initCountdown(m);
                        i_countdown--
                    } else {
                        if (k == "textarea") {
                            initTextarea(m);
                            i_textarea--
                        } else {
                            if (k == "image") {
                                initImage(m);
                                i_image--
                            } else {
                                if (k == "pocoimage") {
                                    initPocoImage(m);
                                    i_image2--
                                } else {
                                    if (k == "qrcode") {
                                        initQRCode(m);
                                        i_qrcode--
                                    } else {
                                        if (k == "video") {
                                            initVideo(m);
                                            i_video--
                                        } else {
                                            if (k == "service") {
                                                initService(m);
                                                i_service--
                                            } else {
                                                if (k == "wwgroup") {
                                                    initWWGroup(m);
                                                    i_servicegroup--
                                                } else {
                                                    if (k == "attention") {
                                                        initAttention(m);
                                                        i_attention--
                                                    } else {
                                                        if (k == "collection") {
                                                            initCollection(m);
                                                            i_collection--
                                                        } else {
                                                            if (k == "like") {
                                                                initLike(m);
                                                                i_like--
                                                            } else {
                                                                if (k == "share") {
                                                                    initShare(m);
                                                                    i_share--
                                                                } else {
                                                                    if (k == "cart") {
                                                                        initCart(m);
                                                                        i_cart--
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    b.comArr = a;
    functionArray = [];
    var l = functionArray.push(b);
    function_obj = functionArray[l - 1]
}
$("#mymodel_preview").modal({
    show: false
});
$(function() {
    $("#hotarea_tab a:first").tab("show");
    $("#search_tab a:first").tab("show");
    $("#countdown_tab a:first").tab("show");
    $("#service_tab a:first").tab("show");
    $("#wwgroup_tab a:first").tab("show");
    $("#textarea_tab a:first").tab("show");
    $("#image_tab a:first").tab("show");
    $("#pocoimage_tab a:first").tab("show");
    $("#video_tab a:first").tab("show");
    $("#qrcode_tab a:first").tab("show");
    $("#attention_tab a:first").tab("show");
    $("#share_tab a:first").tab("show");
    $("#like_tab a:first").tab("show");
    $("#collection_tab a:first").tab("show");
    $("#cart_tab a:first").tab("show");
    $("#sliderimage_tab a:first").tab("show")
}); (function(a) {
    a.fn.extend({
        qmTabs: function(c) {
            var b = a(c);
            a(this).children("li").each(function(d) {
                a(this).click(function() {
                    a(this).removeClass().addClass("selected").siblings().removeClass("selected").addClass();
                    b.hide().eq(d).show()
                })
            })
        }
    })
})(jQuery);
$(document).ready(function() {
    $(".property_hd_hotarea").qmTabs(".property_bd_hotarea > div");
    $(".property_hd_search").qmTabs(".property_bd_search > div");
    $(".property_hd_countdown").qmTabs(".property_bd_countdown > div");
    $(".property_hd_service").qmTabs(".property_bd_service > div");
    $(".property_hd_servicegroup").qmTabs(".property_bd_servicegroup > div");
    $(".property_hd_editorimage").qmTabs(".property_bd_editorimage > div");
    $(".property_hd_textarea").qmTabs(".property_bd_textarea > div");
    $(".property_hd_pocoimage").qmTabs(".property_bd_pocoimage > div");
    $(".property_hd_video").qmTabs(".property_bd_video > div");
    $(".property_hd_qrcode").qmTabs(".property_bd_qrcode > div");
    $(".property_hd_attention").qmTabs(".property_bd_attention > div");
    $(".property_hd_share").qmTabs(".property_bd_share > div");
    $(".property_hd_like").qmTabs(".property_bd_like > div");
    $(".property_hd_collection").qmTabs(".property_bd_collection > div");
    $(".property_hd_cart").qmTabs(".property_bd_cart > div");
    $(".property_hd_sliderimage").qmTabs(".property_bd_sliderimage > div")
});