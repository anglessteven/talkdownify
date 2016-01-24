(function () {
    "use strict";

    angular.module("talkdownify", [])
        .controller("TalkdownifyController", TalkdownifyController);

    TalkdownifyController.$inject = ["$log"];

    function TalkdownifyController($log) {
        var talkdownifyController = this;

        talkdownifyController.talkdownify = talkdownify;

        function talkdownify() {
            $log.debug("text is: ", talkdownifyController.text);
        }
    }
}());
