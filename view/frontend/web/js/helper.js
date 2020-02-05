define([
], function () {
    'use strict';

    return {
        /**
         * @param  {Number} endDatetime
         * @return {Number}
         */
        getSecondsLeft: function (endDatetime) {
            var l;

            l = endDatetime - Math.floor(Date.now() / 1000);

            return l < 0 ? 0 : l;
        },

        /**
         * @param  {Number} endDatetime
         * @return {Number}
         */
        getDaysLeft: function (endDatetime) {
            var s = this.getSecondsLeft(endDatetime),
                d;

            d = Math.floor(s / (24 * 60 * 60));

            return d < 0 ? 0 : d;
        }
    };
});
