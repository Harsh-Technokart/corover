/**
 * CodeDropz Uploader v1.3.5.9
 * Copyright 2018 Glen Mongaya
 * CodeDrop Drag&Drop Uploader
 * @version 1.3.5.9
 * @author CodeDropz, Glen Don L. Mongaya
 * @license The MIT License (MIT)
 */

// CodeDropz Drag and Drop Plugin
!(function (e) {
  e.fn.CodeDropz_Uploader = function (a) {
    this.each(function () {
      var d = e(this),
        r = e.extend(
          {
            handler: d,
            color: "#000",
            background: "",
            server_max_error:
              "Uploaded file exceeds the maximum upload size of your server.",
            max_file: d.data("max") ? d.data("max") : 10,
            max_upload_size: d.data("limit") ? d.data("limit") : "10485760",
            supported_type: d.data("type")
              ? d.data("type")
              : "jpg|jpeg|JPG|png|gif|pdf|doc|docx|ppt|pptx|odt|avi|ogg|m4a|mov|mp3|mp4|mpg|wav|wmv|xls",
            text: "Drag & Drop Files Here",
            separator: "or",
            button_text: "Browse Files",
            on_success: "",
          },
          a
        ),
        o = d.data("name") + "_count_files";
      localStorage.setItem(o, 1);
      var s =
        '<div class="codedropz-upload-handler"><div class="codedropz-upload-container"><div class="codedropz-upload-inner"><' +
        dnd_cf7_uploader.drag_n_drop_upload.tag +
        ">" +
        r.text +
        "</" +
        dnd_cf7_uploader.drag_n_drop_upload.tag +
        "><span>" +
        r.separator +
        '</span><div class="codedropz-btn-wrap"><a class="cd-upload-btn" href="javascript:void(0)">' +
        r.button_text +
        '</a></div></div></div><span class="dnd-upload-counter"><span>0</span> ' +
        dnd_cf7_uploader.dnd_text_counter +
        " " +
        parseInt(r.max_file) +
        "</span></div>";
      r.handler.wrapAll('<div class="codedropz-upload-wrapper"></div>'),
        (r.supported_type = r.supported_type.replace(/[^a-zA-Z0-9| ]/g, ""));
      var t = r.handler.parents("form"),
        n = r.handler.parents(".codedropz-upload-wrapper"),
        p = e('input[type="submit"]', t);
      r.handler.after(s),
        e(".codedropz-upload-handler", n).on(
          "drag dragstart dragend dragover dragenter dragleave drop",
          function (e) {
            e.preventDefault(), e.stopPropagation();
          }
        ),
        e(".codedropz-upload-handler", n).on(
          "dragover dragenter",
          function (a) {
            e(this).addClass("codedropz-dragover");
          }
        ),
        e(".codedropz-upload-handler", n).on(
          "dragleave dragend drop",
          function (a) {
            e(this).removeClass("codedropz-dragover");
          }
        ),
        e("a.cd-upload-btn", n).on("click", function (e) {
          e.preventDefault(), r.handler.val(null), r.handler.click();
        }),
        e(".codedropz-upload-handler", n).on("drop", function (e) {
          l(e.originalEvent.dataTransfer.files, "drop");
        }),
        r.handler.on("change", function (e) {
          l(this.files, "click");
        });
      var l = function (a, s) {
          if (!(!a.length > 1)) {
            var p = new FormData();
            p.append("size_limit", r.max_upload_size),
              p.append("action", "dnd_codedropz_upload"),
              p.append("type", s),
              p.append("security", dnd_cf7_uploader.ajax_nonce),
              p.append("form_id", d.data("id")),
              p.append("upload_name", d.data("name")),
              e("span.has-error", r.handler).remove(),
              e.each(a, function (a, s) {
                if (
                  (void 0 !== p.delete && p.delete("upload-file"),
                  localStorage.getItem(o) > r.max_file)
                )
                  return (
                    !e("span.has-error-msg", n).length > 0 &&
                      ((err_msg =
                        dnd_cf7_uploader.drag_n_drop_upload.max_file_limit),
                      n.append(
                        '<span class="has-error-msg">' +
                          err_msg.replace("%count%", r.max_file) +
                          "</span>"
                      )),
                    !1
                  );
                var l = i.createProgressBar(s),
                  c = !1;
                if (
                  (s.size > r.max_upload_size &&
                    (e(".dnd-upload-details", e("#" + l)).append(
                      '<span class="has-error">' +
                        dnd_cf7_uploader.drag_n_drop_upload.large_file +
                        "</span>"
                    ),
                    (c = !0)),
                  (regex_type = new RegExp(
                    "(.*?).(" + r.supported_type + ")$"
                  )),
                  !1 !== c ||
                    regex_type.test(s.name.toLowerCase()) ||
                    (e(".dnd-upload-details", e("#" + l)).append(
                      '<span class="has-error">' +
                        dnd_cf7_uploader.drag_n_drop_upload.inavalid_type +
                        "</span>"
                    ),
                    (c = !0)),
                  localStorage.setItem(o, Number(localStorage.getItem(o)) + 1),
                  !1 === c)
                ) {
                  p.append("upload-file", s);
                  e.ajax({
                    url: r.ajax_url,
                    type: t.attr("method"),
                    data: p,
                    dataType: "json",
                    cache: !1,
                    contentType: !1,
                    processData: !1,
                    xhr: function () {
                      var e = new window.XMLHttpRequest();
                      return (
                        e.upload.addEventListener(
                          "progress",
                          function (e) {
                            if (e.lengthComputable) {
                              var a = e.loaded / e.total,
                                d = parseInt(100 * a);
                              i.setProgressBar(l, d - 1);
                            }
                          },
                          !1
                        ),
                        e
                      );
                    },
                    complete: function () {
                      i.setProgressBar(l, 100);
                    },
                    success: function (a) {
                      a.success
                        ? (i.setProgressBar(l, 100),
                          e.isFunction(r.on_success) &&
                            r.on_success.call(this, d, l, a))
                        : (e(".dnd-progress-bar", e("#" + l)).remove(),
                          e(".dnd-upload-details", e("#" + l)).append(
                            '<span class="has-error">' + a.data + "</span>"
                          ),
                          e('input[type="submit"]', t)
                            .removeClass("disabled")
                            .prop("disabled", !1));
                    },
                    error: function (a, d, o) {
                      e(".dnd-progress-bar", e("#" + l)).remove(),
                        e(".dnd-upload-details", e("#" + l)).append(
                          '<span class="has-error">' +
                            r.server_max_error +
                            "</span>"
                        ),
                        e('input[type="submit"]', t)
                          .removeClass("disabled")
                          .prop("disabled", !1);
                    },
                  });
                }
              });
          }
        },
        i = {
          createProgressBar: function (a) {
            var d = e(".codedropz-upload-handler", n),
              r = "dnd-file-" + Math.random().toString(36).substr(2, 9),
              s =
                '<div class="dnd-upload-image"><span class="file"></span></div><div class="dnd-upload-details"><span class="name"><span>' +
                a.name +
                "</span><em>(" +
                i.bytesToSize(a.size) +
                ')</em></span><a href="javascript:void(0)" title="' +
                dnd_cf7_uploader.drag_n_drop_upload.delete.title +
                '" class="remove-file" data-storage="' +
                o +
                '"><span class="dnd-icon-remove"></span></a><span class="dnd-progress-bar"><span></span></span></div>';
            return (
              d.after(
                '<div id="' + r + '" class="dnd-upload-status">' + s + "</div>"
              ),
              r
            );
          },
          setProgressBar: function (a, d) {
            var r = e(".dnd-progress-bar", e("#" + a));
            return (
              r.length > 0 &&
                (i.disableBtn(p),
                (progress_width = (d * r.width()) / 100),
                e("#" + a).addClass("in-progress"),
                100 == d
                  ? e("span", r)
                      .width("100%")
                      .text(d + "% ")
                  : e("span", r)
                      .animate({ width: progress_width }, 10)
                      .text(d + "% "),
                100 == d &&
                  e("#" + a)
                    .addClass("complete")
                    .removeClass("in-progress")),
              !1
            );
          },
          bytesToSize: function (e) {
            return 0 === e
              ? "0"
              : ((kBytes = e / 1024),
                (fileSize =
                  kBytes >= 1024
                    ? (kBytes / 1024).toFixed(2) + "MB"
                    : kBytes.toFixed(2) + "KB"),
                fileSize);
          },
          disableBtn: function (e) {
            e.length > 0 && e.addClass("disable").prop("disabled", !0);
          },
        };
    }),
      e(document).on("click", ".dnd-icon-remove", function (d) {
        var r = e(this),
          o = r.parents(".dnd-upload-status"),
          s = r.parents(".codedropz-upload-wrapper"),
          t = r.parent("a").attr("data-storage"),
          n = Number(localStorage.getItem(t));
        if (o.hasClass("in-progress")) return !1;
        if (e(".has-error", o).length > 0)
          return o.remove(), localStorage.setItem(t, n - 1), !1;
        r.addClass("deleting").text(
          dnd_cf7_uploader.drag_n_drop_upload.delete.text + "..."
        );
        var p = {
          path: o.find('input[type="hidden"]').val(),
          action: "dnd_codedropz_upload_delete",
          security: dnd_cf7_uploader.ajax_nonce,
        };
        e.post(a.ajax_url, p, function (a) {
          a.success &&
            (o.remove(),
            localStorage.setItem(t, n - 1),
            e(".dnd-upload-status", s).length <= 1 &&
              e("span.has-error-msg", s).remove(),
            e(".dnd-upload-counter span", s).text(
              Number(localStorage.getItem(t)) - 1
            ));
        }),
          e("span.has-error-msg").remove();
      });
  };
})(jQuery);
