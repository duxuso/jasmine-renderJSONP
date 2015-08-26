/**
 * Created by xuesongdu on 26/08/15.
 */
(function($) {
    $.fn.renderAjax = function (urls) {

        return this.click(function() {
            // call jQuery.ajax(),
            $.ajax({
                type: 'GET',
                timeout: 3000,
                async: false,
                url: urls,
                jsonpCallback: 'cb',
                contentType: "application/json",
                dataType: 'jsonp',

                success: function (result) {
                    if ($.isEmptyObject(result) == true) {
                        document.getElementById("results").style.display = "block";
                    }
                    else {
                        // get required issue information from each result object via for loop,
                        var total = "";
                        var length = result.length;
                        for (var i = 0; i < length; i++) {
                            var status = result[i].status;
                            var title = result[i].title;
                            var begin = result[i].beganAt;
                            var end = result[i].resolvedAt;
                            var des = result[i].description;
                            var update = result[i].updates;
                            var sum = "";
                            var len = update.length;

                            // get specific update information from each update object via for loop
                            for (var j = 0; j < len; j++) {
                                var by = update[j].by;
                                var at = update[j].at;
                                var up = update[j].update;
                                var to = "<div class=\"update-template\"><p>" + up + "</p><em>By " + by + " " + at + "</em><hr style=\"width:50%\"/></div>";
                                sum += to;
                            }
                            var tem = "<h3>" + title + " - Begin " + begin + "</h3>" + "<h3>" + title + " - Resolved " + end + "</h3><p>" + des + "</p><div style=\"padding-left:50px\"><p>Updates:</p>" + sum + "</div><hr/>";
                            total += tem;
                        }
                        // assign result in HTML 'issue-template' template
                        $(".issue-template").html(total);
                        // display result in HTML template
                        document.getElementById("results").style.display = "block";
                        // while 'no-issue' is none
                        document.getElementById("no-issue").style.display = "none";
                    }
                },

                error: function () {
                    alert("Something happens");
                    document.getElementById("results").style.display = "none";
                }
            });
        });
    }
}(jQuery));