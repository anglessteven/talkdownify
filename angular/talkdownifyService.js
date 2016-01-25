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
                    var sentences = parseIntoSentences(text);
                    var activeKeywords = getActiveKeywords(keywords);
                    insertActiveKeywordsRandomly(sentences, activeKeywords);

                    resolve(sentences.join(" "));
                }
                else {
                    reject("text was undefined!");
                }
            });
        }

        // "dumb" parser. looks for period as separator
        function parseIntoSentences(text) {
            var sentences = [];
            if (text) {
                sentences = text.split(".");
                sentences = addBackPeriods(sentences);
                sentences = trimSentenceArr(sentences);
            }
            return sentences;
        }

        function addBackPeriods(sentences) {
            return sentences.map(function (sentence) {
                if (sentence && sentence != "") {
                    return sentence + ".";
                }
                return sentence;
            });
        }

        function trimSentenceArr(sentences) {
            return sentences.map(function (sentence) {
                return sentence.trim();
            });
        }

        function getActiveKeywords(keywords) {
            return keywords.filter(function (keywordObj) {
                return (keywordObj.word && keywordObj.word != "" && keywordObj.checked);
            })
            .map(function (keywordObj) {
                return keywordObj.word;
            });
        }

        function insertActiveKeywordsRandomly(sentences, activeKeywords) {
            var i;
            for (i = 0; (i < sentences.length); i++) {
                if (getRandomArbitrary(0, 1) < 0.5 && sentences[i] != "") {
                    var random = Math.round(getRandomArbitrary(0, activeKeywords.length - 1));
                    var curActiveKeyword = activeKeywords[random];
                    if (sentences[i].indexOf(curActiveKeyword) !== 0) {
                        sentences[i] = curActiveKeyword + ", " + sentences[i];
                    }
                }
            }
        }

        // ripped straight from MDN:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
}());