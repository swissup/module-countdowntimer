<?php

namespace Swissup\Countdowntimer\Block;

class AbstractTimer extends \Magento\Framework\View\Element\Template
{

    const TIMER_BASE_CLASS_ABSTRACT = 'tm-cdt-abstract';

    public function getSecondsLeft()
    {
        $secondsLeft = $this->getData('seconds_left');
        if ($secondsLeft) {
            return $secondsLeft;
        }
        $date = $this->getData('date');
        if ($date) {
            $defaultTimeZone = date_default_timezone_get();
            // date_default_timezone_set(Mage::getStoreConfig('general/locale/timezone'));
            $date = strtotime($date);
            date_default_timezone_set($defaultTimeZone);
            $widgetDate = \timestamp($date);
            $currDate = \timestamp(time());
            $secondsLeft = $widgetDate - $currDate;
            if ($secondsLeft < 0) {
                $secondsLeft = 1;
            }
        } else {
            $secondsLeft = 0;
        }
        return $secondsLeft;
    }

    public function getDaysLeft()
    {
        $result = 0;
        $secondsLeft = $this->getSecondsLeft();
        $result = floor( $secondsLeft  / (24*60*60) );
        return $result;
    }

    public static function getTimerBaseClass()
    {
        return self::TIMER_BASE_CLASS_ABSTRACT;
    }

    public function getHideLabels()
    {
        return $this->_getData('hide_labels');
    }

    public function getDisplayDays()
    {
        return (int)$this->_getData('display_days');
    }

    public function getInlinestyle()
    {
        return $this->_getData('inlinecss');
    }
}