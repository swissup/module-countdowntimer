<?php

namespace Swissup\Countdowntimer\Block;

class SimpleTimer
    extends AbstractTimer
        implements \Magento\Widget\Block\BlockInterface
{
    const TIMER_SIMPLE_TEMPLATE = 'timer/simple.phtml';
    const TIMER_BASE_CLASS_SIMPLE = 'tm-cdt-simple';

    // public function _construct()
    // {
    //     if (!$this->hasData('template')) {
    //         $this->setData('template', self::TIMER_SIMPLE_TEMPLATE);
    //     }
    //     return parent::_construct();
    // }

    public function getClassname()
    {
        $result = $this->getData('classname');
        if (!$result) {
            $result = implode(' ', array(self::TIMER_BASE_CLASS_SIMPLE, 'simpletimer'));
        }
        return $result;
    }

    public static function getTimerBaseClass()
    {
        return self::TIMER_BASE_CLASS_SIMPLE;
    }

}