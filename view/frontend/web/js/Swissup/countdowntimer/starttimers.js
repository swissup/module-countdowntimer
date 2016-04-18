define([
  "jquery",
  "flipclock",
  "simpletimer"
], function($) {

  var tmCountdownTimers = new function() {

    this.timerFlip = '.tm-cdt-flip';
    this.timerSimple = '.tm-cdt-simple';
    this.timerNotStarted ='.not-started';
    var _timerLabels = {};
    var _localeName = 'cu_LO'; // customer locale
    var _self = this;

    var _initFonts = function (){
      WebFontConfig = {
        google: { families: [ 'Fredoka+One::latin', 'Josefin+Sans::latin' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    }

    var _getSecondsLeft = function(obj){
      var end = $(obj).data('end-datetime-utc');
      var left = 0;
      if (end) {
        left = end - Math.floor(Date.now() / 1000);
        left = (left < 0) ? 0 : left;
      }
      return left;
    };

    var _startFlipClock = function(obj){
      obj.each(function(i, el){
        $(el).FlipClock(
          _getSecondsLeft(el),
          {
            clockFace: $(el).data('flipface'),
            countdown: true,
            language: _localeName
          }
        );
      });
    }

    var _startSimpleTimer = function(obj){
      // prepare data for start
      obj.html('').each(function(i, el){
        var secLeft = _getSecondsLeft(el);
        if ($(el).data('display-days')) {
          var days = Math.floor( secLeft / ( 24 * 60 * 60 ) );
          if (days > 0) {
            secLeft -= days * 24 * 60 * 60;
            var text = days.toString() + ' ' + _timerLabels['day(s)'];
            $(el).append('<span class="days">'+text+'</span>');
          }
        };
        $(el).data('seconds-left', secLeft);
      });
      obj.startTimer();
    }

    this.start = function(labels){
      if ($.isEmptyObject(_timerLabels)) {
        _timerLabels = labels;
        FlipClock.Lang[_localeName] = _timerLabels;
      }
      // _initFonts();
      var timers = $(_self.timerNotStarted);
      _startFlipClock(timers.filter(_self.timerFlip));
      _startSimpleTimer(timers.filter(_self.timerSimple));
      timers.removeClass(_self.timerNotStarted.substring(1));
    }

  };

  return tmCountdownTimers;

});