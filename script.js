var Youtube = require('simple-youtube-api')
const youtube = new Youtube("AIzaSyD7PHYZP7FTTslvYkiQ0Jk17nTwskw_ELQ");

var PWCount;
var TCount;
var diff;

$(() => {
    setInterval(() => {
        updateVals()
    }, 1000);
})

function updateCount(count, text) {
    $(`#subCount${Number(count)}`).text(text)
}

function updateVals() {
    youtube.getChannelByID('UCq-Fj5jknLsUf-MWSy4_brA')
        .then(channel => {
            if (channel) {
                updateCount(2, channel.subscriberCount)
            }
        })
        .catch(console.error);
    youtube.getChannelByID('UCHSgjpeDxmp6jsHUmXDHNQQ')
        .then(channel => {
            if (channel) {
                updateCount(1, channel.subscriberCount)
                console.log(channel.subscriberCount)
                console.log(channel)
            }
        })
        .catch(console.error);
}