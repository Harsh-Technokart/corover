if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
!(function (t) {
  "use strict";
  (t.fn.emulateTransitionEnd = function (e) {
    var i = !1,
      o = this;
    t(this).one(t.support.transition.end, function () {
      i = !0;
    });
    return (
      setTimeout(function () {
        i || t(o).trigger(t.support.transition.end);
      }, e),
      this
    );
  }),
    t(function () {
      t.support.transition = (function () {
        var t = document.createElement("bootstrap"),
          e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend",
          };
        for (var i in e) if (void 0 !== t.style[i]) return { end: e[i] };
        return !1;
      })();
    });
})(jQuery),
  (function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
      i = function (i) {
        t(i).on("click", e, this.close);
      };
    i.prototype.close = function (e) {
      function i() {
        s.trigger("closed.bs.alert").remove();
      }
      var o = t(this),
        n = o.attr("data-target");
      n || (n = (n = o.attr("href")) && n.replace(/.*(?=#[^\s]*$)/, ""));
      var s = t(n);
      e && e.preventDefault(),
        s.length || (s = o.hasClass("alert") ? o : o.parent()),
        s.trigger((e = t.Event("close.bs.alert"))),
        e.isDefaultPrevented() ||
          (s.removeClass("in"),
          t.support.transition && s.hasClass("fade")
            ? s.one(t.support.transition.end, i).emulateTransitionEnd(150)
            : i());
    };
    var o = t.fn.alert;
    (t.fn.alert = function (e) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.alert");
        n || o.data("bs.alert", (n = new i(this))),
          "string" == typeof e && n[e].call(o);
      });
    }),
      (t.fn.alert.Constructor = i),
      (t.fn.alert.noConflict = function () {
        return (t.fn.alert = o), this;
      }),
      t(document).on("click.bs.alert.data-api", e, i.prototype.close);
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (i, o) {
      (this.$element = t(i)),
        (this.options = t.extend({}, e.DEFAULTS, o)),
        (this.isLoading = !1);
    };
    (e.DEFAULTS = { loadingText: "loading..." }),
      (e.prototype.setState = function (e) {
        var i = "disabled",
          o = this.$element,
          n = o.is("input") ? "val" : "html",
          s = o.data();
        (e += "Text"),
          s.resetText || o.data("resetText", o[n]()),
          o[n](s[e] || this.options[e]),
          setTimeout(
            t.proxy(function () {
              "loadingText" == e
                ? ((this.isLoading = !0), o.addClass(i).attr(i, i))
                : this.isLoading &&
                  ((this.isLoading = !1), o.removeClass(i).removeAttr(i));
            }, this),
            0
          );
      }),
      (e.prototype.toggle = function () {
        var t = !0,
          e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
          var i = this.$element.find("input");
          "radio" == i.prop("type") &&
            (i.prop("checked") && this.$element.hasClass("active")
              ? (t = !1)
              : e.find(".active").removeClass("active")),
            t &&
              i
                .prop("checked", !this.$element.hasClass("active"))
                .trigger("change");
        }
        t && this.$element.toggleClass("active");
      });
    var i = t.fn.button;
    (t.fn.button = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.button"),
          s = "object" == typeof i && i;
        n || o.data("bs.button", (n = new e(this, s))),
          "toggle" == i ? n.toggle() : i && n.setState(i);
      });
    }),
      (t.fn.button.Constructor = e),
      (t.fn.button.noConflict = function () {
        return (t.fn.button = i), this;
      }),
      t(document).on(
        "click.bs.button.data-api",
        "[data-toggle^=button]",
        function (e) {
          var i = t(e.target);
          i.hasClass("btn") || (i = i.closest(".btn")),
            i.button("toggle"),
            e.preventDefault();
        }
      );
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (e, i) {
      (this.$element = t(e)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = i),
        (this.paused =
          this.sliding =
          this.interval =
          this.$active =
          this.$items =
            null),
        "hover" == this.options.pause &&
          this.$element
            .on("mouseenter", t.proxy(this.pause, this))
            .on("mouseleave", t.proxy(this.cycle, this));
    };
    (e.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }),
      (e.prototype.cycle = function (e) {
        return (
          e || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              t.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (e.prototype.getActiveIndex = function () {
        return (
          (this.$active = this.$element.find(".item.active")),
          (this.$items = this.$active.parent().children()),
          this.$items.index(this.$active)
        );
      }),
      (e.prototype.to = function (e) {
        var i = this,
          o = this.getActiveIndex();
        return e > this.$items.length - 1 || 0 > e
          ? void 0
          : this.sliding
          ? this.$element.one("slid.bs.carousel", function () {
              i.to(e);
            })
          : o == e
          ? this.pause().cycle()
          : this.slide(e > o ? "next" : "prev", t(this.$items[e]));
      }),
      (e.prototype.pause = function (e) {
        return (
          e || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            t.support.transition &&
            (this.$element.trigger(t.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (e.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next");
      }),
      (e.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev");
      }),
      (e.prototype.slide = function (e, i) {
        var o = this.$element.find(".item.active"),
          n = i || o[e](),
          s = this.interval,
          r = "next" == e ? "left" : "right",
          a = "next" == e ? "first" : "last",
          l = this;
        if (!n.length) {
          if (!this.options.wrap) return;
          n = this.$element.find(".item")[a]();
        }
        if (n.hasClass("active")) return (this.sliding = !1);
        var h = t.Event("slide.bs.carousel", {
          relatedTarget: n[0],
          direction: r,
        });
        return (
          this.$element.trigger(h),
          h.isDefaultPrevented()
            ? void 0
            : ((this.sliding = !0),
              s && this.pause(),
              this.$indicators.length &&
                (this.$indicators.find(".active").removeClass("active"),
                this.$element.one("slid.bs.carousel", function () {
                  var e = t(l.$indicators.children()[l.getActiveIndex()]);
                  e && e.addClass("active");
                })),
              t.support.transition && this.$element.hasClass("slide")
                ? (n.addClass(e),
                  n[0].offsetWidth,
                  o.addClass(r),
                  n.addClass(r),
                  o
                    .one(t.support.transition.end, function () {
                      n.removeClass([e, r].join(" ")).addClass("active"),
                        o.removeClass(["active", r].join(" ")),
                        (l.sliding = !1),
                        setTimeout(function () {
                          l.$element.trigger("slid.bs.carousel");
                        }, 0);
                    })
                    .emulateTransitionEnd(
                      1e3 * o.css("transition-duration").slice(0, -1)
                    ))
                : (o.removeClass("active"),
                  n.addClass("active"),
                  (this.sliding = !1),
                  this.$element.trigger("slid.bs.carousel")),
              s && this.cycle(),
              this)
        );
      });
    var i = t.fn.carousel;
    (t.fn.carousel = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.carousel"),
          s = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i),
          r = "string" == typeof i ? i : s.slide;
        n || o.data("bs.carousel", (n = new e(this, s))),
          "number" == typeof i
            ? n.to(i)
            : r
            ? n[r]()
            : s.interval && n.pause().cycle();
      });
    }),
      (t.fn.carousel.Constructor = e),
      (t.fn.carousel.noConflict = function () {
        return (t.fn.carousel = i), this;
      }),
      t(document).on(
        "click.bs.carousel.data-api",
        "[data-slide], [data-slide-to]",
        function (e) {
          var i,
            o = t(this),
            n = t(
              o.attr("data-target") ||
                ((i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            s = t.extend({}, n.data(), o.data()),
            r = o.attr("data-slide-to");
          r && (s.interval = !1),
            n.carousel(s),
            (r = o.attr("data-slide-to")) && n.data("bs.carousel").to(r),
            e.preventDefault();
        }
      ),
      t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
          var e = t(this);
          e.carousel(e.data());
        });
      });
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (i, o) {
      (this.$element = t(i)),
        (this.options = t.extend({}, e.DEFAULTS, o)),
        (this.transitioning = null),
        this.options.parent && (this.$parent = t(this.options.parent)),
        this.options.toggle && this.toggle();
    };
    (e.DEFAULTS = { toggle: !0 }),
      (e.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height";
      }),
      (e.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var e = t.Event("show.bs.collapse");
          if ((this.$element.trigger(e), !e.isDefaultPrevented())) {
            var i = this.$parent && this.$parent.find("> .panel > .in");
            if (i && i.length) {
              var o = i.data("bs.collapse");
              if (o && o.transitioning) return;
              i.collapse("hide"), o || i.data("bs.collapse", null);
            }
            var n = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[n](0),
              (this.transitioning = 1);
            var s = function () {
              this.$element
                .removeClass("collapsing")
                .addClass("collapse in")
                [n]("auto"),
                (this.transitioning = 0),
                this.$element.trigger("shown.bs.collapse");
            };
            if (!t.support.transition) return s.call(this);
            var r = t.camelCase(["scroll", n].join("-"));
            this.$element
              .one(t.support.transition.end, t.proxy(s, this))
              .emulateTransitionEnd(350)
              [n](this.$element[0][r]);
          }
        }
      }),
      (e.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var e = t.Event("hide.bs.collapse");
          if ((this.$element.trigger(e), !e.isDefaultPrevented())) {
            var i = this.dimension();
            this.$element[i](this.$element[i]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse")
                .removeClass("in"),
              (this.transitioning = 1);
            var o = function () {
              (this.transitioning = 0),
                this.$element
                  .trigger("hidden.bs.collapse")
                  .removeClass("collapsing")
                  .addClass("collapse");
            };
            return t.support.transition
              ? void this.$element[i](0)
                  .one(t.support.transition.end, t.proxy(o, this))
                  .emulateTransitionEnd(350)
              : o.call(this);
          }
        }
      }),
      (e.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      });
    var i = t.fn.collapse;
    (t.fn.collapse = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.collapse"),
          s = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
        !n && s.toggle && "show" == i && (i = !i),
          n || o.data("bs.collapse", (n = new e(this, s))),
          "string" == typeof i && n[i]();
      });
    }),
      (t.fn.collapse.Constructor = e),
      (t.fn.collapse.noConflict = function () {
        return (t.fn.collapse = i), this;
      }),
      t(document).on(
        "click.bs.collapse.data-api",
        "[data-toggle=collapse]",
        function (e) {
          var i,
            o = t(this),
            n =
              o.attr("data-target") ||
              e.preventDefault() ||
              ((i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
            s = t(n),
            r = s.data("bs.collapse"),
            a = r ? "toggle" : o.data(),
            l = o.attr("data-parent"),
            h = l && t(l);
          (r && r.transitioning) ||
            (h &&
              h
                .find('[data-toggle=collapse][data-parent="' + l + '"]')
                .not(o)
                .addClass("collapsed"),
            o[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
            s.collapse(a);
        }
      );
  })(jQuery),
  (function (t) {
    "use strict";
    function e(e) {
      t(o).remove(),
        t(n).each(function () {
          var o = i(t(this)),
            n = { relatedTarget: this };
          o.hasClass("open") &&
            (o.trigger((e = t.Event("hide.bs.dropdown", n))),
            e.isDefaultPrevented() ||
              o.removeClass("open").trigger("hidden.bs.dropdown", n));
        });
    }
    function i(e) {
      var i = e.attr("data-target");
      i ||
        (i =
          (i = e.attr("href")) &&
          /#[A-Za-z]/.test(i) &&
          i.replace(/.*(?=#[^\s]*$)/, ""));
      var o = i && t(i);
      return o && o.length ? o : e.parent();
    }
    var o = ".dropdown-backdrop",
      n = "[data-toggle=dropdown]",
      s = function (e) {
        t(e).on("click.bs.dropdown", this.toggle);
      };
    (s.prototype.toggle = function (o) {
      var n = t(this);
      if (!n.is(".disabled, :disabled")) {
        var s = i(n),
          r = s.hasClass("open");
        if ((e(), !r)) {
          "ontouchstart" in document.documentElement &&
            !s.closest(".navbar-nav").length &&
            t('<div class="dropdown-backdrop"/>')
              .insertAfter(t(this))
              .on("click", e);
          var a = { relatedTarget: this };
          if (
            (s.trigger((o = t.Event("show.bs.dropdown", a))),
            o.isDefaultPrevented())
          )
            return;
          s.toggleClass("open").trigger("shown.bs.dropdown", a), n.focus();
        }
        return !1;
      }
    }),
      (s.prototype.keydown = function (e) {
        if (/(38|40|27)/.test(e.keyCode)) {
          var o = t(this);
          if (
            (e.preventDefault(),
            e.stopPropagation(),
            !o.is(".disabled, :disabled"))
          ) {
            var s = i(o),
              r = s.hasClass("open");
            if (!r || (r && 27 == e.keyCode))
              return 27 == e.which && s.find(n).focus(), o.click();
            var a = " li:not(.divider):visible a",
              l = s.find("[role=menu]" + a + ", [role=listbox]" + a);
            if (l.length) {
              var h = l.index(l.filter(":focus"));
              38 == e.keyCode && h > 0 && h--,
                40 == e.keyCode && h < l.length - 1 && h++,
                ~h || (h = 0),
                l.eq(h).focus();
            }
          }
        }
      });
    var r = t.fn.dropdown;
    (t.fn.dropdown = function (e) {
      return this.each(function () {
        var i = t(this),
          o = i.data("bs.dropdown");
        o || i.data("bs.dropdown", (o = new s(this))),
          "string" == typeof e && o[e].call(i);
      });
    }),
      (t.fn.dropdown.Constructor = s),
      (t.fn.dropdown.noConflict = function () {
        return (t.fn.dropdown = r), this;
      }),
      t(document)
        .on("click.bs.dropdown.data-api", e)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
          t.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", n, s.prototype.toggle)
        .on(
          "keydown.bs.dropdown.data-api",
          n + ", [role=menu], [role=listbox]",
          s.prototype.keydown
        );
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (e, i) {
      (this.options = i),
        (this.$element = t(e)),
        (this.$backdrop = this.isShown = null),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            t.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (e.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (e.prototype.toggle = function (t) {
        return this[this.isShown ? "hide" : "show"](t);
      }),
      (e.prototype.show = function (e) {
        var i = this,
          o = t.Event("show.bs.modal", { relatedTarget: e });
        this.$element.trigger(o),
          this.isShown ||
            o.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.escape(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              t.proxy(this.hide, this)
            ),
            this.backdrop(function () {
              var o = t.support.transition && i.$element.hasClass("fade");
              i.$element.parent().length || i.$element.appendTo(document.body),
                i.$element.show().scrollTop(0),
                o && i.$element[0].offsetWidth,
                i.$element.addClass("in").attr("aria-hidden", !1),
                i.enforceFocus();
              var n = t.Event("shown.bs.modal", { relatedTarget: e });
              o
                ? i.$element
                    .find(".modal-dialog")
                    .one(t.support.transition.end, function () {
                      i.$element.focus().trigger(n);
                    })
                    .emulateTransitionEnd(300)
                : i.$element.focus().trigger(n);
            }));
      }),
      (e.prototype.hide = function (e) {
        e && e.preventDefault(),
          (e = t.Event("hide.bs.modal")),
          this.$element.trigger(e),
          this.isShown &&
            !e.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            t(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .attr("aria-hidden", !0)
              .off("click.dismiss.bs.modal"),
            t.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one(t.support.transition.end, t.proxy(this.hideModal, this))
                  .emulateTransitionEnd(300)
              : this.hideModal());
      }),
      (e.prototype.enforceFocus = function () {
        t(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            t.proxy(function (t) {
              this.$element[0] === t.target ||
                this.$element.has(t.target).length ||
                this.$element.focus();
            }, this)
          );
      }),
      (e.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keyup.dismiss.bs.modal",
              t.proxy(function (t) {
                27 == t.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
      }),
      (e.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(),
          this.backdrop(function () {
            t.removeBackdrop(), t.$element.trigger("hidden.bs.modal");
          });
      }),
      (e.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (e.prototype.backdrop = function (e) {
        var i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var o = t.support.transition && i;
          if (
            ((this.$backdrop = t(
              '<div class="modal-backdrop ' + i + '" />'
            ).appendTo(document.body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              t.proxy(function (t) {
                t.target === t.currentTarget &&
                  ("static" == this.options.backdrop
                    ? this.$element[0].focus.call(this.$element[0])
                    : this.hide.call(this));
              }, this)
            ),
            o && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)
          )
            return;
          o
            ? this.$backdrop
                .one(t.support.transition.end, e)
                .emulateTransitionEnd(150)
            : e();
        } else
          !this.isShown && this.$backdrop
            ? (this.$backdrop.removeClass("in"),
              t.support.transition && this.$element.hasClass("fade")
                ? this.$backdrop
                    .one(t.support.transition.end, e)
                    .emulateTransitionEnd(150)
                : e())
            : e && e();
      });
    var i = t.fn.modal;
    (t.fn.modal = function (i, o) {
      return this.each(function () {
        var n = t(this),
          s = n.data("bs.modal"),
          r = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i);
        s || n.data("bs.modal", (s = new e(this, r))),
          "string" == typeof i ? s[i](o) : r.show && s.show(o);
      });
    }),
      (t.fn.modal.Constructor = e),
      (t.fn.modal.noConflict = function () {
        return (t.fn.modal = i), this;
      }),
      t(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (e) {
          var i = t(this),
            o = i.attr("href"),
            n = t(
              i.attr("data-target") || (o && o.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            s = n.data("bs.modal")
              ? "toggle"
              : t.extend({ remote: !/#/.test(o) && o }, n.data(), i.data());
          i.is("a") && e.preventDefault(),
            n.modal(s, this).one("hide", function () {
              i.is(":visible") && i.focus();
            });
        }
      ),
      t(document)
        .on("show.bs.modal", ".modal", function () {
          t(document.body).addClass("modal-open");
        })
        .on("hidden.bs.modal", ".modal", function () {
          t(document.body).removeClass("modal-open");
        });
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (t, e) {
      (this.type =
        this.options =
        this.enabled =
        this.timeout =
        this.hoverState =
        this.$element =
          null),
        this.init("tooltip", t, e);
    };
    (e.DEFAULTS = {
      animation: !0,
      placement: "top",
      selector: !1,
      template:
        '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      container: !1,
    }),
      (e.prototype.init = function (e, i, o) {
        (this.enabled = !0),
          (this.type = e),
          (this.$element = t(i)),
          (this.options = this.getOptions(o));
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
          var r = n[s];
          if ("click" == r)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              t.proxy(this.toggle, this)
            );
          else if ("manual" != r) {
            var a = "hover" == r ? "mouseenter" : "focusin",
              l = "hover" == r ? "mouseleave" : "focusout";
            this.$element.on(
              a + "." + this.type,
              this.options.selector,
              t.proxy(this.enter, this)
            ),
              this.$element.on(
                l + "." + this.type,
                this.options.selector,
                t.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = t.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (e.prototype.getDefaults = function () {
        return e.DEFAULTS;
      }),
      (e.prototype.getOptions = function (e) {
        return (
          (e = t.extend({}, this.getDefaults(), this.$element.data(), e))
            .delay &&
            "number" == typeof e.delay &&
            (e.delay = { show: e.delay, hide: e.delay }),
          e
        );
      }),
      (e.prototype.getDelegateOptions = function () {
        var e = {},
          i = this.getDefaults();
        return (
          this._options &&
            t.each(this._options, function (t, o) {
              i[t] != o && (e[t] = o);
            }),
          e
        );
      }),
      (e.prototype.enter = function (e) {
        var i =
          e instanceof this.constructor
            ? e
            : t(e.currentTarget)
                [this.type](this.getDelegateOptions())
                .data("bs." + this.type);
        return (
          clearTimeout(i.timeout),
          (i.hoverState = "in"),
          i.options.delay && i.options.delay.show
            ? void (i.timeout = setTimeout(function () {
                "in" == i.hoverState && i.show();
              }, i.options.delay.show))
            : i.show()
        );
      }),
      (e.prototype.leave = function (e) {
        var i =
          e instanceof this.constructor
            ? e
            : t(e.currentTarget)
                [this.type](this.getDelegateOptions())
                .data("bs." + this.type);
        return (
          clearTimeout(i.timeout),
          (i.hoverState = "out"),
          i.options.delay && i.options.delay.hide
            ? void (i.timeout = setTimeout(function () {
                "out" == i.hoverState && i.hide();
              }, i.options.delay.hide))
            : i.hide()
        );
      }),
      (e.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          if ((this.$element.trigger(e), e.isDefaultPrevented())) return;
          var i = this,
            o = this.tip();
          this.setContent(), this.options.animation && o.addClass("fade");
          var n =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, o[0], this.$element[0])
                : this.options.placement,
            s = /\s?auto?\s?/i,
            r = s.test(n);
          r && (n = n.replace(s, "") || "top"),
            o.detach().css({ top: 0, left: 0, display: "block" }).addClass(n),
            this.options.container
              ? o.appendTo(this.options.container)
              : o.insertAfter(this.$element);
          var a = this.getPosition(),
            l = o[0].offsetWidth,
            h = o[0].offsetHeight;
          if (r) {
            var d = this.$element.parent(),
              c = n,
              u = document.documentElement.scrollTop || document.body.scrollTop,
              p =
                "body" == this.options.container
                  ? window.innerWidth
                  : d.outerWidth(),
              f =
                "body" == this.options.container
                  ? window.innerHeight
                  : d.outerHeight(),
              m = "body" == this.options.container ? 0 : d.offset().left;
            (n =
              "bottom" == n && a.top + a.height + h - u > f
                ? "top"
                : "top" == n && a.top - u - h < 0
                ? "bottom"
                : "right" == n && a.right + l > p
                ? "left"
                : "left" == n && a.left - l < m
                ? "right"
                : n),
              o.removeClass(c).addClass(n);
          }
          var g = this.getCalculatedOffset(n, a, l, h);
          this.applyPlacement(g, n), (this.hoverState = null);
          var v = function () {
            i.$element.trigger("shown.bs." + i.type);
          };
          t.support.transition && this.$tip.hasClass("fade")
            ? o.one(t.support.transition.end, v).emulateTransitionEnd(150)
            : v();
        }
      }),
      (e.prototype.applyPlacement = function (e, i) {
        var o,
          n = this.tip(),
          s = n[0].offsetWidth,
          r = n[0].offsetHeight,
          a = parseInt(n.css("margin-top"), 10),
          l = parseInt(n.css("margin-left"), 10);
        isNaN(a) && (a = 0),
          isNaN(l) && (l = 0),
          (e.top = e.top + a),
          (e.left = e.left + l),
          t.offset.setOffset(
            n[0],
            t.extend(
              {
                using: function (t) {
                  n.css({ top: Math.round(t.top), left: Math.round(t.left) });
                },
              },
              e
            ),
            0
          ),
          n.addClass("in");
        var h = n[0].offsetWidth,
          d = n[0].offsetHeight;
        if (
          ("top" == i && d != r && ((o = !0), (e.top = e.top + r - d)),
          /bottom|top/.test(i))
        ) {
          var c = 0;
          e.left < 0 &&
            ((c = -2 * e.left),
            (e.left = 0),
            n.offset(e),
            (h = n[0].offsetWidth),
            (d = n[0].offsetHeight)),
            this.replaceArrow(c - s + h, h, "left");
        } else this.replaceArrow(d - r, d, "top");
        o && n.offset(e);
      }),
      (e.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "");
      }),
      (e.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e),
          t.removeClass("fade in top bottom left right");
      }),
      (e.prototype.hide = function () {
        function e() {
          "in" != i.hoverState && o.detach(),
            i.$element.trigger("hidden.bs." + i.type);
        }
        var i = this,
          o = this.tip(),
          n = t.Event("hide.bs." + this.type);
        return (
          this.$element.trigger(n),
          n.isDefaultPrevented()
            ? void 0
            : (o.removeClass("in"),
              t.support.transition && this.$tip.hasClass("fade")
                ? o.one(t.support.transition.end, e).emulateTransitionEnd(150)
                : e(),
              (this.hoverState = null),
              this)
        );
      }),
      (e.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) &&
          t
            .attr("data-original-title", t.attr("title") || "")
            .attr("title", "");
      }),
      (e.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (e.prototype.getPosition = function () {
        var e = this.$element[0];
        return t.extend(
          {},
          "function" == typeof e.getBoundingClientRect
            ? e.getBoundingClientRect()
            : { width: e.offsetWidth, height: e.offsetHeight },
          this.$element.offset()
        );
      }),
      (e.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t
          ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 }
          : "top" == t
          ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 }
          : "left" == t
          ? { top: e.top + e.height / 2 - o / 2, left: e.left - i }
          : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width };
      }),
      (e.prototype.getTitle = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-original-title") ||
          ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        );
      }),
      (e.prototype.tip = function () {
        return (this.$tip = this.$tip || t(this.options.template));
      }),
      (e.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (e.prototype.validate = function () {
        this.$element[0].parentNode ||
          (this.hide(), (this.$element = null), (this.options = null));
      }),
      (e.prototype.enable = function () {
        this.enabled = !0;
      }),
      (e.prototype.disable = function () {
        this.enabled = !1;
      }),
      (e.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (e.prototype.toggle = function (e) {
        var i = e
          ? t(e.currentTarget)
              [this.type](this.getDelegateOptions())
              .data("bs." + this.type)
          : this;
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
      }),
      (e.prototype.destroy = function () {
        clearTimeout(this.timeout),
          this.hide()
            .$element.off("." + this.type)
            .removeData("bs." + this.type);
      });
    var i = t.fn.tooltip;
    (t.fn.tooltip = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.tooltip"),
          s = "object" == typeof i && i;
        (n || "destroy" != i) &&
          (n || o.data("bs.tooltip", (n = new e(this, s))),
          "string" == typeof i && n[i]());
      });
    }),
      (t.fn.tooltip.Constructor = e),
      (t.fn.tooltip.noConflict = function () {
        return (t.fn.tooltip = i), this;
      });
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (t, e) {
      this.init("popover", t, e);
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    })),
      ((e.prototype = t.extend(
        {},
        t.fn.tooltip.Constructor.prototype
      )).constructor = e),
      (e.prototype.getDefaults = function () {
        return e.DEFAULTS;
      }),
      (e.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle(),
          i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e),
          t
            .find(".popover-content")
            [
              this.options.html
                ? "string" == typeof i
                  ? "html"
                  : "append"
                : "text"
            ](i),
          t.removeClass("fade top bottom left right in"),
          t.find(".popover-title").html() || t.find(".popover-title").hide();
      }),
      (e.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (e.prototype.getContent = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-content") ||
          ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        );
      }),
      (e.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      }),
      (e.prototype.tip = function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip;
      });
    var i = t.fn.popover;
    (t.fn.popover = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.popover"),
          s = "object" == typeof i && i;
        (n || "destroy" != i) &&
          (n || o.data("bs.popover", (n = new e(this, s))),
          "string" == typeof i && n[i]());
      });
    }),
      (t.fn.popover.Constructor = e),
      (t.fn.popover.noConflict = function () {
        return (t.fn.popover = i), this;
      });
  })(jQuery),
  (function (t) {
    "use strict";
    function e(i, o) {
      var n,
        s = t.proxy(this.process, this);
      (this.$element = t(t(i).is("body") ? window : i)),
        (this.$body = t("body")),
        (this.$scrollElement = this.$element.on(
          "scroll.bs.scroll-spy.data-api",
          s
        )),
        (this.options = t.extend({}, e.DEFAULTS, o)),
        (this.selector =
          (this.options.target ||
            ((n = t(i).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")) ||
            "") + " .nav li > a"),
        (this.offsets = t([])),
        (this.targets = t([])),
        (this.activeTarget = null),
        this.refresh(),
        this.process();
    }
    (e.DEFAULTS = { offset: 10 }),
      (e.prototype.refresh = function () {
        var e = this.$element[0] == window ? "offset" : "position";
        (this.offsets = t([])), (this.targets = t([]));
        var i = this;
        this.$body
          .find(this.selector)
          .map(function () {
            var o = t(this),
              n = o.data("target") || o.attr("href"),
              s = /^#./.test(n) && t(n);
            return (
              (s &&
                s.length &&
                s.is(":visible") && [
                  [
                    s[e]().top +
                      (!t.isWindow(i.$scrollElement.get(0)) &&
                        i.$scrollElement.scrollTop()),
                    n,
                  ],
                ]) ||
              null
            );
          })
          .sort(function (t, e) {
            return t[0] - e[0];
          })
          .each(function () {
            i.offsets.push(this[0]), i.targets.push(this[1]);
          });
      }),
      (e.prototype.process = function () {
        var t,
          e = this.$scrollElement.scrollTop() + this.options.offset,
          i =
            (this.$scrollElement[0].scrollHeight ||
              this.$body[0].scrollHeight) - this.$scrollElement.height(),
          o = this.offsets,
          n = this.targets,
          s = this.activeTarget;
        if (e >= i) return s != (t = n.last()[0]) && this.activate(t);
        if (s && e <= o[0]) return s != (t = n[0]) && this.activate(t);
        for (t = o.length; t--; )
          s != n[t] &&
            e >= o[t] &&
            (!o[t + 1] || e <= o[t + 1]) &&
            this.activate(n[t]);
      }),
      (e.prototype.activate = function (e) {
        (this.activeTarget = e),
          t(this.selector)
            .parentsUntil(this.options.target, ".active")
            .removeClass("active");
        var i =
            this.selector +
            '[data-target="' +
            e +
            '"],' +
            this.selector +
            '[href="' +
            e +
            '"]',
          o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length &&
          (o = o.closest("li.dropdown").addClass("active")),
          o.trigger("activate.bs.scrollspy");
      });
    var i = t.fn.scrollspy;
    (t.fn.scrollspy = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.scrollspy"),
          s = "object" == typeof i && i;
        n || o.data("bs.scrollspy", (n = new e(this, s))),
          "string" == typeof i && n[i]();
      });
    }),
      (t.fn.scrollspy.Constructor = e),
      (t.fn.scrollspy.noConflict = function () {
        return (t.fn.scrollspy = i), this;
      }),
      t(window).on("load", function () {
        t('[data-spy="scroll"]').each(function () {
          var e = t(this);
          e.scrollspy(e.data());
        });
      });
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (e) {
      this.element = t(e);
    };
    (e.prototype.show = function () {
      var e = this.element,
        i = e.closest("ul:not(.dropdown-menu)"),
        o = e.data("target");
      if (
        (o || (o = (o = e.attr("href")) && o.replace(/.*(?=#[^\s]*$)/, "")),
        !e.parent("li").hasClass("active"))
      ) {
        var n = i.find(".active:last a")[0],
          s = t.Event("show.bs.tab", { relatedTarget: n });
        if ((e.trigger(s), !s.isDefaultPrevented())) {
          var r = t(o);
          this.activate(e.parent("li"), i),
            this.activate(r, r.parent(), function () {
              e.trigger({ type: "shown.bs.tab", relatedTarget: n });
            });
        }
      }
    }),
      (e.prototype.activate = function (e, i, o) {
        function n() {
          s
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active"),
            e.addClass("active"),
            r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu") &&
              e.closest("li.dropdown").addClass("active"),
            o && o();
        }
        var s = i.find("> .active"),
          r = o && t.support.transition && s.hasClass("fade");
        r ? s.one(t.support.transition.end, n).emulateTransitionEnd(150) : n(),
          s.removeClass("in");
      });
    var i = t.fn.tab;
    (t.fn.tab = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.tab");
        n || o.data("bs.tab", (n = new e(this))),
          "string" == typeof i && n[i]();
      });
    }),
      (t.fn.tab.Constructor = e),
      (t.fn.tab.noConflict = function () {
        return (t.fn.tab = i), this;
      }),
      t(document).on(
        "click.bs.tab.data-api",
        '[data-toggle="tab"], [data-toggle="pill"]',
        function (e) {
          e.preventDefault(), t(this).tab("show");
        }
      );
  })(jQuery),
  (function (t) {
    "use strict";
    var e = function (i, o) {
      (this.options = t.extend({}, e.DEFAULTS, o)),
        (this.$window = t(window)
          .on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            t.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = t(i)),
        (this.affixed = this.unpin = this.pinnedOffset = null),
        this.checkPosition();
    };
    (e.RESET = "affix affix-top affix-bottom"),
      (e.DEFAULTS = { offset: 0 }),
      (e.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(e.RESET).addClass("affix");
        var t = this.$window.scrollTop(),
          i = this.$element.offset();
        return (this.pinnedOffset = i.top - t);
      }),
      (e.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1);
      }),
      (e.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var i = t(document).height(),
            o = this.$window.scrollTop(),
            n = this.$element.offset(),
            s = this.options.offset,
            r = s.top,
            a = s.bottom;
          "top" == this.affixed && (n.top += o),
            "object" != typeof s && (a = r = s),
            "function" == typeof r && (r = s.top(this.$element)),
            "function" == typeof a && (a = s.bottom(this.$element));
          var l =
            !(null != this.unpin && o + this.unpin <= n.top) &&
            (null != a && n.top + this.$element.height() >= i - a
              ? "bottom"
              : null != r && r >= o && "top");
          if (this.affixed !== l) {
            this.unpin && this.$element.css("top", "");
            var h = "affix" + (l ? "-" + l : ""),
              d = t.Event(h + ".bs.affix");
            this.$element.trigger(d),
              d.isDefaultPrevented() ||
                ((this.affixed = l),
                (this.unpin = "bottom" == l ? this.getPinnedOffset() : null),
                this.$element
                  .removeClass(e.RESET)
                  .addClass(h)
                  .trigger(t.Event(h.replace("affix", "affixed"))),
                "bottom" == l &&
                  this.$element.offset({
                    top: i - a - this.$element.height(),
                  }));
          }
        }
      });
    var i = t.fn.affix;
    (t.fn.affix = function (i) {
      return this.each(function () {
        var o = t(this),
          n = o.data("bs.affix"),
          s = "object" == typeof i && i;
        n || o.data("bs.affix", (n = new e(this, s))),
          "string" == typeof i && n[i]();
      });
    }),
      (t.fn.affix.Constructor = e),
      (t.fn.affix.noConflict = function () {
        return (t.fn.affix = i), this;
      }),
      t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
          var e = t(this),
            i = e.data();
          (i.offset = i.offset || {}),
            i.offsetBottom && (i.offset.bottom = i.offsetBottom),
            i.offsetTop && (i.offset.top = i.offsetTop),
            e.affix(i);
        });
      });
  })(jQuery),
  function () {
    "use strict";
    var t, e;
    (t = jQuery),
      ((e = function (e, i) {
        var o, n;
        return (
          (this.options = t.extend(
            { title: null, footer: null, remote: null },
            t.fn.ekkoLightbox.defaults,
            i || {}
          )),
          (this.$element = t(e)),
          "",
          (this.modal_id = this.options.modal_id
            ? this.options.modal_id
            : "ekkoLightbox-" + Math.floor(1e3 * Math.random() + 1)),
          (n =
            '<div class="modal-header"' +
            (this.options.title || this.options.always_show_close
              ? ""
              : ' style="display:none"') +
            '><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' +
            (this.options.title || "&nbsp;") +
            "</h4></div>"),
          (o =
            '<div class="modal-footer"' +
            (this.options.footer ? "" : ' style="display:none"') +
            ">" +
            this.options.footer +
            "</div>"),
          t(document.body).append(
            '<div id="' +
              this.modal_id +
              '" class="ekko-lightbox modal fade" tabindex="-1"><div class="modal-dialog"><div class="modal-content">' +
              n +
              '<div class="modal-body"><div class="ekko-lightbox-container"><div></div></div></div>' +
              o +
              "</div></div></div>"
          ),
          (this.modal = t("#" + this.modal_id)),
          (this.modal_dialog = this.modal.find(".modal-dialog").first()),
          (this.modal_content = this.modal.find(".modal-content").first()),
          (this.modal_body = this.modal.find(".modal-body").first()),
          (this.modal_header = this.modal.find(".modal-header").first()),
          (this.modal_footer = this.modal.find(".modal-footer").first()),
          (this.lightbox_container = this.modal_body
            .find(".ekko-lightbox-container")
            .first()),
          (this.lightbox_body = this.lightbox_container
            .find("> div:first-child")
            .first()),
          this.showLoading(),
          (this.modal_arrows = null),
          (this.border = {
            top:
              parseFloat(this.modal_dialog.css("border-top-width")) +
              parseFloat(this.modal_content.css("border-top-width")) +
              parseFloat(this.modal_body.css("border-top-width")),
            right:
              parseFloat(this.modal_dialog.css("border-right-width")) +
              parseFloat(this.modal_content.css("border-right-width")) +
              parseFloat(this.modal_body.css("border-right-width")),
            bottom:
              parseFloat(this.modal_dialog.css("border-bottom-width")) +
              parseFloat(this.modal_content.css("border-bottom-width")) +
              parseFloat(this.modal_body.css("border-bottom-width")),
            left:
              parseFloat(this.modal_dialog.css("border-left-width")) +
              parseFloat(this.modal_content.css("border-left-width")) +
              parseFloat(this.modal_body.css("border-left-width")),
          }),
          (this.padding = {
            top:
              parseFloat(this.modal_dialog.css("padding-top")) +
              parseFloat(this.modal_content.css("padding-top")) +
              parseFloat(this.modal_body.css("padding-top")),
            right:
              parseFloat(this.modal_dialog.css("padding-right")) +
              parseFloat(this.modal_content.css("padding-right")) +
              parseFloat(this.modal_body.css("padding-right")),
            bottom:
              parseFloat(this.modal_dialog.css("padding-bottom")) +
              parseFloat(this.modal_content.css("padding-bottom")) +
              parseFloat(this.modal_body.css("padding-bottom")),
            left:
              parseFloat(this.modal_dialog.css("padding-left")) +
              parseFloat(this.modal_content.css("padding-left")) +
              parseFloat(this.modal_body.css("padding-left")),
          }),
          this.modal
            .on("show.bs.modal", this.options.onShow.bind(this))
            .on(
              "shown.bs.modal",
              (function (t) {
                return function () {
                  return t.modal_shown(), t.options.onShown.call(t);
                };
              })(this)
            )
            .on("hide.bs.modal", this.options.onHide.bind(this))
            .on(
              "hidden.bs.modal",
              (function (e) {
                return function () {
                  return (
                    e.gallery && t(document).off("keydown.ekkoLightbox"),
                    e.modal.remove(),
                    e.options.onHidden.call(e)
                  );
                };
              })(this)
            )
            .modal("show", i),
          this.modal
        );
      }).prototype = {
        modal_shown: function () {
          var e;
          return this.options.remote
            ? ((this.gallery = this.$element.data("gallery")),
              this.gallery &&
                ("document.body" === this.options.gallery_parent_selector ||
                "" === this.options.gallery_parent_selector
                  ? (this.gallery_items = t(document.body).find(
                      '*[data-gallery="' + this.gallery + '"]'
                    ))
                  : (this.gallery_items = this.$element
                      .parents(this.options.gallery_parent_selector)
                      .first()
                      .find('*[data-gallery="' + this.gallery + '"]')),
                (this.gallery_index = this.gallery_items.index(this.$element)),
                t(document).on(
                  "keydown.ekkoLightbox",
                  this.navigate.bind(this)
                ),
                this.options.directional_arrows &&
                  this.gallery_items.length > 1 &&
                  (this.lightbox_container.append(
                    '<div class="flex-direction-nav"><a href="#" class="' +
                      this.strip_stops(this.options.left_arrow_class) +
                      '"></a><a href="#" class="' +
                      this.strip_stops(this.options.right_arrow_class) +
                      '"></a></div>'
                  ),
                  (this.modal_arrows = this.lightbox_container
                    .find("div.flex-direction-nav")
                    .first()),
                  this.lightbox_container
                    .find(
                      "a" + this.strip_spaces(this.options.left_arrow_class)
                    )
                    .on(
                      "click",
                      (function (t) {
                        return function (e) {
                          return e.preventDefault(), t.navigate_left();
                        };
                      })(this)
                    ),
                  this.lightbox_container
                    .find(
                      "a" + this.strip_spaces(this.options.right_arrow_class)
                    )
                    .on(
                      "click",
                      (function (t) {
                        return function (e) {
                          return e.preventDefault(), t.navigate_right();
                        };
                      })(this)
                    ))),
              this.options.type
                ? "image" === this.options.type
                  ? this.preloadImage(this.options.remote, !0)
                  : "youtube" === this.options.type &&
                    (e = this.getYoutubeId(this.options.remote))
                  ? this.showYoutubeVideo(e)
                  : "vimeo" === this.options.type
                  ? this.showVimeoVideo(this.options.remote)
                  : "instagram" === this.options.type
                  ? this.showInstagramVideo(this.options.remote)
                  : "url" === this.options.type
                  ? this.loadRemoteContent(this.options.remote)
                  : "video" === this.options.type
                  ? this.showVideoIframe(this.options.remote)
                  : this.error(
                      'Could not detect remote target type. Force the type using data-type="image|youtube|vimeo|instagram|url|video"'
                    )
                : this.detectRemoteType(this.options.remote))
            : this.error("No remote target given");
        },
        strip_stops: function (t) {
          return t.replace(/\./g, "");
        },
        strip_spaces: function (t) {
          return t.replace(/\s/g, "");
        },
        isImage: function (t) {
          return t.match(
            /(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i
          );
        },
        isSwf: function (t) {
          return t.match(/\.(swf)((\?|#).*)?$/i);
        },
        getYoutubeId: function (t) {
          var e;
          return (
            !(
              !(e = t.match(
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
              )) || 11 !== e[2].length
            ) && e[2]
          );
        },
        getVimeoId: function (t) {
          return t.indexOf("vimeo") > 0 && t;
        },
        getInstagramId: function (t) {
          return t.indexOf("instagram") > 0 && t;
        },
        navigate: function (t) {
          if (39 === (t = t || window.event).keyCode || 37 === t.keyCode) {
            if (39 === t.keyCode) return this.navigate_right();
            if (37 === t.keyCode) return this.navigate_left();
          }
        },
        navigateTo: function (e) {
          var i, o;
          return 0 > e || e > this.gallery_items.length - 1
            ? this
            : (this.showLoading(),
              (this.gallery_index = e),
              (this.$element = t(this.gallery_items.get(this.gallery_index))),
              this.updateTitleAndFooter(),
              (o =
                this.$element.attr("data-remote") ||
                this.$element.attr("href")),
              this.detectRemoteType(o, this.$element.attr("data-type") || !1),
              this.gallery_index + 1 < this.gallery_items.length &&
              ((o =
                (i = t(
                  this.gallery_items.get(this.gallery_index + 1),
                  !1
                )).attr("data-remote") || i.attr("href")),
              "image" === i.attr("data-type") || this.isImage(o))
                ? this.preloadImage(o, !1)
                : void 0);
        },
        navigate_left: function () {
          return 1 !== this.gallery_items.length
            ? (0 === this.gallery_index
                ? (this.gallery_index = this.gallery_items.length - 1)
                : this.gallery_index--,
              this.options.onNavigate.call(this, "left", this.gallery_index),
              this.navigateTo(this.gallery_index))
            : void 0;
        },
        navigate_right: function () {
          return 1 !== this.gallery_items.length
            ? (this.gallery_index === this.gallery_items.length - 1
                ? (this.gallery_index = 0)
                : this.gallery_index++,
              this.options.onNavigate.call(this, "right", this.gallery_index),
              this.navigateTo(this.gallery_index))
            : void 0;
        },
        detectRemoteType: function (t, e) {
          var i;
          return "image" === (e = e || !1) || this.isImage(t)
            ? ((this.options.type = "image"), this.preloadImage(t, !0))
            : "youtube" === e || (i = this.getYoutubeId(t))
            ? ((this.options.type = "youtube"), this.showYoutubeVideo(i))
            : "vimeo" === e || (i = this.getVimeoId(t))
            ? ((this.options.type = "vimeo"), this.showVimeoVideo(i))
            : "instagram" === e || (i = this.getInstagramId(t))
            ? ((this.options.type = "instagram"), this.showInstagramVideo(i))
            : "video" === e
            ? ((this.options.type = "video"), this.showVideoIframe(i))
            : ((this.options.type = "url"), this.loadRemoteContent(t));
        },
        updateTitleAndFooter: function () {
          var t, e, i, o;
          return (
            (i = this.modal_content.find(".modal-header")),
            (e = this.modal_content.find(".modal-footer")),
            (o = this.$element.data("title") || ""),
            (t = this.$element.data("footer") || ""),
            o || this.options.always_show_close
              ? i
                  .css("display", "")
                  .find(".modal-title")
                  .html(o || "&nbsp;")
              : i.css("display", "none"),
            t ? e.css("display", "").html(t) : e.css("display", "none"),
            this
          );
        },
        showLoading: function () {
          return (
            this.lightbox_body.html(
              '<div class="modal-loading">' +
                this.options.loadingMessage +
                "</div>"
            ),
            this
          );
        },
        showYoutubeVideo: function (t) {
          var e, i, o;
          return (
            (i =
              null != this.$element.attr("data-norelated") ||
              this.options.no_related
                ? "&rel=0"
                : ""),
            (e =
              (o = this.checkDimensions(this.$element.data("width") || 560)) /
              (560 / 315)),
            this.showVideoIframe(
              "//www.youtube.com/embed/" +
                t +
                "?badge=0&autoplay=1&html5=1" +
                i,
              o,
              e
            )
          );
        },
        showVimeoVideo: function (t) {
          var e, i;
          return (
            (e =
              (i = this.checkDimensions(this.$element.data("width") || 560)) /
              (500 / 281)),
            this.showVideoIframe(t + "?autoplay=1", i, e)
          );
        },
        showInstagramVideo: function (t) {
          var e, i;
          return (
            (i = this.checkDimensions(this.$element.data("width") || 612)),
            this.resize(i),
            (e = i + 80),
            this.lightbox_body.html(
              '<iframe width="' +
                i +
                '" height="' +
                e +
                '" src="' +
                this.addTrailingSlash(t) +
                'embed/" frameborder="0" allowfullscreen></iframe>'
            ),
            this.options.onContentLoaded.call(this),
            this.modal_arrows
              ? this.modal_arrows.css("display", "none")
              : void 0
          );
        },
        showVideoIframe: function (t, e, i) {
          return (
            (i = i || e),
            this.resize(e),
            this.lightbox_body.html(
              '<div class="embed-responsive embed-responsive-16by9"><iframe width="' +
                e +
                '" height="' +
                i +
                '" src="' +
                t +
                '" frameborder="0" allowfullscreen class="embed-responsive-item"></iframe></div>'
            ),
            this.options.onContentLoaded.call(this),
            this.modal_arrows && this.modal_arrows.css("display", "none"),
            this
          );
        },
        loadRemoteContent: function (e) {
          var i;
          return (
            (i = this.$element.data("width") || 560),
            this.resize(i),
            this.$element.data("disableExternalCheck") ||
            !1 ||
            this.isExternal(e)
              ? (this.lightbox_body.html(
                  '<iframe width="' +
                    i +
                    '" height="' +
                    i +
                    '" src="' +
                    e +
                    '" frameborder="0" allowfullscreen></iframe>'
                ),
                this.options.onContentLoaded.call(this))
              : this.lightbox_body.load(
                  e,
                  t.proxy(
                    (function (t) {
                      return function () {
                        return t.$element.trigger("loaded.bs.modal");
                      };
                    })(this)
                  )
                ),
            this.modal_arrows && this.modal_arrows.css("display", "none"),
            this
          );
        },
        isExternal: function (t) {
          var e;
          return (
            ("string" ==
              typeof (e = t.match(
                /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
              ))[1] &&
              e[1].length > 0 &&
              e[1].toLowerCase() !== location.protocol) ||
            ("string" == typeof e[2] &&
              e[2].length > 0 &&
              e[2].replace(
                new RegExp(
                  ":(" +
                    { "http:": 80, "https:": 443 }[location.protocol] +
                    ")?$"
                ),
                ""
              ) !== location.host)
          );
        },
        error: function (t) {
          return this.lightbox_body.html(t), this;
        },
        preloadImage: function (e, i) {
          var o;
          return (
            (o = new Image()),
            (null == i || !0 === i) &&
              ((o.onload = (function (e) {
                return function () {
                  var i;
                  return (
                    (i = t("<img />")).attr("src", o.src),
                    i.addClass("img-responsive"),
                    e.lightbox_body.html(i),
                    e.modal_arrows && e.modal_arrows.css("display", "block"),
                    i.load(function () {
                      return (
                        e.options.scale_height
                          ? e.scaleHeight(o.height, o.width)
                          : e.resize(o.width),
                        e.options.onContentLoaded.call(e)
                      );
                    })
                  );
                };
              })(this)),
              (o.onerror = (function (t) {
                return function () {
                  return t.error("Failed to load image: " + e);
                };
              })(this))),
            (o.src = e),
            o
          );
        },
        scaleHeight: function (e, i) {
          var o, n, s, r, a, l;
          return (
            (r = this.modal_header.outerHeight(!0) || 0),
            (s = this.modal_footer.outerHeight(!0) || 0),
            this.modal_footer.is(":visible") || (s = 0),
            this.modal_header.is(":visible") || (r = 0),
            (o =
              this.border.top +
              this.border.bottom +
              this.padding.top +
              this.padding.bottom),
            (a =
              parseFloat(this.modal_dialog.css("margin-top")) +
              parseFloat(this.modal_dialog.css("margin-bottom"))),
            (l = t(window).height() - o - a - r - s),
            (n = Math.min(l / e, 1)),
            this.modal_dialog.css("height", "auto").css("max-height", l),
            this.resize(n * i)
          );
        },
        resize: function (e) {
          var i;
          return (
            (i =
              e +
              this.border.left +
              this.padding.left +
              this.padding.right +
              this.border.right),
            this.modal_dialog.css("width", "auto").css("max-width", i),
            this.lightbox_container.find("a").css("line-height", function () {
              return t(this).parent().height() + "px";
            }),
            this
          );
        },
        checkDimensions: function (t) {
          return (
            t +
              this.border.left +
              this.padding.left +
              this.padding.right +
              this.border.right >
              document.body.clientWidth && (t = this.modal_body.width()),
            t
          );
        },
        close: function () {
          return this.modal.modal("hide");
        },
        addTrailingSlash: function (t) {
          return "/" !== t.substr(-1) && (t += "/"), t;
        },
      }),
      (t.fn.ekkoLightbox = function (i) {
        return this.each(function () {
          var o;
          return (
            (o = t(this)),
            (i = t.extend(
              {
                remote: o.attr("data-remote") || o.attr("href"),
                gallery_parent_selector: o.attr("data-parent"),
                type: o.attr("data-type"),
              },
              i,
              o.data()
            )),
            new e(this, i),
            this
          );
        });
      }),
      (t.fn.ekkoLightbox.defaults = {
        gallery_parent_selector: "document.body",
        left_arrow_class: ".glyphicon .glyphicon-chevron-left",
        right_arrow_class: ".glyphicon .glyphicon-chevron-right",
        directional_arrows: !0,
        type: null,
        always_show_close: !0,
        no_related: !1,
        scale_height: !0,
        loadingMessage: "Loading...",
        onShow: function () {},
        onShown: function () {},
        onHide: function () {},
        onHidden: function () {},
        onNavigate: function () {},
        onContentLoaded: function () {},
      });
  }.call(this),
  (function (t) {
    (t.flexslider = function (e, i) {
      var o = t(e);
      o.vars = t.extend({}, t.flexslider.defaults, i);
      var n,
        s = o.vars.namespace,
        r =
          window.navigator &&
          window.navigator.msPointerEnabled &&
          window.MSGesture,
        a =
          ("ontouchstart" in window ||
            r ||
            (window.DocumentTouch && document instanceof DocumentTouch)) &&
          o.vars.touch,
        l = "click touchend MSPointerUp keyup",
        h = "",
        d = "vertical" === o.vars.direction,
        c = o.vars.reverse,
        u = o.vars.itemWidth > 0,
        p = "fade" === o.vars.animation,
        f = "" !== o.vars.asNavFor,
        m = {};
      t.data(e, "flexslider", o),
        (m = {
          init: function () {
            (o.animating = !1),
              (o.currentSlide = parseInt(
                o.vars.startAt ? o.vars.startAt : 0,
                10
              )),
              isNaN(o.currentSlide) && (o.currentSlide = 0),
              (o.animatingTo = o.currentSlide),
              (o.atEnd = 0 === o.currentSlide || o.currentSlide === o.last),
              (o.containerSelector = o.vars.selector.substr(
                0,
                o.vars.selector.search(" ")
              )),
              (o.slides = t(o.vars.selector, o)),
              (o.container = t(o.containerSelector, o)),
              (o.count = o.slides.length),
              (o.syncExists = t(o.vars.sync).length > 0),
              "slide" === o.vars.animation && (o.vars.animation = "swing"),
              (o.prop = d ? "top" : "marginLeft"),
              (o.args = {}),
              (o.manualPause = !1),
              (o.stopped = !1),
              (o.started = !1),
              (o.startTimeout = null),
              (o.transitions =
                !o.vars.video &&
                !p &&
                o.vars.useCSS &&
                (function () {
                  var t = document.createElement("div"),
                    e = [
                      "perspectiveProperty",
                      "WebkitPerspective",
                      "MozPerspective",
                      "OPerspective",
                      "msPerspective",
                    ];
                  for (var i in e)
                    if (void 0 !== t.style[e[i]])
                      return (
                        (o.pfx = e[i].replace("Perspective", "").toLowerCase()),
                        (o.prop = "-" + o.pfx + "-transform"),
                        !0
                      );
                  return !1;
                })()),
              (o.ensureAnimationEnd = ""),
              "" !== o.vars.controlsContainer &&
                (o.controlsContainer =
                  t(o.vars.controlsContainer).length > 0 &&
                  t(o.vars.controlsContainer)),
              "" !== o.vars.manualControls &&
                (o.manualControls =
                  t(o.vars.manualControls).length > 0 &&
                  t(o.vars.manualControls)),
              o.vars.randomize &&
                (o.slides.sort(function () {
                  return Math.round(Math.random()) - 0.5;
                }),
                o.container.empty().append(o.slides)),
              o.doMath(),
              o.setup("init"),
              o.vars.controlNav && m.controlNav.setup(),
              o.vars.directionNav && m.directionNav.setup(),
              o.vars.keyboard &&
                (1 === t(o.containerSelector).length ||
                  o.vars.multipleKeyboard) &&
                t(document).bind("keyup", function (t) {
                  var e = t.keyCode;
                  if (!o.animating && (39 === e || 37 === e)) {
                    var i =
                      39 === e
                        ? o.getTarget("next")
                        : 37 === e && o.getTarget("prev");
                    o.flexAnimate(i, o.vars.pauseOnAction);
                  }
                }),
              o.vars.mousewheel &&
                o.bind("mousewheel", function (t, e, i, n) {
                  t.preventDefault();
                  var s = o.getTarget(0 > e ? "next" : "prev");
                  o.flexAnimate(s, o.vars.pauseOnAction);
                }),
              o.vars.pausePlay && m.pausePlay.setup(),
              o.vars.slideshow &&
                o.vars.pauseInvisible &&
                m.pauseInvisible.init(),
              o.vars.slideshow &&
                (o.vars.pauseOnHover &&
                  o.hover(
                    function () {
                      o.manualPlay || o.manualPause || o.pause();
                    },
                    function () {
                      o.manualPause || o.manualPlay || o.stopped || o.play();
                    }
                  ),
                (o.vars.pauseInvisible && m.pauseInvisible.isHidden()) ||
                  (o.vars.initDelay > 0
                    ? (o.startTimeout = setTimeout(o.play, o.vars.initDelay))
                    : o.play())),
              f && m.asNav.setup(),
              a && o.vars.touch && m.touch(),
              (!p || (p && o.vars.smoothHeight)) &&
                t(window).bind("resize orientationchange focus", m.resize),
              o.find("img").attr("draggable", "false"),
              setTimeout(function () {
                o.vars.start(o);
              }, 200);
          },
          asNav: {
            setup: function () {
              (o.asNav = !0),
                (o.animatingTo = Math.floor(o.currentSlide / o.move)),
                (o.currentItem = o.currentSlide),
                o.slides
                  .removeClass(s + "active-slide")
                  .eq(o.currentItem)
                  .addClass(s + "active-slide"),
                r
                  ? ((e._slider = o),
                    o.slides.each(function () {
                      var e = this;
                      (e._gesture = new MSGesture()),
                        (e._gesture.target = e),
                        e.addEventListener(
                          "MSPointerDown",
                          function (t) {
                            t.preventDefault(),
                              t.currentTarget._gesture &&
                                t.currentTarget._gesture.addPointer(
                                  t.pointerId
                                );
                          },
                          !1
                        ),
                        e.addEventListener("MSGestureTap", function (e) {
                          e.preventDefault();
                          var i = t(this),
                            n = i.index();
                          t(o.vars.asNavFor).data("flexslider").animating ||
                            i.hasClass("active") ||
                            ((o.direction =
                              o.currentItem < n ? "next" : "prev"),
                            o.flexAnimate(n, o.vars.pauseOnAction, !1, !0, !0));
                        });
                    }))
                  : o.slides.on(l, function (e) {
                      e.preventDefault();
                      var i = t(this),
                        n = i.index();
                      0 >= i.offset().left - t(o).scrollLeft() &&
                      i.hasClass(s + "active-slide")
                        ? o.flexAnimate(o.getTarget("prev"), !0)
                        : t(o.vars.asNavFor).data("flexslider").animating ||
                          i.hasClass(s + "active-slide") ||
                          ((o.direction = o.currentItem < n ? "next" : "prev"),
                          o.flexAnimate(n, o.vars.pauseOnAction, !1, !0, !0));
                    });
            },
          },
          controlNav: {
            setup: function () {
              o.manualControls
                ? m.controlNav.setupManual()
                : m.controlNav.setupPaging();
            },
            setupPaging: function () {
              var e,
                i,
                n =
                  "thumbnails" === o.vars.controlNav
                    ? "control-thumbs"
                    : "control-paging",
                r = 1;
              if (
                ((o.controlNavScaffold = t(
                  '<ol class="' + s + "control-nav " + s + n + '"></ol>'
                )),
                o.pagingCount > 1)
              )
                for (var a = 0; a < o.pagingCount; a++) {
                  if (
                    ((i = o.slides.eq(a)),
                    (e =
                      "thumbnails" === o.vars.controlNav
                        ? '<img src="' + i.attr("data-thumb") + '"/>'
                        : "<a>" + r + "</a>"),
                    "thumbnails" === o.vars.controlNav &&
                      !0 === o.vars.thumbCaptions)
                  ) {
                    var d = i.attr("data-thumbcaption");
                    "" != d &&
                      null != d &&
                      (e += '<span class="' + s + 'caption">' + d + "</span>");
                  }
                  o.controlNavScaffold.append("<li>" + e + "</li>"), r++;
                }
              o.controlsContainer
                ? t(o.controlsContainer).append(o.controlNavScaffold)
                : o.append(o.controlNavScaffold),
                m.controlNav.set(),
                m.controlNav.active(),
                o.controlNavScaffold.delegate("a, img", l, function (e) {
                  if ((e.preventDefault(), "" === h || h === e.type)) {
                    var i = t(this),
                      n = o.controlNav.index(i);
                    i.hasClass(s + "active") ||
                      ((o.direction = n > o.currentSlide ? "next" : "prev"),
                      o.flexAnimate(n, o.vars.pauseOnAction));
                  }
                  "" === h && (h = e.type), m.setToClearWatchedEvent();
                });
            },
            setupManual: function () {
              (o.controlNav = o.manualControls),
                m.controlNav.active(),
                o.controlNav.bind(l, function (e) {
                  if ((e.preventDefault(), "" === h || h === e.type)) {
                    var i = t(this),
                      n = o.controlNav.index(i);
                    i.hasClass(s + "active") ||
                      ((o.direction = n > o.currentSlide ? "next" : "prev"),
                      o.flexAnimate(n, o.vars.pauseOnAction));
                  }
                  "" === h && (h = e.type), m.setToClearWatchedEvent();
                });
            },
            set: function () {
              var e = "thumbnails" === o.vars.controlNav ? "img" : "a";
              o.controlNav = t(
                "." + s + "control-nav li " + e,
                o.controlsContainer ? o.controlsContainer : o
              );
            },
            active: function () {
              o.controlNav
                .removeClass(s + "active")
                .eq(o.animatingTo)
                .addClass(s + "active");
            },
            update: function (e, i) {
              o.pagingCount > 1 && "add" === e
                ? o.controlNavScaffold.append(
                    t("<li><a>" + o.count + "</a></li>")
                  )
                : 1 === o.pagingCount
                ? o.controlNavScaffold.find("li").remove()
                : o.controlNav.eq(i).closest("li").remove(),
                m.controlNav.set(),
                o.pagingCount > 1 && o.pagingCount !== o.controlNav.length
                  ? o.update(i, e)
                  : m.controlNav.active();
            },
          },
          directionNav: {
            setup: function () {
              var e = t(
                '<ul class="' +
                  s +
                  'direction-nav"><li class="' +
                  s +
                  'nav-prev"><a class="' +
                  s +
                  'prev" href="#">' +
                  o.vars.prevText +
                  '</a></li><li class="' +
                  s +
                  'nav-next"><a class="' +
                  s +
                  'next" href="#">' +
                  o.vars.nextText +
                  "</a></li></ul>"
              );
              o.controlsContainer
                ? (t(o.controlsContainer).append(e),
                  (o.directionNav = t(
                    "." + s + "direction-nav li a",
                    o.controlsContainer
                  )))
                : (o.append(e),
                  (o.directionNav = t("." + s + "direction-nav li a", o))),
                m.directionNav.update(),
                o.directionNav.bind(l, function (e) {
                  var i;
                  e.preventDefault(),
                    ("" === h || h === e.type) &&
                      ((i = o.getTarget(
                        t(this).hasClass(s + "next") ? "next" : "prev"
                      )),
                      o.flexAnimate(i, o.vars.pauseOnAction)),
                    "" === h && (h = e.type),
                    m.setToClearWatchedEvent();
                });
            },
            update: function () {
              var t = s + "disabled";
              1 === o.pagingCount
                ? o.directionNav.addClass(t).attr("tabindex", "-1")
                : o.vars.animationLoop
                ? o.directionNav.removeClass(t).removeAttr("tabindex")
                : 0 === o.animatingTo
                ? o.directionNav
                    .removeClass(t)
                    .filter("." + s + "prev")
                    .addClass(t)
                    .attr("tabindex", "-1")
                : o.animatingTo === o.last
                ? o.directionNav
                    .removeClass(t)
                    .filter("." + s + "next")
                    .addClass(t)
                    .attr("tabindex", "-1")
                : o.directionNav.removeClass(t).removeAttr("tabindex");
            },
          },
          pausePlay: {
            setup: function () {
              var e = t('<div class="' + s + 'pauseplay"><a></a></div>');
              o.controlsContainer
                ? (o.controlsContainer.append(e),
                  (o.pausePlay = t(
                    "." + s + "pauseplay a",
                    o.controlsContainer
                  )))
                : (o.append(e), (o.pausePlay = t("." + s + "pauseplay a", o))),
                m.pausePlay.update(o.vars.slideshow ? s + "pause" : s + "play"),
                o.pausePlay.bind(l, function (e) {
                  e.preventDefault(),
                    ("" === h || h === e.type) &&
                      (t(this).hasClass(s + "pause")
                        ? ((o.manualPause = !0), (o.manualPlay = !1), o.pause())
                        : ((o.manualPause = !1),
                          (o.manualPlay = !0),
                          o.play())),
                    "" === h && (h = e.type),
                    m.setToClearWatchedEvent();
                });
            },
            update: function (t) {
              "play" === t
                ? o.pausePlay
                    .removeClass(s + "pause")
                    .addClass(s + "play")
                    .html(o.vars.playText)
                : o.pausePlay
                    .removeClass(s + "play")
                    .addClass(s + "pause")
                    .html(o.vars.pauseText);
            },
          },
          touch: function () {
            function t(t) {
              (g = t.touches[0].pageX),
                (v = t.touches[0].pageY),
                (h = d ? n - v : n - g);
              (!(m = d
                ? Math.abs(h) < Math.abs(g - s)
                : Math.abs(h) < Math.abs(v - s)) ||
                Number(new Date()) - f > 500) &&
                (t.preventDefault(),
                !p &&
                  o.transitions &&
                  (o.vars.animationLoop ||
                    (h /=
                      (0 === o.currentSlide && 0 > h) ||
                      (o.currentSlide === o.last && h > 0)
                        ? Math.abs(h) / l + 2
                        : 1),
                  o.setProps(a + h, "setTouch")));
            }
            function i(r) {
              if (
                (e.removeEventListener("touchmove", t, !1),
                o.animatingTo === o.currentSlide && !m && null !== h)
              ) {
                var d = c ? -h : h,
                  u = o.getTarget(d > 0 ? "next" : "prev");
                o.canAdvance(u) &&
                ((Number(new Date()) - f < 550 && Math.abs(d) > 50) ||
                  Math.abs(d) > l / 2)
                  ? o.flexAnimate(u, o.vars.pauseOnAction)
                  : p ||
                    o.flexAnimate(o.currentSlide, o.vars.pauseOnAction, !0);
              }
              e.removeEventListener("touchend", i, !1),
                (n = null),
                (s = null),
                (h = null),
                (a = null);
            }
            var n,
              s,
              a,
              l,
              h,
              f,
              m = !1,
              g = 0,
              v = 0,
              y = 0;
            r
              ? ((e.style.msTouchAction = "none"),
                (e._gesture = new MSGesture()),
                (e._gesture.target = e),
                e.addEventListener(
                  "MSPointerDown",
                  function (t) {
                    t.stopPropagation(),
                      o.animating
                        ? t.preventDefault()
                        : (o.pause(),
                          e._gesture.addPointer(t.pointerId),
                          (y = 0),
                          (l = d ? o.h : o.w),
                          (f = Number(new Date())),
                          (a =
                            u && c && o.animatingTo === o.last
                              ? 0
                              : u && c
                              ? o.limit -
                                (o.itemW + o.vars.itemMargin) *
                                  o.move *
                                  o.animatingTo
                              : u && o.currentSlide === o.last
                              ? o.limit
                              : u
                              ? (o.itemW + o.vars.itemMargin) *
                                o.move *
                                o.currentSlide
                              : c
                              ? (o.last - o.currentSlide + o.cloneOffset) * l
                              : (o.currentSlide + o.cloneOffset) * l));
                  },
                  !1
                ),
                (e._slider = o),
                e.addEventListener(
                  "MSGestureChange",
                  function (t) {
                    t.stopPropagation();
                    var i = t.target._slider;
                    if (i) {
                      var o = -t.translationX,
                        n = -t.translationY;
                      return (
                        (h = y += d ? n : o),
                        (m = d
                          ? Math.abs(y) < Math.abs(-o)
                          : Math.abs(y) < Math.abs(-n)),
                        t.detail === t.MSGESTURE_FLAG_INERTIA
                          ? void setImmediate(function () {
                              e._gesture.stop();
                            })
                          : void (
                              (!m || Number(new Date()) - f > 500) &&
                              (t.preventDefault(),
                              !p &&
                                i.transitions &&
                                (i.vars.animationLoop ||
                                  (h =
                                    y /
                                    ((0 === i.currentSlide && 0 > y) ||
                                    (i.currentSlide === i.last && y > 0)
                                      ? Math.abs(y) / l + 2
                                      : 1)),
                                i.setProps(a + h, "setTouch")))
                            )
                      );
                    }
                  },
                  !1
                ),
                e.addEventListener(
                  "MSGestureEnd",
                  function (t) {
                    t.stopPropagation();
                    var e = t.target._slider;
                    if (e) {
                      if (
                        e.animatingTo === e.currentSlide &&
                        !m &&
                        null !== h
                      ) {
                        var i = c ? -h : h,
                          o = e.getTarget(i > 0 ? "next" : "prev");
                        e.canAdvance(o) &&
                        ((Number(new Date()) - f < 550 && Math.abs(i) > 50) ||
                          Math.abs(i) > l / 2)
                          ? e.flexAnimate(o, e.vars.pauseOnAction)
                          : p ||
                            e.flexAnimate(
                              e.currentSlide,
                              e.vars.pauseOnAction,
                              !0
                            );
                      }
                      (n = null), (s = null), (h = null), (a = null), (y = 0);
                    }
                  },
                  !1
                ))
              : e.addEventListener(
                  "touchstart",
                  function (r) {
                    o.animating
                      ? r.preventDefault()
                      : (window.navigator.msPointerEnabled ||
                          1 === r.touches.length) &&
                        (o.pause(),
                        (l = d ? o.h : o.w),
                        (f = Number(new Date())),
                        (g = r.touches[0].pageX),
                        (v = r.touches[0].pageY),
                        (a =
                          u && c && o.animatingTo === o.last
                            ? 0
                            : u && c
                            ? o.limit -
                              (o.itemW + o.vars.itemMargin) *
                                o.move *
                                o.animatingTo
                            : u && o.currentSlide === o.last
                            ? o.limit
                            : u
                            ? (o.itemW + o.vars.itemMargin) *
                              o.move *
                              o.currentSlide
                            : c
                            ? (o.last - o.currentSlide + o.cloneOffset) * l
                            : (o.currentSlide + o.cloneOffset) * l),
                        (n = d ? v : g),
                        (s = d ? g : v),
                        e.addEventListener("touchmove", t, !1),
                        e.addEventListener("touchend", i, !1));
                  },
                  !1
                );
          },
          resize: function () {
            !o.animating &&
              o.is(":visible") &&
              (u || o.doMath(),
              p
                ? m.smoothHeight()
                : u
                ? (o.slides.width(o.computedW),
                  o.update(o.pagingCount),
                  o.setProps())
                : d
                ? (o.viewport.height(o.h), o.setProps(o.h, "setTotal"))
                : (o.vars.smoothHeight && m.smoothHeight(),
                  o.newSlides.width(o.computedW),
                  o.setProps(o.computedW, "setTotal")));
          },
          smoothHeight: function (t) {
            if (!d || p) {
              var e = p ? o : o.viewport;
              t
                ? e.animate({ height: o.slides.eq(o.animatingTo).height() }, t)
                : e.height(o.slides.eq(o.animatingTo).height());
            }
          },
          sync: function (e) {
            var i = t(o.vars.sync).data("flexslider"),
              n = o.animatingTo;
            switch (e) {
              case "animate":
                i.flexAnimate(n, o.vars.pauseOnAction, !1, !0);
                break;
              case "play":
                i.playing || i.asNav || i.play();
                break;
              case "pause":
                i.pause();
            }
          },
          uniqueID: function (e) {
            return (
              e
                .filter("[id]")
                .add(e.find("[id]"))
                .each(function () {
                  var e = t(this);
                  e.attr("id", e.attr("id") + "_clone");
                }),
              e
            );
          },
          pauseInvisible: {
            visProp: null,
            init: function () {
              var t = m.pauseInvisible.getHiddenProp();
              if (t) {
                var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
                document.addEventListener(e, function () {
                  m.pauseInvisible.isHidden()
                    ? o.startTimeout
                      ? clearTimeout(o.startTimeout)
                      : o.pause()
                    : o.started
                    ? o.play()
                    : o.vars.initDelay > 0
                    ? setTimeout(o.play, o.vars.initDelay)
                    : o.play();
                });
              }
            },
            isHidden: function () {
              var t = m.pauseInvisible.getHiddenProp();
              return !!t && document[t];
            },
            getHiddenProp: function () {
              var t = ["webkit", "moz", "ms", "o"];
              if ("hidden" in document) return "hidden";
              for (var e = 0; e < t.length; e++)
                if (t[e] + "Hidden" in document) return t[e] + "Hidden";
              return null;
            },
          },
          setToClearWatchedEvent: function () {
            clearTimeout(n),
              (n = setTimeout(function () {
                h = "";
              }, 3e3));
          },
        }),
        (o.flexAnimate = function (e, i, n, r, l) {
          if (
            (o.vars.animationLoop ||
              e === o.currentSlide ||
              (o.direction = e > o.currentSlide ? "next" : "prev"),
            f &&
              1 === o.pagingCount &&
              (o.direction = o.currentItem < e ? "next" : "prev"),
            !o.animating && (o.canAdvance(e, l) || n) && o.is(":visible"))
          ) {
            if (f && r) {
              var h = t(o.vars.asNavFor).data("flexslider");
              if (
                ((o.atEnd = 0 === e || e === o.count - 1),
                h.flexAnimate(e, !0, !1, !0, l),
                (o.direction = o.currentItem < e ? "next" : "prev"),
                (h.direction = o.direction),
                Math.ceil((e + 1) / o.visible) - 1 === o.currentSlide ||
                  0 === e)
              )
                return (
                  (o.currentItem = e),
                  o.slides
                    .removeClass(s + "active-slide")
                    .eq(e)
                    .addClass(s + "active-slide"),
                  !1
                );
              (o.currentItem = e),
                o.slides
                  .removeClass(s + "active-slide")
                  .eq(e)
                  .addClass(s + "active-slide"),
                (e = Math.floor(e / o.visible));
            }
            if (
              ((o.animating = !0),
              (o.animatingTo = e),
              i && o.pause(),
              o.vars.before(o),
              o.syncExists && !l && m.sync("animate"),
              o.vars.controlNav && m.controlNav.active(),
              u ||
                o.slides
                  .removeClass(s + "active-slide")
                  .eq(e)
                  .addClass(s + "active-slide"),
              (o.atEnd = 0 === e || e === o.last),
              o.vars.directionNav && m.directionNav.update(),
              e === o.last &&
                (o.vars.end(o), o.vars.animationLoop || o.pause()),
              p)
            )
              a
                ? (o.slides.eq(o.currentSlide).css({ opacity: 0, zIndex: 1 }),
                  o.slides.eq(e).css({ opacity: 1, zIndex: 2 }),
                  o.wrapup(b))
                : (o.slides
                    .eq(o.currentSlide)
                    .css({ zIndex: 1 })
                    .animate(
                      { opacity: 0 },
                      o.vars.animationSpeed,
                      o.vars.easing
                    ),
                  o.slides
                    .eq(e)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      o.vars.animationSpeed,
                      o.vars.easing,
                      o.wrapup
                    ));
            else {
              var g,
                v,
                y,
                b = d ? o.slides.filter(":first").height() : o.computedW;
              u
                ? ((g = o.vars.itemMargin),
                  (v =
                    (y = (o.itemW + g) * o.move * o.animatingTo) > o.limit &&
                    1 !== o.visible
                      ? o.limit
                      : y))
                : (v =
                    0 === o.currentSlide &&
                    e === o.count - 1 &&
                    o.vars.animationLoop &&
                    "next" !== o.direction
                      ? c
                        ? (o.count + o.cloneOffset) * b
                        : 0
                      : o.currentSlide === o.last &&
                        0 === e &&
                        o.vars.animationLoop &&
                        "prev" !== o.direction
                      ? c
                        ? 0
                        : (o.count + 1) * b
                      : c
                      ? (o.count - 1 - e + o.cloneOffset) * b
                      : (e + o.cloneOffset) * b),
                o.setProps(v, "", o.vars.animationSpeed),
                o.transitions
                  ? ((o.vars.animationLoop && o.atEnd) ||
                      ((o.animating = !1), (o.currentSlide = o.animatingTo)),
                    o.container.unbind("webkitTransitionEnd transitionend"),
                    o.container.bind(
                      "webkitTransitionEnd transitionend",
                      function () {
                        clearTimeout(o.ensureAnimationEnd), o.wrapup(b);
                      }
                    ),
                    clearTimeout(o.ensureAnimationEnd),
                    (o.ensureAnimationEnd = setTimeout(function () {
                      o.wrapup(b);
                    }, o.vars.animationSpeed + 100)))
                  : o.container.animate(
                      o.args,
                      o.vars.animationSpeed,
                      o.vars.easing,
                      function () {
                        o.wrapup(b);
                      }
                    );
            }
            o.vars.smoothHeight && m.smoothHeight(o.vars.animationSpeed);
          }
        }),
        (o.wrapup = function (t) {
          p ||
            u ||
            (0 === o.currentSlide &&
            o.animatingTo === o.last &&
            o.vars.animationLoop
              ? o.setProps(t, "jumpEnd")
              : o.currentSlide === o.last &&
                0 === o.animatingTo &&
                o.vars.animationLoop &&
                o.setProps(t, "jumpStart")),
            (o.animating = !1),
            (o.currentSlide = o.animatingTo),
            o.vars.after(o);
        }),
        (o.animateSlides = function () {
          !o.animating && o.flexAnimate(o.getTarget("next"));
        }),
        (o.pause = function () {
          clearInterval(o.animatedSlides),
            (o.animatedSlides = null),
            (o.playing = !1),
            o.vars.pausePlay && m.pausePlay.update("play"),
            o.syncExists && m.sync("pause");
        }),
        (o.play = function () {
          o.playing && clearInterval(o.animatedSlides),
            (o.animatedSlides =
              o.animatedSlides ||
              setInterval(o.animateSlides, o.vars.slideshowSpeed)),
            (o.started = o.playing = !0),
            o.vars.pausePlay && m.pausePlay.update("pause"),
            o.syncExists && m.sync("play");
        }),
        (o.stop = function () {
          o.pause(), (o.stopped = !0);
        }),
        (o.canAdvance = function (t, e) {
          var i = f ? o.pagingCount - 1 : o.last;
          return (
            !!e ||
            !(
              !f ||
              o.currentItem !== o.count - 1 ||
              0 !== t ||
              "prev" !== o.direction
            ) ||
            ((!f ||
              0 !== o.currentItem ||
              t !== o.pagingCount - 1 ||
              "next" === o.direction) &&
              !(t === o.currentSlide && !f) &&
              (!!o.vars.animationLoop ||
                ((!o.atEnd ||
                  0 !== o.currentSlide ||
                  t !== i ||
                  "next" === o.direction) &&
                  (!o.atEnd ||
                    o.currentSlide !== i ||
                    0 !== t ||
                    "next" !== o.direction))))
          );
        }),
        (o.getTarget = function (t) {
          return (
            (o.direction = t),
            "next" === t
              ? o.currentSlide === o.last
                ? 0
                : o.currentSlide + 1
              : 0 === o.currentSlide
              ? o.last
              : o.currentSlide - 1
          );
        }),
        (o.setProps = function (t, e, i) {
          var n = (function () {
            var i = t || (o.itemW + o.vars.itemMargin) * o.move * o.animatingTo;
            return (
              -1 *
                (function () {
                  if (u)
                    return "setTouch" === e
                      ? t
                      : c && o.animatingTo === o.last
                      ? 0
                      : c
                      ? o.limit -
                        (o.itemW + o.vars.itemMargin) * o.move * o.animatingTo
                      : o.animatingTo === o.last
                      ? o.limit
                      : i;
                  switch (e) {
                    case "setTotal":
                      return c
                        ? (o.count - 1 - o.currentSlide + o.cloneOffset) * t
                        : (o.currentSlide + o.cloneOffset) * t;
                    case "setTouch":
                      return t;
                    case "jumpEnd":
                      return c ? t : o.count * t;
                    case "jumpStart":
                      return c ? o.count * t : t;
                    default:
                      return t;
                  }
                })() +
              "px"
            );
          })();
          o.transitions &&
            ((n = d
              ? "translate3d(0," + n + ",0)"
              : "translate3d(" + n + ",0,0)"),
            (i = void 0 !== i ? i / 1e3 + "s" : "0s"),
            o.container.css("-" + o.pfx + "-transition-duration", i),
            o.container.css("transition-duration", i)),
            (o.args[o.prop] = n),
            (o.transitions || void 0 === i) && o.container.css(o.args),
            o.container.css("transform", n);
        }),
        (o.setup = function (e) {
          var i, n;
          p
            ? (o.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative",
              }),
              "init" === e &&
                (a
                  ? o.slides
                      .css({
                        opacity: 0,
                        display: "block",
                        webkitTransition:
                          "opacity " + o.vars.animationSpeed / 1e3 + "s ease",
                        zIndex: 1,
                      })
                      .eq(o.currentSlide)
                      .css({ opacity: 1, zIndex: 2 })
                  : 0 == o.vars.fadeFirstSlide
                  ? o.slides
                      .css({ opacity: 0, display: "block", zIndex: 1 })
                      .eq(o.currentSlide)
                      .css({ zIndex: 2 })
                      .css({ opacity: 1 })
                  : o.slides
                      .css({ opacity: 0, display: "block", zIndex: 1 })
                      .eq(o.currentSlide)
                      .css({ zIndex: 2 })
                      .animate(
                        { opacity: 1 },
                        o.vars.animationSpeed,
                        o.vars.easing
                      )),
              o.vars.smoothHeight && m.smoothHeight())
            : ("init" === e &&
                ((o.viewport = t('<div class="' + s + 'viewport"></div>')
                  .css({ overflow: "hidden", position: "relative" })
                  .appendTo(o)
                  .append(o.container)),
                (o.cloneCount = 0),
                (o.cloneOffset = 0),
                c &&
                  ((n = t.makeArray(o.slides).reverse()),
                  (o.slides = t(n)),
                  o.container.empty().append(o.slides))),
              o.vars.animationLoop &&
                !u &&
                ((o.cloneCount = 2),
                (o.cloneOffset = 1),
                "init" !== e && o.container.find(".clone").remove(),
                o.container
                  .append(
                    m
                      .uniqueID(o.slides.first().clone().addClass("clone"))
                      .attr("aria-hidden", "true")
                  )
                  .prepend(
                    m
                      .uniqueID(o.slides.last().clone().addClass("clone"))
                      .attr("aria-hidden", "true")
                  )),
              (o.newSlides = t(o.vars.selector, o)),
              (i = c
                ? o.count - 1 - o.currentSlide + o.cloneOffset
                : o.currentSlide + o.cloneOffset),
              d && !u
                ? (o.container
                    .height(200 * (o.count + o.cloneCount) + "%")
                    .css("position", "absolute")
                    .width("100%"),
                  setTimeout(
                    function () {
                      o.newSlides.css({ display: "block" }),
                        o.doMath(),
                        o.viewport.height(o.h),
                        o.setProps(i * o.h, "init");
                    },
                    "init" === e ? 100 : 0
                  ))
                : (o.container.width(200 * (o.count + o.cloneCount) + "%"),
                  o.setProps(i * o.computedW, "init"),
                  setTimeout(
                    function () {
                      o.doMath(),
                        o.newSlides.css({
                          width: o.computedW,
                          float: "left",
                          display: "block",
                        }),
                        o.vars.smoothHeight && m.smoothHeight();
                    },
                    "init" === e ? 100 : 0
                  )));
          u ||
            o.slides
              .removeClass(s + "active-slide")
              .eq(o.currentSlide)
              .addClass(s + "active-slide"),
            o.vars.init(o);
        }),
        (o.doMath = function () {
          var t = o.slides.first(),
            e = o.vars.itemMargin,
            i = o.vars.minItems,
            n = o.vars.maxItems;
          (o.w = void 0 === o.viewport ? o.width() : o.viewport.width()),
            (o.h = t.height()),
            (o.boxPadding = t.outerWidth() - t.width()),
            u
              ? ((o.itemT = o.vars.itemWidth + e),
                (o.minW = i ? i * o.itemT : o.w),
                (o.maxW = n ? n * o.itemT - e : o.w),
                (o.itemW =
                  o.minW > o.w
                    ? (o.w - e * (i - 1)) / i
                    : o.maxW < o.w
                    ? (o.w - e * (n - 1)) / n
                    : o.vars.itemWidth > o.w
                    ? o.w
                    : o.vars.itemWidth),
                (o.visible = Math.floor(o.w / o.itemW)),
                (o.move =
                  o.vars.move > 0 && o.vars.move < o.visible
                    ? o.vars.move
                    : o.visible),
                (o.pagingCount = Math.ceil((o.count - o.visible) / o.move + 1)),
                (o.last = o.pagingCount - 1),
                (o.limit =
                  1 === o.pagingCount
                    ? 0
                    : o.vars.itemWidth > o.w
                    ? o.itemW * (o.count - 1) + e * (o.count - 1)
                    : (o.itemW + e) * o.count - o.w - e))
              : ((o.itemW = o.w),
                (o.pagingCount = o.count),
                (o.last = o.count - 1)),
            (o.computedW = o.itemW - o.boxPadding);
        }),
        (o.update = function (t, e) {
          o.doMath(),
            u ||
              (t < o.currentSlide
                ? (o.currentSlide += 1)
                : t <= o.currentSlide && 0 !== t && (o.currentSlide -= 1),
              (o.animatingTo = o.currentSlide)),
            o.vars.controlNav &&
              !o.manualControls &&
              (("add" === e && !u) || o.pagingCount > o.controlNav.length
                ? m.controlNav.update("add")
                : (("remove" === e && !u) ||
                    o.pagingCount < o.controlNav.length) &&
                  (u &&
                    o.currentSlide > o.last &&
                    ((o.currentSlide -= 1), (o.animatingTo -= 1)),
                  m.controlNav.update("remove", o.last))),
            o.vars.directionNav && m.directionNav.update();
        }),
        (o.addSlide = function (e, i) {
          var n = t(e);
          (o.count += 1),
            (o.last = o.count - 1),
            d && c
              ? void 0 !== i
                ? o.slides.eq(o.count - i).after(n)
                : o.container.prepend(n)
              : void 0 !== i
              ? o.slides.eq(i).before(n)
              : o.container.append(n),
            o.update(i, "add"),
            (o.slides = t(o.vars.selector + ":not(.clone)", o)),
            o.setup(),
            o.vars.added(o);
        }),
        (o.removeSlide = function (e) {
          var i = isNaN(e) ? o.slides.index(t(e)) : e;
          (o.count -= 1),
            (o.last = o.count - 1),
            isNaN(e)
              ? t(e, o.slides).remove()
              : d && c
              ? o.slides.eq(o.last).remove()
              : o.slides.eq(e).remove(),
            o.doMath(),
            o.update(i, "remove"),
            (o.slides = t(o.vars.selector + ":not(.clone)", o)),
            o.setup(),
            o.vars.removed(o);
        }),
        m.init();
    }),
      t(window)
        .blur(function (t) {
          focused = !1;
        })
        .focus(function (t) {
          focused = !0;
        }),
      (t.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {},
        before: function () {},
        after: function () {},
        end: function () {},
        added: function () {},
        removed: function () {},
        init: function () {},
      }),
      (t.fn.flexslider = function (e) {
        if ((void 0 === e && (e = {}), "object" == typeof e))
          return this.each(function () {
            var i = t(this),
              o = e.selector ? e.selector : ".slides > li",
              n = i.find(o);
            (1 === n.length && !0 === e.allowOneSlide) || 0 === n.length
              ? (n.fadeIn(400), e.start && e.start(i))
              : void 0 === i.data("flexslider") && new t.flexslider(this, e);
          });
        var i = t(this).data("flexslider");
        switch (e) {
          case "play":
            i.play();
            break;
          case "pause":
            i.pause();
            break;
          case "stop":
            i.stop();
            break;
          case "next":
            i.flexAnimate(i.getTarget("next"), !0);
            break;
          case "prev":
          case "previous":
            i.flexAnimate(i.getTarget("prev"), !0);
            break;
          default:
            "number" == typeof e && i.flexAnimate(e, !0);
        }
      });
  })(jQuery),
  (function (t, e, i) {
    "use strict";
    (t.fn.scrollUp = function (e) {
      t.data(i.body, "scrollUp") ||
        (t.data(i.body, "scrollUp", !0), t.fn.scrollUp.init(e));
    }),
      (t.fn.scrollUp.init = function (o) {
        var n,
          s,
          r,
          a,
          l,
          h,
          d = (t.fn.scrollUp.settings = t.extend(
            {},
            t.fn.scrollUp.defaults,
            o
          )),
          c = !1;
        switch (
          ((h = d.scrollTrigger
            ? t(d.scrollTrigger)
            : t("<a/>", { id: d.scrollName, href: "#top" })),
          d.scrollTitle && h.attr("title", d.scrollTitle),
          h.appendTo("body"),
          d.scrollImg || d.scrollTrigger || h.html(d.scrollText),
          h.css({ display: "none", position: "fixed", zIndex: d.zIndex }),
          d.activeOverlay &&
            t("<div/>", { id: d.scrollName + "-active" })
              .css({
                position: "absolute",
                top: d.scrollDistance + "px",
                width: "100%",
                borderTop: "1px dotted" + d.activeOverlay,
                zIndex: d.zIndex,
              })
              .appendTo("body"),
          d.animation)
        ) {
          case "fade":
            (n = "fadeIn"), (s = "fadeOut"), (r = d.animationSpeed);
            break;
          case "slide":
            (n = "slideDown"), (s = "slideUp"), (r = d.animationSpeed);
            break;
          default:
            (n = "show"), (s = "hide"), (r = 0);
        }
        (a =
          "top" === d.scrollFrom
            ? d.scrollDistance
            : t(i).height() - t(e).height() - d.scrollDistance),
          t(e).scroll(function () {
            t(e).scrollTop() > a
              ? c || (h[n](r), (c = !0))
              : c && (h[s](r), (c = !1));
          }),
          d.scrollTarget
            ? "number" == typeof d.scrollTarget
              ? (l = d.scrollTarget)
              : "string" == typeof d.scrollTarget &&
                (l = Math.floor(t(d.scrollTarget).offset().top))
            : (l = 0),
          h.click(function (e) {
            e.preventDefault(),
              t("html, body").animate(
                { scrollTop: l },
                d.scrollSpeed,
                d.easingType
              );
          });
      }),
      (t.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647,
      }),
      (t.fn.scrollUp.destroy = function (o) {
        t.removeData(i.body, "scrollUp"),
          t("#" + t.fn.scrollUp.settings.scrollName).remove(),
          t("#" + t.fn.scrollUp.settings.scrollName + "-active").remove(),
          t.fn.jquery.split(".")[1] >= 7
            ? t(e).off("scroll", o)
            : t(e).unbind("scroll", o);
      }),
      (t.scrollUp = t.fn.scrollUp);
  })(jQuery, window, document),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("jquery")))
      : (t.jQueryBridget = e(t, t.jQuery));
  })(window, function (t, e) {
    "use strict";
    function i(i, s, a) {
      (a = a || e || t.jQuery) &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          return "string" == typeof t
            ? (function (t, e, o) {
                var n,
                  s = "$()." + i + '("' + e + '")';
                return (
                  t.each(function (t, l) {
                    var h = a.data(l, i);
                    if (h) {
                      var d = h[e];
                      if (d && "_" != e.charAt(0)) {
                        var c = d.apply(h, o);
                        n = void 0 === n ? c : n;
                      } else r(s + " is not a valid method");
                    } else r(i + " not initialized. Cannot call methods, i.e. " + s);
                  }),
                  void 0 !== n ? n : t
                );
              })(this, t, n.call(arguments, 1))
            : ((function (t, e) {
                t.each(function (t, o) {
                  var n = a.data(o, i);
                  n
                    ? (n.option(e), n._init())
                    : ((n = new s(o, e)), a.data(o, i, n));
                });
              })(this, t),
              this);
        }),
        o(a));
    }
    function o(t) {
      !t || (t && t.bridget) || (t.bridget = i);
    }
    var n = Array.prototype.slice,
      s = t.console,
      r =
        void 0 === s
          ? function () {}
          : function (t) {
              s.error(t);
            };
    return o(e || t.jQuery), i;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            o = (i[t] = i[t] || []);
          return -1 == o.indexOf(e) && o.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var o = i.indexOf(e);
          return -1 != o && i.splice(o, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var o = this._onceEvents && this._onceEvents[t], n = 0;
            n < i.length;
            n++
          ) {
            var s = i[n];
            o && o[s] && (this.off(t, s), delete o[s]), s.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t);
      return -1 == t.indexOf("%") && !isNaN(e) && e;
    }
    function e(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          s(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function i() {
      if (!l) {
        l = !0;
        var i = document.createElement("div");
        (i.style.width = "200px"),
          (i.style.padding = "1px 2px 3px 4px"),
          (i.style.borderStyle = "solid"),
          (i.style.borderWidth = "1px 2px 3px 4px"),
          (i.style.boxSizing = "border-box");
        var s = document.body || document.documentElement;
        s.appendChild(i);
        var r = e(i);
        (n = 200 == Math.round(t(r.width))),
          (o.isBoxSizeOuter = n),
          s.removeChild(i);
      }
    }
    function o(o) {
      if (
        (i(),
        "string" == typeof o && (o = document.querySelector(o)),
        o && "object" == typeof o && o.nodeType)
      ) {
        var s = e(o);
        if ("none" == s.display)
          return (function () {
            for (
              var t = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0,
                },
                e = 0;
              e < a;
              e++
            )
              t[r[e]] = 0;
            return t;
          })();
        var l = {};
        (l.width = o.offsetWidth), (l.height = o.offsetHeight);
        for (
          var h = (l.isBorderBox = "border-box" == s.boxSizing), d = 0;
          d < a;
          d++
        ) {
          var c = r[d],
            u = s[c],
            p = parseFloat(u);
          l[c] = isNaN(p) ? 0 : p;
        }
        var f = l.paddingLeft + l.paddingRight,
          m = l.paddingTop + l.paddingBottom,
          g = l.marginLeft + l.marginRight,
          v = l.marginTop + l.marginBottom,
          y = l.borderLeftWidth + l.borderRightWidth,
          b = l.borderTopWidth + l.borderBottomWidth,
          x = h && n,
          w = t(s.width);
        !1 !== w && (l.width = w + (x ? 0 : f + y));
        var _ = t(s.height);
        return (
          !1 !== _ && (l.height = _ + (x ? 0 : m + b)),
          (l.innerWidth = l.width - (f + y)),
          (l.innerHeight = l.height - (m + b)),
          (l.outerWidth = l.width + g),
          (l.outerHeight = l.height + v),
          l
        );
      }
    }
    var n,
      s =
        "undefined" == typeof console
          ? function () {}
          : function (t) {
              console.error(t);
            },
      r = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      a = r.length,
      l = !1;
    return o;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var o = e[i] + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {
        extend: function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e;
        },
      },
      o = Array.prototype.slice;
    (i.makeArray = function (t) {
      return Array.isArray(t)
        ? t
        : null == t
        ? []
        : "object" == typeof t && "number" == typeof t.length
        ? o.call(t)
        : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, o) {
        t = i.makeArray(t);
        var n = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!o) return void n.push(t);
              e(t, o) && n.push(t);
              for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
                n.push(i[s]);
            }
          }),
          n
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var o = t.prototype[e],
          n = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[n];
          clearTimeout(t);
          var e = arguments,
            s = this;
          this[n] = setTimeout(function () {
            o.apply(s, e), delete s[n];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var s = i.toDashed(o),
            r = "data-" + s,
            a = document.querySelectorAll("[" + r + "]"),
            l = document.querySelectorAll(".js-" + s),
            h = i.makeArray(a).concat(i.makeArray(l)),
            d = r + "-options",
            c = t.jQuery;
          h.forEach(function (t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(d);
            try {
              i = s && JSON.parse(s);
            } catch (e) {
              return void (
                n &&
                n.error("Error parsing " + r + " on " + t.className + ": " + e)
              );
            }
            var a = new e(t, i);
            c && c.data(t, o, a);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    var o = document.documentElement.style,
      n = "string" == typeof o.transition ? "transition" : "WebkitTransition",
      s = "string" == typeof o.transform ? "transform" : "WebkitTransform",
      r = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[n],
      a = {
        transform: s,
        transition: n,
        transitionDuration: n + "Duration",
        transitionProperty: n + "Property",
        transitionDelay: n + "Delay",
      },
      l = (i.prototype = Object.create(t.prototype));
    (l.constructor = i),
      (l._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (l.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (l.getSize = function () {
        this.size = e(this.element);
      }),
      (l.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          e[a[i] || i] = t[i];
        }
      }),
      (l.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          o = t[e ? "left" : "right"],
          n = t[i ? "top" : "bottom"],
          s = parseFloat(o),
          r = parseFloat(n),
          a = this.layout.size;
        -1 != o.indexOf("%") && (s = (s / 100) * a.width),
          -1 != n.indexOf("%") && (r = (r / 100) * a.height),
          (s = isNaN(s) ? 0 : s),
          (r = isNaN(r) ? 0 : r),
          (s -= e ? a.paddingLeft : a.paddingRight),
          (r -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = s),
          (this.position.y = r);
      }),
      (l.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop"),
          n = i ? "paddingLeft" : "paddingRight",
          s = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[n];
        (e[s] = this.getXValue(a)), (e[r] = "");
        var l = o ? "paddingTop" : "paddingBottom",
          h = o ? "top" : "bottom",
          d = o ? "bottom" : "top",
          c = this.position.y + t[l];
        (e[h] = this.getYValue(c)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (l.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (l.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (l._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), !n || this.isTransitioning)) {
          var s = t - i,
            r = e - o,
            a = {};
          (a.transform = this.getTranslate(s, r)),
            this.transition({
              to: a,
              onTransitionEnd: { transform: this.layoutPosition },
              isCleaning: !0,
            });
        } else this.layoutPosition();
      }),
      (l.getTranslate = function (t, e) {
        return (
          "translate3d(" +
          (t = this.layout._getOption("originLeft") ? t : -t) +
          "px, " +
          (e = this.layout._getOption("originTop") ? e : -e) +
          "px, 0)"
        );
      }),
      (l.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (l.moveTo = l._transitionTo),
      (l.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (l._nonTransition = function (t) {
        for (var e in (this.css(t.to),
        t.isCleaning && this._removeStyles(t.to),
        t.onTransitionEnd))
          t.onTransitionEnd[e].call(this);
      }),
      (l.transition = function (t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
          var e = this._transn;
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
          for (i in t.to)
            (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
          if (t.from) {
            this.css(t.from);
            this.element.offsetHeight;
            null;
          }
          this.enableTransition(t.to),
            this.css(t.to),
            (this.isTransitioning = !0);
        } else this._nonTransition(t);
      });
    var h =
      "opacity," +
      (function (t) {
        return t.replace(/([A-Z])/g, function (t) {
          return "-" + t.toLowerCase();
        });
      })(s);
    (l.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: h,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(r, this, !1);
      }
    }),
      (l.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (l.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var d = { "-webkit-transform": "transform" };
    (l.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = d[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          (function (t) {
            for (var e in t) return !1;
            return !0;
          })(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd)
        )
          e.onEnd[i].call(this), delete e.onEnd[i];
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (l.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(r, this, !1),
          (this.isTransitioning = !1);
      }),
      (l._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var c = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (l.removeTransitionStyles = function () {
        this.css(c);
      }),
      (l.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (l.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (l.remove = function () {
        return n && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (l.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {};
        (e[this.getHideRevealTransitionEndProperty("visibleStyle")] =
          this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (l.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (l.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (l.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {};
        (e[this.getHideRevealTransitionEndProperty("hiddenStyle")] =
          this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (l.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (l.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, o, n, s) {
            return e(t, i, o, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, o, n) {
    "use strict";
    function s(t, e) {
      var i = o.getQueryElement(t);
      if (i) {
        (this.element = i),
          l && (this.$element = l(this.element)),
          (this.options = o.extend({}, this.constructor.defaults)),
          this.option(e);
        var n = ++d;
        (this.element.outlayerGUID = n),
          (c[n] = this),
          this._create(),
          this._getOption("initLayout") && this.layout();
      } else a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    var a = t.console,
      l = t.jQuery,
      h = function () {},
      d = 0,
      c = {};
    (s.namespace = "outlayer"),
      (s.Item = n),
      (s.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var u = s.prototype;
    o.extend(u, e.prototype),
      (u.option = function (t) {
        o.extend(this.options, t);
      }),
      (u._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (u._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          o.extend(this.element.style, this.options.containerStyle),
          this._getOption("resize") && this.bindResize();
      }),
      (u.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (u._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0;
          n < e.length;
          n++
        ) {
          var s = new i(e[n], this);
          o.push(s);
        }
        return o;
      }),
      (u._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector);
      }),
      (u.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (u.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (u._init = u.layout),
      (u._resetLayout = function () {
        this.getSize();
      }),
      (u.getSize = function () {
        this.size = i(this.element);
      }),
      (u._getMeasurement = function (t, e) {
        var o,
          n = this.options[t];
        n
          ? ("string" == typeof n
              ? (o = this.element.querySelector(n))
              : n instanceof HTMLElement && (o = n),
            (this[t] = o ? i(o)[e] : n))
          : (this[t] = 0);
      }),
      (u.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (u._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (u._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var o = this._getItemLayoutPosition(t);
            (o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (u._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (u._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (u.updateStagger = function () {
        var t = this.options.stagger;
        return null == t
          ? void (this.stagger = 0)
          : ((this.stagger = (function (t) {
              if ("number" == typeof t) return t;
              var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                o = e && e[2];
              return i.length ? (i = parseFloat(i)) * (p[o] || 1) : 0;
            })(t)),
            this.stagger);
      }),
      (u._positionItem = function (t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
      }),
      (u._postLayout = function () {
        this.resizeContainer();
      }),
      (u.resizeContainer = function () {
        if (this._getOption("resizeContainer")) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (u._getContainerSize = h),
      (u._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (u._emitCompleteOnItems = function (t, e) {
        function i() {
          n.dispatchEvent(t + "Complete", null, [e]);
        }
        function o() {
          ++r == s && i();
        }
        var n = this,
          s = e.length;
        if (e && s) {
          var r = 0;
          e.forEach(function (e) {
            e.once(t, o);
          });
        } else i();
      }),
      (u.dispatchEvent = function (t, e, i) {
        var o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), l))
          if (((this.$element = this.$element || l(this.element)), e)) {
            var n = l.Event(e);
            (n.type = t), this.$element.trigger(n, i);
          } else this.$element.trigger(t, i);
      }),
      (u.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (u.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (u.stamp = function (t) {
        (t = this._find(t)) &&
          ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
      }),
      (u.unstamp = function (t) {
        (t = this._find(t)) &&
          t.forEach(function (t) {
            o.removeFrom(this.stamps, t), this.unignore(t);
          }, this);
      }),
      (u._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            o.makeArray(t)
          );
      }),
      (u._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (u._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (u._manageStamp = h),
      (u._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          o = this._boundingRect,
          n = i(t);
        return {
          left: e.left - o.left - n.marginLeft,
          top: e.top - o.top - n.marginTop,
          right: o.right - e.right - n.marginRight,
          bottom: o.bottom - e.bottom - n.marginBottom,
        };
      }),
      (u.handleEvent = o.handleEvent),
      (u.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (u.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (u.onresize = function () {
        this.resize();
      }),
      o.debounceMethod(s, "onresize", 100),
      (u.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (u.needsResizeLayout = function () {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth;
      }),
      (u.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (u.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (u.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (u.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (u.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (u.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (u.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (u.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (u.getItems = function (t) {
        t = o.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (u.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), o.removeFrom(this.items, t);
            }, this);
      }),
      (u.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          l && l.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        var e = (t = o.getQueryElement(t)) && t.outlayerGUID;
        return e && c[e];
      }),
      (s.create = function (t, e) {
        var i = r(s);
        return (
          (i.defaults = o.extend({}, s.defaults)),
          o.extend(i.defaults, e),
          (i.compatOptions = o.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(n)),
          o.htmlInit(i, t),
          l && l.bridget && l.bridget(t, i),
          i
        );
      });
    var p = { ms: 1, s: 1e3 };
    return (s.Item = n), s;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      o = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var n = i.destroy;
    return (
      (i.destroy = function () {
        n.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var o = i.prototype;
    return (
      [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ].forEach(function (t) {
        o[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (o.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element);
        return (
          this.isotope.size &&
          e &&
          e.innerHeight != this.isotope.size.innerHeight
        );
      }),
      (o._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (o.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (o.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (o.getSegmentSize = function (t, e) {
        var i = t + e,
          o = "outer" + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.isotope.size["inner" + e];
        }
      }),
      (o.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (o.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (o.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function n() {
          i.apply(this, arguments);
        }
        return (
          (n.prototype = Object.create(o)),
          (n.prototype.constructor = n),
          e && (n.options = e),
          (n.prototype.namespace = t),
          (i.modes[t] = n),
          n
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "masonry-layout/masonry",
          ["outlayer/outlayer", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return (
      (o._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (o.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          s = n / o,
          r = o - (n % o);
        (s = Math[r && r < 1 ? "round" : "floor"](s)),
          (this.cols = Math.max(s, 1));
      }),
      (o.getContainerWidth = function () {
        var t = this._getOption("fitWidth")
            ? this.element.parentNode
            : this.element,
          i = e(t);
        this.containerWidth = i && i.innerWidth;
      }),
      (o._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = Math[e && e < 1 ? "round" : "ceil"](
            t.size.outerWidth / this.columnWidth
          );
        i = Math.min(i, this.cols);
        for (
          var o = this[
              this.options.horizontalOrder
                ? "_getHorizontalColPosition"
                : "_getTopColPosition"
            ](i, t),
            n = { x: this.columnWidth * o.col, y: o.y },
            s = o.y + t.size.outerHeight,
            r = i + o.col,
            a = o.col;
          a < r;
          a++
        )
          this.colYs[a] = s;
        return n;
      }),
      (o._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (o._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
          e[o] = this._getColGroupY(o, t);
        return e;
      }),
      (o._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (o._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = t > 1 && i + t > this.cols ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = o ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (o._manageStamp = function (t) {
        var i = e(t),
          o = this._getElementOffset(t),
          n = this._getOption("originLeft") ? o.left : o.right,
          s = n + i.outerWidth,
          r = Math.floor(n / this.columnWidth);
        r = Math.max(0, r);
        var a = Math.floor(s / this.columnWidth);
        (a -= s % this.columnWidth ? 0 : 1), (a = Math.min(this.cols - 1, a));
        for (
          var l =
              (this._getOption("originTop") ? o.top : o.bottom) + i.outerHeight,
            h = r;
          h <= a;
          h++
        )
          this.colYs[h] = Math.max(l, this.colYs[h]);
      }),
      (o._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (o._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-modes/masonry",
          ["../layout-mode", "masonry-layout/masonry"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      o = i.prototype,
      n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var a = o._getOption;
    return (
      (o._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var o = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          o
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "desandro-matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope-layout/js/item",
            "isotope-layout/js/layout-mode",
            "isotope-layout/js/layout-modes/masonry",
            "isotope-layout/js/layout-modes/fit-rows",
            "isotope-layout/js/layout-modes/vertical",
          ],
          function (i, o, n, s, r, a) {
            return e(t, i, o, n, s, r, a);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope-layout/js/item"),
          require("isotope-layout/js/layout-mode"),
          require("isotope-layout/js/layout-modes/masonry"),
          require("isotope-layout/js/layout-modes/fit-rows"),
          require("isotope-layout/js/layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, o, n, s, r) {
    var a = t.jQuery,
      l = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      h = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (h.Item = s), (h.LayoutMode = r);
    var d = h.prototype;
    (d._create = function () {
      for (var t in ((this.itemGUID = 0),
      (this._sorters = {}),
      this._getSorters(),
      e.prototype._create.call(this),
      (this.modes = {}),
      (this.filteredItems = this.items),
      (this.sortHistory = ["original-order"]),
      r.modes))
        this._initLayoutMode(t);
    }),
      (d.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (d._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        ) {
          t[i].id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (d._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (d.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout")
          ? void this.arrange()
          : void this._layout();
      }),
      (d._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (d.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (d._init = d.arrange),
      (d._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (d._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e), e;
      }),
      (d._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            o &&
            n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (o = !0), t();
          });
      }),
      (d._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r];
          if (!a.isIgnored) {
            var l = s(a);
            l && i.push(a),
              l && a.isHidden ? o.push(a) : l || a.isHidden || n.push(a);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (d._getFilterTest = function (t) {
        return a && this.options.isJQueryFiltering
          ? function (e) {
              return a(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return o(e.element, t);
            };
      }),
      (d.updateSortData = function (t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (d._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = c(i);
        }
      }),
      (d._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
          t[i].updateSortData();
        }
      });
    var c = (function () {
      return function (t) {
        if ("string" != typeof t) return t;
        var e = l(t).split(" "),
          i = e[0],
          o = i.match(/^\[(.+)\]$/),
          n = (function (t, e) {
            return t
              ? function (e) {
                  return e.getAttribute(t);
                }
              : function (t) {
                  var i = t.querySelector(e);
                  return i && i.textContent;
                };
          })(o && o[1], i),
          s = h.sortDataParsers[e[1]];
        return s
          ? function (t) {
              return t && s(n(t));
            }
          : function (t) {
              return t && n(t);
            };
      };
    })();
    (h.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (d._sort = function () {
        if (this.options.sortBy) {
          var t = n.makeArray(this.options.sortBy);
          this._getIsSameSortBy(t) ||
            (this.sortHistory = t.concat(this.sortHistory));
          var e = (function (t, e) {
            return function (i, o) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n],
                  r = i.sortData[s],
                  a = o.sortData[s];
                if (r > a || r < a)
                  return (
                    (r > a ? 1 : -1) * ((void 0 !== e[s] ? e[s] : e) ? 1 : -1)
                  );
              }
              return 0;
            };
          })(this.sortHistory, this.options.sortAscending);
          this.filteredItems.sort(e);
        }
      }),
      (d._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++)
          if (t[e] != this.sortHistory[e]) return !1;
        return !0;
      }),
      (d._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (d._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (d._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (d._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (d._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (d.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (d.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (d.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (d._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (d.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            o,
            n = e.length;
          for (i = 0; i < n; i++)
            (o = e[i]), this.element.appendChild(o.element);
          var s = this._filter(e).matches;
          for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
          this.reveal(s);
        }
      });
    var u = d.remove;
    return (
      (d.remove = function (t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        u.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
          var s = e[o];
          n.removeFrom(this.filteredItems, s);
        }
      }),
      (d.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
          this.items[t].sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (d._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return (this.options.transitionDuration = i), o;
      }),
      (d.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      h
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            o = (i[t] = i[t] || []);
          return -1 == o.indexOf(e) && o.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var o = i.indexOf(e);
          return -1 != o && i.splice(o, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var o = this._onceEvents && this._onceEvents[t], n = 0;
            n < i.length;
            n++
          ) {
            var s = i[n];
            o && o[s] && (this.off(t, s), delete o[s]), s.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.imagesLoaded = e(t, t.EvEmitter));
  })("undefined" != typeof window ? window : this, function (t, e) {
    function i(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function o(t, e, n) {
      if (!(this instanceof o)) return new o(t, e, n);
      var s = t;
      return (
        "string" == typeof t && (s = document.querySelectorAll(t)),
        s
          ? ((this.elements = (function (t) {
              return Array.isArray(t)
                ? t
                : "object" == typeof t && "number" == typeof t.length
                ? l.call(t)
                : [t];
            })(s)),
            (this.options = i({}, this.options)),
            "function" == typeof e ? (n = e) : i(this.options, e),
            n && this.on("always", n),
            this.getImages(),
            r && (this.jqDeferred = new r.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (s || t))
      );
    }
    function n(t) {
      this.img = t;
    }
    function s(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var r = t.jQuery,
      a = t.console,
      l = Array.prototype.slice;
    (o.prototype = Object.create(e.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && h[e]) {
          for (var i = t.querySelectorAll("img"), o = 0; o < i.length; o++) {
            var n = i[o];
            this.addImage(n);
          }
          if ("string" == typeof this.options.background) {
            var s = t.querySelectorAll(this.options.background);
            for (o = 0; o < s.length; o++) {
              var r = s[o];
              this.addElementBackgroundImages(r);
            }
          }
        }
      });
    var h = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, o = i.exec(e.backgroundImage);
            null !== o;

          ) {
            var n = o && o[2];
            n && this.addBackground(n, t), (o = i.exec(e.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (t) {
        var e = new n(t);
        this.images.push(e);
      }),
      (o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function t(t, i, o) {
          setTimeout(function () {
            e.progress(t, i, o);
          });
        }
        var e = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, t, e);
      }),
      (o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      (n.prototype = Object.create(e.prototype)),
      (n.prototype.check = function () {
        return this.getIsImageComplete()
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (n.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (n.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (n.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (n.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (n.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (n.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(n.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (o.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) &&
          ((r = e).fn.imagesLoaded = function (t, e) {
            return new o(this, t, e).jqDeferred.promise(r(this));
          });
      }),
      o.makeJQueryPlugin(),
      o
    );
  }),
  (function (t, e, i) {
    function o(t, e) {
      return typeof t === e;
    }
    function n() {
      return "function" != typeof e.createElement
        ? e.createElement(arguments[0])
        : u
        ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0])
        : e.createElement.apply(e, arguments);
    }
    function s() {
      var t = e.body;
      return t || ((t = n(u ? "svg" : "body")).fake = !0), t;
    }
    function r(t, i, o, r) {
      var a,
        l,
        h,
        d,
        u = "modernizr",
        p = n("div"),
        f = s();
      if (parseInt(o, 10))
        for (; o--; )
          ((h = n("div")).id = r ? r[o] : u + (o + 1)), p.appendChild(h);
      return (
        ((a = n("style")).type = "text/css"),
        (a.id = "s" + u),
        (f.fake ? f : p).appendChild(a),
        f.appendChild(p),
        a.styleSheet
          ? (a.styleSheet.cssText = t)
          : a.appendChild(e.createTextNode(t)),
        (p.id = u),
        f.fake &&
          ((f.style.background = ""),
          (f.style.overflow = "hidden"),
          (d = c.style.overflow),
          (c.style.overflow = "hidden"),
          c.appendChild(f)),
        (l = i(p, t)),
        f.fake
          ? (f.parentNode.removeChild(f),
            (c.style.overflow = d),
            c.offsetHeight)
          : p.parentNode.removeChild(p),
        !!l
      );
    }
    var a = [],
      l = [],
      h = {
        _version: "3.5.0",
        _config: {
          classPrefix: "",
          enableClasses: !0,
          enableJSClass: !0,
          usePrefixes: !0,
        },
        _q: [],
        on: function (t, e) {
          var i = this;
          setTimeout(function () {
            e(i[t]);
          }, 0);
        },
        addTest: function (t, e, i) {
          l.push({ name: t, fn: e, options: i });
        },
        addAsyncTest: function (t) {
          l.push({ name: null, fn: t });
        },
      },
      d = function () {};
    (d.prototype = h), (d = new d());
    var c = e.documentElement,
      u = "svg" === c.nodeName.toLowerCase(),
      p = h._config.usePrefixes
        ? " -webkit- -moz- -o- -ms- ".split(" ")
        : ["", ""];
    (h._prefixes = p),
      d.addTest("csspointerevents", function () {
        var t = n("a").style;
        return (t.cssText = "pointer-events:auto"), "auto" === t.pointerEvents;
      });
    var f = (h.testStyles = r);
    d.addTest("touchevents", function () {
      var i;
      if (
        "ontouchstart" in t ||
        (t.DocumentTouch && e instanceof DocumentTouch)
      )
        i = !0;
      else {
        var o = [
          "@media (",
          p.join("touch-enabled),("),
          "heartz",
          ")",
          "{#modernizr{top:9px;position:absolute}}",
        ].join("");
        f(o, function (t) {
          i = 9 === t.offsetTop;
        });
      }
      return i;
    });
    var m = (function () {
      var e = t.matchMedia || t.msMatchMedia;
      return e
        ? function (t) {
            var i = e(t);
            return (i && i.matches) || !1;
          }
        : function (e) {
            var i = !1;
            return (
              r(
                "@media " + e + " { #modernizr { position: absolute; } }",
                function (e) {
                  i =
                    "absolute" ==
                    (t.getComputedStyle
                      ? t.getComputedStyle(e, null)
                      : e.currentStyle
                    ).position;
                }
              ),
              i
            );
          };
    })();
    (h.mq = m),
      d.addTest("mediaqueries", m("only all")),
      (function () {
        var t, e, i, n, s, r;
        for (var h in l)
          if (l.hasOwnProperty(h)) {
            if (
              ((t = []),
              (e = l[h]).name &&
                (t.push(e.name.toLowerCase()),
                e.options && e.options.aliases && e.options.aliases.length))
            )
              for (i = 0; i < e.options.aliases.length; i++)
                t.push(e.options.aliases[i].toLowerCase());
            for (
              n = o(e.fn, "function") ? e.fn() : e.fn, s = 0;
              s < t.length;
              s++
            )
              1 === (r = t[s].split(".")).length
                ? (d[r[0]] = n)
                : (!d[r[0]] ||
                    d[r[0]] instanceof Boolean ||
                    (d[r[0]] = new Boolean(d[r[0]])),
                  (d[r[0]][r[1]] = n)),
                a.push((n ? "" : "no-") + r.join("-"));
          }
      })(),
      (function (t) {
        var e = c.className,
          i = d._config.classPrefix || "";
        if ((u && (e = e.baseVal), d._config.enableJSClass)) {
          var o = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
          e = e.replace(o, "$1" + i + "js$2");
        }
        d._config.enableClasses &&
          ((e += " " + i + t.join(" " + i)),
          u ? (c.className.baseVal = e) : (c.className = e));
      })(a),
      delete h.addTest,
      delete h.addAsyncTest;
    for (var g = 0; g < d._q.length; g++) d._q[g]();
    t.Modernizr = d;
  })(window, document),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return e();
        })
      : "object" == typeof exports
      ? (module.exports = e())
      : (t.Headhesive = e());
  })(this, function () {
    "use strict";
    var t = function (e, i) {
        for (var o in i)
          i.hasOwnProperty(o) &&
            (e[o] = "object" == typeof i[o] ? t(e[o], i[o]) : i[o]);
        return e;
      },
      e = function (t, e) {
        var i,
          o,
          n,
          s =
            Date.now ||
            function () {
              return new Date().getTime();
            },
          r = null,
          a = 0,
          l = function () {
            (a = s()), (r = null), (n = t.apply(i, o)), (i = o = null);
          };
        return function () {
          var h = s(),
            d = e - (h - a);
          return (
            (i = this),
            (o = arguments),
            0 >= d
              ? (clearTimeout(r),
                (r = null),
                (a = h),
                (n = t.apply(i, o)),
                (i = o = null))
              : r || (r = setTimeout(l, d)),
            n
          );
        };
      },
      i = function (e, i) {
        "querySelector" in document &&
          "addEventListener" in window &&
          ((this.visible = !1),
          (this.options = {
            offset: 300,
            offsetSide: "top",
            classes: {
              clone: "headhesive",
              stick: "headhesive--stick",
              unstick: "headhesive--unstick",
            },
            throttle: 250,
            onInit: function () {},
            onStick: function () {},
            onUnstick: function () {},
            onDestroy: function () {},
          }),
          (this.elem = "string" == typeof e ? document.querySelector(e) : e),
          (this.options = t(this.options, i)),
          this.init());
      };
    return (
      (i.prototype = {
        constructor: i,
        init: function () {
          if (
            ((this.clonedElem = this.elem.cloneNode(!0)),
            (this.clonedElem.className += " " + this.options.classes.clone),
            document.body.insertBefore(
              this.clonedElem,
              document.body.firstChild
            ),
            "number" == typeof this.options.offset)
          )
            this.scrollOffset = this.options.offset;
          else {
            if ("string" != typeof this.options.offset)
              throw new Error("Invalid offset: " + this.options.offset);
            this._setScrollOffset();
          }
          (this._throttleUpdate = e(
            this.update.bind(this),
            this.options.throttle
          )),
            (this._throttleScrollOffset = e(
              this._setScrollOffset.bind(this),
              this.options.throttle
            )),
            window.addEventListener("scroll", this._throttleUpdate, !1),
            window.addEventListener("resize", this._throttleScrollOffset, !1),
            this.options.onInit.call(this);
        },
        _setScrollOffset: function () {
          "string" == typeof this.options.offset &&
            (this.scrollOffset = (function (t, e) {
              for (var i = 0, o = t.offsetHeight; t; )
                (i += t.offsetTop), (t = t.offsetParent);
              return "bottom" === e && (i += o), i;
            })(
              document.querySelector(this.options.offset),
              this.options.offsetSide
            ));
        },
        destroy: function () {
          document.body.removeChild(this.clonedElem),
            window.removeEventListener("scroll", this._throttleUpdate),
            window.removeEventListener("resize", this._throttleScrollOffset),
            this.options.onDestroy.call(this);
        },
        stick: function () {
          this.visible ||
            ((this.clonedElem.className = this.clonedElem.className.replace(
              new RegExp(
                "(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*",
                "g"
              ),
              ""
            )),
            (this.clonedElem.className += " " + this.options.classes.stick),
            (this.visible = !0),
            this.options.onStick.call(this));
        },
        unstick: function () {
          this.visible &&
            ((this.clonedElem.className = this.clonedElem.className.replace(
              new RegExp(
                "(^|\\s)*" + this.options.classes.stick + "(\\s|$)*",
                "g"
              ),
              ""
            )),
            (this.clonedElem.className += " " + this.options.classes.unstick),
            (this.visible = !1),
            this.options.onUnstick.call(this));
        },
        update: function () {
          (void 0 !== window.pageYOffset
            ? window.pageYOffset
            : (
                document.documentElement ||
                document.body.parentNode ||
                document.body
              ).scrollTop) > this.scrollOffset
            ? this.stick()
            : this.unstick();
        },
      }),
      i
    );
  }),
  (function (t, e) {
    if ("function" == typeof define && define.amd) define(["exports"], e);
    else if ("undefined" != typeof exports) e(exports);
    else {
      var i = { exports: {} };
      e(i.exports), (t.retina = i.exports);
    }
  })(this, function (t) {
    "use strict";
    function e(t) {
      return Array.prototype.slice.call(t);
    }
    function i(t, e) {
      var i = t.nodeName.toLowerCase(),
        o = document.createElement("img");
      o.addEventListener("load", function () {
        "img" === i
          ? (function (t) {
              return (
                t.hasAttribute("data-no-resize") ||
                  (0 === t.offsetWidth && 0 === t.offsetHeight
                    ? (t.setAttribute("width", t.naturalWidth),
                      t.setAttribute("height", t.naturalHeight))
                    : (t.setAttribute("width", t.offsetWidth),
                      t.setAttribute("height", t.offsetHeight))),
                t
              );
            })(t).setAttribute("src", e)
          : (t.style.backgroundImage = "url(" + e + ")");
      }),
        o.setAttribute("src", e),
        t.setAttribute(c, !0);
    }
    function o(t, e) {
      var o = (function (t) {
        var e = parseInt(t, 10);
        return a < e ? a : e;
      })(arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1);
      e && o > 1 && i(t, e.replace(l, "@" + o + "x$1"));
    }
    function n(t, e, o) {
      a > 1 && i(t, o);
    }
    function s(t) {
      (function (t) {
        return t
          ? "function" == typeof t.forEach
            ? t
            : e(t)
          : "undefined" != typeof document
          ? e(document.querySelectorAll(d))
          : [];
      })(t).forEach(function (t) {
        if (!t.getAttribute(c)) {
          var e =
              "img" === t.nodeName.toLowerCase()
                ? t.getAttribute("src")
                : (function (t) {
                    return t.style.backgroundImage.replace(h, "$2");
                  })(t),
            i = t.getAttribute("data-rjs"),
            s = !isNaN(parseInt(i, 10));
          if (null === i) return;
          s ? o(t, e, i) : n(t, 0, i);
        }
      });
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = "undefined" != typeof window,
      a = Math.round((r && window.devicePixelRatio) || 1),
      l = /(\.[A-z]{3,4}\/?(\?.*)?)$/,
      h = /url\(('|")?([^\)'"]+)('|")?\)/i,
      d = "[data-rjs]",
      c = "data-rjs-processed";
    r &&
      (window.addEventListener("load", function () {
        s();
      }),
      (window.retinajs = s)),
      (t.default = s);
  }),
  (function (t, e, i, o) {
    function n(e, i) {
      var s = this;
      "object" == typeof i &&
        (delete i.refresh, delete i.render, t.extend(this, i)),
        (this.$element = t(e)),
        !this.imageSrc &&
          this.$element.is("img") &&
          (this.imageSrc = this.$element.attr("src"));
      var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
      if (
        (r.length < 1 && r.push("center"),
        1 == r.length && r.push(r[0]),
        ("top" != r[0] &&
          "bottom" != r[0] &&
          "left" != r[1] &&
          "right" != r[1]) ||
          (r = [r[1], r[0]]),
        this.positionX !== o && (r[0] = this.positionX.toLowerCase()),
        this.positionY !== o && (r[1] = this.positionY.toLowerCase()),
        (s.positionX = r[0]),
        (s.positionY = r[1]),
        "left" != this.positionX &&
          "right" != this.positionX &&
          (isNaN(parseInt(this.positionX))
            ? (this.positionX = "center")
            : (this.positionX = parseInt(this.positionX))),
        "top" != this.positionY &&
          "bottom" != this.positionY &&
          (isNaN(parseInt(this.positionY))
            ? (this.positionY = "center")
            : (this.positionY = parseInt(this.positionY))),
        (this.position =
          this.positionX +
          (isNaN(this.positionX) ? "" : "px") +
          " " +
          this.positionY +
          (isNaN(this.positionY) ? "" : "px")),
        navigator.userAgent.match(/(iPod|iPhone|iPad)/))
      )
        return (
          this.imageSrc &&
            this.iosFix &&
            !this.$element.is("img") &&
            this.$element.css({
              backgroundImage: 'url("' + this.imageSrc + '")',
              backgroundSize: "cover",
              backgroundPosition: this.position,
            }),
          this
        );
      if (navigator.userAgent.match(/(Android)/))
        return (
          this.imageSrc &&
            this.androidFix &&
            !this.$element.is("img") &&
            this.$element.css({
              backgroundImage: 'url("' + this.imageSrc + '")',
              backgroundSize: "cover",
              backgroundPosition: this.position,
            }),
          this
        );
      this.$mirror = t("<div />").prependTo(this.mirrorContainer);
      var a = this.$element.find(">.parallax-slider"),
        l = !1;
      0 == a.length
        ? (this.$slider = t("<img />").prependTo(this.$mirror))
        : ((this.$slider = a.prependTo(this.$mirror)), (l = !0)),
        this.$mirror
          .addClass("parallax-mirror")
          .css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden",
          }),
        this.$slider.addClass("parallax-slider").one("load", function () {
          (s.naturalHeight && s.naturalWidth) ||
            ((s.naturalHeight = this.naturalHeight || this.height || 1),
            (s.naturalWidth = this.naturalWidth || this.width || 1)),
            (s.aspectRatio = s.naturalWidth / s.naturalHeight),
            n.isSetup || n.setup(),
            n.sliders.push(s),
            (n.isFresh = !1),
            n.requestRender();
        }),
        l || (this.$slider[0].src = this.imageSrc),
        ((this.naturalHeight && this.naturalWidth) ||
          this.$slider[0].complete ||
          a.length > 0) &&
          this.$slider.trigger("load");
    }
    !(function () {
      for (
        var t = 0, i = ["ms", "moz", "webkit", "o"], o = 0;
        o < i.length && !e.requestAnimationFrame;
        ++o
      )
        (e.requestAnimationFrame = e[i[o] + "RequestAnimationFrame"]),
          (e.cancelAnimationFrame =
            e[i[o] + "CancelAnimationFrame"] ||
            e[i[o] + "CancelRequestAnimationFrame"]);
      e.requestAnimationFrame ||
        (e.requestAnimationFrame = function (i) {
          var o = new Date().getTime(),
            n = Math.max(0, 16 - (o - t)),
            s = e.setTimeout(function () {
              i(o + n);
            }, n);
          return (t = o + n), s;
        }),
        e.cancelAnimationFrame ||
          (e.cancelAnimationFrame = function (t) {
            clearTimeout(t);
          });
    })(),
      t.extend(n.prototype, {
        speed: 0.2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        mirrorContainer: "body",
        refresh: function () {
          (this.boxWidth = this.$element.outerWidth()),
            (this.boxHeight = this.$element.outerHeight() + 2 * this.bleed),
            (this.boxOffsetTop = this.$element.offset().top - this.bleed),
            (this.boxOffsetLeft = this.$element.offset().left),
            (this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight);
          var t,
            e = n.winHeight,
            i = n.docHeight,
            o = Math.min(this.boxOffsetTop, i - e),
            s = Math.max(this.boxOffsetTop + this.boxHeight - e, 0),
            r = (this.boxHeight + (o - s) * (1 - this.speed)) | 0,
            a = ((this.boxOffsetTop - o) * (1 - this.speed)) | 0;
          r * this.aspectRatio >= this.boxWidth
            ? ((this.imageWidth = (r * this.aspectRatio) | 0),
              (this.imageHeight = r),
              (this.offsetBaseTop = a),
              (t = this.imageWidth - this.boxWidth),
              "left" == this.positionX
                ? (this.offsetLeft = 0)
                : "right" == this.positionX
                ? (this.offsetLeft = -t)
                : isNaN(this.positionX)
                ? (this.offsetLeft = (-t / 2) | 0)
                : (this.offsetLeft = Math.max(this.positionX, -t)))
            : ((this.imageWidth = this.boxWidth),
              (this.imageHeight = (this.boxWidth / this.aspectRatio) | 0),
              (this.offsetLeft = 0),
              (t = this.imageHeight - r),
              "top" == this.positionY
                ? (this.offsetBaseTop = a)
                : "bottom" == this.positionY
                ? (this.offsetBaseTop = a - t)
                : isNaN(this.positionY)
                ? (this.offsetBaseTop = (a - t / 2) | 0)
                : (this.offsetBaseTop = a + Math.max(this.positionY, -t)));
        },
        render: function () {
          var t = n.scrollTop,
            e = n.scrollLeft,
            i = this.overScrollFix ? n.overScroll : 0,
            o = t + n.winHeight;
          this.boxOffsetBottom > t && this.boxOffsetTop <= o
            ? ((this.visibility = "visible"),
              (this.mirrorTop = this.boxOffsetTop - t),
              (this.mirrorLeft = this.boxOffsetLeft - e),
              (this.offsetTop =
                this.offsetBaseTop - this.mirrorTop * (1 - this.speed)))
            : (this.visibility = "hidden"),
            this.$mirror.css({
              transform:
                "translate3d(" +
                this.mirrorLeft +
                "px, " +
                (this.mirrorTop - i) +
                "px, 0px)",
              visibility: this.visibility,
              height: this.boxHeight,
              width: this.boxWidth,
            }),
            this.$slider.css({
              transform:
                "translate3d(" +
                this.offsetLeft +
                "px, " +
                this.offsetTop +
                "px, 0px)",
              position: "absolute",
              height: this.imageHeight,
              width: this.imageWidth,
              maxWidth: "none",
            });
        },
      }),
      t.extend(n, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function () {
          if (!this.isReady) {
            var o = this,
              s = t(i),
              r = t(e),
              a = function () {
                (n.winHeight = r.height()),
                  (n.winWidth = r.width()),
                  (n.docHeight = s.height()),
                  (n.docWidth = s.width());
              },
              l = function () {
                var t = r.scrollTop(),
                  e = n.docHeight - n.winHeight,
                  i = n.docWidth - n.winWidth;
                (n.scrollTop = Math.max(0, Math.min(e, t))),
                  (n.scrollLeft = Math.max(0, Math.min(i, r.scrollLeft()))),
                  (n.overScroll = Math.max(t - e, Math.min(t, 0)));
              };
            r
              .on("resize.px.parallax load.px.parallax", function () {
                a(), o.refresh(), (n.isFresh = !1), n.requestRender();
              })
              .on("scroll.px.parallax load.px.parallax", function () {
                l(), n.requestRender();
              }),
              a(),
              l(),
              (this.isReady = !0);
            var h = -1;
            !(function t() {
              if (h == e.pageYOffset) return e.requestAnimationFrame(t), !1;
              (h = e.pageYOffset), o.render(), e.requestAnimationFrame(t);
            })();
          }
        },
        configure: function (e) {
          "object" == typeof e &&
            (delete e.refresh, delete e.render, t.extend(this.prototype, e));
        },
        refresh: function () {
          t.each(this.sliders, function () {
            this.refresh();
          }),
            (this.isFresh = !0);
        },
        render: function () {
          this.isFresh || this.refresh(),
            t.each(this.sliders, function () {
              this.render();
            });
        },
        requestRender: function () {
          this.render(), (this.isBusy = !1);
        },
        destroy: function (i) {
          var o,
            s = t(i).data("px.parallax");
          for (s.$mirror.remove(), o = 0; o < this.sliders.length; o += 1)
            this.sliders[o] == s && this.sliders.splice(o, 1);
          t(i).data("px.parallax", !1),
            0 === this.sliders.length &&
              (t(e).off(
                "scroll.px.parallax resize.px.parallax load.px.parallax"
              ),
              (this.isReady = !1),
              (n.isSetup = !1));
        },
      });
    var s = t.fn.parallax;
    (t.fn.parallax = function (o) {
      return this.each(function () {
        var s = t(this),
          r = "object" == typeof o && o;
        this == e || this == i || s.is("body")
          ? n.configure(r)
          : s.data("px.parallax")
          ? "object" == typeof o && t.extend(s.data("px.parallax"), r)
          : ((r = t.extend({}, s.data(), r)),
            s.data("px.parallax", new n(this, r))),
          "string" == typeof o && ("destroy" == o ? n.destroy(this) : n[o]());
      });
    }),
      (t.fn.parallax.Constructor = n),
      (t.fn.parallax.noConflict = function () {
        return (t.fn.parallax = s), this;
      }),
      t(function () {
        t('[data-parallax="scroll"]').parallax();
      });
  })(jQuery, window, document);
