(function () {
    "use strict";

    angular.module("talkdownify")
        .service("TalkdownifyService", TalkdownifyService);

    TalkdownifyService.$inject = ["$log","$q"];

    function TalkdownifyService($log, $q) {
        var talkdownifyService = this;
        var activeKeywords = [];
        var curActiveKeywordPos = 0;

        talkdownifyService.talkdownify = talkdownify;

        function talkdownify(text, keywords) {
            return $q(function (resolve, reject) {
                activeKeywords = getActiveKeywords(keywords);
                if (text && activeKeywords.length > 0) {
                    var sentences = parseIntoSentences(text);
                    insertActiveKeywordsRandomly(sentences);

                    curActiveKeywordPos = 0;
                    resolve(sentences.join(" "));
                }
                else {
                    reject("Please enter some text and at least one word in the word bank!");
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
            var activeKeywords = keywords.filter(function (keywordObj) {
                return (keywordObj.word && keywordObj.word != "" && keywordObj.checked);
            })
            .map(function (keywordObj) {
                return keywordObj.word;
            });

            return _.shuffle(activeKeywords);
        }

        function insertActiveKeywordsRandomly(sentences) {
            var i;
            for (i = 0; (i < sentences.length); i++) {
                if (getRandomArbitrary(0, 1) < 0.5 && sentences[i] != "") {
                    var curActiveKeyword = getNextActiveKeyword();
                    if (sentences[i].indexOf(curActiveKeyword) !== 0) {
                        sentences[i] = curActiveKeyword + ", " + uncapitalizeFirstWord(sentences[i]);
                    }
                }
            }
        }

        function getNextActiveKeyword() {
            if (curActiveKeywordPos >= activeKeywords.length) {
                activeKeywords = _.shuffle(activeKeywords);
                curActiveKeywordPos = 0;
            }
            return activeKeywords[curActiveKeywordPos++];
        }

        function uncapitalizeFirstWord(sentence) {
            return sentence[0].toLowerCase() + sentence.substr(1);
        }

        // ripped straight from MDN:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
}());
