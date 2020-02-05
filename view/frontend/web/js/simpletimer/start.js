define([
    'jquery',
    '../helper',
    './simpletimer'
], function ($, helper) {
    'use strict';

    return function (config, element) {
        var seconds,
            days = 0;

        if (config.displayDays) {
            days = helper.getDaysLeft(config.datetimeUtc);
        }

        if (days > 0) {
            $(element).append(
                '<span class="days">' + days.toString() + ' day(s)</span>'
            );
        }

        seconds = helper.getSecondsLeft(config.datetimeUtc) - days * 24 * 60 * 60;
        $(element).data('seconds-left', seconds);
        $(element).addClass(config.cssClass)
            .attr('style', config.style)
            .startTimer();
    };
});
