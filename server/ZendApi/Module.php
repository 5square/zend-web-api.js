<?php
namespace ZendApi;
use Zend\ModuleManager\Feature\AutoloaderProviderInterface as AutoloaderProvider;
use Zend\Mvc\MvcEvent;

class Module implements AutoloaderProvider {

    public function getAutoloaderConfig()
    {
        return array();
    }

    public function onBootstrap(MvcEvent $e)
    {
        $response = $e->getResponse();

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: X-Zend-Signature, X-Zend-Host, X-Zend-User-agent, X-Zend-Date");

        if ($e->getRequest()->getMethod() == 'OPTIONS') {

            $e->stopPropagation(true);
            return $response;
        }

        $e->getApplication()->getEventManager()->attach(MvcEvent::EVENT_ROUTE, array($this, 'onRoute'));
    }
    
    public function onRoute(MvcEvent $e) {
        $h = $e->getRequest()->getHeaders();
        $hl = new \Zend\Http\HeaderLoader();
    
        foreach (array('useragent', 'date', 'host') as $name) {
            $xZendHeader = $h->get('xzend' . $name);
            if (!$xZendHeader) continue;
    
            $h->removeHeader($h->get($name));
            $class = $hl->load($name);
            $header = $class::fromString(str_replace('X-Zend-', '', $xZendHeader->toString()));
    
            $h->removeHeader($xZendHeader);
            $h->addHeader($header);
        }
    }
}
    