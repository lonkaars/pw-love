var PWCount;
var TCount;
var diff;

const APIKEYSARR = ['AIzaSyD7PHYZP7FTTslvYkiQ0Jk17nTwskw_ELQ', 'AIzaSyBAvxoyI1rFpDTdyYkiiJH171aF3n-D6Rw', 'AIzaSyA-rZ-MEWGZpKFEpYOwMZXSGxVOXHwqUVE', 'AIzaSyBwVQcM6FO8zdgNJZa0Kyy_fxefyPkx-MI']
var APIKEY = APIKEYSARR[0]
var APIKEYNUM = 0;
const TSERIESID = 'UCq-Fj5jknLsUf-MWSy4_brA'
const PWID = 'UCHSgjpeDxmp6jsHUmXDHNQQ'

$(() => {
    setInterval(() => {
        updateVals()
    }, 2000);
})

function updateCount(count, text) {
    $(`#subCount${Number(count)}`).text(text)
}

function updateVals() {
    try {
        TCount = JSON.parse(httpGet(makeURL(TSERIESID, APIKEY))).items[0].statistics.subscriberCount;
        updateCount(2, format(TCount))
        PWCount = JSON.parse(httpGet(makeURL(PWID, APIKEY))).items[0].statistics.subscriberCount;
        updateCount(1, format(PWCount))
        diff = Math.abs(TCount - PWCount);
        updateCount(3, format(diff))
        $('#quotaReached').removeClass('show')
    } catch (error) {
        nextKey()
        $('#quotaReached').addClass('show')
        // console.log(error);
    }
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function makeURL(channelID, APIKey) {
    return `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${APIKey}`
}

function format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function nextKey() {
    if(APIKEYNUM + 1 < APIKEYSARR.length){
        APIKEYNUM++
        APIKEY = APIKEYSARR[APIKEYNUM]
    } else {
        APIKEYNUM = 0;
        APIKEY = APIKEYSARR[0]
    }
}