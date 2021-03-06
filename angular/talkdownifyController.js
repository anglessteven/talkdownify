(function () {
    "use strict";

    angular.module("talkdownify", [])
        .controller("TalkdownifyController", TalkdownifyController);

    TalkdownifyController.$inject = ["$log", "TalkdownifyService"];

    function TalkdownifyController($log, talkdownifyService) {
        var vm = this; // view manager

        vm.keywords = [
            { word: "Obviously", checked: true },
            { word: "Clearly", checked: true },
            { word: "Plainly", checked: true },
            { word: "Of course", checked: true }
        ];

        vm.talkdownify = talkdownify;
        vm.addKeyword = addKeyword;

        function talkdownify() {
            talkdownifyService.talkdownify(vm.text, vm.keywords)
                .then(talkdownifySuccess, talkdownifyFail);
        }

        function talkdownifySuccess(result) {
            vm.talkdownifiedText = result;
        }

        function talkdownifyFail(result) {
            vm.talkdownifiedText = result;
        }

        function addKeyword() {
            vm.keywords.push({ word: vm.keywordText, checked: true });
            vm.keywordText = '';
        }
    }
}());
