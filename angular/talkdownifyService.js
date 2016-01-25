(function () {
    "use strict";

    angular.module("talkdownify")
        .service("TalkdownifyService", TalkdownifyService);

    TalkdownifyService.$inject = ["$log","$q"];

    function TalkdownifyService($log, $q) {
        var talkdownifyService = this;

        talkdownifyService.talkdownify = talkdownify;

        function talkdownify(text, keywords) {
            return $q(function (resolve, reject) {
                if (text) {
                    resolve(text);
                }
                else {
                    reject("text was undefined!");
                }
            });
        }
    }
}());