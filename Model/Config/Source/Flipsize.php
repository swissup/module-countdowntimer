<?php

namespace Swissup\Countdowntimer\Model\Config\Source;

class Flipsize implements \Magento\Framework\Option\ArrayInterface
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
                'value' => 'flip-small',
                'label' => __('Small'),
            ),
            array(
                'value' => 'flip-medium',
                'label' => __('Medium'),
            ),
            array(
                'value' => 'flip-large',
                'label' => __('Large'),
            ),
        );
    }

}
