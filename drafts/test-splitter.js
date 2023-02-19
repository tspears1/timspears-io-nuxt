// warm & fuzzzy
// a2e39b1.js line 866
// 228: function(t, e, n) {
//     "use strict";
//     n.r(e);
//     n(16),
//     n(12),
//     n(14),
//     n(18),
//     n(19);
//     var r = n(151)
//       , o = n(5)
//       , l = (n(150),
//     n(37),
//     n(62),
//     n(10),
//     n(11))
//       , c = n(74);
//     function d(object, t) {
//         var e = Object.keys(object);
//         if (Object.getOwnPropertySymbols) {
//             var n = Object.getOwnPropertySymbols(object);
//             t && (n = n.filter((function(t) {
//                 return Object.getOwnPropertyDescriptor(object, t).enumerable
//             }
//             ))),
//             e.push.apply(e, n)
//         }
//         return e
//     }
//     var h = {
//         name: "TextSplitter",
//         props: {
//             content: {
//                 type: String,
//                 required: !0
//             },
//             type: {
//                 type: String,
//                 required: !1,
//                 default: "lines"
//             },
//             baseDelay: {
//                 type: Number,
//                 required: !1,
//                 default: 0
//             },
//             linesClass: {
//                 type: String,
//                 required: !1,
//                 default: null
//             },
//             wordsClass: {
//                 type: String,
//                 required: !1,
//                 default: null
//             },
//             charsClass: {
//                 type: String,
//                 required: !1,
//                 default: null
//             },
//             hasOverflow: {
//                 type: Boolean,
//                 required: !1,
//                 default: !1
//             },
//             callback: {
//                 type: Function,
//                 required: !1,
//                 default: function() {}
//             }
//         },
//         data: function() {
//             return {
//                 isSplitted: !1,
//                 outerSplit: null,
//                 split: null
//             }
//         },
//         computed: function(t) {
//             for (var i = 1; i < arguments.length; i++) {
//                 var source = null != arguments[i] ? arguments[i] : {};
//                 i % 2 ? d(Object(source), !0).forEach((function(e) {
//                     Object(o.a)(t, e, source[e])
//                 }
//                 )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source)) : d(Object(source)).forEach((function(e) {
//                     Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e))
//                 }
//                 ))
//             }
//             return t
//         }({}, Object(l.c)("app", ["getIsFontLoaded"])),
//         mounted: function() {
//             var t = this;
//             this.$nextTick().then((function() {
//                 t.getIsFontLoaded ? t.onFontLoaded() : t.initEvents()
//             }
//             ))
//         },
//         beforeDestroy: function() {
//             this.destroyEvents()
//         },
//         methods: {
//             initEvents: function() {
//                 this.$nuxt.$on("WINDOW:RESIZE", this.onResize),
//                 !this.skipLoad && this.$nuxt.$on("FONTS:LOADED", this.onFontLoaded)
//             },
//             destroyEvents: function() {
//                 this.$nuxt.$off("WINDOW:RESIZE", this.onResize),
//                 !this.skipLoad && this.$nuxt.$off("FONTS:LOADED", this.onFontLoaded)
//             },
//             onFontLoaded: function() {
//                 this.initSplit()
//             },
//             initSplit: function() {
//                 var t = Object(r.a)(this.$refs.container.querySelectorAll("p"));
//                 this.hasOverflow ? (this.outerSplit = new c.a(this.$refs.container,{
//                     type: "lines",
//                     linesClass: "oh"
//                 }),
//                 this.split = new c.a(this.outerSplit.lines,{
//                     type: this.type,
//                     linesClass: this.linesClass || "anim-line anim-line--t",
//                     wordsClass: this.wordsClass || "",
//                     charsClass: this.charsClass || ""
//                 })) : this.split = new c.a(t.length ? t : this.$refs.container,{
//                     type: this.type,
//                     linesClass: this.linesClass || "anim-line anim-line--t",
//                     wordsClass: this.wordsClass || "",
//                     charsClass: this.charsClass || ""
//                 }),
//                 this.setDelay(),
//                 !this.isSplitted && this.callback && this.callback(),
//                 this.isSplitted = !0
//             },
//             setDelay: function() {
//                 var t = this;
//                 if ("lines" === this.type) {
//                     var e = 0;
//                     this.split.lines.forEach((function(line) {
//                         line.style.transitionDelay = "".concat(t.baseDelay + e, "s"),
//                         e += .1
//                     }
//                     ))
//                 } else if ("words" === this.type) {
//                     var n = 0;
//                     this.split.words.forEach((function(line) {
//                         line.style.transitionDelay = "".concat(t.baseDelay + n, "s"),
//                         n += .08
//                     }
//                     ))
//                 }
//             },
//             revertSplit: function() {
//                 this.isSplitted && this.split.revert(),
//                 this.hasOverflow && this.outerSplit.revert()
//             },
//             onResize: function() {
//                 this.revertSplit(),
//                 this.initSplit()
//             }
//         }
//     }
//       , f = h
//       , m = (n(286),
//     n(7))
//       , component = Object(m.a)(f, (function() {
//         var t = this
//           , e = t.$createElement;
//         return (t._self._c || e)("span", {
//             ref: "container",
//             staticClass: "text-splitter",
//             class: {
//                 "text-splitter--splitted": t.isSplitted
//             },
//             domProps: {
//                 innerHTML: t._s(t.content)
//             }
//         })
//     }
//     ), [], !1, null, null, null);
//     e.default = component.exports
// }