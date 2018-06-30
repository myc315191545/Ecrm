/** kit_admin-v1.0.4 MIT License By http://kit/zhengjinfan.cn */
;layui.define(["jquery", "element", "nprogress"], function (i) {
    var jq = layui.jquery;
    var t = layui.jquery, e = layui.element, a = t(document), l = t(window), n = function () {
        this.config = {elem: void 0, mainUrl: "index.html"}, this.v = "1.0.2"
    };
    (n.fn = n.prototype).set = function (i) {
        var e = this;
        return t.extend(!0, e.config, i), e
    }, n.fn.render = function () {
        var i = this, t = i.config;
        return void 0 === t.elem ? (layui.hint().error("Tab error:请配置选择卡容器."), i) : (c._config = t, c.createTabDom(), i)
    }, n.fn.tabAdd = function (i) {
        c.tabAdd(i)
    };
    var c = {
        _config: {},
        _filter: "kitTab",
        _title: void 0,
        _content: void 0,
        _parentElem: void 0,
        tabDomExists: function () {
            var i = this;
            return a.find("div.kit-tab").length > 0 && (i._title = t(".kit-tab ul.layui-tab-title"), i._content = t(".kit-tab div.layui-tab-content"), !0)
        },
        createTabDom: function () {
            var i = this, e = i._config;

            if (i._parentElem = e.elem, !i.tabDomExists()) {
                var a = ['<div class="layui-tab layui-tab-card kit-tab" lay-filter="' + i._filter + '">', '<ul class="layui-tab-title">',
                    '<li class="layui-this" lay-id="-1"><i class="layui-icon">&#xe68e;</i> 首页</li>',
                    "</ul>", '<div class="layui-tab-content">', '<div class="layui-tab-item layui-show" lay-item-id="-1">' +
                    '<iframe src="' + e.mainUrl + '"></iframe></div>', "</div>", "</div>"];
                t(e.elem).html(a.join("")), i._title = t(".kit-tab ul.layui-tab-title"), i._content = t(".kit-tab div.layui-tab-content");

            }

        },
        winResize: function () {
            var i = this;
            l.on("resize", function () {
                var e = t(i._parentElem).height();
                t(".kit-tab .layui-tab-content iframe").height(e - 45)
            }).resize()
        },
        tabExists: function (i) {
            return this._title.find("li[lay-id=" + i + "]").length > 0
        },
        tabDelete: function (i) {
            e.tabDelete(this._filter, n)
        },
        tabChange: function (i) {
            e.tabChange(this._filter, i)
        },
        getTab: function (i) {
            return this._title.find("li[lay-id=" + i + "]")
        },
        tabAdd: function (i) {
            //设置成打开一个关掉另一个
            var tab_id = this._filter;
            var tab = jq(".kit-tab");
            tab.find("li").each(function () {
                var child_lay_id = jq(this).attr("lay-id");
                if(-1 != child_lay_id )
                {
                    e.tabDelete(tab_id, child_lay_id);
                }
            })

            var t = this, a = t._config,
                l = (i = i || {id: (new Date).getTime(), title: "新标签页", icon: "fa-file", url: "404.html"}).title,
                n = i.icon, c = i.url, s = i.id;
            if (t.tabExists(s)) {
                t.tabChange(s);
            } else {

                t._title.children("li[lay-id]").each(function () {
                    var e = this.id;
                    "" != e && t.tabDelete(0)
                })

                NProgress.start();
                var r = ['<li class="layui-this" lay-id="' + s + '" >'];
                -1 !== n.indexOf("fa-") ? r.push('<i class="fa ' + n + '" aria-hidden="true"></i>') :
                    r.push('<i class="layui-icon">' + n + "</i>"),
                    r.push("&nbsp;" + l),
                    r.push('<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>'),
                    r.push("</li>");
                var o = '<div class="layui-tab-item layui-show" lay-item-id="' + s + '"><iframe src="' + c + '"></iframe></div>';
                t._title.append(r.join("")),
                    t._content.append(o),
                    t.getTab(s).find("i.layui-tab-close").off("click").on("click", function () {
                        a.closeBefore ? a.closeBefore(i) && t.tabDelete(s) : t.tabDelete(s)
                    }),
                    t.tabChange(s),
                    t.winResize(),
                    t._content.find("div[lay-item-id=" + s + "]").find("iframe").on("load", function () {
                        NProgress.done()
                    }),
                a.onSwitch && e.on("tab(" + t._filter + ")", function (i) {
                    a.onSwitch({
                        index: i.index,
                        elem: i.elem,
                        layId: t._title.children("li").eq(i.index).attr("lay-id")
                    })
                })
            }
        }
    };
    i("tab", new n)
});