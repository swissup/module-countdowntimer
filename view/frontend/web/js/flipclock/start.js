define([
    'jquery',
    '../helper',
    './flipclock'
], function ($, helper) {
    'use strict';

    return function (config, element) {
        var secondsLeft;

        secondsLeft = helper.getSecondsLeft(config.datetimeUtc);
        $(element).addClass(config.cssClass).FlipClock(secondsLeft, config.options);
    };
});
