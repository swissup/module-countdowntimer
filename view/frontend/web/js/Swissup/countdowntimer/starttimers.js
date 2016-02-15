define(["flipclock", "simpletimer"], function($) {
  var tmCountdownTimers = new function() {

    this.timerFlipClassSelector = '.tm-cdt-flip.not-started';
    this.timerSimpleClassSelector = '.tm-cdt-simple.not-started';
    this.timerNotStartedClass ='not-started';
    this.localeName = 'customer_locale',

    this.setAttributeSecondsLeft = function (htmlObj) {
      if (htmlObj.hasAttribute('data-end-datetime-utc')) {
        var secondsLeft = parseInt(htmlObj.getAttribute('data-end-datetime-utc'));
        secondsLeft -= Math.floor(Date.now() / 1000);
        if (secondsLeft < 0) {secondsLeft = 0};
        htmlObj.setAttribute('data-seconds-left', secondsLeft);
      }
    };

    this.setDaysForSimpleTimer = function (htmlObj) {
      if (!htmlObj.hasAttribute('data-display-days')) { return; };
      var secondsLeft = parseInt(htmlObj.getAttribute('data-seconds-left'));
      var numberOfDays = Math.floor( secondsLeft / ( 24 * 60 * 60 ) );
      if (numberOfDays > 0) {
        jQuery(htmlObj).find('.days').text(numberOfDays.toString() + ' ' + Translator.translate('day(s)'));
        secondsLeft -= numberOfDays * 24 * 60 * 60;
        htmlObj.setAttribute('data-seconds-left', secondsLeft);
      } else {
        jQuery(htmlObj).find('.days').text('');
      }
    };

    this.start = function () {
      var self = this;
      // // translations for flipclock labels
      // if (jQuery.isEmptyObject(FlipClock.Lang[self.localeName])) {
      //   FlipClock.Lang[self.localeName] = {
      //     'years' : Translator.translate('Years'),
      //     'months' : Translator.translate('Months'),
      //     'days' : Translator.translate('Days'),
      //     'hours' : Translator.translate('Hours'),
      //     'minutes' : Translator.translate('Minutes'),
      //     'seconds' : Translator.translate('Seconds')
      //   }
      // };
      // start flip timer
      jQuery(self.timerFlipClassSelector).each(
        function (index, htmlObj) {
          self.setAttributeSecondsLeft(htmlObj);
          jQuery(htmlObj).FlipClock(
            htmlObj.getAttribute('data-seconds-left'),
            {
              clockFace: htmlObj.getAttribute('data-flipface'),
              countdown: true,
              language: self.localeName
            }
          );
        }
      ).removeClass(self.timerNotStartedClass);
      // start simple timer
      jQuery(self.timerSimpleClassSelector).html('<span class="days"></span>').each(
        function (index, htmlObj) {
          self.setAttributeSecondsLeft(htmlObj);
          self.setDaysForSimpleTimer(htmlObj);
        }
      ).startTimer().removeClass(self.timerNotStartedClass);
    };

    // this.initEventsListening = function () {
    //   // bind jQuery event
    //   jQuery(document).on("tm:countdowntimer:start",
    //     function (){tmCountdownTimers.start()}
    //   );   
    //   // listen prototype event
    //   var eventsArr = ["quickshopping:previewloaded", "AjaxPro:onComplete:after"];
    //   for (i=0; i<eventsArr.length; i++) {
    //     document.observe(eventsArr[i], function (){tmCountdownTimers.start()});
    //   }
    // }

  };

  return tmCountdownTimers;

});