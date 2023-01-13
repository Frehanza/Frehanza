


var Ze = "scrollspy",
    $e = "bs.scrollspy",
    tn = "." + $e,
    en = g.fn[Ze],
    nn = { offset: 10, method: "auto", target: "" },
    on = { offset: "number", method: "string", target: "(string|element)" },
    rn = {
      ACTIVATE: "activate" + tn,
      SCROLL: "scroll" + tn,
      LOAD_DATA_API: "load" + tn + ".data-api",
    },
    sn = "dropdown-item",
    an = "active",
    ln = '[data-spy="scroll"]',
    cn = ".nav, .list-group",
    hn = ".nav-link",
    un = ".nav-item",
    fn = ".list-group-item",
    dn = ".dropdown",
    gn = ".dropdown-item",
    _n = ".dropdown-toggle",
    mn = "offset",
    pn = "position",
    vn = (function () {
      function n(t, e) {
        var n = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(e)),
          (this._selector =
            this._config.target +
            " " +
            hn +
            "," +
            this._config.target +
            " " +
            fn +
            "," +
            this._config.target +
            " " +
            gn),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          g(this._scrollElement).on(rn.SCROLL, function (t) {
            return n._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var t = n.prototype;
      return (
        (t.refresh = function () {
          var e = this,
            t = this._scrollElement === this._scrollElement.window ? mn : pn,
            o = "auto" === this._config.method ? t : this._config.method,
            r = o === pn ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var e,
                  n = _.getSelectorFromElement(t);
                if ((n && (e = document.querySelector(n)), e)) {
                  var i = e.getBoundingClientRect();
                  if (i.width || i.height) return [g(e)[o]().top + r, n];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1]);
              });
        }),
        (t.dispose = function () {
          g.removeData(this._element, $e),
            g(this._scrollElement).off(tn),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (t._getConfig = function (t) {
          if (
            "string" !=
            typeof (t = l({}, nn, "object" == typeof t && t ? t : {})).target
          ) {
            var e = g(t.target).attr("id");
            e || ((e = _.getUID(Ze)), g(t.target).attr("id", e)),
              (t.target = "#" + e);
          }
          return _.typeCheckConfig(Ze, t, on), t;
        }),
        (t._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (t._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (t._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (t._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              0 < this._offsets[0]
            )
              return (this._activeTarget = null), void this._clear();
            for (var o = this._offsets.length; o--; ) {
              this._activeTarget !== this._targets[o] &&
                t >= this._offsets[o] &&
                ("undefined" == typeof this._offsets[o + 1] ||
                  t < this._offsets[o + 1]) &&
                this._activate(this._targets[o]);
            }
          }
        }),
        (t._activate = function (e) {
          (this._activeTarget = e), this._clear();
          var t = this._selector.split(",").map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            }),
            n = g([].slice.call(document.querySelectorAll(t.join(","))));
          n.hasClass(sn)
            ? (n.closest(dn).find(_n).addClass(an), n.addClass(an))
            : (n.addClass(an),
              n
                .parents(cn)
                .prev(hn + ", " + fn)
                .addClass(an),
              n.parents(cn).prev(un).children(hn).addClass(an)),
            g(this._scrollElement).trigger(rn.ACTIVATE, { relatedTarget: e });
        }),
        (t._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains(an);
            })
            .forEach(function (t) {
              return t.classList.remove(an);
            });
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data($e);
            if (
              (t ||
                ((t = new n(this, "object" == typeof e && e)),
                g(this).data($e, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.2.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return nn;
            },
          },
        ]),
        n
      );
    })();

