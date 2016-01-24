(function () {
    "use strict";

    angular.module("talkdownify", [])
        .controller("TalkdownifyController", TalkdownifyController);

    TalkdownifyController.$inject = ["$log"];

    function TalkdownifyController($log) {
        var talkdownifyController = this;

        talkdownifyController.keywords = [
            { word: "Obviously", checked: true },
            { word: "Clearly", checked: true },
            { word: "Plainly", checked: true },
            { word: "Of course", checked: true }
        ];

        talkdownifyController.talkdownify = talkdownify;
        talkdownifyController.addKeyword = addKeyword;

        function talkdownify() {
            $log.debug("text is: ", talkdownifyController.text);
        }

        function addKeyword() {
            $log.debug("keywordText: ", talkdownifyController.keywordText);
            talkdownifyController.keywords.push({ word: talkdownifyController.keywordText, checked: true });
            talkdownifyController.keywordText = '';
        }
    }
}());
