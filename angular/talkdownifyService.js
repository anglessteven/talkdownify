(function () {
    "use strict";

    angular.module("talkdownify")
        .service("TalkdownifyService", TalkdownifyService);

    TalkdownifyService.$inject = ["$log","$q"];

    function TalkdownifyService($log, $q) {
        var talkdownifyService = this;

        talkdownifyService.talkdownify = talkdownify;

        function talkdownify(text, keywords) {
            var deferred = $q.defer();
            var talkdownifiedText = "talkdownified text!";

            deferred.resolve(talkdownifiedText);

            return deferred.promise;
        }
    }
}());