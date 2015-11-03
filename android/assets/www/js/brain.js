function Silver(suffer) {
    console.log("****"+suffer+"****");
    console.log("001"+suffer.indexOf("one"));
    if (suffer == "one") {
        SpeechController("You just complete step 3! Congratulations!");
    } else {
        SpeechController(suffer);
    }
}

function SpeechController(word) {
    TTS.speak({
        text: "I dont know "+word+"is!",
        locale: 'en-GB',
        rate: 1.25
    });
}
angular.module('brain', ['ionic'])
    .controller('Silver', Silver)
