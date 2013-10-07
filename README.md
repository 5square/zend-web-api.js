zend-web-api.js
===============

zend-web-api.js allows you to access Zend Server WebAPI with Javascript. The JS file takes care for authenticating against the server and executing the request to the Server. There are two additional third party JS files needed, which are not included in this repo:
+ hmac-sha256.js - https://code.google.com/p/crypto-js/
+ moment.js - http://momentjs.com/
hmac-sha256.js is needed for calculating the authentication signature for accessing Zend Server Web API, moment.js formats the appropriate timestamp which is also needed for the signature.
zend-web-api.js is also relying on jQuery and jQuery Mobile libraries.
## Zend Server preparation ##
If you want to run zend-web-api.js from a browser you have to make sure that the (Zend) Server accepts calls from a remote connection and also specific headers. If the Browser supports CORS, you might place the followingheaders into your /usr/local/zend/gui/public/index.php 
> header("Access-Control-Allow-Origin: *");
> header("Access-Control-Allow-Headers: X-Zend-Signature, X-Zend-Host, X-Zend-User-agent, X-Zend-Date");
if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit();
}
Zend Server WebApi expects Host name, User agent and date send as extra headers. Using Javascript, the browsers prevent overwriting these seetings, that's why zend-web-api.js sends the headers prefixed by 'X-Zend-'. They can be reset on the server side, if you enable the ZF2 module provided in folder 'server' in the gui code of Zend Server.
 
# Usage: #
Load zend-web-api.js in your HTML and fill the ZSManager with appropriate user credentials (hostanme and port of Zend Server plus API Name and Key): 
> ZSManager.setHost(hostname);
> ZSManager.setPort(port); // default: 10081
> ZSManager.setApiKeyName(apiKeyName); // default: admin
> ZSManager.setApiKey(apiKey);
	
and set the ZSManger into ZSWebApiConnector
> ZSWebApiConnector.setManager(ZSManager);

Call an API method (see http://files.zend.com/help/Zend-Server-6/zend-server.htm#supported_methods.htm):
> ZSWebApiConnector.request(
>    <methodName>, 
>    <httpMethod>, // GET, POST, ... 
>    <queryString>, // additional params
>    <callback> // called after succesful response 
>);

# Examples #
Restart PHP:
> ZSWebApiConnector.request(
>    'restartPhp', 
>    'POST', 
>    null, 
>    function () {alert('PHP restarted'); return true;}
>);
Fetch Requests per second:
> ZSWebApiConnector.request(
>    'statisticsGetSeries', 
>    'GET', 
>    'type=30&appId=0&from=1379309180&server=0&to=1379395580', 
>    doBuildRequestsPerSecond
>);
# Example Project #
In dir example-app you can find the code for developing a sample app with Phonegap which is using zend-web-api.js
This code was developed for the session 'App in 30 minutes' that was delivered at ZendCon 2013. Please note that the code has been developed and tested with Zend Studio 10.1. In this example also the library Highcharts (http://www.highcharts.com/) is used.



