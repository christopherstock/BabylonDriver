!function (e, t) {
    if ("function" == typeof define && define.amd)define([], t); else if ("object" == typeof exports) {
        var i = t();
        "object" == typeof module && module && module.exports && (exports = module.exports = i), exports.randomColor = i
    } else e.randomColor = t()
}(this, function () {
    function i(e) {
        var t = a(e.hue), i = c(t);
        return 0 > i && (i = 360 + i), i
    }

    function s(e, t) {
        if ("random" === t.luminosity)return c([0, 100]);
        if ("monochrome" === t.hue)return 0;
        var i = h(e), s = i[0], o = i[1];
        switch (t.luminosity) {
            case"bright":
                s = 55;
                break;
            case"dark":
                s = o - 10;
                break;
            case"light":
                o = 55
        }
        return c([s, o])
    }

    function o(e, t, i) {
        var o = r(e, t), n = 100;
        switch (i.luminosity) {
            case"dark":
                n = o + 20;
                break;
            case"light":
                o = (n + o) / 2;
                break;
            case"random":
                o = 0, n = 100
        }
        return c([o, n])
    }

    function n(e, t) {
        switch (t.format) {
            case"hsvArray":
                return e;
            case"hsv":
                return B("hsv", e);
            case"rgbArray":
                return g(e);
            case"rgb":
                return B("rgb", g(e));
            default:
                return u(e)
        }
    }

    function r(e, t) {
        for (var i = l(e).lowerBounds, s = 0; s < i.length - 1; s++) {
            var o = i[s][0], n = i[s][1], r = i[s + 1][0], a = i[s + 1][1];
            if (t >= o && r >= t) {
                var h = (a - n) / (r - o), c = n - h * o;
                return h * t + c
            }
        }
        return 0
    }

    function a(t) {
        if ("number" == typeof parseInt(t)) {
            var i = parseInt(t);
            if (360 > i && i > 0)return [i, i]
        }
        if ("string" == typeof t && e[t]) {
            var s = e[t];
            if (s.hueRange)return s.hueRange
        }
        return [0, 360]
    }

    function h(e) {
        return l(e).saturationRange
    }

    function l(t) {
        t >= 334 && 360 >= t && (t -= 360);
        for (var i in e) {
            var s = e[i];
            if (s.hueRange && t >= s.hueRange[0] && t <= s.hueRange[1])return e[i]
        }
        return "Color not found"
    }

    function c(e) {
        return Math.floor(e[0] + Math.random() * (e[1] + 1 - e[0]))
    }

    function u(e) {
        function i(e) {
            var t = e.toString(16);
            return 1 == t.length ? "0" + t : t
        }

        var t = g(e), s = "#" + i(t[0]) + i(t[1]) + i(t[2]);
        return s
    }

    function p(t, i, s) {
        var o = s[0][0], n = s[s.length - 1][0], r = s[s.length - 1][1], a = s[0][1];
        e[t] = {hueRange: i, lowerBounds: s, saturationRange: [o, n], brightnessRange: [r, a]}
    }

    function f() {
        p("monochrome", null, [[0, 0], [100, 0]]), p("red", [-26, 18], [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]), p("orange", [19, 46], [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]), p("yellow", [47, 62], [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]), p("green", [63, 178], [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]), p("blue", [179, 257], [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]), p("purple", [258, 282], [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]), p("pink", [283, 334], [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]])
    }

    function g(e) {
        var t = e[0];
        0 === t && (t = 1), 360 === t && (t = 359), t /= 360;
        var i = e[1] / 100, s = e[2] / 100, o = Math.floor(6 * t), n = 6 * t - o, r = s * (1 - i), a = s * (1 - n * i), h = s * (1 - (1 - n) * i), l = 256, c = 256, d = 256;
        switch (o) {
            case 0:
                l = s, c = h, d = r;
                break;
            case 1:
                l = a, c = s, d = r;
                break;
            case 2:
                l = r, c = s, d = h;
                break;
            case 3:
                l = r, c = a, d = s;
                break;
            case 4:
                l = h, c = r, d = s;
                break;
            case 5:
                l = s, c = r, d = a
        }
        var u = [Math.floor(255 * l), Math.floor(255 * c), Math.floor(255 * d)];
        return u
    }

    function B(e, t) {
        return e + "(" + t.join(", ") + ")"
    }

    var e = {};
    f();
    var t = function (e) {
        e = e || {};
        var r, a, h;
        if (null != e.count) {
            var l = e.count, c = [];
            for (e.count = null; l > c.length;)c.push(t(e));
            return e.count = l, c
        }
        return r = i(e), a = s(r, e), h = o(r, a, e), n([r, a, h], e)
    };
    return t
});