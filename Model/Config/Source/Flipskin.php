<?php

namespace Swissup\Countdowntimer\Model\Config\Source;

class Flipskin implements \Magento\Framework\Option\ArrayInterface
{
    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array(
                'value' => 'flip-light',
                'label' => __('Light'),
            ),
            array(
                'value' => 'flip-dark',
                'label' => __('Dark'),
            ),
        );
    }

}
