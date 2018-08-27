<?php

namespace Swissup\Countdowntimer\Helper;

use Magento\Store\Model\ScopeInterface;

/**
 * Developer config data helper
 */
class Data extends \Magento\Framework\App\Helper\AbstractHelper
{
    /**
     * @var \Magento\Framework\Locale\ResolverInterface
     */
    protected $_localeResolver;
    /**
     * Constructor
     *
     * @param \Magento\Framework\App\Helper\Context $context
     * @SuppressWarnings(PHPMD.ExcessiveParameterList)
     */
    public function __construct(
        \Magento\Framework\App\Helper\Context $context,
        \Magento\Framework\Locale\ResolverInterface $localeResolver
    )
    {
        parent::__construct($context);
        $this->_localeResolver = $localeResolver;
    }

    protected function _getConfig($key)
    {
        return $this->scopeConfig->getValue($key, ScopeInterface::SCOPE_STORE);
    }

    public function getLocale()
    {
        return $this->_localeResolver->getLocale();
    }
}
