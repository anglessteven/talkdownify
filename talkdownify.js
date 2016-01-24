(function () {
    "use strict";

    angular.module("talkdownify", [])
        .controller("TalkdownifyController", function () {
            var talkdownify = this;

            talkdownify.talkdownify = function() {
                talkdownify.text = "talkdownified text";
            }
        });
}());
