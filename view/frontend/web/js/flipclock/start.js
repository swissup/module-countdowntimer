define([
    'jquery',
    './flipclock'
], function ($) {
    'use strict';

    /**
     * @param  {Number} endDatetime
     * @return {Number}
     */
    function getSecondsLeft(endDatetime) {
        var l;

        l = endDatetime - Math.floor(Date.now() / 1000);

        return l < 0 ? 0 : l;
    }

    return function (config, element) {
        var secondsLeft;

        secondsLeft = getSecondsLeft(config.datetimeUtc);
        $(element).addClass(config.cssClass).FlipClock(secondsLeft, config.options);
    };
});
