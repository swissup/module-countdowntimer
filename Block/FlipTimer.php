<?php

namespace Swissup\Countdowntimer\Block;

class FlipTimer
    extends AbstractTimer
        implements \Magento\Widget\Block\BlockInterface
{
    const TIMER_FLIP_TEMPLATE = 'tm/countdowntimer/fliptimer.phtml';
    const TIMER_BASE_CLASS_FLIP = 'tm-cdt-flip';

    protected function __construct() {
        if (!$this->hasData('template')) {
            $this->setData('template', self::TIMER_FLIP_TEMPLATE);
        }
        return parent::__construct();
    }

    public function getClassname()
    {
        $result = $this->getData('classname');
        if (!$result) {
            $size = $this->getData('size');
            $skin = $this->getData('skin');
            if ($this->getHideLabels()) {
                $labels = 'flip-no-labels';
            } else {
                $labels = '';
            }
            $result = implode(' ', array(self::TIMER_BASE_CLASS_FLIP, $size, $skin, $labels));
        }
        return $result;
    }

    public function getFlipface()
    {
        if ($this->getDisplayDays()) {
            $result = 'DailyCounter';
        } else {
            $result = 'HourlyCounter';
        }
        return $result;
    }

    public static function getTimerBaseClass()
    {
        return self::TIMER_BASE_CLASS_FLIP;
    }

}