function removeCurrenComponent(h, a) {
    if (h == null) {
        return
    }
    if (a.type == "click" || a.which == 46) {
        if (!confirm("是否要删除当前对象?")) {
            return
        }
        h.getComponent().remove();
        var k = h.getComID();
        var d = comArray.length;
        for (var f = 0; f < d; f++) {
            var e = comArray[f];
            var j = e.getComID();
            if (k == j) {
                comArray.splice(f, 1);
                break
            }
        }
        if (comArray.length > 0) {
            var c = comArray[comArray.length - 1];
            setCurrentComponent(c);
            var g = c.getComponent();
            g.addClass("ui-draggable-selected")
        } else {
            hideEditor();
            $("#xdialog").dialog("close")
        }
        loadMenumin();
        function_obj.comArr = comArray.concat()
    }
}
function hideEditor() {
    $(".awe").css("display", "none")
}
function loadMenumin() {
    var g = $("#ul_menulistitem");
    g.empty();
    var e = comArray.length;
    for (var h = 0; h < e; h++) {
        var j = comArray[h];
        var m = j.getComID();
        var f = j.getComCnName();
        var k = j.getComName();
        var o = $("<li></li>");
        g.prepend(o);
        o.attr("id", "li_menulistitem_" + h);
        var n = m.split("_")[1];
        o.html(f + " " + n);
        a();
        o.addClass("selected");
        o.bind("click", {
            com: j,
            li: o
        },
        d)
    }
    function d(l) {
        var p = l.data.com;
        var i = l.data.li;
        removeClass("ui-draggable-selected");
        p.getComponent().addClass("ui-draggable-selected");
        setCurrentComponent(p);
        a();
        i.addClass("selected")
    }
    function a() {
        var l = g.children();
        for (var c = 0; c < l.length; c++) {
            $(l[c]).removeClass("selected")
        }
    }
}
function setCurrentComponent(d) {
    var a = d.getComName();
    if (a == "search") {
        setCurrentSearchComponent(d)
    } else {
        if (a == "hotarea") {
            setCurrentHotspotComponent(d)
        } else {
            if (a == "countdown") {
                setCurrentCountdownComponent(d)
            } else {
                if (a == "textarea") {
                    setCurrentTextareaComponent(d)
                } else {
                    if (a == "image") {
                        setCurrentImageComponent(d)
                    } else {
                        if (a == "pocoimage") {
                            setCurrentPocoImageComponent(d)
                        } else {
                            if (a == "video") {
                                setCurrentVideoComponent(d)
                            } else {
                                if (a == "service") {
                                    setCurrentServiceComponent(d)
                                } else {
                                    if (a == "wwgroup") {
                                        setCurrentWWGroupComponent(d)
                                    } else {
                                        if (a == "qrcode") {
                                            setCurrentQRCodeComponent(d)
                                        } else {
                                            if (a == "attention") {
                                                setCurrentAttentionComponent(d)
                                            } else {
                                                if (a == "share") {
                                                    setCurrentShareComponent(d)
                                                } else {
                                                    if (a == "like") {
                                                        setCurrentLikeComponent(d)
                                                    } else {
                                                        if (a == "collection") {
                                                            setCurrentCollectionComponent(d)
                                                        } else {
                                                            if (a == "cart") {
                                                                setCurrentCartComponent(d)
                                                            } else {
                                                                if (a == "sliderimage") {
                                                                    setCurrentSliderImageComponent(d)
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
function removeClass(d) {
    var a = comArray.length;
    for (var c = 0; c < a; c++) {
        var e = comArray[c];
        e.getComponent().removeClass(d)
    }
}
function onDrag(c, m) {
    var d = m.position;
    var f = m.helper;
    var q = 1920;
    var i = 650;
    q = $("#text_mainbackground_width").val();
    i = $("#text_mainbackground_height").val();
    var j = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if (q > j) {
        q = j
    }
    var g = 0;
    var k = 0;
    var e = true;
    if (e) {
        g = 990;
        k = 650
    } else {
        g = 950;
        k = 650
    }
    var o = (g - q) / 2;
    if (o > 0) {
        o = 0
    }
    if (d.left < o) {
        d.left = o
    }
    if (q < g) {
        if (d.left + f.outerWidth() > q) {
            d.left = q - f.outerWidth()
        }
    } else {
        var l = (q - g) / 2;
        var n = l + g - f.outerWidth();
        if (d.left > n) {
            d.left = n
        }
    }
    if (d.top < 0) {
        d.top = 0
    }
    if (d.top + f.outerHeight() > i) {
        d.top = i - f.outerHeight()
    }
}
function onDragForSlider(c, g) {
    var e = g.helper;
    var f = g.position;
    var i = e.parent();
    var h = 0;
    var d = 0;
    var j = h + i.width();
    var a = d + i.height();
    if (f.left - h < 0) {
        f.left = h
    }
    if (f.top - d < 0) {
        f.top = d
    }
    if (f.left + e.outerWidth() > j) {
        f.left = j - e.outerWidth()
    }
    if (f.top + e.outerHeight() > i.height()) {
        f.top = i.height() - e.outerHeight()
    }
}
var StringUtil = function() {
    this.addUtil = function(a, d) {
        var c = "";
        if (a == "left" || a == "top" || a == "height" || a == "line-height" || a == "font-size" || a == "width" || a.indexOf("margin") != -1) {
            c = d + "px"
        } else {
            if (a == "border-left" || a == "border-right" || a == "border" || a == "border-top" || a == "border-bottom") {
                c = d == "" ? "0px": "1px solid " + b
            } else {
                if (a == "padding") {
                    c = d == "" ? "": "0 " + b + "px"
                } else {
                    c = d
                }
            }
        }
        return c
    };
    this.delUtil = function(c) {
        var a = c.replace("px", "");
        return a
    }
};
function addFontFamily(c) {
    var e = ["宋体", "黑体", "微软雅黑", "impact", "仿宋", "楷体"];
    var a = e.length;
    for (var d = 0; d < a; d++) {
        c.append('<option value="' + e[d] + '">' + e[d] + "</option>")
    }
}
function addPoEffect(c) {
    var f = ["无", "缩小到0", "缩小0.5倍", "放大1.5倍", "向上移动10px", "向上移动20px", "向上移动100px", "向右移动10px", "向右移动20px", "向右移动100px", "向下移动10px", "向下移动20px", "向下移动100px", "向左移动10px", "向左移动20px", "向左移动100px", "逆时针旋转45度", "逆时针旋转90度", "逆时针旋转360度", "顺时针旋转45度", "顺时针旋转90度", "顺时针旋转360度"];
    var d = ["aw_efa0", "aw_efa1", "aw_efa2", "aw_efa3", "aw_efb1", "aw_efb2", "aw_efb2_1", "aw_efb3", "aw_efb4", "aw_efb4_1", "aw_efb5", "aw_efb6", "aw_efb6_1", "aw_efb7", "aw_efb8", "aw_efb8_1", "aw_efc1", "aw_efc1_1", "aw_efc2", "aw_efc3", "aw_efc3_1", "aw_efc4"];
    var a = f.length;
    for (var e = 0; e < a; e++) {
        c.append('<option value="' + d[e] + '">' + f[e] + "</option>")
    }
}
function addCoEffect(c) {
    var f = ["无", "旋转出现", "放大出现", "向上移动出现", "向右移动出现", "向下移动出现", "向左移动出现"];
    var d = ["aw_effa0", "aw_effa1", "aw_effa2", "aw_effa3", "aw_effa4", "aw_effa5", "aw_effa6"];
    var a = f.length;
    for (var e = 0; e < a; e++) {
        c.append('<option value="' + d[e] + '">' + f[e] + "</option>")
    }
}
function addDuration(c) {
    var f = ["0.2秒", "0.3秒", "0.5秒", "1秒"];
    var d = ["aw_eftime1", "aw_eftime2", "aw_eftime3", "aw_eftime4"];
    var a = f.length;
    for (var e = 0; e < a; e++) {
        c.append('<option value="' + d[e] + '">' + f[e] + "</option>")
    }
}
function addSliderEffect(c) {
    var f = ["加速度", "弹性动画", "先慢后快+", "先快后慢+", "先慢后快-", "先快后慢-", "先抖动再切换+", "先切换再抖动+", "先抖动再切换", "先切换再抖动-", "双重抖动切换", "超过返回", "普通滚动", "匀速运动"];
    var d = ["backIn", "easeBothStrong", "easeInStrong", "easeOutStrong", "easeIn", "easeOut", "bounceIn", "bounceOut", "elasticIn", "elasticOut", "bounceBoth", "backOut", "easeBoth", "easeNone"];
    var a = f.length;
    for (var e = 0; e < a; e++) {
        c.append('<option value="' + d[e] + '">' + f[e] + "</option>")
    }
}
jQuery.fn.initDatetimePicker = function() {
    var a = {
        preset: "datetime",
        theme: "ios",
        display: "modal",
        mode: "scroller",
        dateFormat: "yy-mm-dd",
        timeFormat: "HH:ii:ss",
        dateOrder: "yymmdd",
        endYear: 2099,
        lang: "zh"
    };
    this.val("").scroller("destroy").scroller(a)
};
function initTimePicker(a) {
    $("#" + a).datetimepicker({
        showSecond: true,
        timeFormat: "HH:mm:ss",
        dateFormat: "yy-mm-dd"
    })
}
function getInitClass_rel() {
    var a = "rel";
    return a
}
function getInitClass_abs() {
    var a = "abs";
    return a
}
function GenCssCode() {
    $("#btn_gencode").click(function() {
        var d = MainSetting_getCssCode1(2);
        d += MainSetting_getCssCode2(2);
        var a = comArray.length;
        for (var c = 0; c < a; c++) {
            var e = comArray[c];
            d += e.getCssCode()
        }
        d += MainSetting_getCssCode3(2);
        $("#txt_gencode").val(d)
    })
}
function HtmlShow() {
    $("#btn_preview_show").click(function() {
        var f = MainSetting_getCssCode1(1);
        f += MainSetting_getCssCode2(1);
        var c = comArray.length;
        for (var e = 0; e < c; e++) {
            var j = comArray[e];
            f += j.getCssCode()
        }
        f += MainSetting_getCssCode3(1);
        $(".preview_content").html(f);
        var d = document.createElement("script");
        d.src = "http://a.tbcdn.cn/apps/pamirsshop/wiki/scripts/prettify.js";
        $(".preview_content").append(d);
        var a = document.createElement("script");
        a.src = "http://a.tbcdn.cn/s/kissy/1.1.6/kissy.js";
        $(".preview_content").append(a);
        var h = document.createElement("script");
        h.src = "http://a.tbcdn.cn/p/shop/1.0/mods/s/countdown/countdown-min.js";
        $(".preview_content").append(h);
        var g = document.createElement("script");
        g.src = "http://a.tbcdn.cn/apps/pamirsshop/wiki/scripts/wiki.js";
        $(".preview_content").append(g);
        KISSY.Countdown.autoRender()
    })
}
function setSelectedMenumin(h) {
    var k = h.getComID();
    var d = h.getComCnName();
    var l = d + " " + k;
    var e = $("#ul_menulistitem");
    var g = e.children();
    for (var f = 0; f < g.length; f++) {
        var m = $(g[f]);
        var j = m.html();
        m.removeClass("selected");
        if (l == j) {
            m.addClass("selected")
        }
    }
}
function formatDate(e) {
    var f = e.getFullYear();
    var g = e.getMonth() + 1;
    var d = e.getDate();
    var a = e.getHours();
    var h = e.getMinutes();
    var c = e.getSeconds();
    return f + "-" + g + "-" + d + "   " + a + ":" + h + ":" + c
}
var downCtrl = 0;
function selectMoreComponent(a) {
    align_comArray.splice(0, align_comArray.length);
    var g = a.getComponent();
    g.on("keydown click",
    function(h) {
        if (h.ctrlKey && h.type != "click") {
            if (downCtrl == 0) {
                if (f(a) == -1) {
                    align_comArray.push(a)
                }
                downCtrl = 1
            }
        }
        if (h.ctrlKey && h.type == "click") {
            d(a);
            c()
        }
        if (!h.ctrlKey && h.type == "click") {
            align_comArray.splice(0, align_comArray.length)
        }
        if (h.ctrlKey && h.which == 65) {
            h.preventDefault();
            e();
            c()
        }
        if (h.ctrlKey && h.which == 67) {
            h.preventDefault();
            copyComponent(a)
        }
        if (h.ctrlKey && h.which == 86) {
            h.preventDefault();
            pasteComponent()
        }
        if (h.which == 37 || h.which == 38 || h.which == 39 || h.which == 40) {
            h.preventDefault();
            moveComponent(a, h.which)
        }
    });
    g.on("keyup",
    function(h) {
        downCtrl = 0
    });
    function d(h) {
        var i = f(h);
        if (i == -1) {
            align_comArray.push(a)
        } else {
            align_comArray.splice(i, 1)
        }
    }
    function f(h) {
        var l = -1;
        var j = align_comArray.length;
        for (var m = 0; m < j; m++) {
            var k = align_comArray[m];
            if (k.getComID() == h.getComID()) {
                l = m;
                break
            }
        }
        return l
    }
    function c() {
        var h = align_comArray.length;
        removeClass("ui-draggable-selected");
        for (var k = 0; k < h; k++) {
            var j = align_comArray[k];
            j.getComponent().addClass("ui-draggable-selected")
        }
    }
    function e() {
        align_comArray.splice(0, align_comArray.length);
        align_comArray = comArray.concat()
    }
}
function dragMoreComponent(d, m, n, c) {
    var a = n - d;
    var e = c - m;
    var f = align_comArray.length;
    for (var g = 0; g < f; g++) {
        var k = align_comArray[g];
        var j = parseInt(k.getDivLeft());
        var h = parseInt(k.getDivTop());
        k.setDivLeft(j + a);
        k.setDivTop(h + e)
    }
}
function dragNotSelectedComponent(c) {
    var a = false;
    for (var d = 0; d < align_comArray.length; d++) {
        if (c == align_comArray[d].getComID()) {
            a = true
        }
    }
    if (!a) {
        align_comArray.splice(0, align_comArray.length)
    }
    return a
}
function showComName(a) {
    $(".xdialog_css").find(".ui-dialog-title").html("属性面板")
}
function initPropertyDialog() {
    $("#xdialog").dialog({
        dialogClass: "xdialog_css",
        autoOpen: false,
        modal: false,
        bgiframe: true,
        resizable: false,
        width: "330",
        zIndex: "99",
        position: {
            my: "right top+90",
            at: "right-20 top"
        }
    })
}
function dropMydialog(a) {
    $(a).dialog("open")
}
function cancelSelectedComponent(a) {
    a.off("click");
    a.on("click",
    function() {
        align_comArray.splice(0, align_comArray.length);
        removeClass("ui-draggable-selected");
        $("#xdialog").dialog("close")
    })
}
var copyObj = null;
function copyComponent(a) {
    if (align_comArray.length > 1) {
        copyObj = null;
        return
    }
    copyObj = c(a);
    function c(f) {
        if (typeof f != "object") {
            return f
        }
        if (f == null) {
            return f
        }
        var e = new Object();
        for (var d in f) {
            e[d] = c(f[d])
        }
        return e
    }
}
function pasteComponent() {
    if (copyObj == null) {
        return
    }
    var a = copyObj.getComName();
    var d = copyObj.getJSON();
    var c = new StringUtil();
    d.comID = "";
    d.div_z_index = "";
    var f = getawleft();
    var e = getawtop();
    d.div_left = f + "px";
    d.div_top = e + "px";
    if (a == "search") {
        initSearch(d)
    } else {
        if (a == "sliderimage") {
            initSliderImage(d)
        } else {
            if (a == "hotarea") {
                initHotspot(d)
            } else {
                if (a == "countdown") {
                    initCountdown(d)
                } else {
                    if (a == "textarea") {
                        initTextarea(d)
                    } else {
                        if (a == "image") {
                            initImage(d)
                        } else {
                            if (a == "pocoimage") {
                                initPocoImage(d)
                            } else {
                                if (a == "qrcode") {
                                    initQRCode(d)
                                } else {
                                    if (a == "video") {
                                        initVideo(d)
                                    } else {
                                        if (a == "service") {
                                            initService(d)
                                        } else {
                                            if (a == "wwgroup") {
                                                initWWGroup(d)
                                            } else {
                                                if (a == "attention") {
                                                    initAttention(d)
                                                } else {
                                                    if (a == "collection") {
                                                        initCollection(d)
                                                    } else {
                                                        if (a == "like") {
                                                            initLike(d)
                                                        } else {
                                                            if (a == "share") {
                                                                initShare(d)
                                                            } else {
                                                                if (a == "cart") {
                                                                    initCart(d)
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
function moveComponent(c, j) {
    if (f(c) == -1) {
        align_comArray.push(c)
    }
    if (j == 37) {
        a()
    } else {
        if (j == 39) {
            h()
        } else {
            if (j == 38) {
                i()
            } else {
                if (j == 40) {
                    d()
                }
            }
        }
    }
    var e = c.getDivLeft();
    var g = c.getDivTop();
    $(".awe").find(".gy_left").val(e);
    $(".awe").find(".gy_top").val(g);
    function f(k) {
        var n = -1;
        var l = align_comArray.length;
        for (var o = 0; o < l; o++) {
            var m = align_comArray[o];
            if (m.getComID() == k.getComID()) {
                n = o;
                break
            }
        }
        return n
    }
    function a() {
        var k = align_comArray.length;
        for (var n = 0; n < k; n++) {
            var m = align_comArray[n];
            var o = parseInt(m.getDivLeft());
            m.setDivLeft(o - 1)
        }
    }
    function h() {
        var k = align_comArray.length;
        for (var n = 0; n < k; n++) {
            var m = align_comArray[n];
            var o = parseInt(m.getDivLeft());
            m.setDivLeft(o + 1)
        }
    }
    function i() {
        var k = align_comArray.length;
        for (var n = 0; n < k; n++) {
            var m = align_comArray[n];
            var o = parseInt(m.getDivTop());
            m.setDivTop(o - 1)
        }
    }
    function d() {
        var k = align_comArray.length;
        for (var n = 0; n < k; n++) {
            var m = align_comArray[n];
            var o = parseInt(m.getDivTop());
            m.setDivTop(o + 1)
        }
    }
}
var MainSettingComponent = function(i, f) {
    var g = i;
    var e = "mainbackground";
    var c = "c";
    var v = "1920px";
    var n = "650px";
    var w = "transparent";
    var h = "http://img04.taobaocdn.com/imgextra/i4/310902331/TB2AaSsbVXXXXcoXpXXXXXXXXXX-310902331.jpg";
    var l = "no-repeat";
    var m = "scroll";
    var k = "center";
    var j = "top";
    var a = "1";
    var q = "";
    var r = $("#coordline");
    var u = $("<div id='main_code' class='rel' style='width:950px;height:" + n + ";'></div>");
    var t = $("<div id='fzx' class='abs fzx_" + c + "' style='width:" + v + ";height:" + n + ";left:-485px;'></div>");
    var s = $("<div id='mainback' class='abs' style='width:" + v + ";height:" + n + ";left:-485px;background-image:url(" + h + ");background-repeat:" + l + ";background-position:" + k + " " + j + ";background-attachment:" + m + ";'></div>");
    var d = $("<div id='wrapmaincode'></div>");
    p();
    function p() {
        u.append(t);
        u.append(s);
        d.append(u)
    }
    this.showMainSetting = function() {
        var z = $(".mainScroll");
        $("#wrapmaincode").remove();
        z.prepend(d);
        box = u;
        var y = o.delUtil(v);
        if (y < 950) {
            cancelSelectedComponent(s)
        } else {
            cancelSelectedComponent(t)
        }
    };
    var o = new StringUtil();
    this.getComID = function() {
        return g
    };
    this.getComName = function() {
        return e
    };
    this.gethtmlJSON = function(F, H) {
        var E = "";
        var I = "";
        var C = "";
        var G = "";
        var B = "";
        var x = "";
        var z = "";
        var y = "";
        var A = /style="width:(\d+)px;height:(\d+)px;left:([-|\d]+[px]*);(.*)background-image:url\((.*)\);background-repeat:(.*);background-position:(.*) (.*);background-attachment:(.*);/ig;
        var D = A.exec(F);
        if (D) {
            H.text_mainbackground_width = D[1];
            H.text_mainbackground_height = D[2];
            H.text_mainbackground_bg = D[5];
            H.text_mainbackground_repeat = D[6];
            H.text_mainbackground_positionx = D[7];
            H.text_mainbackground_positiony = D[8];
            H.text_mainbackground_attachment = D[9]
        }
        A = /background-color:(.*);background-image/ig;
        D = A.exec(F);
        if (D) {
            H.text_mainbackground_color = D[1]
        }
        return
    };
    this.setText_Mainbackground_Width = function(y) {
        v = o.addUtil("width", y);
        var A = "950";
        var z = "-485";
        if (c == "b") {
            z = (990 - y) / 2
        } else {
            z = (950 - y) / 2;
            A = "950"
        }
        if (y < 950) {
            d.attr("style", "width:" + A + "px;margin:0 auto;");
            u.attr("style", "width:" + v + ";height:" + n + ";margin-left:0;");
            t.css("width", v);
            t.hide();
            s.css("width", v);
            s.css("left", "0");
            s.css("background-position", k + " " + j);
            cancelSelectedComponent(s)
        } else {
            d.removeAttr("style");
            u.attr("style", "width:" + A + "px;height:" + n + ";");
            t.show();
            t.css("width", v);
            t.css("left", z + "px");
            s.css("width", v);
            s.css("left", z + "px");
            s.css("background-position", k + " " + j);
            cancelSelectedComponent(t)
        }
    };
    this.getText_Mainbackground_Width = function() {
        return o.delUtil(v)
    };
    this.setText_Mainbackground_Height = function(y) {
        n = o.addUtil("height", y);
        u.css("height", n);
        t.css("height", n);
        s.css("height", n)
    };
    this.getText_Mainbackground_Height = function() {
        return o.delUtil(n)
    };
    this.setText_Mainbackground_Shop_Type = function(y) {
        c = y;
        var z = "-485";
        if (c == "b") {
            if (o.delUtil(v) < 950) {
                d.css("width", "990");
                r.css("background-image", "url(images/line990.gif)")
            } else {
                u.css("width", "990");
                t.removeClass("fzx_c");
                t.addClass("fzx_b");
                z = (990 - o.delUtil(v)) / 2;
                r.css("background-image", "url(images/line990.gif)");
                r.css("min-width", "990px");
                t.css("left", z + "px");
                s.css("left", z + "px")
            }
        } else {
            if (o.delUtil(v) < 950) {
                d.css("width", "950");
                r.css("background-image", "url(images/line950.gif)")
            } else {
                u.css("width", "950");
                t.removeClass("fzx_b");
                t.addClass("fzx_c");
                z = (950 - o.delUtil(v)) / 2;
                r.css("background-image", "url(images/line950.gif)");
                r.css("min-width", "950px");
                t.css("left", z + "px");
                s.css("left", z + "px")
            }
        }
    };
    this.getText_Mainbackground_Shop_Type = function() {
        return c
    };
    this.setText_Mainbackground_Color = function(y) {
        w = y;
        s.css("background-color", w)
    };
    this.getText_Mainbackground_Color = function() {
        return w
    };
    this.setText_Mainbackground_Bg = function(y) {
        h = y;
        s.css("background-image", "url(" + h + ")")
    };
    this.getText_Mainbackground_Bg = function() {
        return h
    };
    this.setTxt_Mainbackground_Repeat = function(y) {
        l = y;
        s.css("background-repeat", l)
    };
    this.getTxt_Mainbackground_Repeat = function() {
        return l
    };
    this.setTxt_Mainbackground_Attachment = function(y) {
        m = y;
        s.css("background-attachment", m)
    };
    this.getTxt_Mainbackground_Attachment = function() {
        return m
    };
    this.setTxt_Mainbackground_Positionx = function(y) {
        k = y;
        s.css("background-position", k + " " + j)
    };
    this.getTxt_Mainbackground_Positionx = function() {
        return k
    };
    this.setTxt_Mainbackground_Positiony = function(y) {
        j = y;
        s.css("background-position", k + " " + j)
    };
    this.getTxt_Mainbackground_Positiony = function() {
        return j
    };
    this.setText_Mainbackground_Aname = function(y) {
        a = y
    };
    this.getText_Mainbackground_Aname = function() {
        return a
    };
    this.getComponent = function() {
        return s
    }
};
function initToolMainSetting(a) {
    getColorPalette("text_mainbackground_colorselect", "#fff", "text_mainbackground_color");
    var j = new MainSettingComponent();
    var f = new Date();
    var h = f.getTime();
    var i = {};
    i.id = formatDate(f);
    var e = "";
    var g = j.getText_Mainbackground_Shop_Type();
    if (g == "b") {
        e = "天猫"
    } else {
        e = "淘宝"
    }
    i.shop_type = e;
    i.width_height = j.getText_Mainbackground_Width() + "*" + j.getText_Mainbackground_Height();
    i.bgvalue = j;
    if (a == "1") {
        j.setText_Mainbackground_Bg("");
        $("#text_mainbackground_bg").val("");
        j.setText_Mainbackground_Color("");
        j.setText_Mainbackground_Shop_Type("b");
        for (var d = 0; d < comArray.length; d++) {
            comArray[d].getComponent().remove()
        }
        comArray.splice(0, comArray.length);
        z_index = 2;
        $("#ul_menulistitem").empty();
        $("#xdialog").dialog("close")
    }
    j.showMainSetting();
    i.comArr = comArray.concat();
    a = functionArray.push(i);
    function_obj = functionArray[a - 1];
    setCurrentMainSettingComponent(j)
}
function initReadValueFunction(a) {
    var d = a;
    d.showMainSetting();
    setCurrentMainSettingComponent(d)
}
function setCurrentMainSettingComponent(a) {
    loadMainSettingValue(a);
    mainbackground_editor(a)
}
function loadMainSettingValue(d) {
    var a = d;
    if (a == null) {
        return
    }
    hideEditor();
    $("input:radio[name=shoptype]").off("ifChanged");
    if (a.getText_Mainbackground_Shop_Type() == "b") {
        $("#text_shoptype2").iCheck("check")
    } else {
        $("#text_shoptype1").iCheck("check")
    }
    $("#text_mainbackground_width").val(a.getText_Mainbackground_Width());
    $("#text_mainbackground_height").val(a.getText_Mainbackground_Height());
    $("#text_mainbackground_color").val(a.getText_Mainbackground_Color());
    $("#text_mainbackground_bg").val(a.getText_Mainbackground_Bg());
    $("#text_mainbackground_aname").val(a.getText_Mainbackground_Aname());
    $("input:radio[name=mainbackground_repeat]").off("ifChanged");
    if (a.getTxt_Mainbackground_Repeat() === "repeat") {
        $("#text_mainbackground_repeat1").iCheck("check")
    } else {
        if (a.getTxt_Mainbackground_Repeat() === "no-repeat") {
            $("#text_mainbackground_repeat2").iCheck("check")
        } else {
            if (a.getTxt_Mainbackground_Repeat() === "repeat-x") {
                $("#text_mainbackground_repeat3").iCheck("check")
            } else {
                $("#text_mainbackground_repeat4").iCheck("check")
            }
        }
    }
    $("input:radio[name=mainbackground_attachment]").off("ifChanged");
    if (a.getTxt_Mainbackground_Attachment() == "scroll") {
        $("#text_mainbackground_attachment2").iCheck("check")
    } else {
        $("#text_mainbackground_attachment1").iCheck("check")
    }
    $("input:radio[name=mainbackground_positionx]").off("ifChanged");
    if (a.getTxt_Mainbackground_Positionx() == "left") {
        $("#text_mainbackground_positionx1").iCheck("check")
    } else {
        if (a.getTxt_Mainbackground_Positionx() == "center") {
            $("#text_mainbackground_positionx2").iCheck("check")
        } else {
            $("#text_mainbackground_positionx3").iCheck("check")
        }
    }
    $("input:radio[name=mainbackground_positiony]").off("ifChanged");
    if (a.getTxt_Mainbackground_Positiony() == "top") {
        $("#text_mainbackground_positiony1").iCheck("check")
    } else {
        if (a.getTxt_Mainbackground_Positiony() == "center") {
            $("#text_mainbackground_positiony2").iCheck("check")
        } else {
            $("#text_mainbackground_positiony3").iCheck("check")
        }
    }
}
function mainbackground_editor(d) {
    var a = d;
    if (a == null) {
        return
    }
    $("input:radio[name=shoptype]").off("ifChanged");
    $("input:radio[name=shoptype]").on("ifChanged",
    function() {
        a.setText_Mainbackground_Shop_Type($(this).val());
        var c = "";
        if ($(this).val() == "b") {
            c = "天猫"
        } else {
            c = "淘宝"
        }
        function_obj.shop_type = c
    });
    $("#text_mainbackground_width").unbind();
    $("#text_mainbackground_width").keyup(function() {
        a.setText_Mainbackground_Width($("#text_mainbackground_width").val());
        function_obj.width_height = $("#text_mainbackground_width").val() + "*" + $("#text_mainbackground_height").val()
    });
    $("#text_mainbackground_height").unbind();
    $("#text_mainbackground_height").keyup(function() {
        a.setText_Mainbackground_Height($("#text_mainbackground_height").val());
        function_obj.width_height = $("#text_mainbackground_width").val() + "*" + $("#text_mainbackground_height").val()
    });
    $("#text_mainbackground_color").unbind();
    $("#text_mainbackground_color").change(function() {
        a.setText_Mainbackground_Color($("#text_mainbackground_color").val())
    });
    $("#text_mainbackground_bg").unbind();
    $("#text_mainbackground_bg").keyup(function() {
        a.setText_Mainbackground_Bg($("#text_mainbackground_bg").val())
    });
    $("#text_mainbackground_aname").unbind();
    $("#text_mainbackground_aname").keyup(function() {
        a.setText_Mainbackground_Aname($("#text_mainbackground_aname").val())
    });
    $("input:radio[name=mainbackground_repeat]").off("ifChanged");
    $("input:radio[name=mainbackground_repeat]").on("ifChanged",
    function() {
        a.setTxt_Mainbackground_Repeat($(this).val())
    });
    $("input:radio[name=mainbackground_attachment]").off("ifChanged");
    $("input:radio[name=mainbackground_attachment]").on("ifChanged",
    function() {
        a.setTxt_Mainbackground_Attachment($(this).val())
    });
    $("input:radio[name=mainbackground_positionx]").off("ifChanged");
    $("input:radio[name=mainbackground_positionx]").on("ifChanged",
    function() {
        a.setTxt_Mainbackground_Positionx($(this).val())
    });
    $("input:radio[name=mainbackground_positiony]").off("ifChanged");
    $("input:radio[name=mainbackground_positiony]").on("ifChanged",
    function() {
        a.setTxt_Mainbackground_Positiony($(this).val())
    })
}
function MainSetting_getCssCode1(c) {
    var f = "";
    var a = "990";
    var e = $('input:radio[name="shoptype"]:checked').val();
    if (e == "b") {
        a = "990"
    } else {
        a = "950"
    }
    var d = $("#text_mainbackground_width").val();
    if (d < 950) {
        if (c == 1) {
            f += '<div style="width:' + a + 'px;margin:0 auto;" data-type="shoptype">'
        }
        f += '<div class="' + getInitClass_rel() + '" data-type="shoptype" style="width:' + $("#text_mainbackground_width").val() + "px;height:" + $("#text_mainbackground_height").val() + 'px;">'
    } else {
        f += '<div class="' + getInitClass_rel() + '" data-type="shoptype" style="width:' + a + "px;height:" + $("#text_mainbackground_height").val() + 'px;">'
    }
    return f
}
function MainSetting_getCssCode2(a) {
    var g = "";
    var c = $("#text_mainbackground_aname").val();
    if (c) {
        g += '<bdo><div class="' + getInitClass_abs() + '" data-type="aname"><a name="' + c + '" style="font-size:0.1px;line-height:0.1px;visibility:hidden;height:0;"></a></div></bdo>'
    }
    var e = "485";
    var f = $('input:radio[name="shoptype"]:checked').val();
    if (f == "b") {
        e = (990 - $("#text_mainbackground_width").val()) / 2
    } else {
        e = (950 - $("#text_mainbackground_width").val()) / 2
    }
    var d = $("#text_mainbackground_width").val();
    if (d < 950) {
        if (a == 1) {
            g += '<div class="' + getInitClass_abs() + '" data-type="mainbackground" style="width:' + $("#text_mainbackground_width").val() + "px;height:" + $("#text_mainbackground_height").val() + "px;left:0;background-color:" + $("#text_mainbackground_color").val() + ";background-image:url(" + $("#text_mainbackground_bg").val() + ");background-repeat:" + $('input:radio[name="mainbackground_repeat"]:checked').val() + ";background-position:" + $('input:radio[name="mainbackground_positionx"]:checked').val() + " " + $('input:radio[name="mainbackground_positiony"]:checked').val() + ";background-attachment:" + $('input:radio[name="mainbackground_attachment"]:checked').val() + ';"></div>'
        } else {
            g += '<bdo><div class="' + getInitClass_abs() + '" data-type="mainbackground" style="width:' + $("#text_mainbackground_width").val() + "px;height:" + $("#text_mainbackground_height").val() + "px;left:0;background-color:" + $("#text_mainbackground_color").val() + ";background-image:url(" + $("#text_mainbackground_bg").val() + ");background-repeat:" + $('input:radio[name="mainbackground_repeat"]:checked').val() + ";background-position:" + $('input:radio[name="mainbackground_positionx"]:checked').val() + " " + $('input:radio[name="mainbackground_positiony"]:checked').val() + ";background-attachment:" + $('input:radio[name="mainbackground_attachment"]:checked').val() + ';"></div></bdo>'
        }
    } else {
        g += '<bdo><div class="' + getInitClass_abs() + '" data-type="mainbackground" style="width:' + $("#text_mainbackground_width").val() + "px;height:" + $("#text_mainbackground_height").val() + "px;left:" + e + "px;background-color:" + $("#text_mainbackground_color").val() + ";background-image:url(" + $("#text_mainbackground_bg").val() + ");background-repeat:" + $('input:radio[name="mainbackground_repeat"]:checked').val() + ";background-position:" + $('input:radio[name="mainbackground_positionx"]:checked').val() + " " + $('input:radio[name="mainbackground_positiony"]:checked').val() + ";background-attachment:" + $('input:radio[name="mainbackground_attachment"]:checked').val() + ';"></div></bdo>'
    }
    return g
}
function MainSetting_getCssCode3(a) {
    var d = "";
    var c = $("#text_mainbackground_width").val();
    if (c < 950 && a == 1) {
        d += "</div></div>"
    } else {
        d += "</div>"
    }
    return d
}
var HotspotComponent = function(j, g) {
    var n = j;
    var p = g;
    var k = "hotarea";
    var f = "热区";
    var m = "150px";
    var i = "150px";
    var e = getawleft();
    var d = getawtop();
    var c = "#";
    var l = " ";
    var h = true;
    var a = "";
    var r = null;
    var o = new StringUtil();
    q();
    function q() {
        if (p == null || p == "" || p == 0) {
            p = 2
        }
        a += "<div id='" + n + "' name='" + k + "' class='" + getInitClass_abs() + " aw_hotarea' style='z-index:" + p + ";top:" + d + ";left:" + e + ";width:" + m + ";height:" + i + ";'>";
        a += "<div class='close_drag' style='width:" + m + ";height:" + i + "'></div>";
        a += "<a target='_blank' style='width:" + m + ";height:" + i + ";display:block;'></a>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        r = $(a)
    }
    this.setComID = function(s) {
        n = s
    };
    this.getComID = function() {
        return n
    };
    this.setComName = function(s) {
        k = s
    };
    this.getComName = function() {
        return k
    };
    this.setDivZIndex = function(s) {
        p = s;
        r.css("z-index", p)
    };
    this.getDivZIndex = function() {
        return p
    };
    this.getComCnName = function() {
        return f
    };
    this.setDivWidth = function(s) {
        m = o.addUtil("width", s);
        r.find(".close_drag").css("width", m);
        r.find("a").css("width", m);
        r.css("width", m)
    };
    this.getDivWidth = function() {
        return o.delUtil(m)
    };
    this.setDivHeight = function(s) {
        i = o.addUtil("height", s);
        r.find(".close_drag").css("height", i);
        r.find("a").css("height", i);
        r.css("height", i)
    };
    this.getDivHeight = function() {
        return o.delUtil(i)
    };
    this.setDivLeft = function(s) {
        e = o.addUtil("left", s);
        r.css("left", e)
    };
    this.getDivLeft = function() {
        return o.delUtil(e)
    };
    this.setDivTop = function(s) {
        d = o.addUtil("top", s);
        r.css("top", d)
    };
    this.getDivTop = function() {
        return o.delUtil(d)
    };
    this.setUrl = function(s) {
        c = s;
        r.find("a").attr("href", c)
    };
    this.getUrl = function() {
        return c
    };
    this.setTitle = function(s) {
        l = s;
        r.find("a").attr("title", l)
    };
    this.getTitle = function() {
        return l
    };
    this.setTarget = function(s) {
        h = s;
        if (h) {
            r.find("a").attr("target", "_blank")
        } else {
            r.find("a").attr("target", "_self")
        }
    };
    this.getTarget = function() {
        return h
    };
    this.getComponent = function() {
        return r
    };
    this.getCssCode = function() {
        var u = "_self";
        if (h) {
            u = "_blank"
        }
        var s = '<bdo><div class="' + getInitClass_abs() + '" data-type="' + k + '" style="z-index:' + p + ";top:" + d + ";left:" + e + ';">';
        s += '<a href="' + c + '" target="' + u + '" title="' + l + '" style="width:' + m + ";height:" + i + ';display:block;"></a>';
        s += "</div></bdo>";
        return s
    };
    this.getJSON = function() {
        var s = {
            comID: n,
            comName: k,
            div_z_index: p,
            div_width: m,
            div_height: i,
            div_left: e,
            div_top: d,
            url: c,
            title: l,
            target: h
        };
        return s
    };
    this.gethtmlJSON = function(y) {
        var u = "hotarea_" + i_hotarea;
        i_hotarea++;
        var D = u;
        var E = z_index++;
        var C = "";
        var A = "";
        var w = 0;
        var t = 0;
        var s = "#";
        var B = "";
        var z = "";
        var v = /data-type="hotarea" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px/ig;
        var x = v.exec(y);
        if (x) {
            t = x[2];
            w = x[3]
        }
        v = /style="width:(\d+)px;height:(\d+)px/ig;
        x = v.exec(y);
        if (x) {
            C = x[1];
            A = x[2]
        }
        v = /a href="(.*)" target="(.*)" title="(.*)" style/ig;
        x = v.exec(y);
        if (x) {
            s = x[1];
            z = x[2];
            B = x[3]
        }
        var F = {
            comID: D,
            comName: k,
            div_z_index: E,
            div_width: C,
            div_height: A,
            div_left: w,
            div_top: t,
            url: s,
            title: B,
            target: z
        };
        return F
    };
    this.addClickEvent = function() {
        r.bind("click", $.proxy(this.eventhandler, this));
        r.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(s) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        r.addClass("ui-draggable-selected");
        setCurrentHotspotComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(s) {
        removeCurrenComponent(this, s)
    }
};
function initToolHotspot() {
    $("#comhotarea").click(function() {
        initHotspot(null)
    })
}
var i_hotarea = 0;
function initHotspot(a) {
    var f = "hotarea_" + i_hotarea;
    i_hotarea++;
    var e = new HotspotComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentHotspotComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_hotarea_left").val(c);
            $("#div_hotarea_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_hotarea_left").val(c);
            $("#div_hotarea_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentHotspotComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_hotarea_width").val(c);
            $("#div_hotarea_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_hotarea_width").val(c);
            $("#div_hotarea_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadHotspotFromDB(e, a);
    setCurrentHotspotComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadHotspotFromDB(f, e) {
    if (f == null || e == null) {
        return
    }
    var d = new StringUtil();
    if (e.comID != "") {
        f.setComID(e.comID)
    }
    if (e.comName != "") {
        f.setComName(e.comName)
    }
    if (e.div_z_index != "") {
        f.setDivZIndex(e.div_z_index)
    }
    if (e.div_height != "") {
        f.setDivHeight(d.delUtil(e.div_height))
    }
    if (e.div_width != "") {
        f.setDivWidth(d.delUtil(e.div_width))
    }
    if (e.div_left != "") {
        f.setDivLeft(d.delUtil(e.div_left))
    }
    if (e.div_top != "") {
        f.setDivTop(d.delUtil(e.div_top))
    }
    if (e.url != "") {
        f.setUrl(e.url)
    }
    if (e.title != "") {
        f.setTitle(e.title)
    }
    var a = e.target == 1 ? true: false;
    f.setTarget(a)
}
function setCurrentHotspotComponent(a) {
    loadHotspotValue(a);
    hotarea_editor(a)
}
function hotarea_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_hotarea_height").unbind();
    $("#div_hotarea_height").keyup(function() {
        a.setDivHeight($("#div_hotarea_height").val())
    });
    $("#div_hotarea_width").unbind();
    $("#div_hotarea_width").keyup(function() {
        a.setDivWidth($("#div_hotarea_width").val())
    });
    $("#div_hotarea_left").unbind();
    $("#div_hotarea_left").keyup(function() {
        a.setDivLeft($("#div_hotarea_left").val())
    });
    $("#div_hotarea_top").unbind();
    $("#div_hotarea_top").keyup(function() {
        a.setDivTop($("#div_hotarea_top").val())
    });
    $("#txt_hotarea_url").unbind();
    $("#txt_hotarea_url").keyup(function() {
        a.setUrl($("#txt_hotarea_url").val())
    });
    $("#txt_hotarea_title").unbind();
    $("#txt_hotarea_title").keyup(function() {
        a.setTitle($("#txt_hotarea_title").val())
    });
    $("#checkbox_hotarea_target").off("ifChanged");
    $("#checkbox_hotarea_target").on("ifChanged",
    function() {
        a.setTarget($("#checkbox_hotarea_target").prop("checked"))
    })
}
function loadHotspotValue(g) {
    var e = g;
    if (e == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_hotarea").css("display", "block");
    var f = g.getComID();
    var a = f.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#div_hotarea_height").val(e.getDivHeight());
    $("#div_hotarea_width").val(e.getDivWidth());
    $("#div_hotarea_left").val(e.getDivLeft());
    $("#div_hotarea_top").val(e.getDivTop());
    $("#txt_hotarea_url").val(e.getUrl());
    $("#txt_hotarea_title").val(e.getTitle());
    var d = "";
    if (e.getTarget()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_hotarea_target").off("ifChanged");
    $("#checkbox_hotarea_target").iCheck(d)
}
var SearchComponent = function(i, d) {
    var f = i;
    var k = d;
    var a = "search";
    var v = "搜索";
    var t = "260px";
    var z = "30px";
    var A = getawleft();
    var l = getawtop();
    var n = "transparent";
    var g = "http://img01.taobaocdn.com/imgextra/i1/310902331/TB2rMrYcFXXXXXIXXXXXXXXXXXX-310902331.jpg";
    var h = "#";
    var j = "180px";
    var s = "30px";
    var o = "#333333";
    var r = "#ffffff";
    var w = "50px";
    var c = "30px";
    var q = "http://img03.taobaocdn.com/imgextra/i3/310902331/TB2iT20cFXXXXaOXXXXXXXXXXXX-310902331.gif";
    var y = "";
    var p = null;
    var m = "新品";
    var u = new StringUtil();
    var e = "30px";
    x();
    function x() {
        if (k == null || k == "" || k == 0) {
            k = 2
        }
        y += "<div id='" + f + "' name='" + a + "' class='" + getInitClass_abs() + " aw_search' style='z-index:" + k + ";top:" + l + ";left:" + A + ";width:" + t + ";height:" + z + ";background:url(" + g + ");'>";
        y += "<div class='close_drag' style='width:" + t + ";height:" + z + "'></div>";
        y += "<div class='input_1' name='txt_search' style='padding-left:" + e + ";'>" + m + "</div>";
        y += "<div class='input_2' name='btn_search'></div>";
        y += "<input class='x_close' type='button' name='btn_del'/>";
        y += "</div>";
        p = $(y)
    }
    this.setComID = function(B) {
        f = B
    };
    this.getComID = function() {
        return f
    };
    this.setComName = function(B) {
        a = B
    };
    this.getComName = function() {
        return a
    };
    this.setDivZIndex = function(B) {
        k = B;
        p.css("z-index", k)
    };
    this.getDivZIndex = function() {
        return k
    };
    this.getComCnName = function() {
        return v
    };
    this.setDivWidth = function(B) {
        t = u.addUtil("width", B);
        p.find(".close_drag").css("width", t);
        p.css("width", t)
    };
    this.getDivWidth = function() {
        return u.delUtil(t)
    };
    this.setDivHeight = function(B) {
        z = u.addUtil("height", B);
        p.find(".close_drag").css("height", z);
        p.css("height", z)
    };
    this.getDivHeight = function() {
        return u.delUtil(z)
    };
    this.setDivLeft = function(B) {
        A = u.addUtil("left", B);
        p.css("left", A)
    };
    this.getDivLeft = function() {
        return u.delUtil(A)
    };
    this.setDivTop = function(B) {
        l = u.addUtil("top", B);
        p.css("top", l)
    };
    this.getDivTop = function() {
        return u.delUtil(l)
    };
    this.setDivBackgroundColor = function(B) {
        n = B;
        p.css("background-color", n)
    };
    this.getDivBackgroundColor = function() {
        return n
    };
    this.setDivBackgroundImage = function(B) {
        g = B;
        p.css("background-image", "url(" + g + ")")
    };
    this.getDivBackgroundImage = function() {
        return g
    };
    this.setShopUrl = function(B) {
        h = B
    };
    this.getShopUrl = function() {
        return h
    };
    this.setTxtWidth = function(B) {
        j = u.addUtil("width", B);
        p.find("div[name='txt_search']").css("width", j)
    };
    this.getTxtWidth = function() {
        return u.delUtil(j)
    };
    this.setTxtHeight = function(B) {
        s = u.addUtil("height", B);
        p.find("div[name='txt_search']").css("height", s)
    };
    this.getTxtHeight = function() {
        return u.delUtil(s)
    };
    this.setTxtPleft = function(B) {
        e = u.addUtil("left", B);
        p.find(".input_1").css("padding-left", e)
    };
    this.getTxtPleft = function() {
        return u.delUtil(e)
    };
    this.setTxtValue = function(B) {
        m = B;
        p.find(".input_1").html(m)
    };
    this.getTxtValue = function() {
        return m
    };
    this.setTxtColor = function(B) {
        o = B;
        p.find("div[name='txt_search']").css("color", o)
    };
    this.getTxtColor = function() {
        return o
    };
    this.setTxtBackground = function(B) {
        r = B;
        p.find("div[name='txt_search']").css("background", r)
    };
    this.getTxtBackground = function() {
        return r
    };
    this.setBtnWidth = function(B) {
        w = u.addUtil("width", B);
        p.find("div[name='btn_search']").css("width", w)
    };
    this.getBtnWidth = function() {
        return u.delUtil(w)
    };
    this.setBtnHeight = function(B) {
        c = u.addUtil("height", B);
        p.find("div[name='btn_search']").css("height", c)
    };
    this.getBtnHeight = function() {
        return u.delUtil(c)
    };
    this.setBtnBackgroundImage = function(B) {
        q = B;
        p.find("div[name='btn_search']").css("background-image", "url(" + q + ")")
    };
    this.getBtnBackgroundImage = function() {
        return q
    };
    this.getComponent = function() {
        return p
    };
    this.getCssCode = function() {
        var C = "";
        if (h != null || h != "") {
            var E = h.indexOf("shop");
            var D = h.indexOf(".");
            if (E >= 0 && D >= 0) {
                var C = h.substring(E + 4, D)
            }
        }
        var B = '<bdo><div class="' + getInitClass_abs() + '" data-type="' + a + '" style="z-index:' + k + ";top:" + l + ";left:" + A + ";width:" + t + ";height:" + z + ";background-color:" + n + ";background-image:url(" + g + ');">';
        B += '<form method="get" action="' + h + '" name="SearchForm">';
        B += '<input type="hidden" value="" name="userId">';
        B += '<input type="hidden" value="' + C + '" name="shopId">';
        B += '<input type="hidden" value="" name="view_type">';
        B += '<input type="hidden" value="" name="order_type">';
        B += '<input type="hidden" value="y" name="search">';
        B += '<input type="text" value="' + m + '" class="j_sekeyword" name="keyword" style="float:left;width:' + j + ";height:" + s + ";line-height:" + s + ";padding-left:" + e + ";border:0;color:" + o + ";background:none;background:" + r + ';">';
        B += '<button type="submit" style="float:left;width:' + w + ";height:" + c + ";border:0;cursor:pointer;background:none;background:url(" + q + ');"></button>';
        B += "</form>";
        B += "</div></bdo>";
        return B
    };
    this.getJSON = function() {
        var B = {
            comID: f,
            comName: a,
            div_z_index: k,
            div_width: t,
            div_height: z,
            div_left: A,
            div_top: l,
            div_background_color: n,
            div_background_image: g,
            shop_url: h,
            txt_width: j,
            txt_height: s,
            txt_color: o,
            txt_background: r,
            btn_width: w,
            btn_height: c,
            txt_value: m,
            pleft: e,
            btn_background_image: q
        };
        return B
    };
    this.gethtmlJSON = function(M) {
        var S = "search_" + i_search;
        i_search++;
        var F = S;
        var J = z_index++;
        var T = "";
        var V = "";
        var X = 0;
        var K = 0;
        var N = "";
        var G = "";
        var H = "";
        var I = "";
        var R = "";
        var O = "";
        var Q = "";
        var U = "";
        var D = "";
        var L = "";
        var E = "";
        var P = "";
        var C = /data-type="search" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;background-color:(.*);background-image:url\((.*)\);"><form method="get"/ig;
        var B = C.exec(M);
        if (B) {
            K = B[2];
            X = B[3];
            T = B[4];
            V = B[5];
            N = B[6];
            G = B[7]
        }
        C = /<form method="get" action="(.*)" name="SearchForm">/ig;
        B = C.exec(M);
        if (B) {
            H = B[1]
        }
        C = /input type="text" value="(.*)" class="j_sekeyword" name="keyword" style="float:left;width:(\d+)px;height:(\d+)px;line-height:(\d+)px;padding-left:(\d+)px;border:0;color:(.*);background:none;background:(.*);"><button/ig;
        B = C.exec(M);
        if (B) {
            L = B[1];
            I = B[2];
            R = B[3];
            E = B[5];
            O = B[6];
            Q = B[7]
        }
        C = /type="submit" style="float:left;width:(\d+)px;height:(\d+)px;border:0;cursor:pointer;background:none;background:url\((.*)\);/ig;
        B = C.exec(M);
        if (B) {
            U = B[1];
            D = B[2];
            P = B[3]
        }
        var W = {
            comID: F,
            comName: a,
            div_z_index: J,
            div_width: T,
            div_height: V,
            div_left: X,
            div_top: K,
            div_background_color: N,
            div_background_image: G,
            shop_url: H,
            txt_width: I,
            txt_height: R,
            txt_color: O,
            txt_background: Q,
            btn_width: U,
            btn_height: D,
            txt_value: L,
            pleft: E,
            btn_background_image: P
        };
        return W
    };
    this.addClickEvent = function() {
        p.bind("click", $.proxy(this.eventhandler, this));
        p.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(B) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        p.addClass("ui-draggable-selected");
        setCurrentSearchComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(B) {
        removeCurrenComponent(this, B)
    }
};
function initToolSearch() {
    getColorPalette("div_search_background_colorselect", "#fff", "div_search_background_color");
    getColorPalette("txt_search_background_colorselect", "#fff", "txt_search_background");
    getColorPalette("txt_search_font_color_colorselect", "#fff", "txt_search_font_color");
    $("#comsearch").click(function() {
        initSearch(null)
    })
}
var i_search = 0;
function initSearch(a) {
    var f = "search_" + i_search;
    i_search++;
    var e = new SearchComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentSearchComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_search_left").val(c);
            $("#div_search_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_search_left").val(c);
            $("#div_search_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentSearchComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_search_width").val(c);
            $("#div_search_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_search_width").val(c);
            $("#div_search_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadSearchFromDB(e, a);
    setCurrentSearchComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadSearchFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.div_background_color != "") {
        e.setDivBackgroundColor(d.div_background_color)
    }
    if (d.div_background_image != "") {
        e.setDivBackgroundImage(d.div_background_image)
    }
    if (d.shop_url != "") {
        e.setShopUrl(d.shop_url)
    }
    if (d.txt_height != "") {
        e.setTxtHeight(a.delUtil(d.txt_height))
    }
    if (d.txt_width != "") {
        e.setTxtWidth(a.delUtil(d.txt_width))
    }
    if (d.txt_value != "") {
        e.setTxtValue(d.txt_value)
    }
    if (d.pleft != "") {
        e.setTxtPleft(a.delUtil(d.pleft))
    }
    if (d.txt_background != "") {
        e.setTxtBackground(d.txt_background)
    }
    if (d.txt_color != "") {
        e.setTxtColor(d.txt_color)
    }
    if (d.btn_height != "") {
        e.setBtnHeight(a.delUtil(d.btn_height))
    }
    if (d.btn_width != "") {
        e.setBtnWidth(a.delUtil(d.btn_width))
    }
    if (d.btn_background_image != "") {
        e.setBtnBackgroundImage(d.btn_background_image)
    }
}
function setCurrentSearchComponent(a) {
    loadSearchValue(a);
    search_editor(a)
}
function search_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_search_height").unbind();
    $("#div_search_height").keyup(function() {
        a.setDivHeight($("#div_search_height").val())
    });
    $("#div_search_width").unbind();
    $("#div_search_width").keyup(function() {
        a.setDivWidth($("#div_search_width").val())
    });
    $("#div_search_left").unbind();
    $("#div_search_left").keyup(function() {
        a.setDivLeft($("#div_search_left").val())
    });
    $("#div_search_top").unbind();
    $("#div_search_top").keyup(function() {
        a.setDivTop($("#div_search_top").val())
    });
    $("#div_search_background_color").unbind();
    $("#div_search_background_color").change(function() {
        a.setDivBackgroundColor($("#div_search_background_color").val())
    });
    $("#div_search_background_img").unbind();
    $("#div_search_background_img").keyup(function() {
        a.setDivBackgroundImage($("#div_search_background_img").val())
    });
    $("#div_search_url").unbind();
    $("#div_search_url").keyup(function() {
        a.setShopUrl($("#div_search_url").val())
    });
    $("#txt_search_height").unbind();
    $("#txt_search_height").keyup(function() {
        a.setTxtHeight($("#txt_search_height").val())
    });
    $("#txt_search_width").unbind();
    $("#txt_search_width").keyup(function() {
        a.setTxtWidth($("#txt_search_width").val())
    });
    $("#txt_search_value").unbind();
    $("#txt_search_value").keyup(function() {
        a.setTxtValue($("#txt_search_value").val())
    });
    $("#txt_search_pleft").unbind();
    $("#txt_search_pleft").keyup(function() {
        a.setTxtPleft($("#txt_search_pleft").val())
    });
    $("#txt_search_background").unbind();
    $("#txt_search_background").change(function() {
        a.setTxtBackground($("#txt_search_background").val())
    });
    $("#txt_search_font_color").unbind();
    $("#txt_search_font_color").change(function() {
        a.setTxtColor($("#txt_search_font_color").val())
    });
    $("#btn_search_height").unbind();
    $("#btn_search_height").keyup(function() {
        a.setBtnHeight($("#btn_search_height").val())
    });
    $("#btn_search_width").unbind();
    $("#btn_search_width").keyup(function() {
        a.setBtnWidth($("#btn_search_width").val())
    });
    $("#btn_search_background_img").unbind();
    $("#btn_search_background_img").keyup(function() {
        a.setBtnBackgroundImage($("#btn_search_background_img").val())
    })
}
function loadSearchValue(f) {
    var d = f;
    if (d == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_search").css("display", "block");
    var e = f.getComID();
    var a = e.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_search_height").val(d.getDivHeight());
    $("#div_search_width").val(d.getDivWidth());
    $("#div_search_left").val(d.getDivLeft());
    $("#div_search_top").val(d.getDivTop());
    $("#div_search_background_color").val(d.getDivBackgroundColor());
    $("#div_search_background_img").val(d.getDivBackgroundImage());
    $("#div_search_url").val(d.getShopUrl());
    $("#txt_search_height").val(d.getTxtHeight());
    $("#txt_search_width").val(d.getTxtWidth());
    $("#txt_search_value").val(d.getTxtValue());
    $("#txt_search_pleft").val(d.getTxtPleft());
    $("#txt_search_background").val(d.getTxtBackground());
    $("#txt_search_font_color").val(d.getTxtColor());
    $("#btn_search_height").val(d.getBtnHeight());
    $("#btn_search_width").val(d.getBtnWidth());
    $("#btn_search_background_img").val(d.getBtnBackgroundImage())
}
var CountdownComponent = function(m, f) {
    var g = m;
    var n = f;
    var c = "countdown";
    var v = "倒计时";
    var t = "358px";
    var z = "92px";
    var A = getawleft();
    var p = getawtop();
    var i = "http://img03.taobaocdn.com/imgextra/i3/310902331/TB2K_PLcFXXXXbXXXXXXXXXXXXX-310902331.png";
    var q = "2014-11-11 00:00:00";
    var s = true;
    var o = true;
    var j = true;
    var d = true;
    var l = true;
    var h = "18px";
    var a = "微软雅黑";
    var k = "#ffffff";
    var y = false;
    var e = "0px";
    var x = "";
    var r = null;
    var u = new StringUtil();
    w();
    function w() {
        if (n == null || n == "" || n == 0) {
            n = 2
        }
        x += "<div id='" + g + "' name='" + c + "' class='" + getInitClass_abs() + " aw_countdown' style='z-index:" + n + ";top:" + p + ";left:" + A + ";width:" + t + ";height:" + z + ";background-image:url(" + i + ")'>";
        x += "<div class='close_drag' style='width:" + t + ";height:" + z + "'></div>";
        x += "<div class='np' style='font-size:" + h + ";font-family:" + a + ";color:" + k + ";margin-right:" + e + ";'><span id='span_countdown_d' class='span_countdown'>0<em class='span_countdown_unit'>天</em></span></div>";
        x += "<div class='np' style='font-size:" + h + ";font-family:" + a + ";color:" + k + ";margin-right:" + e + ";'><span id='span_countdown_h' class='span_countdown'>0<em class='span_countdown_unit'>时</em></span></div>";
        x += "<div class='np' style='font-size:" + h + ";font-family:" + a + ";color:" + k + ";margin-right:" + e + ";'><span id='span_countdown_m' class='span_countdown'>0<em class='span_countdown_unit'>分</em></span></div>";
        x += "<div class='np' style='font-size:" + h + ";font-family:" + a + ";color:" + k + ";margin-right:" + e + ";'><span id='span_countdown_s' class='span_countdown'>0<em class='span_countdown_unit'>秒</em></span></div>";
        x += "<input class='x_close' type='button' name='btn_del'/>";
        x += "</div>";
        r = $(x)
    }
    this.setComID = function(B) {
        g = B
    };
    this.getComID = function() {
        return g
    };
    this.setComName = function(B) {
        c = B
    };
    this.getComName = function() {
        return c
    };
    this.setDivZIndex = function(B) {
        n = B;
        r.css("z-index", n)
    };
    this.getDivZIndex = function() {
        return n
    };
    this.getComCnName = function() {
        return v
    };
    this.setDivWidth = function(B) {
        t = u.addUtil("width", B);
        r.find(".close_drag").css("width", t);
        r.css("width", t)
    };
    this.getDivWidth = function() {
        return u.delUtil(t)
    };
    this.setDivHeight = function(B) {
        z = u.addUtil("height", B);
        r.find(".close_drag").css("height", z);
        r.css("height", z)
    };
    this.getDivHeight = function() {
        return u.delUtil(z)
    };
    this.setDivLeft = function(B) {
        A = u.addUtil("left", B);
        r.css("left", A)
    };
    this.getDivLeft = function() {
        return u.delUtil(A)
    };
    this.setDivTop = function(B) {
        p = u.addUtil("top", B);
        r.css("top", p)
    };
    this.getDivTop = function() {
        return u.delUtil(p)
    };
    this.setDivBackgroundImage = function(B) {
        i = u.addUtil("background-image", B);
        r.css("background-image", "url(" + i + ")")
    };
    this.getDivBackgroundImage = function() {
        return i
    };
    this.setEndTime = function(B) {
        q = B
    };
    this.getEndTime = function() {
        return q
    };
    this.setDD = function(B) {
        s = B;
        var C = "none";
        if (s) {
            C = ""
        }
        r.find("#span_countdown_d").css("display", C)
    };
    this.getDD = function() {
        return s
    };
    this.setDH = function(B) {
        o = B;
        var C = "none";
        if (o) {
            C = ""
        }
        r.find("#span_countdown_h").css("display", C)
    };
    this.getDH = function() {
        return o
    };
    this.setDM = function(B) {
        j = B;
        var C = "none";
        if (j) {
            C = ""
        }
        r.find("#span_countdown_m").css("display", C)
    };
    this.getDM = function() {
        return j
    };
    this.setDS = function(B) {
        d = B;
        var C = "none";
        if (d) {
            C = ""
        }
        r.find("#span_countdown_s").css("display", C)
    };
    this.getDS = function() {
        return d
    };
    this.setDUnit = function(B) {
        l = B;
        var C = "none";
        if (l) {
            C = ""
        }
        r.find(".span_countdown_unit").css("display", C)
    };
    this.getDUnit = function() {
        return l
    };
    this.setFontSize = function(B) {
        h = u.addUtil("font-size", B);
        r.find(".np").css("font-size", h)
    };
    this.getFontSize = function() {
        return u.delUtil(h)
    };
    this.setFontFamily = function(B) {
        a = u.addUtil("font-family", B);
        r.find(".np").css("font-family", a)
    };
    this.getFontFamily = function() {
        return a
    };
    this.setFontColor = function(B) {
        k = u.addUtil("color", B);
        r.find(".np").css("color", k)
    };
    this.getFontColor = function() {
        return k
    };
    this.setFontWeight = function(B) {
        y = B;
        var C = "normal";
        if (y) {
            C = "bold"
        }
        r.find(".np").css("font-weight", C)
    };
    this.getFontWeight = function() {
        return y
    };
    this.setFontMarginLeft = function(B) {
        e = u.addUtil("margin-right", B);
        r.find(".np").css("margin-right", e)
    };
    this.getFontMarginLeft = function() {
        return u.delUtil(e)
    };
    this.getComponent = function() {
        return r
    };
    this.getCssCode = function() {
        var H = "none";
        var F = "none";
        var C = "none";
        var E = "none";
        var G = "none";
        var B = "normal";
        if (s) {
            H = ""
        }
        if (o) {
            F = ""
        }
        if (j) {
            C = ""
        }
        if (d) {
            E = ""
        }
        if (l) {
            G = ""
        }
        if (y) {
            B = "bold"
        }
        var D = '<bdo><div class="' + getInitClass_abs() + ' J_TWidget" data-type="' + c + '" style="z-index:' + n + ";top:" + p + ";left:" + A + ";width:" + t + ";height:" + z + ";background-image:url(" + i + ');background-repeat:no-repeat;" data-widget-type="Countdown"  data-widget-config="{\'endTime\':\'' + q + "','interval': 1000, 'timeRunCls': '.ks-run', 'timeUnitCls':{'d': '.ks-d','h': '.ks-h','m': '.ks-m','s': '.ks-s','i': '.ks-i'},'minDigit': 1,'timeEndCls': '.ks-end'}\">";
        D += '<div class="ks-run">';
        D += '<div style="float:left;display:inline;width:89px;height:92px;line-height:87px;margin-right:' + e + ";text-align:center;color:" + k + ";font-family:" + a + ";font-size:" + h + ";font-weight:" + B + ";display:" + H + ';"><span class="ks-d">0</span><span style="display:' + G + '">天</span></div>';
        D += '<div style="float:left;display:inline;width:89px;height:92px;line-height:87px;margin-right:' + e + ";text-align:center;color:" + k + ";font-family:" + a + ";font-size:" + h + ";font-weight:" + B + ";display:" + F + ';"><span class="ks-h">0</span><span style="display:' + G + '">时</span></div>';
        D += '<div style="float:left;display:inline;width:89px;height:92px;line-height:87px;margin-right:' + e + ";text-align:center;color:" + k + ";font-family:" + a + ";font-size:" + h + ";font-weight:" + B + ";display:" + C + ';"><span class="ks-m">0</span><span style="display:' + G + '">分</span></div>';
        D += '<div style="float:left;display:inline;width:89px;height:92px;line-height:87px;text-align:center;color:' + k + ";font-family:" + a + ";font-size:" + h + ";font-weight:" + B + ";display:" + E + ';"><span class="ks-s">0</span><span style="display:' + G + '">秒</span></div>';
        D += "</div>";
        D += '<div class="ks-end" style="display:none">已结束</div>';
        D += "</div></bdo>";
        return D
    };
    this.gethtmlJSON = function(P) {
        var S = "countdown_" + i_countdown;
        i_countdown++;
        var G = S;
        var M = z_index++;
        var T = "";
        var V = "";
        var X = 0;
        var O = 0;
        var R = true;
        var N = true;
        var I = true;
        var D = true;
        var L = true;
        var U = false;
        var J = "";
        var C = "";
        var K = "";
        var H = "";
        var Q = "";
        var E = "";
        var F = /data-type="countdown" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var B = F.exec(P);
        if (B) {
            O = B[2];
            X = B[3];
            T = B[4];
            V = B[5]
        }
        F = /endTime':'(.{19})/ig;
        B = F.exec(P);
        if (B) {
            Q = B[1]
        }
        F = /background-image:url\((.*)\);background-repeat/ig;
        B = F.exec(P);
        if (B) {
            H = B[1]
        }
        F = /<span style="display:(|none)">天<\/span>/ig;
        B = F.exec(P);
        if (B) {
            if (B[1] == "none") {
                L = false
            }
        }
        F = /display:(|none);"><span class="ks-d">/ig;
        B = F.exec(P);
        if (B) {
            if (B[1] == "none") {
                R = false
            }
        }
        F = /display:(|none);"><span class="ks-h">/ig;
        B = F.exec(P);
        if (B) {
            if (B[1] == "none") {
                N = false
            }
        }
        F = /display:(|none);"><span class="ks-m">/ig;
        B = F.exec(P);
        if (B) {
            if (B[1] == "none") {
                I = false
            }
        }
        F = /display:(|none);"><span class="ks-s">/ig;
        B = F.exec(P);
        if (B) {
            if (B[1] == "none") {
                D = false
            }
        }
        F = /float:left;display:inline;width:(\d+)px;height:(\d+)px;line-height:(\d+)px;margin-right:(.*);text-align:center;color:(.*);font-family:(.*);font-size:(.*)font-weight:(normal|bold);display:(.*);"><span class="ks-d">/ig;
        B = F.exec(P);
        if (B) {
            E = B[4];
            K = B[5];
            C = B[6];
            J = B[7];
            if (B[8] == "bold") {
                U = true
            }
        }
        var W = {
            comID: G,
            comName: c,
            div_z_index: M,
            div_width: T,
            div_height: V,
            div_left: X,
            div_top: O,
            div_background_image: H,
            end_time: Q,
            d_d: R,
            d_h: N,
            d_m: I,
            d_s: D,
            d_unit: L,
            font_size: J,
            font_family: C,
            font_color: K,
            font_weight: U,
            font_margin_right: E
        };
        return W
    };
    this.getJSON = function() {
        var B = {
            comID: g,
            comName: c,
            div_z_index: n,
            div_width: t,
            div_height: z,
            div_left: A,
            div_top: p,
            div_background_image: i,
            end_time: q,
            d_d: s,
            d_h: o,
            d_m: j,
            d_s: d,
            d_unit: l,
            font_size: h,
            font_family: a,
            font_color: k,
            font_weight: y,
            font_margin_right: e
        };
        return B
    };
    this.addClickEvent = function() {
        r.bind("click", $.proxy(this.eventhandler, this));
        r.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(B) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        r.addClass("ui-draggable-selected");
        setCurrentCountdownComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(B) {
        removeCurrenComponent(this, B)
    }
};
function initToolCountdown() {
    getColorPalette("txt_countdown_font_color_colorselect", "#fff", "txt_countdown_font_color");
    addFontFamily($("#select_countdown_font_family"));
    initTimePicker("txt_countdown_endtime");
    $("#comcountdown").click(function() {
        initCountdown(null)
    })
}
var i_countdown = 0;
function initCountdown(a) {
    var f = "countdown_" + i_countdown;
    i_countdown++;
    var e = new CountdownComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentCountdownComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_countdown_left").val(c);
            $("#div_countdown_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_countdown_left").val(c);
            $("#div_countdown_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentCountdownComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_countdown_width").val(c);
            $("#div_countdown_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_countdown_width").val(c);
            $("#div_countdown_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadCountdownFromDB(e, a);
    setCurrentCountdownComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadCountdownFromDB(f, e) {
    if (f == null || e == null) {
        return
    }
    var d = new StringUtil();
    if (e.comID != "") {
        f.setComID(e.comID)
    }
    if (e.comName != "") {
        f.setComName(e.comName)
    }
    if (e.div_z_index != "") {
        f.setDivZIndex(e.div_z_index)
    }
    if (e.div_height != "") {
        f.setDivHeight(d.delUtil(e.div_height))
    }
    if (e.div_width != "") {
        f.setDivWidth(d.delUtil(e.div_width))
    }
    if (e.div_left != "") {
        f.setDivLeft(d.delUtil(e.div_left))
    }
    if (e.div_top != "") {
        f.setDivTop(d.delUtil(e.div_top))
    }
    if (e.end_time != "") {
        f.setEndTime(e.end_time)
    }
    if (e.div_background_image != "") {
        f.setDivBackgroundImage(e.div_background_image)
    }
    var a = e.d_d == 1 ? true: false;
    f.setDD(a);
    a = e.d_h == 1 ? true: false;
    f.setDH(a);
    a = e.d_m == 1 ? true: false;
    f.setDM(a);
    a = e.d_s == 1 ? true: false;
    f.setDS(a);
    a = e.d_unit == 1 ? true: false;
    f.setDUnit(a);
    if (e.font_size != "") {
        f.setFontSize(d.delUtil(e.font_size))
    }
    if (e.font_family != "") {
        f.setFontFamily(e.font_family)
    }
    if (e.font_color != "") {
        f.setFontColor(e.font_color)
    }
    if (e.font_margin_right != "") {
        f.setFontMarginLeft(d.delUtil(e.font_margin_right))
    }
    a = e.font_weight == 1 ? true: false;
    f.setFontWeight(a)
}
function setCurrentCountdownComponent(a) {
    loadCountdownValue(a);
    countdown_editor(a)
}
function countdown_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#txt_countdown_endtime").unbind("change");
    $("#txt_countdown_endtime").change(function() {
        a.setEndTime($("#txt_countdown_endtime").val())
    });
    $("#txt_countdown_background_image").unbind();
    $("#txt_countdown_background_image").keyup(function() {
        a.setDivBackgroundImage($("#txt_countdown_background_image").val())
    });
    $("#div_countdown_height").unbind();
    $("#div_countdown_height").keyup(function() {
        a.setDivHeight($("#div_countdown_height").val())
    });
    $("#div_countdown_width").unbind();
    $("#div_countdown_width").keyup(function() {
        a.setDivWidth($("#div_countdown_width").val())
    });
    $("#div_countdown_left").unbind();
    $("#div_countdown_left").keyup(function() {
        a.setDivLeft($("#div_countdown_left").val())
    });
    $("#div_countdown_top").unbind();
    $("#div_countdown_top").keyup(function() {
        a.setDivTop($("#div_countdown_top").val())
    });
    $("#checkbox_countdown_d").off("ifChanged");
    $("#checkbox_countdown_d").on("ifChanged",
    function() {
        a.setDD($("#checkbox_countdown_d").prop("checked"))
    });
    $("#checkbox_countdown_h").off("ifChanged");
    $("#checkbox_countdown_h").on("ifChanged",
    function() {
        a.setDH($("#checkbox_countdown_h").prop("checked"))
    });
    $("#checkbox_countdown_m").off("ifChanged");
    $("#checkbox_countdown_m").on("ifChanged",
    function() {
        a.setDM($("#checkbox_countdown_m").prop("checked"))
    });
    $("#checkbox_countdown_s").off("ifChanged");
    $("#checkbox_countdown_s").on("ifChanged",
    function() {
        a.setDS($("#checkbox_countdown_s").prop("checked"))
    });
    $("#checkbox_countdown_unit").off("ifChanged");
    $("#checkbox_countdown_unit").on("ifChanged",
    function() {
        a.setDUnit($("#checkbox_countdown_unit").prop("checked"))
    });
    $("#txt_countdown_font_size").unbind();
    $("#txt_countdown_font_size").keyup(function() {
        a.setFontSize($("#txt_countdown_font_size").val())
    });
    $("#select_countdown_font_family").unbind();
    $("#select_countdown_font_family").change(function() {
        a.setFontFamily($("#select_countdown_font_family").val())
    });
    $("#txt_countdown_font_color").unbind();
    $("#txt_countdown_font_color").change(function() {
        a.setFontColor($("#txt_countdown_font_color").val())
    });
    $("#txt_countdown_font_margin_right").unbind();
    $("#txt_countdown_font_margin_right").keyup(function() {
        a.setFontMarginLeft($("#txt_countdown_font_margin_right").val())
    });
    $("#checkbox_countdown_font_weight").off("ifChanged");
    $("#checkbox_countdown_font_weight").on("ifChanged",
    function() {
        a.setFontWeight($("#checkbox_countdown_font_weight").prop("checked"))
    })
}
function loadCountdownValue(g) {
    var e = g;
    if (e == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_countdown").css("display", "block");
    var f = g.getComID();
    var a = f.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#txt_countdown_endtime").val(e.getEndTime());
    $("#txt_countdown_background_image").val(e.getDivBackgroundImage());
    $("#div_countdown_height").val(e.getDivHeight());
    $("#div_countdown_width").val(e.getDivWidth());
    $("#div_countdown_left").val(e.getDivLeft());
    $("#div_countdown_top").val(e.getDivTop());
    var d = "";
    if (e.getDD()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_countdown_d").off("ifChanged");
    $("#checkbox_countdown_d").iCheck(d);
    if (e.getDH()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_countdown_h").off("ifChanged");
    $("#checkbox_countdown_h").iCheck(d);
    if (e.getDM()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_countdown_m").off("ifChanged");
    $("#checkbox_countdown_m").iCheck(d);
    if (e.getDS()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_countdown_s").off("ifChanged");
    $("#checkbox_countdown_s").iCheck(d);
    if (e.getDUnit()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_countdown_unit").off("ifChanged");
    $("#checkbox_countdown_unit").iCheck(d);
    $("#txt_countdown_font_size").val(e.getFontSize());
    $("#select_countdown_font_family").val(e.getFontFamily());
    $("#txt_countdown_font_color").val(e.getFontColor());
    $("#txt_countdown_font_margin_right").val(e.getFontMarginLeft());
    if (e.getFontWeight()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_countdown_font_weight").off("ifChanged");
    $("#checkbox_countdown_font_weight").iCheck(d)
}
var ServiceComponent = function(h, d) {
    var e = h;
    var j = d;
    var c = "service";
    var q = "旺旺";
    var n = "100px";
    var u = "100px";
    var x = getawleft();
    var k = getawtop();
    var m = "请修改";
    var a = false;
    var s = "http://img02.taobaocdn.com/imgextra/i2/310902331/TB2u8PYcFXXXXXXXpXXXXXXXXXX-310902331.jpg";
    var w = true;
    var i = "2";
    var f = "2";
    var g = "right";
    var p = "";
    var v = "";
    if (i == "1" || i == "2") {
        p = Wang_Img_Link(m, i, a);
        v = Wang_Msg_Link(m, i, a)
    } else {
        p = Wang_Img_Link(m, "2", a);
        v = Wang_Msg_Link(m, "2", a)
    }
    var t = "";
    var l = null;
    var o = new StringUtil();
    r();
    function r() {
        if (j == null || j == "" || j == 0) {
            j = 2
        }
        t += "<div id='" + e + "' name='" + c + "' class='" + getInitClass_abs() + " xx_service' style='z-index:" + j + ";top:" + k + ";left:" + x + ";width:" + n + ";height:" + u + ";'>";
        t += "<div class='close_drag' style='width:" + n + ";height:" + u + ";'></div>";
        t += "<div class='" + getInitClass_rel() + "'>";
        t += "<a name='service_id' target='_blank' href='" + v + "'><img name='service_photo' src='" + s + "'></a>";
        t += "<div class='t_w' style='text-align:" + g + ";width:100%;'><a name='service_id' target='_blank' href='" + v + "'><img name='service_img' src='" + p + "' alt='点击这里给我发消息' /></a></div>";
        t += "</div>";
        t += "<input class='x_close' type='button' name='btn_del'/>";
        t += "</div>";
        l = $(t);
        if (f == "2") {
            l.find(".t_w").css("position", "absolute");
            l.find(".t_w").css("bottom", "0");
            l.find(".t_w").css("right", "0")
        }
    }
    this.setComID = function(y) {
        e = y
    };
    this.getComID = function() {
        return e
    };
    this.setComName = function(y) {
        c = y
    };
    this.getComName = function() {
        return c
    };
    this.setDivZIndex = function(y) {
        j = y;
        l.css("z-index", j)
    };
    this.getDivZIndex = function() {
        return j
    };
    this.getComCnName = function() {
        return q
    };
    this.setDivWidth = function(y) {
        n = o.addUtil("width", y);
        l.find(".close_drag").css("width", n);
        l.css("width", n)
    };
    this.getDivWidth = function() {
        return o.delUtil(n)
    };
    this.setDivHeight = function(y) {
        u = o.addUtil("height", y);
        l.find(".close_drag").css("height", u);
        l.css("height", u)
    };
    this.getDivHeight = function() {
        return o.delUtil(u)
    };
    this.setDivLeft = function(y) {
        x = o.addUtil("left", y);
        l.css("left", x)
    };
    this.getDivLeft = function() {
        return o.delUtil(x)
    };
    this.setDivTop = function(y) {
        k = o.addUtil("top", y);
        l.css("top", k)
    };
    this.getDivTop = function() {
        return o.delUtil(k)
    };
    this.setText_Service_ID = function(y) {
        m = y;
        p = Wang_Img_Link(m, i, a);
        l.find("img[name='service_img']").attr("src", p)
    };
    this.getText_Service_ID = function() {
        return m
    };
    this.setText_Service_Isshunt = function(y) {
        a = y;
        p = Wang_Img_Link(m, i, a);
        l.find("img[name='service_img']").attr("src", p)
    };
    this.getText_Service_Isshunt = function() {
        return a
    };
    this.setText_Service_Style = function(y) {
        i = y;
        if (i == "1" || i == "2") {
            l.find("img[name='service_img']").show();
            p = Wang_Img_Link(m, i, a);
            l.find("img[name='service_img']").attr("src", p)
        } else {
            l.find("img[name='service_img']").hide()
        }
    };
    this.getText_Service_Style = function() {
        return i
    };
    this.setText_Service_Photo = function(y) {
        s = y;
        if (s != "") {
            l.find("img[name='service_photo']").attr("src", s)
        } else {
            l.find("img[name='service_photo']").hide();
            l.find(".t_w").css("position", "")
        }
    };
    this.getText_Service_Photo = function() {
        return s
    };
    this.setText_Service_Photo_Isshow = function(y) {
        w = y;
        if (s != "") {
            if (w == false) {
                l.find("img[name='service_photo']").hide();
                l.find(".t_w").css("position", "")
            } else {
                l.find("img[name='service_photo']").show();
                if (f == "2") {
                    if (s != "") {
                        l.find(".t_w").css("position", "absolute");
                        l.find(".t_w").css("bottom", "0");
                        l.find(".t_w").css("right", "0")
                    }
                }
            }
        }
    };
    this.getText_Service_Photo_Isshow = function() {
        return w
    };
    this.setText_Service_Position = function(y) {
        f = y;
        if (f == "2") {
            if (w == true) {
                if (s != "") {
                    l.find(".t_w").css("position", "absolute");
                    l.find(".t_w").css("bottom", "0");
                    l.find(".t_w").css("right", "0")
                }
            }
        } else {
            l.find(".t_w").css("position", "")
        }
    };
    this.getText_Service_Position = function() {
        return f
    };
    this.setText_Service_Align = function(y) {
        g = y;
        l.find(".t_w").css("text-align", g)
    };
    this.getText_Service_Align = function() {
        return g
    };
    this.getComponent = function() {
        return l
    };
    this.getCssCode = function() {
        var z = "display:none;";
        var y = "display:none;";
        var D = "";
        var C = "";
        var B = "";
        if (w) {
            z = ""
        }
        if (i == "1" || i == "2") {
            y = ""
        }
        if (f == "2") {
            D = getInitClass_abs();
            C = "right:0;bottom:0;";
            B = getInitClass_rel()
        }
        if (i == "1" || i == "2") {
            p = Wang_Img_Link(m, i, a);
            v = Wang_Msg_Link(m, i, a)
        } else {
            p = Wang_Img_Link(m, "2", a);
            v = Wang_Msg_Link(m, "2", a)
        }
        var A = "";
        A += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + c + '" style="z-index:' + j + ";top:" + k + ";left:" + x + ";width:" + n + ";height:" + u + ';">';
        A += '<div class="' + B + '" >';
        A += '<a target="_blank" href="' + v + '" style="' + z + '"><img src="' + s + '"/></a>';
        A += '<div class="' + D + '" style="text-align:' + g + ";width:100%;" + y + "" + C + '"><a target="_blank" href="' + v + '"><img src="' + p + '" alt="点击这里给我发消息" /></a></div>';
        A += "</div>";
        A += "</div></bdo>";
        return A
    };
    this.gethtmlJSON = function(H) {
        var J = "service_" + i_service;
        i_service++;
        var B = J;
        var F = z_index++;
        var K = "";
        var M = "";
        var P = 0;
        var G = 0;
        var I = "";
        var L = "";
        var E = "";
        var C = "1";
        var D = "";
        var z = true;
        var O = true;
        var A = /data-type="service" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var y = A.exec(H);
        if (y) {
            G = y[2];
            P = y[3];
            K = y[4];
            M = y[5]
        }
        A = /(|real)online.aw/ig;
        y = A.exec(H);
        if (y) {
            if (y[1] == "real") {
                z = false
            }
        }
        A = /online.aw\?v=2&uid=(.*)&site=cntaobao&s=(1|2)&charset=utf-8/ig;
        y = A.exec(H);
        if (y) {
            if (y[1]) {
                I = decodeURIComponent(y[1])
            }
            E = y[2]
        }
        A = /div class="(|abs)" style="text-align:(left|center|right);width:100%;(|display:none;)(|right:0;bottom:0;)">/ig;
        y = A.exec(H);
        if (y) {
            if (y[3] == "display:none;") {
                E = "3"
            }
            if (y[4] == "right:0;bottom:0;") {
                C = "2"
            }
        }
        A = /style="(|display:none;)"><img src=/ig;
        y = A.exec(H);
        if (y) {
            if (y[1] == "display:none;") {
                O = false
            }
        }
        A = /text-align:(left|center|right)/ig;
        y = A.exec(H);
        if (y) {
            D = y[1]
        }
        A = /src="(.*)"\/>/ig;
        y = A.exec(H);
        if (y) {
            L = y[1]
        }
        var N = {
            comID: B,
            comName: c,
            div_z_index: F,
            div_width: K,
            div_height: M,
            div_left: P,
            div_top: G,
            text_service_id: I,
            text_service_isshunt: z,
            text_service_photo: L,
            text_service_photo_isshow: O,
            text_service_style: E,
            text_service_position: C,
            text_service_align: D
        };
        return N
    };
    this.getJSON = function() {
        var y = {
            comID: e,
            comName: c,
            div_z_index: j,
            div_width: n,
            div_height: u,
            div_left: x,
            div_top: k,
            text_service_id: m,
            text_service_isshunt: a,
            text_service_photo: s,
            text_service_photo_isshow: w,
            text_service_style: i,
            text_service_position: f,
            text_service_align: g
        };
        return y
    };
    this.addClickEvent = function() {
        l.bind("click", $.proxy(this.eventhandler, this));
        l.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(y) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        l.addClass("ui-draggable-selected");
        setCurrentServiceComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(y) {
        removeCurrenComponent(this, y)
    }
};
function initToolService() {
    $("#comservice").click(function() {
        initService(null)
    })
}
var i_service = 0;
function initService(a) {
    var f = "service_" + i_service;
    i_service++;
    var e = new ServiceComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentServiceComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_service_left").val(c);
            $("#div_service_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_service_left").val(c);
            $("#div_service_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentServiceComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_service_width").val(c);
            $("#div_service_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_service_width").val(c);
            $("#div_service_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadServiceFromDB(e, a);
    setCurrentServiceComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadServiceFromDB(f, e) {
    if (f == null || e == null) {
        return
    }
    var d = new StringUtil();
    if (e.comID != "") {
        f.setComID(e.comID)
    }
    if (e.comName != "") {
        f.setComName(e.comName)
    }
    if (e.div_z_index != "") {
        f.setDivZIndex(e.div_z_index)
    }
    if (e.div_height != "") {
        f.setDivHeight(d.delUtil(e.div_height))
    }
    if (e.div_width != "") {
        f.setDivWidth(d.delUtil(e.div_width))
    }
    if (e.div_left != "") {
        f.setDivLeft(d.delUtil(e.div_left))
    }
    if (e.div_top != "") {
        f.setDivTop(d.delUtil(e.div_top))
    }
    if (e.text_service_id != "") {
        f.setText_Service_ID(e.text_service_id)
    }
    var a = e.text_service_isshunt == 1 ? true: false;
    f.setText_Service_Isshunt(a);
    if (e.text_service_photo != "") {
        f.setText_Service_Photo(e.text_service_photo)
    }
    a = e.text_service_photo_isshow == 1 ? true: false;
    f.setText_Service_Photo_Isshow(a);
    if (e.text_service_style != "") {
        f.setText_Service_Style(e.text_service_style)
    }
    if (e.text_service_position != "") {
        f.setText_Service_Position(e.text_service_position)
    }
    if (e.text_service_align != "") {
        f.setText_Service_Align(e.text_service_align)
    }
}
function setCurrentServiceComponent(a) {
    loadServiceValue(a);
    service_editor(a)
}
function service_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_service_height").unbind();
    $("#div_service_height").keyup(function() {
        a.setDivHeight($("#div_service_height").val())
    });
    $("#div_service_width").unbind();
    $("#div_service_width").keyup(function() {
        a.setDivWidth($("#div_service_width").val())
    });
    $("#div_service_left").unbind();
    $("#div_service_left").keyup(function() {
        a.setDivLeft($("#div_service_left").val())
    });
    $("#div_service_top").unbind();
    $("#div_service_top").keyup(function() {
        a.setDivTop($("#div_service_top").val())
    });
    $("#text_service_id").unbind();
    $("#text_service_id").keyup(function() {
        a.setText_Service_ID($("#text_service_id").val())
    });
    $("#text_service_isshunt").off("ifChanged");
    $("#text_service_isshunt").on("ifChanged",
    function() {
        a.setText_Service_Isshunt($("#text_service_isshunt").prop("checked"))
    });
    $("#text_service_photo").unbind();
    $("#text_service_photo").keyup(function() {
        a.setText_Service_Photo($("#text_service_photo").val())
    });
    $("#text_service_photo_isshow").off("ifChanged");
    $("#text_service_photo_isshow").on("ifChanged",
    function() {
        a.setText_Service_Photo_Isshow($("#text_service_photo_isshow").prop("checked"))
    });
    $("input:radio[name=service_style]").off("ifChanged");
    $("input:radio[name=service_style]").on("ifChanged",
    function() {
        a.setText_Service_Style($(this).val())
    });
    $("input:radio[name=service_position]").off("ifChanged");
    $("input:radio[name=service_position]").on("ifChanged",
    function() {
        a.setText_Service_Position($(this).val())
    });
    $("input:radio[name=service_align]").off("ifChanged");
    $("input:radio[name=service_align]").on("ifChanged",
    function() {
        a.setText_Service_Align($(this).val())
    })
}
function loadServiceValue(g) {
    var e = g;
    if (e == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_service").css("display", "block");
    var f = g.getComID();
    var a = f.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#div_service_height").val(e.getDivHeight());
    $("#div_service_width").val(e.getDivWidth());
    $("#div_service_left").val(e.getDivLeft());
    $("#div_service_top").val(e.getDivTop());
    $("#text_service_id").val(e.getText_Service_ID());
    var d = "";
    if (e.getText_Service_Isshunt()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#text_service_isshunt").off("ifChanged");
    $("#text_service_isshunt").iCheck(d);
    $("#text_service_photo").val(e.getText_Service_Photo());
    d = "";
    if (e.getText_Service_Photo_Isshow()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#text_service_photo_isshow").off("ifChanged");
    $("#text_service_photo_isshow").iCheck(d);
    $("input:radio[name=service_style]").off("ifChanged");
    if (e.getText_Service_Style() == "1") {
        $("#text_service_style1").iCheck("check")
    } else {
        if (e.getText_Service_Style() == "2") {
            $("#text_service_style2").iCheck("check")
        } else {
            $("#text_service_style3").iCheck("check")
        }
    }
    $("input:radio[name=service_position]").off("ifChanged");
    if (e.getText_Service_Position() == "1") {
        $("#text_service_position1").iCheck("check")
    } else {
        $("#text_service_position2").iCheck("check")
    }
    $("input:radio[name=service_align]").off("ifChanged");
    if (e.getText_Service_Align() == "left") {
        $("#text_service_align1").iCheck("check")
    } else {
        if (e.getText_Service_Align() == "center") {
            $("#text_service_align2").iCheck("check")
        } else {
            $("#text_service_align3").iCheck("check")
        }
    }
}
function Wang_GBK(c) {
    var a = encodeURIComponent(c);
    a = jQuery.trim(a);
    return a
}
function Wang_Img_Link(c, e, h) {
    var a = "http://amos.alicdn.com";
    var g = a + "/realonline.aw?v=2";
    if (h == true) {
        g = a + "/online.aw?v=2"
    }
    var d = Wang_GBK(c);
    var f = g + "&uid=" + d + "&site=cntaobao&s=" + e + "&charset=utf-8";
    return f
}
function Wang_Msg_Link(d, f, h) {
    var g = "http://www.taobao.com/webww/ww.php?ver=3";
    var e = Wang_GBK(d);
    var a = g + "&touid=" + e + "&siteid=cntaobao&status=" + f + "&charset=utf-8";
    if (h == true) {
        var c = "http://amos.alicdn.com";
        g = c + "/getcid.aw?v=2";
        a = g + "&uid=" + e + "&site=cntaobao&s=" + f + "&groupid=0&charset=utf-8"
    }
    return a
}
var WWGroupComponent = function(i, g) {
    var l = i;
    var n = g;
    var j = "wwgroup";
    var f = "旺旺群";
    var k = "63px";
    var h = "20px";
    var e = getawleft();
    var c = getawtop();
    var d = "群ID";
    var q = "http://img03.taobaocdn.com/imgextra/i3/310902331/TB2FyHTcFXXXXa3XpXXXXXXXXXX-310902331.gif";
    var a = "";
    var p = null;
    var m = new StringUtil();
    o();
    function o() {
        if (n == null || n == "" || n == 0) {
            n = 2
        }
        a += "<div id='" + l + "' name='" + j + "' class='" + getInitClass_abs() + " xx_servicegroup' style='z-index:" + n + ";top:" + c + ";left:" + e + ";width:" + k + ";height:" + h + ";'>";
        a += "<div class='close_drag' style='width:" + k + ";height:" + h + ";'></div>";
        a += "<img src='" + q + "'style='width:" + k + ";height:" + h + ";'/>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        p = $(a)
    }
    this.setComID = function(r) {
        l = r
    };
    this.getComID = function() {
        return l
    };
    this.setComName = function(r) {
        j = r
    };
    this.getComName = function() {
        return j
    };
    this.setDivZIndex = function(r) {
        n = r;
        p.css("z-index", n)
    };
    this.getDivZIndex = function() {
        return n
    };
    this.getComCnName = function() {
        return f
    };
    this.setDivWidth = function(r) {
        k = m.addUtil("width", r);
        p.find(".close_drag").css("width", k);
        p.find("img").css("width", k);
        p.css("width", k)
    };
    this.getDivWidth = function(r) {
        return m.delUtil(k)
    };
    this.setDivHeight = function(r) {
        h = m.addUtil("height", r);
        p.find(".close_drag").css("height", h);
        p.find("img").css("height", h);
        p.css("height", h)
    };
    this.getDivHeight = function(r) {
        return m.delUtil(h)
    };
    this.setDivLeft = function(r) {
        e = m.addUtil("left", r);
        p.css("left", e)
    };
    this.getDivLeft = function(r) {
        return m.delUtil(e)
    };
    this.setDivTop = function(r) {
        c = m.addUtil("top", r);
        p.css("top", c)
    };
    this.getDivTop = function(r) {
        return m.delUtil(c)
    };
    this.setText_WWGroup_ID = function(r) {
        d = r
    };
    this.getText_WWGroup_ID = function(r) {
        return d
    };
    this.setText_WWGroup_Photo = function(r) {
        q = r;
        p.find("img").attr("src", q)
    };
    this.getText_WWGroup_Photo = function(r) {
        return q
    };
    this.getComponent = function() {
        return p
    };
    this.getCssCode = function() {
        var r = "";
        r += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + j + '" style="z-index:' + n + ";top:" + c + ";left:" + e + ";width:" + k + ";height:" + h + ';">';
        r += '<a target="_blank" href="http://www.taobao.com/go/act/other/wwgroup.php?uid=&tribeid=' + d + '">';
        r += '<img src="' + q + '" style="width:' + k + ";height:" + h + ';"/>';
        r += "</a>";
        r += "</div></bdo>";
        return r
    };
    this.gethtmlJSON = function(x) {
        var s = "wwgroup_" + i_servicegroup;
        i_servicegroup++;
        var A = s;
        var B = z_index++;
        var z = "";
        var y = "";
        var v = 0;
        var r = 0;
        var u = "";
        var D = "";
        var t = /data-type="wwgroup" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var w = t.exec(x);
        if (w) {
            r = w[2];
            v = w[3];
            z = w[4];
            y = w[5]
        }
        t = /tribeid=(.*)"><img src="(.*)" style=/ig;
        w = t.exec(x);
        if (w) {
            u = w[1];
            D = w[2]
        }
        var C = {
            comID: A,
            comName: j,
            div_z_index: B,
            div_width: z,
            div_height: y,
            div_left: v,
            div_top: r,
            text_wwgroup_id: u,
            text_wwgroup_photo: D
        };
        return C
    };
    this.getJSON = function() {
        var r = {
            comID: l,
            comName: j,
            div_z_index: n,
            div_width: k,
            div_height: h,
            div_left: e,
            div_top: c,
            text_wwgroup_id: d,
            text_wwgroup_photo: q
        };
        return r
    };
    this.addClickEvent = function() {
        p.bind("click", $.proxy(this.eventhandler, this));
        p.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(r) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        p.addClass("ui-draggable-selected");
        setCurrentWWGroupComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(r) {
        removeCurrenComponent(this, r)
    }
};
function initToolWWGroup() {
    $("#comwwgroup").click(function() {
        initWWGroup(null)
    })
}
var i_servicegroup = 0;
function initWWGroup(a) {
    var f = "wwgroup_" + i_servicegroup;
    i_servicegroup++;
    var e = new WWGroupComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentWWGroupComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_wwgroup_left").val(c);
            $("#div_wwgroup_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_wwgroup_left").val(c);
            $("#div_wwgroup_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentWWGroupComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_wwgroup_width").val(c);
            $("#div_wwgroup_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_wwgroup_width").val(c);
            $("#div_wwgroup_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadServiceGroupFromDB(e, a);
    setCurrentWWGroupComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadServiceGroupFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_wwgroup_id != "") {
        e.setText_WWGroup_ID(d.text_wwgroup_id)
    }
    if (d.text_wwgroup_photo != "") {
        e.setText_WWGroup_Photo(d.text_wwgroup_photo)
    }
}
function setCurrentWWGroupComponent(a) {
    loadWWGroupValue(a);
    wwgroup_editor(a)
}
function wwgroup_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_wwgroup_height").unbind();
    $("#div_wwgroup_height").keyup(function() {
        a.setDivHeight($("#div_wwgroup_height").val())
    });
    $("#div_wwgroup_width").unbind();
    $("#div_wwgroup_width").keyup(function() {
        a.setDivWidth($("#div_wwgroup_width").val())
    });
    $("#div_wwgroup_left").unbind();
    $("#div_wwgroup_left").keyup(function() {
        a.setDivLeft($("#div_wwgroup_left").val())
    });
    $("#div_wwgroup_top").unbind();
    $("#div_wwgroup_top").keyup(function() {
        a.setDivTop($("#div_wwgroup_top").val())
    });
    $("#text_wwgroup_id").unbind();
    $("#text_wwgroup_id").keyup(function() {
        a.setText_WWGroup_ID($("#text_wwgroup_id").val())
    });
    $("#text_wwgroup_photo").unbind();
    $("#text_wwgroup_photo").keyup(function() {
        a.setText_WWGroup_Photo($("#text_wwgroup_photo").val())
    })
}
function loadWWGroupValue(f) {
    var d = f;
    if (d == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_wwgroup").css("display", "block");
    var e = f.getComID();
    var a = e.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_wwgroup_height").val(d.getDivHeight());
    $("#div_wwgroup_width").val(d.getDivWidth());
    $("#div_wwgroup_left").val(d.getDivLeft());
    $("#div_wwgroup_top").val(d.getDivTop());
    $("#text_wwgroup_id").val(d.getText_WWGroup_ID());
    $("#text_wwgroup_photo").val(d.getText_WWGroup_Photo())
}
var TextareaComponent = function(m, h) {
    var i = m;
    var n = h;
    var f = "textarea";
    var t = "文字";
    var r = "200px";
    var z = "20px";
    var B = getawleft();
    var o = getawtop();
    var v = "在背景上设置文字";
    var j = "12";
    var y = false;
    var e = "宋体";
    var k = "#333333";
    var g = "#";
    var A = true;
    var d = "undefined";
    var c = "transparent";
    var l = "left";
    var q = "aw_efa0";
    var a = "aw_eftime1";
    var u = false;
    var x = "";
    var p = null;
    var s = new StringUtil();
    w();
    function w() {
        if (n == null || n == "" || n == 0) {
            n = 2
        }
        x += "<div id='" + i + "' name='" + f + "' class='" + getInitClass_abs() + " aw_textarea aw_pocoimage' style='z-index:" + n + ";top:" + o + ";left:" + B + ";width:" + r + ";height:" + z + ";'>";
        x += "<div class='close_drag' style='width:" + r + ";height:" + z + "'></div>";
        x += "<div class='div_content " + q + " " + a + "'><a target='_blank'><span class='content' style='word-wrap:break-word;'>" + v + "</span></a></div>";
        x += "<input class='x_close' type='button' name='btn_del'/>";
        x += "</div>";
        p = $(x)
    }
    this.setComID = function(C) {
        i = C
    };
    this.getComID = function() {
        return i
    };
    this.setComName = function(C) {
        f = C
    };
    this.getComName = function() {
        return f
    };
    this.setDivZIndex = function(C) {
        n = C;
        p.css("z-index", n)
    };
    this.getDivZIndex = function() {
        return n
    };
    this.getComCnName = function() {
        return t
    };
    this.setDivWidth = function(C) {
        r = s.addUtil("width", C);
        p.find(".close_drag").css("width", r);
        p.find(".content").css("width", r);
        p.css("width", r)
    };
    this.getDivWidth = function() {
        return s.delUtil(r)
    };
    this.setDivHeight = function(C) {
        z = s.addUtil("height", C);
        p.find(".close_drag").css("height", z);
        p.find(".content").css("height", z);
        p.css("height", z)
    };
    this.getDivHeight = function() {
        return s.delUtil(z)
    };
    this.setDivLeft = function(C) {
        B = s.addUtil("left", C);
        p.css("left", B)
    };
    this.getDivLeft = function() {
        return s.delUtil(B)
    };
    this.setDivTop = function(C) {
        o = s.addUtil("top", C);
        p.css("top", o)
    };
    this.getDivTop = function() {
        return s.delUtil(o)
    };
    this.setContent = function(C) {
        v = C;
        p.find(".content").html(v)
    };
    this.getContent = function() {
        return v
    };
    this.setFontSize = function(C) {
        j = s.addUtil("font-size", C);
        p.find(".content").css("font-size", j)
    };
    this.getFontSize = function() {
        return s.delUtil(j)
    };
    this.setFontFamily = function(C) {
        e = s.addUtil("font-family", C);
        p.find(".content").css("font-family", e)
    };
    this.getFontFamily = function() {
        return e
    };
    this.setFontColor = function(C) {
        k = s.addUtil("color", C);
        p.find(".content").css("color", k)
    };
    this.getFontColor = function() {
        return k
    };
    this.setFontWeight = function(C) {
        y = C;
        var D = "normal";
        if (y) {
            D = "bold"
        }
        p.find(".content").css("font-weight", D)
    };
    this.getFontWeight = function() {
        return y
    };
    this.setUrl = function(C) {
        g = C;
        p.find("a").attr("href", g)
    };
    this.getUrl = function() {
        return g
    };
    this.setTarget = function(C) {
        A = C;
        if (A) {
            p.find("a").attr("target", "_blank")
        } else {
            p.find("a").attr("target", "_self")
        }
    };
    this.getTarget = function() {
        return A
    };
    this.setFontLineHeight = function(C) {
        d = s.addUtil("line-height", C);
        p.find(".div_content").css("line-height", d)
    };
    this.getFontLineHeight = function() {
        return s.delUtil(d)
    };
    this.setBgColor = function(C) {
        c = C;
        p.css("background", c)
    };
    this.getBgColor = function() {
        return c
    };
    this.setFontAlign = function(C) {
        l = C;
        p.find(".div_content").css("text-align", l)
    };
    this.getFontAlign = function() {
        return l
    };
    this.setEffect = function(C) {
        p.find(".div_content").removeClass(q);
        q = C;
        p.find(".div_content").addClass(q)
    };
    this.getEffect = function() {
        return q
    };
    this.setDuration = function(C) {
        p.find(".div_content").removeClass(a);
        a = C;
        p.find(".div_content").addClass(a)
    };
    this.getDuration = function() {
        return a
    };
    this.setPoint = function(C) {
        u = C;
        if (u) {
            p.removeClass("aw_pocoimage");
            p.addClass("aw_pocoimage_all")
        } else {
            p.removeClass("aw_pocoimage_all");
            p.addClass("aw_pocoimage")
        }
    };
    this.getPoint = function() {
        return u
    };
    this.getComponent = function() {
        return p
    };
    this.getCssCode = function() {
        var E = "_self";
        var C = "normal";
        if (A) {
            E = "_blank"
        }
        if (y == true) {
            C = "bold"
        }
        var G = "";
        if (c != "") {
            G = "background:" + c + ";"
        }
        var F = "aw_pocoimage";
        if (u) {
            F = "aw_pocoimage_all"
        }
        var D = '<bdo><div class="' + getInitClass_abs() + " " + F + '" data-type="' + f + '" style="z-index:' + n + ";top:" + o + ";left:" + B + ";width:" + r + ";height:" + z + ";" + G + '">';
        D += '<div class="' + q + " " + a + '" style="line-height:' + d + ";text-align:" + l + ';">';
        if (g != "") {
            D += '<a href="' + g + '" target="' + E + '"><span style="font-size:' + j + ";color:" + k + ";font-family:" + e + ";font-weight:" + C + ';">' + v + "</span></a>"
        } else {
            D += '<span style="font-size:' + j + ";color:" + k + ";font-family:" + e + ";font-weight:" + C + ';">' + v + "</span>"
        }
        D += "</div></div></bdo>";
        return D
    };
    this.gethtmlJSON = function(P) {
        var R = "textarea_" + i_textarea;
        i_textarea++;
        var J = R;
        var N = z_index++;
        var S = "";
        var W = "";
        var Z = 0;
        var O = 0;
        var U = "";
        var K = "";
        var V = false;
        var G = "";
        var L = "";
        var H = "";
        var Y = false;
        var F = "";
        var D = "";
        var M = "";
        var Q = "";
        var C = "";
        var T = false;
        var I = /data-type="textarea" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var E = I.exec(P);
        if (E) {
            O = E[2];
            Z = E[3];
            S = E[4];
            W = E[5]
        }
        I = /background:(#.{6})/ig;
        E = I.exec(P);
        if (E) {
            D = E[1]
        }
        I = /div class="abs aw_pocoimage(|_all)" data-type="textarea"/ig;
        E = I.exec(P);
        if (E) {
            if (E[1] == "_all") {
                T = true
            }
        }
        style = /line-height:(.*);text-align:(left|center|right);/;
        E = I.exec(P);
        if (E) {
            F = E[1];
            M = E[2]
        }
        I = /<div class="aw_(.*) aw_(.*)"/ig;
        E = I.exec(P);
        if (E) {
            Q = "aw_" + E[1];
            C = "aw_" + E[2]
        }
        I = /href="(.*)" target="(.*)"/ig;
        E = I.exec(P);
        if (E) {
            H = E[1];
            if (E[2] == "_blank") {
                Y = true
            }
        }
        I = /<span style="font-size:(.*);color:(|#.{6});font-family:(.*);font-weight:(normal|bold);">(.*)<\/span>/ig;
        E = I.exec(P);
        if (E) {
            K = E[1];
            L = E[2];
            G = E[3];
            if (E[4] == "bold") {
                V = true
            }
            U = E[5]
        }
        var X = {
            comID: J,
            comName: f,
            div_z_index: N,
            div_width: S,
            div_height: W,
            div_left: Z,
            div_top: O,
            content: U,
            font_size: K,
            font_weight: V,
            font_family: G,
            font_color: L,
            url: H,
            target: Y,
            font_lineheight: F,
            bgcolor: D,
            font_align: M,
            effect: Q,
            duration: C,
            point: T
        };
        return X
    };
    this.getJSON = function() {
        var C = {
            comID: i,
            comName: f,
            div_z_index: n,
            div_width: r,
            div_height: z,
            div_left: B,
            div_top: o,
            content: v,
            font_size: j,
            font_weight: y,
            font_family: e,
            font_color: k,
            url: g,
            target: A,
            font_lineheight: d,
            bgcolor: c,
            font_align: l,
            effect: q,
            duration: a,
            point: u
        };
        return C
    };
    this.addClickEvent = function() {
        p.bind("click", $.proxy(this.eventhandler, this));
        p.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(C) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        p.addClass("ui-draggable-selected");
        setCurrentTextareaComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(C) {
        removeCurrenComponent(this, C)
    }
};
function initToolTextarea() {
    getColorPalette("txt_textarea_font_color_colorselect", "#fff", "txt_textarea_font_color");
    getColorPalette("txt_textarea_bgcolor_colorselect", "#fff", "txt_textarea_bgcolor");
    addFontFamily($("#select_textarea_font_family"));
    addPoEffect($("#select_textarea_effect"));
    addDuration($("#select_textarea_duration"));
    $("#comtextarea").click(function() {
        initTextarea(null)
    })
}
var i_textarea = 0;
function initTextarea(a) {
    var f = "textarea_" + i_textarea;
    i_textarea++;
    var e = new TextareaComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentTextareaComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_textarea_left").val(c);
            $("#div_textarea_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_textarea_left").val(c);
            $("#div_textarea_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentTextareaComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_textarea_width").val(c);
            $("#div_textarea_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_textarea_width").val(c);
            $("#div_textarea_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadTextareaFromDB(e, a);
    setCurrentTextareaComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadTextareaFromDB(f, e) {
    if (f == null || e == null) {
        return
    }
    var d = new StringUtil();
    if (e.comID != "") {
        f.setComID(e.comID)
    }
    if (e.comName != "") {
        f.setComName(e.comName)
    }
    if (e.div_z_index != "") {
        f.setDivZIndex(e.div_z_index)
    }
    if (e.div_height != "") {
        f.setDivHeight(d.delUtil(e.div_height))
    }
    if (e.div_width != "") {
        f.setDivWidth(d.delUtil(e.div_width))
    }
    if (e.div_left != "") {
        f.setDivLeft(d.delUtil(e.div_left))
    }
    if (e.div_top != "") {
        f.setDivTop(d.delUtil(e.div_top))
    }
    if (e.content != "") {
        f.setContent(e.content)
    }
    if (e.url != "") {
        f.setUrl(e.url)
    }
    var a = e.target == 1 ? true: false;
    f.setTarget(a);
    if (e.font_size != "") {
        f.setFontSize(d.delUtil(e.font_size))
    }
    if (e.font_family != "") {
        f.setFontFamily(e.font_family)
    }
    if (e.font_color != "") {
        f.setFontColor(e.font_color)
    }
    a = e.font_weight == 1 ? true: false;
    f.setFontWeight(a);
    if (e.font_lineheight != "") {
        f.setFontLineHeight(d.delUtil(e.font_lineheight))
    }
    if (e.bgcolor != "") {
        f.setBgColor(e.bgcolor)
    }
    if (e.font_align != "") {
        f.setFontAlign(e.font_align)
    }
    if (e.effect != "") {
        f.setEffect(e.effect)
    }
    if (e.duration != "") {
        f.setDuration(e.duration)
    }
    var a = e.point == 1 ? true: false;
    f.setPoint(a)
}
function setCurrentTextareaComponent(a) {
    loadTextareaValue(a);
    textarea_editor(a)
}
function textarea_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_textarea_height").unbind();
    $("#div_textarea_height").keyup(function() {
        a.setDivHeight($("#div_textarea_height").val())
    });
    $("#div_textarea_width").unbind();
    $("#div_textarea_width").keyup(function() {
        a.setDivWidth($("#div_textarea_width").val())
    });
    $("#div_textarea_left").unbind();
    $("#div_textarea_left").keyup(function() {
        a.setDivLeft($("#div_Textarea_left").val())
    });
    $("#div_textarea_top").unbind();
    $("#div_textarea_top").keyup(function() {
        a.setDivTop($("#div_textarea_top").val())
    });
    $("#txt_textarea_content").unbind();
    $("#txt_textarea_content").keyup(function() {
        a.setContent($("#txt_textarea_content").val())
    });
    $("#txt_textarea_bgcolor").unbind();
    $("#txt_textarea_bgcolor").change(function() {
        a.setBgColor($("#txt_textarea_bgcolor").val())
    });
    $("#txt_textarea_font_size").unbind();
    $("#txt_textarea_font_size").keyup(function() {
        a.setFontSize($("#txt_textarea_font_size").val())
    });
    $("#select_textarea_font_family").unbind();
    $("#select_textarea_font_family").change(function() {
        a.setFontFamily($("#select_textarea_font_family").val())
    });
    $("#txt_textarea_font_color").unbind();
    $("#txt_textarea_font_color").change(function() {
        a.setFontColor($("#txt_textarea_font_color").val())
    });
    $("#checkbox_textarea_font_weight").off("ifChanged");
    $("#checkbox_textarea_font_weight").on("ifChanged",
    function() {
        a.setFontWeight($("#checkbox_textarea_font_weight").prop("checked"))
    });
    $("#select_textarea_font_align").unbind();
    $("#select_textarea_font_align").change(function() {
        a.setFontAlign($("#select_textarea_font_align").val())
    });
    $("#txt_textarea_url").unbind();
    $("#txt_textarea_url").keyup(function() {
        a.setUrl($("#txt_textarea_url").val())
    });
    $("#checkbox_textarea_target").off("ifChanged");
    $("#checkbox_textarea_target").on("ifChanged",
    function() {
        a.setTarget($("#checkbox_textarea_target").prop("checked"))
    });
    $("#txt_textarea_font_lineheight").unbind();
    $("#txt_textarea_font_lineheight").keyup(function() {
        a.setFontLineHeight($("#txt_textarea_font_lineheight").val())
    });
    $("#select_textarea_effect").unbind();
    $("#select_textarea_effect").change(function() {
        a.setEffect($("#select_textarea_effect").val())
    });
    $("#select_textarea_duration").unbind();
    $("#select_textarea_duration").change(function() {
        a.setDuration($("#select_textarea_duration").val())
    });
    $("#checkbox_textarea_point").off("ifChanged");
    $("#checkbox_textarea_point").on("ifChanged",
    function() {
        a.setPoint($("#checkbox_textarea_point").prop("checked"))
    })
}
function loadTextareaValue(g) {
    var f = g;
    if (f == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_textarea").css("display", "block");
    var e = g.getComID();
    var a = e.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#div_textarea_height").val(f.getDivHeight());
    $("#div_textarea_width").val(f.getDivWidth());
    $("#div_textarea_left").val(f.getDivLeft());
    $("#div_textarea_top").val(f.getDivTop());
    $("#txt_textarea_content").val(f.getContent());
    $("#txt_textarea_bgcolor").val(f.getBgColor());
    $("#txt_textarea_font_size").val(f.getFontSize());
    $("#select_textarea_font_family").val(f.getFontFamily());
    $("#txt_textarea_font_color").val(f.getFontColor());
    $("#select_textarea_font_align").val(f.getFontAlign());
    var d = "";
    if (f.getFontWeight()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_textarea_font_weight").off("ifChanged");
    $("#checkbox_textarea_font_weight").iCheck(d);
    $("#txt_textarea_url").val(f.getUrl());
    if (f.getTarget()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_textarea_target").off("ifChanged");
    $("#checkbox_textarea_target").iCheck(d);
    $("#txt_textarea_font_lineheight").val(f.getFontLineHeight());
    $("#select_textarea_effect").val(f.getEffect());
    $("#select_textarea_duration").val(f.getDuration());
    if (f.getPoint()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_textarea_point").off("ifChanged");
    $("#checkbox_textarea_point").iCheck(d)
}
var ImageComponent = function(g, e) {
    var f = g;
    var h = e;
    var c = "image";
    var n = "图片";
    var l = "220px";
    var r = "220px";
    var u = getawleft();
    var i = getawtop();
    var t = "http://img03.taobaocdn.com/imgextra/i3/310902331/TB2oFO0cFXXXXXDXpXXXXXXXXXX-310902331.jpg";
    var d = "#";
    var v = " ";
    var s = true;
    var k = "aw_efa0";
    var a = "aw_eftime1";
    var o = false;
    var q = "";
    var j = null;
    var m = new StringUtil();
    p();
    function p() {
        if (h == null || h == "" || h == 0) {
            h = 2
        }
        q += "<div id='" + f + "' name='" + c + "' class='" + getInitClass_abs() + " aw_editorimage aw_pocoimage' style='z-index:" + h + ";top:" + i + ";left:" + u + ";width:" + l + ";height:" + r + ";'>";
        q += "<div class='close_drag' style='width:" + l + ";height:" + r + "'></div>";
        q += "<a href='" + d + "' target='_blank' title='" + v + "'><img class='image_img " + a + " " + k + "' src='" + t + "' style='width:" + l + ";height:" + r + "'/></a>";
        q += "<input class='x_close' type='button' name='btn_del'/>";
        q += "</div>";
        j = $(q)
    }
    this.setComID = function(w) {
        f = w
    };
    this.getComID = function() {
        return f
    };
    this.setComName = function(w) {
        c = w
    };
    this.getComName = function() {
        return c
    };
    this.setDivZIndex = function(w) {
        h = w;
        j.css("z-index", h)
    };
    this.getDivZIndex = function() {
        return h
    };
    this.getComCnName = function() {
        return n
    };
    this.setDivWidth = function(w) {
        l = m.addUtil("width", w);
        j.find(".close_drag").css("width", l);
        j.find(".image_img").css("width", l);
        j.css("width", l)
    };
    this.getDivWidth = function() {
        return m.delUtil(l)
    };
    this.setDivHeight = function(w) {
        r = m.addUtil("height", w);
        j.find(".close_drag").css("height", r);
        j.find(".image_img").css("height", r);
        j.css("height", r)
    };
    this.getDivHeight = function() {
        return m.delUtil(r)
    };
    this.setDivLeft = function(w) {
        u = m.addUtil("left", w);
        j.css("left", u)
    };
    this.getDivLeft = function() {
        return m.delUtil(u)
    };
    this.setDivTop = function(w) {
        i = m.addUtil("top", w);
        j.css("top", i)
    };
    this.getDivTop = function() {
        return m.delUtil(i)
    };
    this.setImageUrl = function(w) {
        t = w;
        j.find(".image_img").attr("src", t)
    };
    this.getImageUrl = function() {
        return t
    };
    this.setUrl = function(w) {
        d = w;
        j.find("a").attr("href", d)
    };
    this.getUrl = function() {
        return d
    };
    this.setTitle = function(w) {
        v = w;
        j.find("a").attr("title", v)
    };
    this.getTitle = function() {
        return v
    };
    this.setTarget = function(w) {
        s = w;
        if (s) {
            j.find("a").attr("target", "_blank")
        } else {
            j.find("a").attr("target", "_self")
        }
    };
    this.getTarget = function() {
        return s
    };
    this.setImageEffect = function(w) {
        j.find(".image_img").removeClass(k);
        k = w;
        j.find(".image_img").addClass(k)
    };
    this.getImageEffect = function() {
        return k
    };
    this.setPoint = function(w) {
        o = w;
        if (o) {
            j.removeClass("aw_pocoimage");
            j.addClass("aw_pocoimage_all")
        } else {
            j.removeClass("aw_pocoimage_all");
            j.addClass("aw_pocoimage")
        }
    };
    this.getPoint = function() {
        return o
    };
    this.setDuration = function(w) {
        j.find(".image_img").removeClass(a);
        a = w;
        j.find(".image_img").addClass(a)
    };
    this.getDuration = function() {
        return a
    };
    this.getComponent = function() {
        return j
    };
    this.getCssCode = function() {
        var x = "_self";
        if (s) {
            x = "_blank"
        }
        var y = "aw_pocoimage";
        if (o) {
            y = "aw_pocoimage_all"
        }
        var w = '<bdo><div class="' + getInitClass_abs() + '" data-type="' + c + '" style="z-index:' + h + ";top:" + i + ";left:" + u + ";width:" + l + ";height:" + r + ';">';
        w += '<div class="' + y + '">';
        w += '<a href="' + d + '" target="' + x + '" title="' + v + '"><img class="' + a + " " + k + '" src="' + t + '" style="width:' + l + ";height:" + r + '"/></a>';
        w += "</div>";
        w += "</div></bdo>";
        return w
    };
    this.getJSON = function() {
        var w = {
            comID: f,
            comName: c,
            div_z_index: h,
            div_width: l,
            div_height: r,
            div_left: u,
            div_top: i,
            image_url: t,
            url: d,
            title: v,
            target: s,
            image_effect: k,
            duration: a,
            point: o
        };
        return w
    };
    this.gethtmlJSON = function(D) {
        var F = "image_" + i_image;
        i_image++;
        var A = F;
        var B = z_index++;
        var G = "";
        var I = "";
        var M = 0;
        var C = 0;
        var L = "";
        var y = "";
        var N = "";
        var K = false;
        var E = "";
        var w = "";
        var H = false;
        var z = /data-type="image" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var x = z.exec(D);
        if (x) {
            C = x[2];
            M = x[3];
            G = x[4];
            I = x[5]
        }
        z = /><div class="(.*)"><a href/ig;
        x = z.exec(D);
        if (x) {
            if (x[1] == "aw_pocoimage_all") {
                H = true
            }
        }
        z = /<a href="(.*)" target="(.*)" title="(.*)"><img/ig;
        x = z.exec(D);
        if (x) {
            y = x[1];
            if (x[2] == "_blank") {
                K = true
            }
            N = x[3]
        }
        z = /<img class="(.*) (.*)" src=/ig;
        x = z.exec(D);
        if (x) {
            w = x[1];
            E = x[2]
        }
        z = /src="(.*)" style="width/ig;
        x = z.exec(D);
        if (x) {
            L = x[1]
        }
        var J = {
            comID: A,
            comName: c,
            div_z_index: B,
            div_width: G,
            div_height: I,
            div_left: M,
            div_top: C,
            image_url: L,
            url: y,
            title: N,
            target: K,
            image_effect: E,
            duration: w,
            point: H
        };
        return J
    };
    this.addClickEvent = function() {
        j.bind("click", $.proxy(this.eventhandler, this));
        j.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(w) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        j.addClass("ui-draggable-selected");
        setCurrentImageComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(w) {
        removeCurrenComponent(this, w)
    }
};
function initToolImage() {
    addPoEffect($("#select_image_effect"));
    addDuration($("#select_image_duration"));
    $("#comimage").click(function() {
        initImage(null)
    })
}
var i_image = 0;
function initImage(a) {
    var f = "image_" + i_image;
    i_image++;
    var e = new ImageComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentImageComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_image_left").val(c);
            $("#div_image_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_image_left").val(c);
            $("#div_image_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentImageComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_image_width").val(c);
            $("#div_image_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_image_width").val(c);
            $("#div_image_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadImageFromDB(e, a);
    setCurrentImageComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadImageFromDB(f, e) {
    if (f == null || e == null) {
        return
    }
    var d = new StringUtil();
    if (e.comID != "") {
        f.setComID(e.comID)
    }
    if (e.comName != "") {
        f.setComName(e.comName)
    }
    if (e.div_z_index != "") {
        f.setDivZIndex(e.div_z_index)
    }
    if (e.div_height != "") {
        f.setDivHeight(d.delUtil(e.div_height))
    }
    if (e.div_width != "") {
        f.setDivWidth(d.delUtil(e.div_width))
    }
    if (e.div_left != "") {
        f.setDivLeft(d.delUtil(e.div_left))
    }
    if (e.div_top != "") {
        f.setDivTop(d.delUtil(e.div_top))
    }
    if (e.image_url != "") {
        f.setImageUrl(d.delUtil(e.image_url))
    }
    if (e.url != "") {
        f.setUrl(e.url)
    }
    if (e.title != "") {
        f.setTitle(e.title)
    }
    var a = e.target == 1 ? true: false;
    f.setTarget(a);
    if (e.image_effect != "") {
        f.setImageEffect(e.image_effect)
    }
    if (e.duration != "") {
        f.setDuration(e.duration)
    }
    var a = e.point == 1 ? true: false;
    f.setPoint(a)
}
function setCurrentImageComponent(a) {
    loadImageValue(a);
    image_editor(a)
}
function image_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_image_height").unbind();
    $("#div_image_height").keyup(function() {
        a.setDivHeight($("#div_image_height").val())
    });
    $("#div_image_width").unbind();
    $("#div_image_width").keyup(function() {
        a.setDivWidth($("#div_image_width").val())
    });
    $("#div_image_left").unbind();
    $("#div_image_left").keyup(function() {
        a.setDivLeft($("#div_image_left").val())
    });
    $("#div_image_top").unbind();
    $("#div_image_top").keyup(function() {
        a.setDivTop($("#div_image_top").val())
    });
    $("#txt_image_image_url").unbind();
    $("#txt_image_image_url").keyup(function() {
        a.setImageUrl($("#txt_image_image_url").val())
    });
    $("#txt_image_url").unbind();
    $("#txt_image_url").keyup(function() {
        a.setUrl($("#txt_image_url").val())
    });
    $("#txt_image_title").unbind();
    $("#txt_image_title").keyup(function() {
        a.setTitle($("#txt_image_title").val())
    });
    $("#checkbox_image_target").off("ifChanged");
    $("#checkbox_image_target").on("ifChanged",
    function() {
        a.setTarget($("#checkbox_image_target").prop("checked"))
    });
    $("#btn_image_fullsize").unbind();
    $("#btn_image_fullsize").click(function() {
        var c = new Image();
        c.src = a.getComponent().find(".image_img").attr("src");
        c.onload = function() {
            if (c.complete) {
                var e = c.width;
                var f = c.height;
                $("#div_image_width").val(e);
                $("#div_image_height").val(f);
                a.setDivWidth(e.toString());
                a.setDivHeight(f.toString())
            } else {
                alert("图片还没加载完，请稍后重试!")
            }
        }
    });
    $("#select_image_effect").unbind();
    $("#select_image_effect").change(function() {
        a.setImageEffect($("#select_image_effect").val())
    });
    $("#select_image_duration").unbind();
    $("#select_image_duration").change(function() {
        a.setDuration($("#select_image_duration").val())
    });
    $("#checkbox_image_point").off("ifChanged");
    $("#checkbox_image_point").on("ifChanged",
    function() {
        a.setPoint($("#checkbox_image_point").prop("checked"))
    })
}
function loadImageValue(g) {
    var f = g;
    if (f == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_image").css("display", "block");
    var e = g.getComID();
    var a = e.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#div_image_height").val(f.getDivHeight());
    $("#div_image_width").val(f.getDivWidth());
    $("#div_image_left").val(f.getDivLeft());
    $("#div_image_top").val(f.getDivTop());
    $("#txt_image_image_url").val(f.getImageUrl());
    $("#txt_image_url").val(f.getUrl());
    $("#txt_image_title").val(f.getTitle());
    var d = "";
    if (f.getTarget()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_image_target").off("ifChanged");
    $("#checkbox_image_target").iCheck(d);
    $("#select_image_effect").val(f.getImageEffect());
    $("#select_image_duration").val(f.getDuration());
    if (f.getPoint()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_image_point").off("ifChanged");
    $("#checkbox_image_point").iCheck(d)
}
var PocoImageComponent = function(h, f) {
    var g = h;
    var i = f;
    var d = "pocoimage";
    var o = "换装秀";
    var m = "220px";
    var t = "350px";
    var w = getawleft();
    var j = getawtop();
    var u = "http://img01.taobaocdn.com/imgextra/i1/310902331/TB2lXn.cFXXXXXqXXXXXXXXXXXX-310902331.jpg";
    var c = "http://img02.taobaocdn.com/imgextra/i2/310902331/TB2KEb9cFXXXXXEXXXXXXXXXXXX-310902331.jpg";
    var e = "#";
    var v = true;
    var p = false;
    var q = "aw_efa0";
    var k = "aw_effa3";
    var a = "aw_eftime1";
    var s = "";
    var l = null;
    var n = new StringUtil();
    r();
    function r() {
        if (i == null || i == "" || i == 0) {
            i = 2
        }
        s += "<div id='" + g + "' name='" + d + "' class='" + getInitClass_abs() + " aw_pocoimage' style='z-index:" + i + ";top:" + j + ";left:" + w + ";width:" + m + ";height:" + t + ";'>";
        s += "<div class='close_drag' style='width:" + m + ";height:" + t + ";'></div>";
        s += "<a class='image_po_img aw_img " + a + " " + q + "' target='_blank' style='width:" + m + ";height:" + t + ";background-image:url(" + u + ");overflow:hidden;'>";
        s += "<img class='image_co_img aw_hoverimg " + a + " " + k + "' src='" + c + "' style='width:" + m + ";height:" + t + ";'>";
        s += "</a>";
        s += "<input class='x_close' type='button' name='btn_del'/>";
        s += "</div>";
        l = $(s)
    }
    this.setComID = function(y) {
        g = y
    };
    this.getComID = function() {
        return g
    };
    this.setComName = function(y) {
        d = y
    };
    this.getComName = function() {
        return d
    };
    this.setDivZIndex = function(y) {
        i = y;
        l.css("z-index", i)
    };
    this.getDivZIndex = function() {
        return i
    };
    this.getComCnName = function() {
        return o
    };
    this.setDivWidth = function(y) {
        m = n.addUtil("width", y);
        l.find(".close_drag").css("width", m);
        l.find(".image_po_img").css("width", m);
        l.find(".image_co_img").css("width", m);
        l.css("width", m)
    };
    this.getDivWidth = function() {
        return n.delUtil(m)
    };
    this.setDivHeight = function(y) {
        t = n.addUtil("height", y);
        l.find(".close_drag").css("height", t);
        l.find(".image_po_img").css("height", t);
        l.find(".image_co_img").css("height", t);
        l.css("height", t)
    };
    this.getDivHeight = function() {
        return n.delUtil(t)
    };
    this.setDivLeft = function(y) {
        w = n.addUtil("left", y);
        l.css("left", w)
    };
    this.getDivLeft = function() {
        return n.delUtil(w)
    };
    this.setDivTop = function(y) {
        j = n.addUtil("top", y);
        l.css("top", j)
    };
    this.getDivTop = function() {
        return n.delUtil(j)
    };
    this.setPoImageUrl = function(y) {
        u = y;
        l.find(".image_po_img").css("background-image", "url(" + u + ")")
    };
    this.getPoImageUrl = function() {
        return u
    };
    this.setCoImageUrl = function(y) {
        c = y;
        l.find(".image_co_img").attr("src", c)
    };
    this.getCoImageUrl = function() {
        return c
    };
    this.setUrl = function(y) {
        e = y;
        l.find(".image_po_img").attr("href", e)
    };
    this.getUrl = function() {
        return e
    };
    this.setTarget = function(y) {
        v = y;
        if (v) {
            l.find(".image_po_img").attr("target", "_blank")
        } else {
            l.find(".image_po_img").attr("target", "_self")
        }
    };
    this.getTarget = function() {
        return v
    };
    this.setCoHidden = function(y) {
        p = y;
        if (p) {
            l.find(".image_co_img").css("display", "none")
        } else {
            l.find(".image_co_img").css("display", "block")
        }
    };
    this.getCoHidden = function() {
        return p
    };
    this.setPoEffect = function(y) {
        l.find(".image_po_img").removeClass(q);
        q = y;
        l.find(".image_po_img").addClass(q)
    };
    this.getPoEffect = function() {
        return q
    };
    this.setCoEffect = function(y) {
        l.find(".image_co_img").removeClass(k);
        k = y;
        l.find(".image_co_img").addClass(k)
    };
    this.getCoEffect = function() {
        return k
    };
    this.setDuration = function(y) {
        l.find(".image_po_img").removeClass(a);
        l.find(".image_co_img").removeClass(a);
        a = y;
        l.find(".image_po_img").addClass(a);
        l.find(".image_co_img").addClass(a)
    };
    this.getDuration = function() {
        return a
    };
    this.getComponent = function() {
        return l
    };
    this.getCssCode = function() {
        var y = "_self";
        if (v) {
            y = "_blank"
        }
        var z = "";
        if (p) {
            z = "display:none;"
        }
        var x = '<bdo><div class="' + getInitClass_abs() + '" data-type="' + d + '" style="z-index:' + i + ";top:" + j + ";left:" + w + ";width:" + m + ";height:" + t + ';">';
        x += '<div class="aw_pocoimage">';
        x += '<a class="aw_img ' + a + " " + q + '" href="' + e + '" target="' + y + '" style="width:' + m + ";height:" + t + ";overflow:hidden;background-image:url(" + u + ')">';
        x += '<img class="aw_hoverimg ' + a + " " + k + '" src="' + c + '" style="width:' + m + ";height:" + t + ";" + z + '">';
        x += "</a>";
        x += "</div>";
        x += "</div></bdo>";
        return x
    };
    this.getJSON = function() {
        var x = {
            comID: g,
            comName: d,
            div_z_index: i,
            div_width: m,
            div_height: t,
            div_left: w,
            div_top: j,
            po_image_url: u,
            co_image_url: c,
            url: e,
            target: v,
            co_hidden: p,
            po_effect: q,
            co_effect: k,
            duration: a
        };
        return x
    };
    this.gethtmlJSON = function(F) {
        var H = "pocoimage_" + i_image2;
        i_image2++;
        var C = H;
        var D = z_index++;
        var I = "";
        var L = "";
        var P = 0;
        var E = 0;
        var N = "";
        var z = "";
        var A = "";
        var O = false;
        var J = false;
        var K = "";
        var G = "";
        var x = "";
        var B = /data-type="pocoimage" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var y = B.exec(F);
        if (y) {
            E = y[2];
            P = y[3];
            I = y[4];
            L = y[5]
        }
        B = /aw_img (.*) (.*)" href/ig;
        y = B.exec(F);
        if (y) {
            x = y[1];
            K = y[2]
        }
        B = /aw_hoverimg (.*) (.*)" src/ig;
        y = B.exec(F);
        if (y) {
            G = y[2]
        }
        B = /href="(.*)" target="(.*)" style="width:(\d+)px;height:(\d+)px;overflow:hidden;background-image:url\((.*)\)"/ig;
        y = B.exec(F);
        if (y) {
            A = y[1];
            if (y[2] == "_blank") {
                O = true
            }
            N = y[5]
        }
        B = /src="(.*)" style="width/ig;
        y = B.exec(F);
        if (y) {
            z = y[1]
        }
        B = /src="(.*)" style="width:(\d+)px;height:(\d+)px;(.*)"/ig;
        y = B.exec(F);
        if (y) {
            if (y[4] == "display:none;") {
                J = true
            }
        }
        var M = {
            comID: C,
            comName: d,
            div_z_index: D,
            div_width: I,
            div_height: L,
            div_left: P,
            div_top: E,
            po_image_url: N,
            co_image_url: z,
            url: A,
            target: O,
            co_hidden: J,
            po_effect: K,
            co_effect: G,
            duration: x
        };
        return M
    };
    this.addClickEvent = function() {
        l.bind("click", $.proxy(this.eventhandler, this));
        l.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(x) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        l.addClass("ui-draggable-selected");
        setCurrentPocoImageComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(x) {
        removeCurrenComponent(this, x)
    };
    this.addMouseEvent = function() {
        l.bind("mouseenter", $.proxy(this.mouseenter_eventhandler, this));
        l.bind("mouseleave", $.proxy(this.mouseleave_eventhandler, this))
    }
};
function initToolPocoImage() {
    addPoEffect($("#select_pocoimage_po_effect"));
    addCoEffect($("#select_pocoimage_co_effect"));
    addDuration($("#select_pocoimage_duration"));
    $("#compocoimage").click(function() {
        initPocoImage(null)
    })
}
var i_image2 = 0;
function initPocoImage(a) {
    var f = "pocoimage_" + i_image2;
    i_image2++;
    var e = new PocoImageComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentPocoImageComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_pocoimage_left").val(c);
            $("#div_pocoimage_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_pocoimage_left").val(c);
            $("#div_pocoimage_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentPocoImageComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_pocoimage_width").val(c);
            $("#div_pocoimage_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_pocoimage_width").val(c);
            $("#div_pocoimage_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    e.addMouseEvent();
    loadPocoImageFromDB(e, a);
    setCurrentPocoImageComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadPocoImageFromDB(g, e) {
    if (g == null || e == null) {
        return
    }
    var d = new StringUtil();
    if (e.comID != "") {
        g.setComID(e.comID)
    }
    if (e.comName != "") {
        g.setComName(e.comName)
    }
    if (e.div_z_index != "") {
        g.setDivZIndex(e.div_z_index)
    }
    if (e.div_height != "") {
        g.setDivHeight(d.delUtil(e.div_height))
    }
    if (e.div_width != "") {
        g.setDivWidth(d.delUtil(e.div_width))
    }
    if (e.div_left != "") {
        g.setDivLeft(d.delUtil(e.div_left))
    }
    if (e.div_top != "") {
        g.setDivTop(d.delUtil(e.div_top))
    }
    if (e.po_image_url != "") {
        g.setPoImageUrl(d.delUtil(e.po_image_url))
    }
    if (e.co_image_url != "") {
        g.setCoImageUrl(d.delUtil(e.co_image_url))
    }
    if (e.url != "") {
        g.setUrl(e.url)
    }
    var a = e.target == 1 ? true: false;
    g.setTarget(a);
    var f = e.co_hidden == 1 ? true: false;
    g.setCoHidden(f);
    if (e.po_effect != "") {
        g.setPoEffect(e.po_effect)
    }
    if (e.co_effect != "") {
        g.setCoEffect(e.co_effect)
    }
    if (e.duration != "") {
        g.setDuration(e.duration)
    }
}
function setCurrentPocoImageComponent(a) {
    loadPocoImageValue(a);
    pocoimage_editor(a)
}
function pocoimage_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_pocoimage_height").unbind();
    $("#div_pocoimage_height").keyup(function() {
        a.setDivHeight($("#div_pocoimage_height").val())
    });
    $("#div_pocoimage_width").unbind();
    $("#div_pocoimage_width").keyup(function() {
        a.setDivWidth($("#div_pocoimage_width").val())
    });
    $("#div_pocoimage_left").unbind();
    $("#div_pocoimage_left").keyup(function() {
        a.setDivLeft($("#div_pocoimage_left").val())
    });
    $("#div_pocoimage_top").unbind();
    $("#div_pocoimage_top").keyup(function() {
        a.setDivTop($("#div_pocoimage_top").val())
    });
    $("#txt_pocoimage_po_image_url").unbind();
    $("#txt_pocoimage_po_image_url").keyup(function() {
        a.setPoImageUrl($("#txt_pocoimage_po_image_url").val())
    });
    $("#txt_pocoimage_co_image_url").unbind();
    $("#txt_pocoimage_co_image_url").keyup(function() {
        a.setCoImageUrl($("#txt_pocoimage_co_image_url").val())
    });
    $("#txt_pocoimage_url").unbind();
    $("#txt_pocoimage_url").keyup(function() {
        a.setUrl($("#txt_pocoimage_url").val())
    });
    $("#checkbox_pocoimage_target").off("ifChanged");
    $("#checkbox_pocoimage_target").on("ifChanged",
    function() {
        a.setTarget($("#checkbox_pocoimage_target").prop("checked"))
    });
    $("#btn_poco_image_fullsize").unbind();
    $("#btn_poco_image_fullsize").click(function() {
        var c = new Image();
        c.src = a.getPoImageUrl();
        c.onload = function() {
            if (c.complete) {
                var e = c.width;
                var f = c.height;
                $("#div_pocoimage_width").val(e);
                $("#div_pocoimage_height").val(f);
                a.setDivWidth(e.toString());
                a.setDivHeight(f.toString())
            } else {
                alert("图片还没加载完，请稍后重试!")
            }
        }
    });
    $("#checkbox_pocoimage_co_image_hidden").off("ifChanged");
    $("#checkbox_pocoimage_co_image_hidden").on("ifChanged",
    function() {
        a.setCoHidden($("#checkbox_pocoimage_co_image_hidden").prop("checked"))
    });
    $("#select_pocoimage_po_effect").unbind();
    $("#select_pocoimage_po_effect").change(function() {
        a.setPoEffect($("#select_pocoimage_po_effect").val())
    });
    $("#select_pocoimage_co_effect").unbind();
    $("#select_pocoimage_co_effect").change(function() {
        a.setCoEffect($("#select_pocoimage_co_effect").val())
    });
    $("#select_pocoimage_duration").unbind();
    $("#select_pocoimage_duration").change(function() {
        a.setDuration($("#select_pocoimage_duration").val())
    })
}
function loadPocoImageValue(g) {
    var f = g;
    if (f == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_pocoimage").css("display", "block");
    var e = g.getComID();
    var a = e.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#div_pocoimage_height").val(f.getDivHeight());
    $("#div_pocoimage_width").val(f.getDivWidth());
    $("#div_pocoimage_left").val(f.getDivLeft());
    $("#div_pocoimage_top").val(f.getDivTop());
    $("#txt_pocoimage_po_image_url").val(f.getPoImageUrl());
    $("#txt_pocoimage_co_image_url").val(f.getCoImageUrl());
    $("#txt_pocoimage_url").val(f.getUrl());
    var d = "";
    if (f.getTarget()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_pocoimage_target").off("ifChanged");
    $("#checkbox_pocoimage_target").iCheck(d);
    if (f.getCoHidden()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_pocoimage_co_image_hidden").off("ifChanged");
    $("#checkbox_pocoimage_co_image_hidden").iCheck(d);
    $("#select_pocoimage_po_effect").val(f.getPoEffect());
    $("#select_pocoimage_co_effect").val(f.getCoEffect());
    $("#select_pocoimage_duration").val(f.getDuration())
}
var QRCodeComponent = function(f, d) {
    var e = f;
    var g = d;
    var a = "qrcode";
    var o = "二维码";
    var m = "90px";
    var s = m;
    var t = getawleft();
    var h = getawtop();
    var l = "cs";
    var k = "1";
    var p = "1";
    var c = "1";
    var r = "";
    var j = null;
    var n = new StringUtil();
    q();
    function q() {
        if (g == null || g == "" || g == 0) {
            g = 2
        }
        var u = i(l, k, p, c, n.delUtil(m));
        r += "<div id='" + e + "' name='" + a + "' class='" + getInitClass_abs() + " aw_qrcode' style='z-index:" + g + ";top:" + h + ";left:" + t + ";width:" + m + ";height:" + s + ";'>";
        r += "<div class='close_drag' style='width:" + m + ";height:" + s + "'></div>";
        r += "<img class='qrcode_img awqrcode' src='" + u + "' style='width:" + m + ";height:" + s + "'/>";
        r += "<input class='x_close' type='button' name='btn_del'/>";
        r += "</div>";
        j = $(r)
    }
    this.setComID = function(u) {
        e = u
    };
    this.getComID = function() {
        return e
    };
    this.setComName = function(u) {
        a = u
    };
    this.getComName = function() {
        return a
    };
    this.setDivZIndex = function(u) {
        g = u;
        j.css("z-index", g)
    };
    this.getDivZIndex = function() {
        return g
    };
    this.getComCnName = function() {
        return o
    };
    this.setDivWidth = function(u) {
        m = n.addUtil("width", u);
        var v = i(l, k, p, c, n.delUtil(m));
        j.find(".qrcode_img").attr("src", v);
        j.find(".close_drag").css("width", m);
        j.find(".qrcode_img").css("width", m);
        j.css("width", m)
    };
    this.getDivWidth = function() {
        return n.delUtil(m)
    };
    this.setDivHeight = function(u) {
        s = n.addUtil("height", u);
        j.find(".close_drag").css("height", s);
        j.find(".qrcode_img").css("height", s);
        j.css("height", s)
    };
    this.getDivHeight = function() {
        return n.delUtil(s)
    };
    this.setDivLeft = function(u) {
        t = n.addUtil("left", u);
        j.css("left", t)
    };
    this.getDivLeft = function() {
        return n.delUtil(t)
    };
    this.setDivTop = function(u) {
        h = n.addUtil("top", u);
        j.css("top", h)
    };
    this.getDivTop = function() {
        return n.delUtil(h)
    };
    this.setText_Qrcode_Type = function(u) {
        l = u;
        var v = i(l, k, p, c, n.delUtil(m));
        j.find(".qrcode_img").attr("src", v)
    };
    this.getText_Qrcode_Type = function() {
        return l
    };
    this.setText_Qrcode_ID = function(u) {
        p = u;
        var v = i(l, k, p, c, n.delUtil(m));
        j.find(".qrcode_img").attr("src", v)
    };
    this.getText_Qrcode_ID = function() {
        return p
    };
    this.setText_Wetao_ID = function(u) {
        c = u;
        var v = i(l, k, p, c, n.delUtil(m));
        j.find(".qrcode_img").attr("src", v)
    };
    this.getText_Wetao_ID = function() {
        return c
    };
    this.setText_Shopqrcode_ID = function(u) {
        k = u;
        var v = i(l, k, p, c, n.delUtil(m));
        j.find(".qrcode_img").attr("src", v)
    };
    this.getText_Shopqrcode_ID = function() {
        return k
    };
    this.getComponent = function() {
        return j
    };
    this.getCssCode = function() {
        var v = i(l, k, p, c, n.delUtil(m));
        var u = "";
        u += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + a + '" style="z-index:' + g + ";top:" + h + ";left:" + t + ";width:" + m + ";height:" + s + ';">';
        u += '<img src="' + v + '" style="width:' + m + ";height:" + s + '"/>';
        u += "</div></bdo>";
        return u
    };
    this.gethtmlJSON = function(A) {
        var v = "qrcode_" + i_qrcode;
        i_qrcode++;
        var E = v;
        var G = z_index++;
        var D = "";
        var C = "";
        var y = 0;
        var u = 0;
        var F = "";
        var I = "1";
        var x = "1";
        var B = "1";
        var w = /data-type="qrcode" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var z = w.exec(A);
        if (z) {
            u = z[2];
            y = z[3];
            D = z[4];
            C = z[5]
        }
        w = /type=(cs|ci|bs|bi|we)&(shop|item|we)_id=(\d+)/ig;
        z = w.exec(A);
        if (z) {
            F = z[1];
            if (F == "cs" || F == "bs") {
                I = z[3]
            } else {
                if (F == "ci" || F == "bi") {
                    x = z[3]
                } else {
                    B = z[3]
                }
            }
        }
        var H = {
            comID: E,
            comName: a,
            div_z_index: G,
            div_width: D,
            div_height: C,
            div_left: y,
            div_top: u,
            text_qrcode_type: F,
            text_shopqrcode_id: I,
            text_qrcode_id: x,
            text_wetao_id: B
        };
        return H
    };
    this.getJSON = function() {
        var u = {
            comID: e,
            comName: a,
            div_z_index: g,
            div_width: m,
            div_height: s,
            div_left: t,
            div_top: h,
            text_qrcode_type: l,
            text_shopqrcode_id: k,
            text_qrcode_id: p,
            text_wetao_id: c
        };
        return u
    };
    this.addClickEvent = function() {
        j.bind("click", $.proxy(this.eventhandler, this));
        j.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(u) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        j.addClass("ui-draggable-selected");
        setCurrentQRCodeComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(u) {
        removeCurrenComponent(this, u)
    };
    function i(y, x, v, u, w) {
        var z = "";
        if (y == "cs") {
            z = "http://gqrcode.alicdn.com/img?type=cs&shop_id=" + x + "&w=" + w + "&h=" + w + "&v=1"
        } else {
            if (y == "ci") {
                z = "http://gqrcode.alicdn.com/img?type=ci&item_id=" + v + "&w=" + w + "&h=" + w + "&v=1"
            } else {
                if (y == "bs") {
                    z = "http://gqrcode.alicdn.com/img?type=bs&shop_id=" + x + "&w=" + w + "&h=" + w + "&v=1"
                } else {
                    if (y == "bi") {
                        z = "http://gqrcode.alicdn.com/img?type=bi&item_id=" + v + "&w=" + w + "&h=" + w + "&v=1"
                    } else {
                        if (y == "we") {
                            z = "http://gqrcode.alicdn.com/img?type=we&we_id=" + u + "&w=" + w + "&h=" + w + "&v=1"
                        }
                    }
                }
            }
        }
        return z
    }
};
function initToolQRCode() {
    $("#comqrcode").click(function() {
        initQRCode(null)
    })
}
var i_qrcode = 0;
function initQRCode(a) {
    var f = "qrcode_" + i_qrcode;
    i_qrcode++;
    var e = new QRCodeComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentQRCodeComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_qrcode_left").val(c);
            $("#div_qrcode_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_qrcode_left").val(c);
            $("#div_qrcode_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    e.addClickEvent();
    loadQRCodeFromDB(e, a);
    setCurrentQRCodeComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadQRCodeFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_qrcode_type != "") {
        e.setText_Qrcode_Type(d.text_qrcode_type)
    }
    if (d.text_qrcode_id != "") {
        e.setText_Qrcode_ID(d.text_qrcode_id)
    }
    if (d.text_shopqrcode_id != "") {
        e.setText_Shopqrcode_ID(d.text_shopqrcode_id)
    }
    if (d.text_wetao_id != "") {
        e.setText_Wetao_ID(d.text_wetao_id)
    }
}
function setCurrentQRCodeComponent(a) {
    loadQRCodeValue(a);
    qrcode_editor(a)
}
function qrcode_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_qrcode_width").unbind();
    $("#div_qrcode_width").keyup(function() {
        a.setDivWidth($("#div_qrcode_width").val());
        a.setDivHeight($("#div_qrcode_width").val())
    });
    $("#div_qrcode_left").unbind();
    $("#div_qrcode_left").keyup(function() {
        a.setDivLeft($("#div_qrcode_left").val())
    });
    $("#div_qrcode_top").unbind();
    $("#div_qrcode_top").keyup(function() {
        a.setDivTop($("#div_qrcode_top").val())
    });
    $("#qrcode_type").unbind();
    $("#qrcode_type").change(function() {
        a.setText_Qrcode_Type($("#qrcode_type").val())
    });
    $("#text_qrcode_id").unbind();
    $("#text_qrcode_id").keyup(function() {
        a.setText_Qrcode_ID($("#text_qrcode_id").val())
    });
    $("#text_shopqrcode_id").unbind();
    $("#text_shopqrcode_id").keyup(function() {
        a.setText_Shopqrcode_ID($("#text_shopqrcode_id").val())
    });
    $("#text_wetao_id").unbind();
    $("#text_wetao_id").keyup(function() {
        a.setText_Wetao_ID($("#text_wetao_id").val())
    })
}
function loadQRCodeValue(f) {
    var e = f;
    if (e == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_qrcode").css("display", "block");
    var d = f.getComID();
    var a = d.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_qrcode_width").val(e.getDivWidth());
    $("#div_qrcode_left").val(e.getDivLeft());
    $("#div_qrcode_top").val(e.getDivTop());
    $("#qrcode_type").val(e.getText_Qrcode_Type());
    $("#text_qrcode_id").val(e.getText_Qrcode_ID());
    $("#text_shopqrcode_id").val(e.getText_Shopqrcode_ID());
    $("#text_wetao_id").val(e.getText_Wetao_ID())
}
var VideoComponent = function(i, g) {
    var l = i;
    var n = g;
    var j = "video";
    var f = "视频";
    var k = "350px";
    var h = "230px";
    var e = getawleft();
    var d = getawtop();
    var c = "http://cloud.video.taobao.com/play/u/1799939164/p/2/e/1/t/1/24509219.swf";
    var a = "";
    var p = null;
    var m = new StringUtil();
    o();
    function o() {
        if (n == null || n == "" || n == 0) {
            n = 2
        }
        a += "<div id='" + l + "' name='" + j + "' class='" + getInitClass_abs() + " aw_video' style='z-index:" + n + ";top:" + d + ";left:" + e + ";width:" + k + ";height:" + h + ";'>";
        a += "<div class='close_drag' style='width:" + k + ";height:" + h + "'></div>";
        a += "<embed name='video1' wmode='opaque' allowscriptaccess='never' flashvars='scene=taobao_shop' width='" + k + "' height='" + h + "' pluginspage='http://www.macromedia.com/go/getflashplayer' quality='high' src='" + c + "' type='application/x-shockwave-flash'></embed>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        p = $(a)
    }
    this.setComID = function(q) {
        l = q
    };
    this.getComID = function() {
        return l
    };
    this.setComName = function(q) {
        j = q
    };
    this.getComName = function() {
        return j
    };
    this.setDivZIndex = function(q) {
        n = q;
        p.css("z-index", n)
    };
    this.getDivZIndex = function() {
        return n
    };
    this.getComCnName = function() {
        return f
    };
    this.setDivWidth = function(q) {
        k = m.addUtil("width", q);
        p.find(".close_drag").css("width", k);
        p.find("embed[name='video1']").css("width", k);
        p.css("width", k)
    };
    this.getDivWidth = function() {
        return m.delUtil(k)
    };
    this.setDivHeight = function(q) {
        h = m.addUtil("height", q);
        p.find(".close_drag").css("height", h);
        p.find("embed[name='video1']").css("height", h);
        p.css("height", h)
    };
    this.getDivHeight = function() {
        return m.delUtil(h)
    };
    this.setDivLeft = function(q) {
        e = m.addUtil("left", q);
        p.css("left", e)
    };
    this.getDivLeft = function() {
        return m.delUtil(e)
    };
    this.setDivTop = function(q) {
        d = m.addUtil("top", q);
        p.css("top", d)
    };
    this.getDivTop = function() {
        return m.delUtil(d)
    };
    this.setUrl = function(q) {
        c = q;
        p.find("embed[name='video1']").remove().clone().attr("src", c).insertBefore(p.find("input[name='btn_del']"))
    };
    this.getUrl = function() {
        return c
    };
    this.getComponent = function() {
        return p
    };
    this.getCssCode = function() {
        var r = "_self";
        var q = '<bdo><div class="' + getInitClass_abs() + '" data-type="' + j + '" style="z-index:' + n + ";top:" + d + ";left:" + e + ";width:" + k + ";height:" + h + ';">';
        q += '<embed wmode="opaque" allowscriptaccess="never" flashvars="scene=taobao_shop" width="' + k + '" height="' + h + '" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="' + c + '" type="application/x-shockwave-flash"></embed>';
        q += "</div></bdo>";
        return q
    };
    this.gethtmlJSON = function(w) {
        var s = "video_" + i_video;
        i_video++;
        var z = s;
        var A = z_index++;
        var y = "";
        var x = "";
        var u = 0;
        var r = 0;
        var q = "";
        var t = /data-type="video" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var v = t.exec(w);
        if (v) {
            r = v[2];
            u = v[3];
            y = v[4];
            x = v[5]
        }
        t = /src="(.*)" type/ig;
        v = t.exec(w);
        if (v) {
            q = v[1]
        }
        var B = {
            comID: z,
            comName: j,
            div_z_index: A,
            div_width: y,
            div_height: x,
            div_left: u,
            div_top: r,
            url: q
        };
        return B
    };
    this.getJSON = function() {
        var q = {
            comID: l,
            comName: j,
            div_z_index: n,
            div_width: k,
            div_height: h,
            div_left: e,
            div_top: d,
            url: c
        };
        return q
    };
    this.addClickEvent = function() {
        p.bind("click", $.proxy(this.eventhandler, this));
        p.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(q) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        p.addClass("ui-draggable-selected");
        setCurrentVideoComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(q) {
        removeCurrenComponent(this, q)
    }
};
function initToolVideo() {
    $("#comvideo").click(function() {
        initVideo(null)
    })
}
var i_video = 0;
function initVideo(a) {
    var f = "video_" + i_video;
    i_video++;
    var e = new VideoComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentVideoComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_video_left").val(c);
            $("#div_videot_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_video_left").val(c);
            $("#div_video_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentVideoComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_video_width").val(c);
            $("#div_video_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_video_width").val(c);
            $("#div_video_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadVideoFromDB(e, a);
    setCurrentVideoComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadVideoFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.url != "") {
        e.setUrl(d.url)
    }
}
function setCurrentVideoComponent(a) {
    loadVideoValue(a);
    video_editor(a)
}
function video_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_video_height").unbind();
    $("#div_video_height").keyup(function() {
        a.setDivHeight($("#div_video_height").val())
    });
    $("#div_video_width").unbind();
    $("#div_video_width").keyup(function() {
        a.setDivWidth($("#div_video_width").val())
    });
    $("#div_video_left").unbind();
    $("#div_video_left").keyup(function() {
        a.setDivLeft($("#div_video_left").val())
    });
    $("#div_video_top").unbind();
    $("#div_video_top").keyup(function() {
        a.setDivTop($("#div_video_top").val())
    });
    $("#txt_video_url").unbind();
    $("#txt_video_url").keyup(function() {
        a.setUrl($("#txt_video_url").val())
    })
}
function loadVideoValue(f) {
    var e = f;
    if (e == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_video").css("display", "block");
    var d = f.getComID();
    var a = d.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_video_height").val(e.getDivHeight());
    $("#div_video_width").val(e.getDivWidth());
    $("#div_video_left").val(e.getDivLeft());
    $("#div_video_top").val(e.getDivTop());
    $("#txt_video_url").val(e.getUrl())
}
var SliderImageComponent = function(n, k) {
    var l = n;
    var o = k;
    var i = "sliderimage";
    var v = "轮播";
    var t = "490px";
    var C = "300px";
    var G = getawleft();
    var p = getawtop();
    var e = new Array();
    var j = "";
    var B = "";
    var F = true;
    var d = 3;
    var w = ["http://img04.taobaocdn.com/imgextra/i4/310902331/TB2TSn_cFXXXXXSXXXXXXXXXXXX-310902331.jpg", "http://img03.taobaocdn.com/imgextra/i3/310902331/TB2Vi60cFXXXXcVXXXXXXXXXXXX-310902331.jpg", "http://img01.taobaocdn.com/imgextra/i1/310902331/TB2H066XVXXXXb6XpXXXXXXXXXX-310902331.jpg"];
    var g = "";
    var s = true;
    var y = true;
    var c = 1;
    var D = 0.5;
    var r = "elasticOut";
    var E = "http://img02.taobaocdn.com/imgextra/i2/310902331/TB2eoLNcFXXXXa6XpXXXXXXXXXX-310902331.png";
    var f = "390px";
    var a = "250px";
    var H = "http://img04.taobaocdn.com/imgextra/i4/310902331/TB2JOv4cFXXXXchXXXXXXXXXXXX-310902331.png";
    var m = "440px";
    var h = "250px";
    var A = "";
    var q = null;
    var u = new StringUtil();
    x();
    function x() {
        if (o == null || o == "" || o == 0) {
            o = 2
        }
        A += "<div id='" + l + "' name='" + i + "' class='" + getInitClass_abs() + " aw_sliderimage' style='z-index:" + o + ";top:" + p + ";left:" + G + ";width:" + t + ";height:" + C + ";'>";
        A += "<div name='div_sliderimage_img'><img name='slider_image_img' src='" + j + "' style='width:" + t + ";height:" + C + ";'/></div>";
        A += "<div name='div_sliderimage_arrows_l' style='position:absolute;width:40px;height:40px;top:" + a + ";left:" + f + ";'><img name='sliderimage_arrows_l_image' src='" + E + "' style='width:40px;height:40px'/></div>";
        A += "<div name='div_sliderimage_arrows_r' style='position:absolute;width:40px;height:40px;top:" + h + ";left:" + m + ";'><img name='sliderimage_arrows_r_image' src='" + H + "' style='width:40px;height:40px'/></div>";
        A += "<input class='x_close' type='button' name='btn_del'/>";
        A += "</div>";
        q = $(A);
        z()
    }
    function z() {
        var J = q.find("div[name='div_silderimage_thumbs']");
        J.empty();
        e.splice(0, e.length);
        for (var K = 0; K < d; K++) {
            var I = {};
            I.image = w[K];
            I.url = g;
            e.push(I);
            if (K == 0) {
                q.find("div[name='div_sliderimage_img']").find("img[name='slider_image_img']").attr("src", I.image)
            }
        }
    }
    this.reset = function() {
        z()
    };
    this.loadImages = function(K) {
        if (K == null) {
            return
        }
        e.splice(0, e.length);
        for (var J = 0; J < K.length; J++) {
            var I = {};
            I.image = K[J]["image"];
            I.url = K[J]["url"];
            e.push(I);
            if (J == 0) {
                q.find("div[name='div_sliderimage_img']").find("img[name='slider_image_img']").attr("src", I.image)
            }
        }
    };
    this.setComID = function(I) {
        l = I
    };
    this.getComID = function() {
        return l
    };
    this.setComName = function(I) {
        i = I
    };
    this.getComName = function() {
        return i
    };
    this.setDivZIndex = function(I) {
        o = I;
        q.css("z-index", o)
    };
    this.getDivZIndex = function() {
        return o
    };
    this.getComCnName = function() {
        return v
    };
    this.getInitImagesCount = function() {
        return d
    };
    this.setDivWidth = function(I) {
        t = u.addUtil("width", I);
        q.find("img[name='slider_image_img']").css("width", t);
        q.css("width", t);
        var J = u.addUtil("left", parseInt(I) + 10);
        q.find("div[name='div_silderimage_thumbs']").css("left", J)
    };
    this.getDivWidth = function() {
        return u.delUtil(t)
    };
    this.setDivHeight = function(I) {
        C = u.addUtil("height", I);
        q.find("img[name='slider_image_img']").css("height", C);
        q.css("height", C)
    };
    this.getDivHeight = function() {
        return u.delUtil(C)
    };
    this.setDivLeft = function(I) {
        G = u.addUtil("left", I);
        q.css("left", G)
    };
    this.getDivLeft = function() {
        return u.delUtil(G)
    };
    this.setDivTop = function(I) {
        p = u.addUtil("top", I);
        q.css("top", p)
    };
    this.getDivTop = function() {
        return u.delUtil(p)
    };
    this.pushImageInArray = function(K, J) {
        var I = {};
        I.image = K;
        I.url = J;
        e.push(I)
    };
    this.getImageArray = function() {
        return e
    };
    this.getImage = function(I) {
        return e[I]
    };
    this.setMainImage = function(I, J) {
        j = I;
        q.find("img[name='slider_image_img']").attr("src", j);
        var K = e[J];
        K.image = j
    };
    this.getMainImage = function() {
        return j
    };
    this.setMainUrl = function(I, J) {
        B = I;
        var K = e[J];
        K.url = B
    };
    this.getMainUrl = function() {
        return B
    };
    this.setTarget = function(I) {
        F = I
    };
    this.getTarget = function() {
        return F
    };
    this.setAutoDisplay = function(I) {
        s = I
    };
    this.getAutoDisplay = function() {
        return s
    };
    this.setDisplayArrows = function(I) {
        y = I;
        if (y) {
            q.find("div[name='div_sliderimage_arrows_l']").css("display", "block");
            q.find("div[name='div_sliderimage_arrows_r']").css("display", "block")
        } else {
            q.find("div[name='div_sliderimage_arrows_l']").css("display", "none");
            q.find("div[name='div_sliderimage_arrows_r']").css("display", "none")
        }
    };
    this.getDisplayArrows = function() {
        return y
    };
    this.setDisplayStyle = function(I) {
        c = I
    };
    this.getDisplayStyle = function() {
        return c
    };
    this.setInterval = function(I) {
        D = I
    };
    this.getInterval = function() {
        return D
    };
    this.setArrowsLImage = function(I) {
        E = I;
        q.find("img[name='sliderimage_arrows_l_image']").attr("src", E)
    };
    this.getArrowsLImage = function() {
        return E
    };
    this.setArrowsLLeft = function(I) {
        f = u.addUtil("left", I);
        q.find("div[name='div_sliderimage_arrows_l']").css("left", f)
    };
    this.getArrowsLLeft = function() {
        return u.delUtil(f)
    };
    this.setArrowsLTop = function(I) {
        a = u.addUtil("top", I);
        q.find("div[name='div_sliderimage_arrows_l']").css("top", a)
    };
    this.getArrowsLTop = function() {
        return u.delUtil(a)
    };
    this.setArrowsRImage = function(I) {
        H = I;
        q.find("img[name='sliderimage_arrows_r_image']").attr("src", H)
    };
    this.getArrowsRImage = function() {
        return H
    };
    this.setArrowsRLeft = function(I) {
        m = u.addUtil("left", I);
        q.find("div[name='div_sliderimage_arrows_r']").css("left", m)
    };
    this.getArrowsRLeft = function() {
        return u.delUtil(m)
    };
    this.setArrowsRTop = function(I) {
        h = u.addUtil("top", I);
        q.find("div[name='div_sliderimage_arrows_r']").css("top", h)
    };
    this.getArrowsRTop = function() {
        return u.delUtil(h)
    };
    this.setSliderEffect = function(I) {
        r = I
    };
    this.getSliderEffect = function() {
        return r
    };
    this.newThumbs = function(I) {
        I = $("<img id='silderimage_thumbs_" + I + "' name='silderimage_thumbs' src='' style='width:50px;height:50px'></d>");
        q.find("div[name='div_silderimage_thumbs']").append(I)
    };
    this.setThumbsImage = function(J, I) {
        q.find("div[name='div_silderimage_thumbs']").find("img[name='silderimage_thumbs']").eq(I).attr("src", J);
        e[I].image = J
    };
    this.removeThumbsImage = function(I) {
        q.find("div[name='div_silderimage_thumbs']").find("img[name='silderimage_thumbs']").eq(I).remove();
        e.splice(I, 1)
    };
    this.getComponent = function() {
        return q
    };
    this.getCssCode = function() {
        var J = "false";
        var I = "display:none;";
        var N = "scrollx";
        var M = "_self";
        if (F) {
            M = "_blank"
        }
        if (s == true) {
            J = "true"
        }
        if (y == true) {
            I = ""
        }
        if (c == 1) {
            N = "scrollx"
        }
        if (c == 2) {
            N = "scrolly"
        }
        if (c == 3) {
            N = "fade"
        }
        var L = "";
        L += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + i + '" style="z-index:' + o + ";top:" + p + ";left:" + G + ";width:" + t + ";height:" + C + ';">';
        L += '<div class="' + getInitClass_rel() + ' J_TWidget" data-widget-type="Carousel" data-widget-config="{\'effect\':\'' + N + "','easing':'" + r + "','circular':true,'autoplay':" + J + ",'contentCls':'c_" + l + "','navCls':'n_" + l + "','activeTriggerCls':'selected','duration':'" + D + "','prevBtnCls': 'prev_" + l + "', 'nextBtnCls': 'next_" + l + '\'}" style="width:' + t + ";height:" + C + ';">';
        L += '<div class="' + getInitClass_rel() + '" style="width:' + t + ";height:" + C + ';overflow:hidden;">';
        L += '<div class="c_' + l + '">';
        for (var K = 0; K < e.length; K++) {
            L += '<div style="width:' + t + ";height:" + C + ';overflow:hidden;"><a target="' + M + '" href="' + e[K].url + '"><img src="' + e[K].image + '" style="width:' + t + ";height:" + C + ';"></a></div>'
        }
        L += "</div>";
        L += "</div>";
        L += '<ul class="n_' + l + '" style="display:none;">';
        for (var K = 0; K < e.length; K++) {
            if (K == 0) {
                L += '<li class="selected">' + K + "</li>"
            } else {
                L += "<li>" + K + "</li>"
            }
        }
        L += "</ul>";
        L += '<div class="prev_' + l + " " + getInitClass_abs() + '" style="z-index:99;' + I + "left:" + f + ";top:" + a + ";width:40px;height:40px;background:url(" + E + ');cursor:pointer;"></div>';
        L += '<div class="next_' + l + " " + getInitClass_abs() + '" style="z-index:99;' + I + "left:" + m + ";top:" + h + ";width:40px;height:40px;background:url(" + H + ');cursor:pointer;"></div>';
        L += "</div>";
        L += "</div></bdo>";
        return L
    };
    this.gethtmlJSON = function(W) {
        var Z = "sliderimage_" + i_sliderimage;
        i_sliderimage++;
        var Q = Z;
        var U = z_index++;
        var a = "";
        var b = "";
        var c = 0;
        var V = 0;
        var L = new Array();
        var d = false;
        var Y = false;
        var e = true;
        var K = 1;
        var f = "";
        var g = "";
        var M = "";
        var J = "";
        var h = "";
        var R = "";
        var N = "";
        var X = "";
        var O = /data-type="sliderimage" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var I = O.exec(W);
        if (I) {
            V = I[2];
            c = I[3];
            a = I[4];
            b = I[5]
        }
        O = /easing':'(.*)','circular/ig;
        I = O.exec(W);
        if (I) {
            X = I[1]
        }
        O = /target="(.*)" href/ig;
        I = O.exec(W);
        if (I) {
            if (I[1] == "_blank") {
                d = true
            }
        }
        O = /duration':'(.*)','prevBtnCls/ig;
        I = O.exec(W);
        if (I) {
            f = I[1]
        }
        O = /autoplay':(.*),'contentCls/ig;
        I = O.exec(W);
        if (I) {
            if (I[1] == "true") {
                Y = true
            }
        }
        O = /style="z-index:99;(|display:none;)left/ig;
        I = O.exec(W);
        if (I) {
            if (I[1] == "display:none;") {
                e = false
            }
        }
        O = /effect':'(.*)','easing/ig;
        I = O.exec(W);
        if (I) {
            if (I[1] == "scrolly") {
                K = 2
            } else {
                if (I[1] == "fade") {
                    K = 3
                } else {
                    K = 1
                }
            }
        }
        O = /prev_slider_(\d+) abs" style="z-index:99;(|display:none;)left:(.*px);top:(.*px);width:40px;height:40px;background:url\((.*)\);cursor:pointer;"><\/div><div class="next_slider/ig;
        I = O.exec(W);
        if (I) {
            M = I[3];
            J = I[4];
            g = I[5]
        }
        O = /next_slider_(\d+) abs" style="z-index:99;(|display:none;)left:(.*);top:(.*);width:40px;height:40px;background:url\((.*)\)/ig;
        I = O.exec(W);
        if (I) {
            R = I[3];
            N = I[4];
            h = I[5]
        }
        var j = {};
        var P, S, T = "";
        while (W.length > 0) {
            P = W.indexOf("href");
            S = W.indexOf("</a>", 1);
            if (P > -1 && S > P) {
                T = W.slice(P, S);
                O = /href="(.*)"><img src="(.*)" style/ig;
                I = O.exec(T);
                if (I) {
                    j = {};
                    j.url = I[1];
                    j.image = I[2];
                    L.push(j)
                }
                W = W.slice(S + 4)
            } else {
                break
            }
        }
        var k = {
            comID: Q,
            comName: i,
            div_z_index: U,
            div_width: a,
            div_height: b,
            div_left: c,
            div_top: V,
            target: d,
            auto_display: Y,
            display_arrows: e,
            display_style: K,
            interval_str: f,
            arrows_l_image: g,
            arrows_l_left: M,
            arrows_l_top: J,
            arrows_r_image: h,
            arrows_r_left: R,
            arrows_r_top: N,
            imageArray: L,
            slider_effect: X
        };
        return k
    };
    this.getJSON = function() {
        var I = {
            comID: l,
            comName: i,
            div_z_index: o,
            div_width: t,
            div_height: C,
            div_left: G,
            div_top: p,
            target: F,
            auto_display: s,
            display_arrows: y,
            display_style: c,
            interval_str: D,
            arrows_l_image: E,
            arrows_l_left: f,
            arrows_l_top: a,
            arrows_r_image: H,
            arrows_r_left: m,
            arrows_r_top: h,
            imageArray: e,
            slider_effect: r
        };
        return I
    };
    this.addClickEvent = function() {
        q.bind("click", $.proxy(this.eventhandler, this));
        q.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(I) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        q.addClass("ui-draggable-selected");
        setCurrentSliderImageComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(I) {
        removeCurrenComponent(this, I)
    };
    this.addDragEvent = function() {
        q.find("div[name='div_sliderimage_arrows_l']").draggable({
            drag: function(I, J) {
                onDragForSlider(I, J);
                $("#txt_sliderimage_arrows_l_left").val(J.position.left);
                $("#txt_sliderimage_arrows_l_top").val(J.position.top)
            },
            stop: function(I, J) {
                $("#txt_sliderimage_arrows_l_left").val(J.position.left);
                $("#txt_sliderimage_arrows_l_top").val(J.position.top);
                f = J.position.left;
                f = u.addUtil("left", f);
                a = J.position.top;
                a = u.addUtil("top", a)
            }
        });
        q.find("div[name='div_sliderimage_arrows_r']").draggable({
            drag: function(I, J) {
                onDragForSlider(I, J);
                $("#txt_sliderimage_arrows_r_left").val(J.position.left);
                $("#txt_sliderimage_arrows_r_top").val(J.position.top)
            },
            stop: function(I, J) {
                $("#txt_sliderimage_arrows_r_left").val(J.position.left);
                $("#txt_sliderimage_arrows_r_top").val(J.position.top);
                m = J.position.left;
                m = u.addUtil("left", m);
                h = J.position.top;
                h = u.addUtil("top", h)
            }
        })
    }
};
function initToolSliderImage() {
    initDialogSetImages();
    addSliderEffect($("#select_sliderimage_effect"));
    $("#comsliderimage").click(function() {
        initSliderImage(null)
    })
}
var i_sliderimage = 0;
function initSliderImage(a) {
    var f = "slider_" + i_sliderimage;
    i_sliderimage++;
    var e = new SliderImageComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentSliderImageComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_sliderimage_left").val(c);
            $("#div_sliderimage_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_sliderimage_left").val(c);
            $("#div_sliderimage_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentSliderImageComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_sliderimage_width").val(c);
            $("#div_sliderimage_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_sliderimage_width").val(c);
            $("#div_sliderimage_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    e.addDragEvent();
    loadSliderImageFromDB(e, a);
    setCurrentSliderImageComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadSliderImageFromDB(k, h) {
    if (k == null || h == null) {
        return
    }
    var f = new StringUtil();
    if (h.comID != "") {
        k.setComID(h.comID)
    }
    if (h.comName != "") {
        k.setComName(h.comName)
    }
    if (h.div_z_index != "") {
        k.setDivZIndex(h.div_z_index)
    }
    if (h.div_height != "") {
        k.setDivHeight(f.delUtil(h.div_height))
    }
    if (h.div_width != "") {
        k.setDivWidth(f.delUtil(h.div_width))
    }
    if (h.div_left != "") {
        k.setDivLeft(f.delUtil(h.div_left))
    }
    if (h.div_top != "") {
        k.setDivTop(f.delUtil(h.div_top))
    }
    var d = h.target == 1 ? true: false;
    k.setTarget(d);
    d = h.auto_display == 1 ? true: false;
    k.setAutoDisplay(d);
    d = h.display_arrows == 1 ? true: false;
    k.setDisplayArrows(d);
    if (h.display_style != "") {
        k.setDisplayStyle(h.display_style)
    }
    if (h.interval_str != "") {
        k.setInterval(h.interval_str)
    }
    if (h.arrows_l_image != "") {
        k.setArrowsLImage(h.arrows_l_image)
    }
    if (h.arrows_l_left != "") {
        k.setArrowsLLeft(f.delUtil(h.arrows_l_left))
    }
    if (h.arrows_l_top != "") {
        k.setArrowsLTop(f.delUtil(h.arrows_l_top))
    }
    if (h.arrows_r_image != "") {
        k.setArrowsRImage(h.arrows_r_image)
    }
    if (h.arrows_r_left != "") {
        k.setArrowsRLeft(f.delUtil(h.arrows_r_left))
    }
    if (h.arrows_r_top != "") {
        k.setArrowsRTop(f.delUtil(h.arrows_r_top))
    }
    if (h.slider_effect != "") {
        k.setSliderEffect(h.slider_effect)
    }
    var j = h.imageArray;
    var a = new Array();
    for (var g = 0; g < j.length; g++) {
        var e = {};
        e.image = j[g]["image"];
        e.url = j[g]["url"];
        a.push(e)
    }
    k.loadImages(a)
}
function setCurrentSliderImageComponent(a) {
    loadSliderImageValue(a);
    sliderimage_editor(a);
    sliderimage_setImages(a)
}
function sliderimage_setImages(i) {
    var a = i;
    if (a == null) {
        return
    }
    $("#btn_setImages").unbind();
    $("#btn_setImages").click(function() {
        $("#setimages").dialog("open")
    });
    var d = i.getImageArray();
    var k = $("#setimages_group");
    g();
    function g() {
        k.empty();
        for (var m = 0; m < d.length; m++) {
            var q = d[m].image;
            var c = d[m].url;
            var n = "txt_sliderimage_images_" + m;
            var p = "txt_sliderimage_urls_" + m;
            var r = "btn_del_" + m;
            var l = "<div class='pp'>";
            l += "<div class='ppn'><span>图片地址：</span><input id='" + n + "' class='input2 input_w4 s_img' type='text' value=''></div>";
            l += "<div class='ppn'><span>点击链接：</span><input id='" + p + "' class='input2 input_w4 s_url' type='text' value=''></div>";
            if (m == 0) {} else {
                l += "<div class='ppn'><input id='" + r + "' type='button' class='s_del'></div>"
            }
            l += "</div>";
            var o = $(l);
            k.append(o);
            k.find("#" + n).val(q);
            k.find("#" + p).val(c);
            k.find("#" + n).bind("keyup", {
                index: m
            },
            f);
            k.find("#" + p).bind("keyup", {
                index: m
            },
            e);
            k.find("#" + r).bind("click", {
                index: m
            },
            j)
        }
    }
    function f(l) {
        var c = l.data.index;
        if (c == 0) {
            i.setMainImage($(l.target).val(), c)
        }
        i.setThumbsImage($(l.target).val(), c)
    }
    function e(l) {
        var c = l.data.index;
        i.setMainUrl($(l.target).val(), c)
    }
    var h = d.length;
    $("#imgadd").unbind();
    $("#imgadd").click(function() {
        var c = "";
        var m = "";
        i.pushImageInArray(c, m);
        var o = "txt_sliderimage_images_" + h;
        var q = "txt_sliderimage_urls_" + h;
        var r = "btn_del_" + h;
        var n = "<div class='pp'>";
        n += "<div class='ppn'><span>图片地址：</span><input id='" + o + "' class='input2 input_w4 s_img' type='text' value=''></div>";
        n += "<div class='ppn'><span>点击链接：</span><input id='" + q + "' class='input2 input_w4 s_url' type='text' value=''></div>";
        n += "<div class='ppn'><input id='" + r + "' type='button' class='s_del'></div>";
        n += "</div>";
        var p = $(n);
        k.append(p);
        k.find("#" + o).val(c);
        k.find("#" + q).val(m);
        i.newThumbs(h);
        var l = d.length - 1;
        k.find("#" + o).bind("keyup", {
            index: l
        },
        f);
        k.find("#" + q).bind("keyup", {
            index: l
        },
        e);
        k.find("#" + r).bind("click", {
            index: l
        },
        j);
        h++
    });
    function j(c) {
        if (!confirm("是否要删除图片?")) {
            return
        }
        var p = c.data.index;
        $(c.target).parent().parent().remove();
        i.removeThumbsImage(p);
        var q = k.find(".s_img");
        for (var m = 0; m < q.length; m++) {
            var r = $(q[m]);
            r.unbind();
            r.bind("keyup", {
                index: m
            },
            f)
        }
        var s = k.find(".s_url");
        for (var m = 0; m < s.length; m++) {
            var n = $(s[m]);
            n.unbind();
            n.bind("keyup", {
                index: m
            },
            e)
        }
        var o = k.find(".s_del");
        for (var m = 0; m < o.length; m++) {
            var l = $(o[m]);
            l.unbind();
            l.bind("click", {
                index: m + 1
            },
            j)
        }
    }
    $("#imgreset").unbind();
    $("#imgreset").click(function() {
        if (!confirm("是否确定重置轮播图片?")) {
            return
        }
        i.reset();
        g();
        h = d.length
    })
}
function sliderimage_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_sliderimage_height").unbind();
    $("#div_sliderimage_height").keyup(function() {
        a.setDivHeight($("#div_sliderimage_height").val())
    });
    $("#div_sliderimage_width").unbind();
    $("#div_sliderimage_width").keyup(function() {
        a.setDivWidth($("#div_sliderimage_width").val())
    });
    $("#div_sliderimage_left").unbind();
    $("#div_sliderimage_left").keyup(function() {
        a.setDivLeft($("#div_sliderimage_left").val())
    });
    $("#div_sliderimage_top").unbind();
    $("#div_sliderimage_top").keyup(function() {
        a.setDivTop($("#div_sliderimage_top").val())
    });
    $("#checkbox_sliderimage_target").off("ifChanged");
    $("#checkbox_sliderimage_target").on("ifChanged",
    function() {
        a.setTarget($("#checkbox_sliderimage_target").prop("checked"))
    });
    $("#checkbox_sliderimage_auto_display").off("ifChanged");
    $("#checkbox_sliderimage_auto_display").on("ifChanged",
    function() {
        a.setAutoDisplay($("#checkbox_sliderimage_auto_display").prop("checked"))
    });
    $("#checkbox_sliderimage_display_arrows").off("ifChanged");
    $("#checkbox_sliderimage_display_arrows").on("ifChanged",
    function() {
        a.setDisplayArrows($("#checkbox_sliderimage_display_arrows").prop("checked"))
    });
    $("input:radio[name='checkbox_sliderimage_display_style']").unbind();
    $("input:radio[name='checkbox_sliderimage_display_style']").on("ifChanged",
    function() {
        if ($(this).prop("checked")) {
            a.setDisplayStyle($(this).val())
        }
    });
    $("#txt_sliderimage_interval").unbind();
    $("#txt_sliderimage_interval").keyup(function() {
        a.setInterval($("#txt_sliderimage_interval").val())
    });
    $("#txt_sliderimage_arrows_l_image").unbind();
    $("#txt_sliderimage_arrows_l_image").keyup(function() {
        a.setArrowsLImage($("#txt_sliderimage_arrows_l_image").val())
    });
    $("#txt_sliderimage_arrows_l_left").unbind();
    $("#txt_sliderimage_arrows_l_left").keyup(function() {
        a.setArrowsLLeft($("#txt_sliderimage_arrows_l_left").val())
    });
    $("#txt_sliderimage_arrows_l_top").unbind();
    $("#txt_sliderimage_arrows_l_top").keyup(function() {
        a.setArrowsLTop($("#txt_sliderimage_arrows_l_top").val())
    });
    $("#txt_sliderimage_arrows_r_image").unbind();
    $("#txt_sliderimage_arrows_r_image").keyup(function() {
        a.setArrowsRImage($("#txt_sliderimage_arrows_r_image").val())
    });
    $("#txt_sliderimage_arrows_r_left").unbind();
    $("#txt_sliderimage_arrows_r_left").keyup(function() {
        a.setArrowsRLeft($("#txt_sliderimage_arrows_r_left").val())
    });
    $("#txt_sliderimage_arrows_r_top").unbind();
    $("#txt_sliderimage_arrows_r_top").keyup(function() {
        a.setArrowsRTop($("#txt_sliderimage_arrows_r_top").val())
    });
    $("#btn_sliderimage_fullsize").unbind();
    $("#btn_sliderimage_fullsize").click(function() {
        var c = new Image();
        c.src = a.getComponent().find("div[name='div_sliderimage_img']").find("img[name='slider_image_img']").attr("src");
        c.onload = function() {
            if (c.complete) {
                var e = c.width;
                var f = c.height;
                $("#div_sliderimage_width").val(e);
                $("#div_sliderimage_height").val(f);
                a.setDivWidth(e.toString());
                a.setDivHeight(f.toString())
            } else {
                alert("图片还没加载完，请稍后重试!")
            }
        }
    });
    $("#select_sliderimage_effect").unbind();
    $("#select_sliderimage_effect").change(function() {
        a.setSliderEffect($("#select_sliderimage_effect").val())
    })
}
function loadSliderImageValue(h) {
    var g = h;
    if (g == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_sliderimage").css("display", "block");
    var f = h.getComID();
    var a = f.split("_")[1];
    showComName(h.getComCnName() + " " + a);
    h.getComponent().attr("tabindex", 0);
    h.getComponent().focus();
    h.getComponent().find("input[name='btn_del']").focus();
    $("#div_sliderimage_height").val(g.getDivHeight());
    $("#div_sliderimage_width").val(g.getDivWidth());
    $("#div_sliderimage_left").val(g.getDivLeft());
    $("#div_sliderimage_top").val(g.getDivTop());
    var d = "";
    if (g.getTarget()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_sliderimage_target").off("ifChanged");
    $("#checkbox_sliderimage_target").iCheck(d);
    if (g.getAutoDisplay()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_sliderimage_auto_display").off("ifChanged");
    $("#checkbox_sliderimage_auto_display").iCheck(d);
    if (g.getDisplayArrows()) {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#checkbox_sliderimage_display_arrows").off("ifChanged");
    $("#checkbox_sliderimage_display_arrows").iCheck(d);
    $("input:radio[name='checkbox_sliderimage_display_style']").off("ifChanged");
    var e = g.getDisplayStyle();
    if (e == "1") {
        $("#checkbox_sliderimage_display_style1").iCheck("check")
    } else {
        if (e == "2") {
            $("#checkbox_sliderimage_display_style2").iCheck("check")
        } else {
            if (e == "3") {
                $("#checkbox_sliderimage_display_style3").iCheck("check")
            }
        }
    }
    $("#txt_sliderimage_interval").val(g.getInterval());
    $("#txt_sliderimage_arrows_l_image").val(g.getArrowsLImage());
    $("#txt_sliderimage_arrows_l_left").val(g.getArrowsLLeft());
    $("#txt_sliderimage_arrows_l_top").val(g.getArrowsLTop());
    $("#txt_sliderimage_arrows_r_image").val(g.getArrowsRImage());
    $("#txt_sliderimage_arrows_r_left").val(g.getArrowsRLeft());
    $("#txt_sliderimage_arrows_r_top").val(g.getArrowsRTop());
    $("#select_sliderimage_effect").val(g.getSliderEffect())
}
function initDialogSetImages() {
    $("#setimages").dialog({
        dialogClass: "aw_sliderimage_dialog",
        autoOpen: false,
        resizable: false,
        modal: true,
        closeText: "关闭",
        title: "设置轮播图片",
        width: "700",
        height: "auto"
    })
}
var AttentionComponent = function(j, h) {
    var m = j;
    var o = h;
    var k = "attention";
    var f = "关注";
    var l = "75px";
    var i = "22px";
    var e = getawleft();
    var d = getawtop();
    var c = "1";
    var g = "http://img02.taobaocdn.com/imgextra/i2/310902331/TB2IQ_VcFXXXXXQXpXXXXXXXXXX-310902331.png";
    var a = "";
    var q = null;
    var n = new StringUtil();
    p();
    function p() {
        if (o == null || o == "" || o == 0) {
            o = 2
        }
        a += "<div id='" + m + "' name='" + k + "' class='" + getInitClass_abs() + " aw_attention' style='z-index:" + o + ";top:" + d + ";left:" + e + ";width:" + l + ";height:" + i + ";'>";
        a += "<div class='close_drag' style='width:" + l + ";height:" + i + ";'></div>";
        a += "<a href='#' class='j_CollectBrand' data-brandid='" + c + "'><img src='" + g + "' style='width:" + l + ";height:" + i + "' /></a>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        q = $(a)
    }
    this.setComID = function(r) {
        m = r
    };
    this.getComID = function() {
        return m
    };
    this.setComName = function(r) {
        k = r
    };
    this.getComName = function() {
        return k
    };
    this.setDivZIndex = function(r) {
        o = r;
        q.css("z-index", o)
    };
    this.getDivZIndex = function() {
        return o
    };
    this.getComCnName = function() {
        return f
    };
    this.setDivWidth = function(r) {
        l = n.addUtil("width", r);
        q.find(".close_drag").css("width", l);
        q.find("img").css("width", l);
        q.css("width", l)
    };
    this.getDivWidth = function() {
        return n.delUtil(l)
    };
    this.setDivHeight = function(r) {
        i = n.addUtil("height", r);
        q.find(".close_drag").css("height", i);
        q.find("img").css("height", i);
        q.css("height", i)
    };
    this.getDivHeight = function() {
        return n.delUtil(i)
    };
    this.setDivLeft = function(r) {
        e = n.addUtil("left", r);
        q.css("left", e)
    };
    this.getDivLeft = function() {
        return n.delUtil(e)
    };
    this.setDivTop = function(r) {
        d = n.addUtil("top", r);
        q.css("top", d)
    };
    this.getDivTop = function() {
        return n.delUtil(d)
    };
    this.setText_Attention_ID = function(r) {
        c = r
    };
    this.getText_Attention_ID = function() {
        return c
    };
    this.setText_Attention_Photo = function(r) {
        g = r;
        q.find("img").attr("src", g)
    };
    this.getText_Attention_Photo = function() {
        return g
    };
    this.getComponent = function() {
        return q
    };
    this.getCssCode = function() {
        var r = "";
        r += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + k + '" style="z-index:' + o + ";top:" + d + ";left:" + e + ";width:" + l + ";height:" + i + ';">';
        r += '<a href="#" class="j_CollectBrand" data-brandid="' + c + '"><img src="' + g + '" style="width:' + l + ";height:" + i + '" /></a>';
        r += "</div></bdo>";
        return r
    };
    this.gethtmlJSON = function(y) {
        var t = "attention_" + i_attention;
        i_attention++;
        var B = t;
        var C = z_index++;
        var A = "";
        var z = "";
        var v = 0;
        var s = 0;
        var r = "";
        var x = "";
        var u = /data-type="attention" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var w = u.exec(y);
        if (w) {
            s = w[2];
            v = w[3];
            A = w[4];
            z = w[5]
        }
        u = /data-brandid="(\d+)"/ig;
        w = u.exec(y);
        if (w) {
            r = w[1]
        }
        u = /src="(.*)" style/ig;
        w = u.exec(y);
        if (w) {
            x = w[1]
        }
        var D = {
            comID: B,
            comName: k,
            div_z_index: C,
            div_width: A,
            div_height: z,
            div_left: v,
            div_top: s,
            text_attention_id: r,
            text_attention_photo: x
        };
        return D
    };
    this.getJSON = function() {
        var r = {
            comID: m,
            comName: k,
            div_z_index: o,
            div_width: l,
            div_height: i,
            div_left: e,
            div_top: d,
            text_attention_id: c,
            text_attention_photo: g
        };
        return r
    };
    this.addClickEvent = function() {
        q.bind("click", $.proxy(this.eventhandler, this));
        q.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(r) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        q.addClass("ui-draggable-selected");
        setCurrentAttentionComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(r) {
        removeCurrenComponent(this, r)
    }
};
function initToolAttention() {
    $("#comattention").click(function() {
        initAttention(null)
    })
}
var i_attention = 0;
function initAttention(a) {
    var f = "attention_" + i_attention;
    i_attention++;
    var e = new AttentionComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentAttentionComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_attention_left").val(c);
            $("#div_attention_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_attention_left").val(c);
            $("#div_attention_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentAttentionComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_attention_width").val(c);
            $("#div_attention_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_attention_width").val(c);
            $("#div_attention_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadAttentionFromDB(e, a);
    setCurrentAttentionComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadAttentionFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_attention_id != "") {
        e.setText_Attention_ID(d.text_attention_id)
    }
    if (d.text_attention_photo != "") {
        e.setText_Attention_Photo(d.text_attention_photo)
    }
}
function setCurrentAttentionComponent(a) {
    loadAttentionValue(a);
    attention_editor(a)
}
function attention_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_attention_height").unbind();
    $("#div_attention_height").keyup(function() {
        a.setDivHeight($("#div_attention_height").val())
    });
    $("#div_attention_width").unbind();
    $("#div_attention_width").keyup(function() {
        a.setDivWidth($("#div_attention_width").val())
    });
    $("#div_attention_left").unbind();
    $("#div_attention_left").keyup(function() {
        a.setDivLeft($("#div_attention_left").val())
    });
    $("#div_attention_top").unbind();
    $("#div_attention_top").keyup(function() {
        a.setDivTop($("#div_attention_top").val())
    });
    $("#text_attention_id").unbind();
    $("#text_attention_id").keyup(function() {
        a.setText_Attention_ID($("#text_attention_id").val())
    });
    $("#text_attention_photo").unbind();
    $("#text_attention_photo").keyup(function() {
        a.setText_Attention_Photo($("#text_attention_photo").val())
    })
}
function loadAttentionValue(f) {
    var d = f;
    if (d == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_attention").css("display", "block");
    var e = f.getComID();
    var a = e.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_attention_height").val(d.getDivHeight());
    $("#div_attention_width").val(d.getDivWidth());
    $("#div_attention_left").val(d.getDivLeft());
    $("#div_attention_top").val(d.getDivTop());
    $("#text_attention_id").val(d.getText_Attention_ID());
    $("#text_attention_photo").val(d.getText_Attention_Photo())
}
var ShareComponent = function(j, h) {
    var m = j;
    var o = h;
    var k = "share";
    var g = "分享";
    var l = "92px";
    var i = "27px";
    var f = getawleft();
    var d = getawtop();
    var c = "27344664315";
    var q = "http://item.taobao.com/item.htm?id=27344664315";
    var e = "http://img01.taobaocdn.com/imgextra/i1/310902331/TB2yaLTcFXXXXahXpXXXXXXXXXX-310902331.png";
    var a = "";
    var r = null;
    var n = new StringUtil();
    p();
    function p() {
        if (o == null || o == "" || o == 0) {
            o = 2
        }
        a += "<div id='" + m + "' name='" + k + "' class='" + getInitClass_abs() + " aw_share' style='z-index:" + o + ";top:" + d + ";left:" + f + ";width:" + l + ";height:" + i + ";'>";
        a += "<div class='close_drag' style='width:" + l + ";height:" + i + ";'></div>";
        a += '<div class=\'sns-widget\' data-sharebtn=\'{"type":"item","client_id":"68","key":"' + c + '","skinType":"3"}\' style=\'width:' + l + ";height:" + i + ";background:url(" + e + ") no-repeat;cursor:pointer;'></div>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        r = $(a)
    }
    this.setComID = function(s) {
        m = s
    };
    this.getComID = function() {
        return m
    };
    this.setComName = function(s) {
        k = s
    };
    this.getComName = function() {
        return k
    };
    this.setDivZIndex = function(s) {
        o = s;
        r.css("z-index", o)
    };
    this.getDivZIndex = function() {
        return o
    };
    this.getComCnName = function() {
        return g
    };
    this.setDivWidth = function(s) {
        l = n.addUtil("width", s);
        r.find(".close_drag").css("width", l);
        r.find(".sns-widget").css("width", l);
        r.css("width", l)
    };
    this.getDivWidth = function() {
        return n.delUtil(l)
    };
    this.setDivHeight = function(s) {
        i = n.addUtil("height", s);
        r.find(".close_drag").css("height", i);
        r.find(".sns-widget").css("height", i);
        r.css("height", i)
    };
    this.getDivHeight = function() {
        return n.delUtil(i)
    };
    this.setDivLeft = function(s) {
        f = n.addUtil("left", s);
        r.css("left", f)
    };
    this.getDivLeft = function() {
        return n.delUtil(f)
    };
    this.setDivTop = function(s) {
        d = n.addUtil("top", s);
        r.css("top", d)
    };
    this.getDivTop = function() {
        return n.delUtil(d)
    };
    this.setText_Share_ID = function(s) {
        c = s
    };
    this.getText_Share_ID = function() {
        return c
    };
    this.setText_Share_Address = function(s) {
        q = s
    };
    this.getText_Share_Address = function() {
        return q
    };
    this.setText_Share_Photo = function(s) {
        e = s;
        r.find(".sns-widget").css("background", "url(" + e + ") no-repeat")
    };
    this.getText_Share_Photo = function() {
        return e
    };
    this.getComponent = function() {
        return r
    };
    this.getCssCode = function() {
        var s = "";
        s += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + k + '" style="z-index:' + o + ";top:" + d + ";left:" + f + ";width:" + l + ";height:" + i + ';">';
        s += '<div class="sns-widget" data-sharebtn="{client_id:68,skinType:3,type:\'item\',key:' + c + '}" style="width:' + l + ";height:" + i + ";background:url(" + e + ') no-repeat;cursor:pointer;"></div>';
        s += "</div></bdo>";
        return s
    };
    this.gethtmlJSON = function(z) {
        var u = "share_" + i_share;
        i_share++;
        var C = u;
        var D = z_index++;
        var B = "";
        var A = "";
        var x = 0;
        var t = 0;
        var s = "";
        var F = "";
        var w = "";
        var v = /data-type="share" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var y = v.exec(z);
        if (y) {
            t = y[2];
            x = y[3];
            B = y[4];
            A = y[5]
        }
        v = /background:url\((.*)\) no-repeat/ig;
        y = v.exec(z);
        if (y) {
            w = y[1]
        }
        v = /key:(\d+)\}/ig;
        y = v.exec(z);
        if (y) {
            s = y[1];
            F = "id=" + s
        }
        var E = {
            comID: C,
            comName: k,
            div_z_index: D,
            div_width: B,
            div_height: A,
            div_left: x,
            div_top: t,
            text_share_id: s,
            text_share_address: F,
            text_share_photo: w
        };
        return E
    };
    this.getJSON = function() {
        var s = {
            comID: m,
            comName: k,
            div_z_index: o,
            div_width: l,
            div_height: i,
            div_left: f,
            div_top: d,
            text_share_id: c,
            text_share_address: q,
            text_share_photo: e
        };
        return s
    };
    this.addClickEvent = function() {
        r.bind("click", $.proxy(this.eventhandler, this));
        r.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(s) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        r.addClass("ui-draggable-selected");
        setCurrentShareComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(s) {
        removeCurrenComponent(this, s)
    }
};
function initToolShare() {
    $("#comshare").click(function() {
        initShare(null)
    })
}
var i_share = 0;
function initShare(a) {
    var f = "share_" + i_share;
    i_share++;
    var e = new ShareComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentShareComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_share_left").val(c);
            $("#div_share_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_share_left").val(c);
            $("#div_share_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentShareComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_share_width").val(c);
            $("#div_share_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_share_width").val(c);
            $("#div_share_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadShareFromDB(e, a);
    setCurrentShareComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadShareFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_share_id != "") {
        e.setText_Share_ID(d.text_share_id)
    }
    if (d.text_share_address != "") {
        e.setText_Share_Address(d.text_share_address)
    }
    if (d.text_share_photo != "") {
        e.setText_Share_Photo(d.text_share_photo)
    }
}
function setCurrentShareComponent(a) {
    loadShareValue(a);
    share_editor(a)
}
function share_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_share_height").unbind();
    $("#div_share_height").keyup(function() {
        a.setDivHeight($("#div_share_height").val())
    });
    $("#div_share_width").unbind();
    $("#div_share_width").keyup(function() {
        a.setDivWidth($("#div_share_width").val())
    });
    $("#div_share_left").unbind();
    $("#div_share_left").keyup(function() {
        a.setDivLeft($("#div_share_left").val())
    });
    $("#div_share_top").unbind();
    $("#div_share_top").keyup(function() {
        a.setDivTop($("#div_share_top").val())
    });
    $("#text_share_address").unbind();
    $("#text_share_address").keyup(function() {
        var f = $("#text_share_address").val();
        a.setText_Share_Address(f);
        var c = /id=(\d+)/;
        if (c.test(f) == true) {
            var e = f.match(c);
            a.setText_Share_ID(e[1])
        } else {}
    });
    $("#text_share_photo").unbind();
    $("#text_share_photo").keyup(function() {
        a.setText_Share_Photo($("#text_share_photo").val())
    })
}
function loadShareValue(f) {
    var d = f;
    if (d == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_share").css("display", "block");
    var e = f.getComID();
    var a = e.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_share_height").val(d.getDivHeight());
    $("#div_share_width").val(d.getDivWidth());
    $("#div_share_left").val(d.getDivLeft());
    $("#div_share_top").val(d.getDivTop());
    $("#text_share_address").val(d.getText_Share_Address());
    $("#text_share_photo").val(d.getText_Share_Photo())
}
var LikeComponent = function(f, d) {
    var e = f;
    var g = d;
    var a = "like";
    var l = "喜欢";
    var j = "109px";
    var r = "25px";
    var s = getawleft();
    var h = getawtop();
    var c = "27344664315";
    var q = "http://item.taobao.com/item.htm?id=27344664315";
    var p = "like2";
    var m = 2;
    var o = "";
    var i = null;
    var k = new StringUtil();
    n();
    function n() {
        if (g == null || g == "" || g == 0) {
            g = 2
        }
        o += "<div id='" + e + "' name='" + a + "' class='" + getInitClass_abs() + " aw_like' style='z-index:" + g + ";top:" + h + ";left:" + s + ";width:" + j + ";height:" + r + ";'>";
        o += "<div class='close_drag' style='width:" + j + ";height:" + r + ";'></div>";
        o += "<div class='sns-widget awlike " + p + '\' data-like=\'{"client_id":"68","skinType":' + m + ',"type":2,"key":"' + c + "\"}' style='width:" + j + ";height:" + r + ";'></div>";
        o += "<input class='x_close' type='button' name='btn_del'/>";
        o += "</div>";
        i = $(o)
    }
    this.setComID = function(t) {
        e = t
    };
    this.getComID = function() {
        return e
    };
    this.setComName = function(t) {
        a = t
    };
    this.getComName = function() {
        return a
    };
    this.setDivZIndex = function(t) {
        g = t;
        i.css("z-index", g)
    };
    this.getDivZIndex = function() {
        return g
    };
    this.getComCnName = function() {
        return l
    };
    this.setDivLeft = function(t) {
        s = k.addUtil("left", t);
        i.css("left", s)
    };
    this.getDivLeft = function() {
        return k.delUtil(s)
    };
    this.setDivTop = function(t) {
        h = k.addUtil("top", t);
        i.css("top", h)
    };
    this.getDivTop = function() {
        return k.delUtil(h)
    };
    this.setText_Like_ID = function(t) {
        c = t
    };
    this.getText_Like_ID = function() {
        return c
    };
    this.setText_Like_Address = function(t) {
        q = t
    };
    this.getText_Like_Address = function() {
        return q
    };
    this.setText_Like_Skin = function(t) {
        m = t;
        if (m == "1") {
            p = "like1";
            i.find(".awlike").removeClass("like2").addClass("like1")
        } else {
            p = "like2";
            i.find(".awlike").removeClass("like1").addClass("like2")
        }
    };
    this.getText_Like_Skin = function() {
        return m
    };
    this.getComponent = function() {
        return i
    };
    this.getCssCode = function() {
        var t = "";
        t += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + a + '" style="z-index:' + g + ";top:" + h + ";left:" + s + ";width:" + j + ";height:" + r + ';">';
        t += '<div class="sns-widget ' + p + '" data-like="{client_id:68,skinType:' + m + ",type:2,key:" + c + '}" style="width:' + j + ";height:" + r + ';border:0;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;"></div>';
        t += "</div></bdo>";
        return t
    };
    this.gethtmlJSON = function(A) {
        var v = "like_" + i_like;
        i_like++;
        var E = v;
        var F = z_index++;
        var D = "";
        var B = "";
        var x = 0;
        var u = 0;
        var C = "";
        var t = "";
        var z = "1";
        var w = /data-type="like" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var y = w.exec(A);
        if (y) {
            u = y[2];
            x = y[3];
            D = y[4];
            B = y[5]
        }
        w = /skinType:(1|2),type/ig;
        y = w.exec(A);
        if (y) {
            z = y[1]
        }
        w = /key:(\d+)\}/ig;
        y = w.exec(A);
        if (y) {
            C = y[1];
            t = "id=" + C
        }
        var G = {
            comID: E,
            comName: a,
            div_z_index: F,
            div_width: D,
            div_height: B,
            div_left: x,
            div_top: u,
            text_like_id: C,
            text_like_address: t,
            like_skin: z
        };
        return G
    };
    this.getJSON = function() {
        var t = {
            comID: e,
            comName: a,
            div_z_index: g,
            div_left: s,
            div_top: h,
            text_like_id: c,
            text_like_address: q,
            like_skin: m
        };
        return t
    };
    this.addClickEvent = function() {
        i.bind("click", $.proxy(this.eventhandler, this));
        i.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(t) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        i.addClass("ui-draggable-selected");
        setCurrentLikeComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(t) {
        removeCurrenComponent(this, t)
    }
};
function initToolLike() {
    $("#comlike").click(function() {
        initLike(null)
    })
}
var i_like = 0;
function initLike(a) {
    var f = "like_" + i_like;
    i_like++;
    var e = new LikeComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentLikeComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_like_left").val(c);
            $("#div_like_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_like_left").val(c);
            $("#div_like_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    e.addClickEvent();
    loadLikeFromDB(e, a);
    setCurrentLikeComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadLikeFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_like_id != "") {
        e.setText_Like_ID(d.text_like_id)
    }
    if (d.like_skin != "") {
        e.setText_Like_Skin(d.like_skin)
    }
    if (d.text_like_address != "") {
        e.setText_Like_Address(d.text_like_address)
    }
}
function setCurrentLikeComponent(a) {
    loadLikeValue(a);
    like_editor(a)
}
function like_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_like_left").unbind();
    $("#div_like_left").keyup(function() {
        a.setDivLeft($("#div_like_left").val())
    });
    $("#div_like_top").unbind();
    $("#div_like_top").keyup(function() {
        a.setDivTop($("#div_like_top").val())
    });
    $("#text_like_address").unbind();
    $("#text_like_address").keyup(function() {
        var f = $("#text_like_address").val();
        a.setText_Like_Address(f);
        var c = /id=(\d+)/;
        if (c.test(f) == true) {
            var e = f.match(c);
            a.setText_Like_ID(e[1])
        } else {}
    });
    $("input:radio[name=like_skin]").off("ifChanged");
    $("input:radio[name=like_skin]").on("ifChanged",
    function() {
        a.setText_Like_Skin($(this).val())
    })
}
function loadLikeValue(f) {
    var d = f;
    if (d == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_like").css("display", "block");
    var e = f.getComID();
    var a = e.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_like_left").val(d.getDivLeft());
    $("#div_like_top").val(d.getDivTop());
    $("#text_like_address").val(d.getText_Like_Address());
    $(".like_skin").val(d.getText_Like_Skin());
    $("input:radio[name=like_skin]").off("ifChanged");
    if (d.getText_Like_Skin() == "1") {
        $("#text_like_skin1").iCheck("check")
    } else {
        $("#text_like_skin2").iCheck("check")
    }
}
var CollectionComponent = function(i, g) {
    var m = i;
    var o = g;
    var j = "collection";
    var f = "收藏";
    var l = "230px";
    var h = "150px";
    var e = getawleft();
    var c = getawtop();
    var d = "http://item.taobao.com/item.htm?id=27344664315";
    var k = "http://img02.taobaocdn.com/imgextra/i2/310902331/TB23KD.cFXXXXaqXXXXXXXXXXXX-310902331.jpg";
    var a = "";
    var q = null;
    var n = new StringUtil();
    p();
    function p() {
        if (o == null || o == "" || o == 0) {
            o = 2
        }
        a += "<div id='" + m + "' name='" + j + "' class='" + getInitClass_abs() + " aw_collection' style='z-index:" + o + ";top:" + c + ";left:" + e + ";width:" + l + ";height:" + h + ";'>";
        a += "<div class='close_drag' style='width:" + l + ";height:" + h + ";'></div>";
        a += '<a class="J_TokenSign" href=\'' + d + "' target='_blank'><img src='" + k + "' style='width:" + l + ";height:" + h + "' /></a>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        q = $(a)
    }
    this.setComID = function(r) {
        m = r
    };
    this.getComID = function() {
        return m
    };
    this.setComName = function(r) {
        j = r
    };
    this.getComName = function() {
        return j
    };
    this.setDivZIndex = function(r) {
        o = r;
        q.css("z-index", o)
    };
    this.getDivZIndex = function() {
        return o
    };
    this.getComCnName = function() {
        return f
    };
    this.setDivWidth = function(r) {
        l = n.addUtil("width", r);
        q.find(".close_drag").css("width", l);
        q.find("img").css("width", l);
        q.css("width", l)
    };
    this.getDivWidth = function() {
        return n.delUtil(l)
    };
    this.setDivHeight = function(r) {
        h = n.addUtil("height", r);
        q.find(".close_drag").css("height", h);
        q.find("img").css("height", h);
        q.css("height", h)
    };
    this.getDivHeight = function() {
        return n.delUtil(h)
    };
    this.setDivLeft = function(r) {
        e = n.addUtil("left", r);
        q.css("left", e)
    };
    this.getDivLeft = function() {
        return n.delUtil(e)
    };
    this.setDivTop = function(r) {
        c = n.addUtil("top", r);
        q.css("top", c)
    };
    this.getDivTop = function() {
        return n.delUtil(c)
    };
    this.setText_Collection_Address = function(r) {
        d = r
    };
    this.getText_Collection_Address = function() {
        return d
    };
    this.setText_Collection_Photo = function(r) {
        k = r;
        q.find("img").attr("src", k)
    };
    this.getText_Collection_Photo = function() {
        return k
    };
    this.getComponent = function() {
        return q
    };
    this.getCssCode = function() {
        var r = "";
        r += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + j + '" style="z-index:' + o + ";top:" + c + ";left:" + e + ";width:" + l + ";height:" + h + ';">';
        r += '<a class="J_TokenSign" href="' + d + '" target="_blank"><img src="' + k + '" style="width:' + l + ";height:" + h + '"/></a>';
        r += "</div></bdo>";
        return r
    };
    this.getJSON = function() {
        var r = {
            comID: m,
            comName: j,
            div_z_index: o,
            div_width: l,
            div_height: h,
            div_left: e,
            div_top: c,
            text_collection_address: d,
            text_collection_photo: k
        };
        return r
    };
    this.gethtmlJSON = function(x) {
        var t = "collection_" + i_collection;
        i_collection++;
        var B = t;
        var C = z_index++;
        var A = "";
        var y = "";
        var v = 0;
        var r = 0;
        var s = "";
        var z = "";
        var u = /data-type="collection" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px/ig;
        var w = u.exec(x);
        if (w) {
            r = w[2];
            v = w[3]
        }
        u = /style="width:(\d+)px;height:(\d+)px/ig;
        w = u.exec(x);
        if (w) {
            A = w[1];
            y = w[2]
        }
        u = /img src="([^"]*)"/ig;
        w = u.exec(x);
        if (w) {
            z = w[1]
        }
        u = /href="(.*)" target=/ig;
        w = u.exec(x);
        if (w) {
            s = w[1]
        }
        var D = {
            comID: B,
            comName: j,
            div_z_index: C,
            div_width: A,
            div_height: y,
            div_left: v,
            div_top: r,
            text_collection_address: s,
            text_collection_photo: z
        };
        return D
    };
    this.addClickEvent = function() {
        q.bind("click", $.proxy(this.eventhandler, this));
        q.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(r) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        q.addClass("ui-draggable-selected");
        setCurrentCollectionComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(r) {
        removeCurrenComponent(this, r)
    }
};
function initToolCollection() {
    $("#comcollection").click(function() {
        initCollection(null)
    })
}
var i_collection = 0;
function initCollection(a) {
    var f = "collection_" + i_collection;
    i_collection++;
    var e = new CollectionComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentCollectionComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_collection_left").val(c);
            $("#div_collection_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_collection_left").val(c);
            $("#div_collection_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentCollectionComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_collection_width").val(c);
            $("#div_collection_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_collection_width").val(c);
            $("#div_collection_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadCollectionFromDB(e, a);
    setCurrentCollectionComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadCollectionFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_collection_address != "") {
        e.setText_Collection_Address(d.text_collection_address)
    }
    if (d.text_collection_photo != "") {
        e.setText_Collection_Photo(d.text_collection_photo)
    }
}
function setCurrentCollectionComponent(a) {
    loadCollectionValue(a);
    collection_editor(a)
}
function collection_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_collection_height").unbind();
    $("#div_collection_height").keyup(function() {
        a.setDivHeight($("#div_collection_height").val())
    });
    $("#div_collection_width").unbind();
    $("#div_collection_width").keyup(function() {
        a.setDivWidth($("#div_collection_width").val())
    });
    $("#div_collection_left").unbind();
    $("#div_collection_left").keyup(function() {
        a.setDivLeft($("#div_collection_left").val())
    });
    $("#div_collection_top").unbind();
    $("#div_collection_top").keyup(function() {
        a.setDivTop($("#div_collection_top").val())
    });
    $("#text_collection_address").unbind();
    $("#text_collection_address").keyup(function() {
        a.setText_Collection_Address($("#text_collection_address").val())
    });
    $("#text_collection_photo").unbind();
    $("#text_collection_photo").keyup(function() {
        a.setText_Collection_Photo($("#text_collection_photo").val())
    })
}
function loadCollectionValue(f) {
    var d = f;
    if (d == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_collection").css("display", "block");
    var e = f.getComID();
    var a = e.split("_")[1];
    showComName(f.getComCnName() + " " + a);
    f.getComponent().attr("tabindex", 0);
    f.getComponent().focus();
    f.getComponent().find("input[name='btn_del']").focus();
    $("#div_collection_height").val(d.getDivHeight());
    $("#div_collection_width").val(d.getDivWidth());
    $("#div_collection_left").val(d.getDivLeft());
    $("#div_collection_top").val(d.getDivTop());
    $("#text_collection_address").val(d.getText_Collection_Address());
    $("#text_collection_photo").val(d.getText_Collection_Photo())
}
var CartComponent = function(k, g) {
    var n = k;
    var p = g;
    var l = "cart";
    var e = "购物车";
    var m = "120px";
    var j = "31px";
    var d = getawleft();
    var c = getawtop();
    var i = "_blank";
    var h = "http://item.taobao.com/item.htm?id=27344664315";
    var f = "http://img03.taobaocdn.com/imgextra/i3/310902331/TB2CA28cFXXXXaDXXXXXXXXXXXX-310902331.png";
    var a = "";
    var r = null;
    var o = new StringUtil();
    q();
    function q() {
        if (p == null || p == "" || p == 0) {
            p = 2
        }
        a += "<div id='" + n + "' name='" + l + "' class='" + getInitClass_abs() + " aw_cart' style='z-index:" + p + ";top:" + c + ";left:" + d + ";width:" + m + ";height:" + j + ";'>";
        a += "<div class='close_drag' style='width:" + m + ";height:" + j + ";'></div>";
        a += "<a class='J_CartPluginTrigger' href='" + h + "' target='" + i + "' title='加入购物车'><img src='" + f + "' style='width:" + m + ";height:" + j + "' /></a>";
        a += "<input class='x_close' type='button' name='btn_del'/>";
        a += "</div>";
        r = $(a)
    }
    this.setComID = function(s) {
        n = s
    };
    this.getComID = function() {
        return n
    };
    this.setComName = function(s) {
        l = s
    };
    this.getComName = function() {
        return l
    };
    this.setDivZIndex = function(s) {
        p = s;
        r.css("z-index", p)
    };
    this.getDivZIndex = function() {
        return p
    };
    this.getComCnName = function() {
        return e
    };
    this.setDivWidth = function(s) {
        m = o.addUtil("width", s);
        r.find(".close_drag").css("width", m);
        r.find("img").css("width", m);
        r.css("width", m)
    };
    this.getDivWidth = function() {
        return o.delUtil(m)
    };
    this.setDivHeight = function(s) {
        j = o.addUtil("height", s);
        r.find(".close_drag").css("height", j);
        r.find("img").css("height", j);
        r.css("height", j)
    };
    this.getDivHeight = function() {
        return o.delUtil(j)
    };
    this.setDivLeft = function(s) {
        d = o.addUtil("left", s);
        r.css("left", d)
    };
    this.getDivLeft = function() {
        return o.delUtil(d)
    };
    this.setDivTop = function(s) {
        c = o.addUtil("top", s);
        r.css("top", c)
    };
    this.getDivTop = function() {
        return o.delUtil(c)
    };
    this.setText_Cart_Target = function(s) {
        i = s
    };
    this.getText_Cart_Target = function() {
        return i
    };
    this.setText_Cart_Address = function(s) {
        h = s
    };
    this.getText_Cart_Address = function() {
        return h
    };
    this.setText_Cart_Photo = function(s) {
        f = s;
        r.find("img").attr("src", f)
    };
    this.getText_Cart_Photo = function() {
        return f
    };
    this.getComponent = function() {
        return r
    };
    this.getCssCode = function() {
        var s = "";
        s += '<bdo><div class="' + getInitClass_abs() + '" data-type="' + l + '" style="z-index:' + p + ";top:" + c + ";left:" + d + ";width:" + m + ";height:" + j + ';">';
        s += '<a class="J_CartPluginTrigger" href="' + h + '" target="' + i + '" title="加入购物车"><img src="' + f + '" style="width:' + m + ";height:" + j + '"/></a>';
        s += "</div></bdo>";
        return s
    };
    this.gethtmlJSON = function(y) {
        var t = "cart_" + i_cart;
        i_cart++;
        var D = t;
        var E = z_index++;
        var C = "";
        var B = "";
        var v = 0;
        var s = 0;
        var A = "_blank";
        var z = "";
        var w = "";
        var u = /data-type="cart" style="z-index:(\d+);top:([-|\d]+)px;left:([-|\d]+)px;width:(\d+)px;height:(\d+)px;/ig;
        var x = u.exec(y);
        if (x) {
            s = x[2];
            v = x[3];
            C = x[4];
            B = x[5]
        }
        u = /href="(.*)" target/ig;
        x = u.exec(y);
        if (x) {
            z = x[1]
        }
        u = /src="(.*)" style/ig;
        x = u.exec(y);
        if (x) {
            w = x[1]
        }
        var F = {
            comID: D,
            comName: l,
            div_z_index: E,
            div_width: C,
            div_height: B,
            div_left: v,
            div_top: s,
            text_cart_target: A,
            text_cart_address: z,
            text_cart_photo: w
        };
        return F
    };
    this.getJSON = function() {
        var s = {
            comID: n,
            comName: l,
            div_z_index: p,
            div_width: m,
            div_height: j,
            div_left: d,
            div_top: c,
            text_cart_target: i,
            text_cart_address: h,
            text_cart_photo: f
        };
        return s
    };
    this.addClickEvent = function() {
        r.bind("click", $.proxy(this.eventhandler, this));
        r.find("input[name='btn_del']").on("click keydown", $.proxy(this.eventRemoveComponent, this))
    };
    this.eventhandler = function(s) {
        dropMydialog("#xdialog");
        removeClass("ui-draggable-selected");
        r.addClass("ui-draggable-selected");
        setCurrentCartComponent(this);
        setSelectedMenumin(this)
    };
    this.eventRemoveComponent = function(s) {
        removeCurrenComponent(this, s)
    }
};
function initToolCart() {
    $("#comcart").click(function() {
        initCart(null)
    })
}
var i_cart = 0;
function initCart(a) {
    var f = "cart_" + i_cart;
    i_cart++;
    var e = new CartComponent(f, z_index);
    z_index++;
    var d = e.getComponent();
    removeClass("ui-draggable-selected");
    d.addClass("ui-draggable-selected");
    d.appendTo(box).draggable({
        start: function(g, h) {
            if (align_comArray.length < 2) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
            setCurrentCartComponent(e);
            var c = dragNotSelectedComponent(e.getComID());
            if (!c) {
                removeClass("ui-draggable-selected");
                d.addClass("ui-draggable-selected")
            }
        },
        stop: function(h, i) {
            removeClass("ui-draggable-selected-app");
            var c = i.position.left;
            var g = i.position.top;
            $("#div_cart_left").val(c);
            $("#div_cart_top").val(g);
            e.setDivLeft(c);
            e.setDivTop(g)
        },
        drag: function(h, i) {
            onDrag(h, i);
            var c = i.position.left;
            var g = i.position.top;
            $("#div_cart_left").val(c);
            $("#div_cart_top").val(g);
            dragMoreComponent(parseInt(e.getDivLeft()), parseInt(e.getDivTop()), c, g)
        }
    });
    d.resizable({
        handles: "all",
        start: function(c, g) {
            removeClass("ui-draggable-selected");
            d.addClass("ui-draggable-selected");
            setCurrentCartComponent(e)
        },
        stop: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_cart_width").val(c);
            $("#div_cart_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        },
        resize: function(i, j) {
            var c = j.size.width;
            var g = j.size.height;
            $("#div_cart_width").val(c);
            $("#div_cart_height").val(g);
            e.setDivWidth(c.toString());
            e.setDivHeight(g.toString())
        }
    });
    e.addClickEvent();
    loadCartFromDB(e, a);
    setCurrentCartComponent(e);
    comArray.push(e);
    loadMenumin();
    function_obj.comArr = comArray.concat();
    selectMoreComponent(e)
}
function loadCartFromDB(e, d) {
    if (e == null || d == null) {
        return
    }
    var a = new StringUtil();
    if (d.comID != "") {
        e.setComID(d.comID)
    }
    if (d.comName != "") {
        e.setComName(d.comName)
    }
    if (d.div_z_index != "") {
        e.setDivZIndex(d.div_z_index)
    }
    if (d.div_height != "") {
        e.setDivHeight(a.delUtil(d.div_height))
    }
    if (d.div_width != "") {
        e.setDivWidth(a.delUtil(d.div_width))
    }
    if (d.div_left != "") {
        e.setDivLeft(a.delUtil(d.div_left))
    }
    if (d.div_top != "") {
        e.setDivTop(a.delUtil(d.div_top))
    }
    if (d.text_cart_target != "") {
        e.setText_Cart_Target(d.text_cart_target)
    }
    if (d.text_cart_address != "") {
        e.setText_Cart_Address(d.text_cart_address)
    }
    if (d.text_cart_photo != "") {
        e.setText_Cart_Photo(d.text_cart_photo)
    }
}
function setCurrentCartComponent(a) {
    loadCartValue(a);
    cart_editor(a)
}
function cart_editor(d) {
    var a = d;
    if (a == null) {
        alert("请选中要编辑的组件");
        return
    }
    $("#div_cart_height").unbind();
    $("#div_cart_height").keyup(function() {
        a.setDivHeight($("#div_cart_height").val())
    });
    $("#div_cart_width").unbind();
    $("#div_cart_width").keyup(function() {
        a.setDivWidth($("#div_cart_width").val())
    });
    $("#div_cart_left").unbind();
    $("#div_cart_left").keyup(function() {
        a.setDivLeft($("#div_cart_left").val())
    });
    $("#div_cart_top").unbind();
    $("#div_cart_top").keyup(function() {
        a.setDivTop($("#div_cart_top").val())
    });
    $("#text_cart_target").off("ifChanged");
    $("#text_cart_target").on("ifChanged",
    function() {
        if ($("#text_cart_target").prop("checked")) {
            a.setText_Cart_Target("_blank")
        } else {
            a.setText_Cart_Target("_self")
        }
    });
    $("#text_cart_address").unbind();
    $("#text_cart_address").keyup(function() {
        a.setText_Cart_Address($("#text_cart_address").val())
    });
    $("#text_cart_photo").unbind();
    $("#text_cart_photo").keyup(function() {
        a.setText_Cart_Photo($("#text_cart_photo").val())
    })
}
function loadCartValue(g) {
    var e = g;
    if (e == null) {
        alert("请选中要编辑的组件");
        return
    }
    hideEditor();
    $(".aw_cart").css("display", "block");
    var f = g.getComID();
    var a = f.split("_")[1];
    showComName(g.getComCnName() + " " + a);
    g.getComponent().attr("tabindex", 0);
    g.getComponent().focus();
    g.getComponent().find("input[name='btn_del']").focus();
    $("#div_cart_height").val(e.getDivHeight());
    $("#div_cart_width").val(e.getDivWidth());
    $("#div_cart_left").val(e.getDivLeft());
    $("#div_cart_top").val(e.getDivTop());
    var d = "";
    if (e.getText_Cart_Target() == "_blank") {
        d = "check"
    } else {
        d = "uncheck"
    }
    $("#text_cart_target").off("ifChanged");
    $("#text_cart_target").iCheck(d);
    $("#text_cart_address").val(e.getText_Cart_Address());
    $("#text_cart_photo").val(e.getText_Cart_Photo())
};