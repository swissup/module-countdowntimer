define([
  "jquery",
  "flipclock",
  "simpletimer"
], function($) {

  var tmCountdownTimers = new function() {

    this.timerFlip = '.tm-cdt-flip';
    this.timerSimple = '.tm-cdt-simple';
    this.timerNotStarted ='.not-started';
    this.localeName = 'customer_locale',

    this.getSecondsLeft = function (obj) {
      var endDate = jQuery(obj).data('end-datetime-utc');
      var secLeft = 0;
      if (endDate) {
        secLeft = endDate - Math.floor(Date.now() / 1000);
        secLeft = (secLeft < 0) ? 0 : secLeft;
      }
      return secLeft;
    };

    this.setDaysSecondsSimpleTimer = function (obj, secs, label) {
      var showDays = jQuery(obj).data('display-days');
      var secLeft = secs;
      if (showDays) {
        var days = Math.floor( secLeft / ( 24 * 60 * 60 ) );
        if (days > 0) {
          var text = days.toString() + ' ' + label;
          jQuery(obj).append('<span class="days">'+text+'</span>');
          secLeft -= days * 24 * 60 * 60;
        }
      };
      jQuery(obj).data('seconds-left', secLeft);
    };

    this.start = function (labels) {
      var self = this;
      // translations for flipclock labels
      if (jQuery.isEmptyObject(FlipClock.Lang[self.localeName])) {
        FlipClock.Lang[self.localeName] = labels
      };
      // start flip timer
      jQuery(self.timerNotStarted).filter(self.timerFlip).each(
        function (index, obj) {
          jQuery(obj).FlipClock(
            self.getSecondsLeft(obj),
            {
              clockFace: jQuery(obj).data('flipface'),
              countdown: true,
              language: self.localeName
            }
          );
        }
      ).removeClass(self.timerNotStarted.substring(1));
      // start simple timer
      jQuery(self.timerNotStarted).filter(self.timerSimple).html('').each(
        function (index, obj) {
          self.setDaysSecondsSimpleTimer(obj, self.getSecondsLeft(obj), labels['day(s)']);
        }
      ).startTimer().removeClass(self.timerNotStarted.substring(1));
    }

    this.initEventsListening = function () {
      // bind jQuery event
      jQuery(document).on("tm:countdowntimer:start", function (){
        tmCountdownTimers.start({})
      });   
      // listen prototype event
      var eventsArr = ["quickshopping:previewloaded", "AjaxPro:onComplete:after"];
      for (var i=0; i<eventsArr.length; i++) {
        document.observe(eventsArr[i], function (){tmCountdownTimers.start({})});
      }
    }

  };

  return tmCountdownTimers;

});