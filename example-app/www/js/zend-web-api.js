$.when(
    $.getScript( 'js/hmac-sha256.js' ),
    $.getScript( "js/moment.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){
});


var ZSWebApiConnector = {
	userAgent: 'JS-Zend-Server-Web-API-Connector',
	manager: false,
	date: false,
	
	reset: function() {
		this.date = false;
		this.manager = false;
	},

	setManager: function(manager) {
		this.manager = manager;
	},
	
	getPath: function(method) {
		return '/ZendServer/Api/' + method;
	},
	
	getUrl: function(method, queryString) {
		var url = 'http://' + this.manager.host + ':' + this.manager.port + this.getPath(method);
		if (queryString) {
			url = url + '?' + queryString;
		}
		return url;
	},
	
	getDate: function() {
		if (this.date) return this.date;
		
		this.date = moment().utc().format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT';
		console.log(this.date);
		return this.date;
	},
	
	getSignature: function(method, date) {
		var data = this.manager.host + ':' + this.manager.port + ':'
		         + this.getPath(method) + ':'
		         + this.userAgent + ':'
		         + date;
	    var hash = CryptoJS.HmacSHA256(data, this.manager.apiKey);	         
		return hash.toString();
	},
	
	request: function(method, httpMethod, queryString, callback) {
		var date = this.getDate();
		var manager = this.manager;
		var that = this;
		
		jQuery.mobile.showPageLoadingMsg('Loading');
		
		$.ajax({
			  type: httpMethod,
			  url: that.getUrl(method, queryString),
			  headers: {
				  "X-Zend-User-agent": that.userAgent,
				  'X-Zend-Host': manager.host + ':' + manager.port,
				  'X-Zend-Date': date,
				  'Accept': 'application/vnd.zend.serverapi+json;version=1.3',
				  'X-Zend-Signature': manager.apiKeyName + ';' + that.getSignature(method, date)
			  }
		}).done(function( data ) {
			jQuery.mobile.hidePageLoadingMsg();
			callback(data.responseData);
		});
	}
};

var ZSManager = {
		host: '',
		port: '10081',
		apiKeyName: 'admin',
		apiKey: '',	
		
		setHost: function(host) {
			this.host = host;
			return this;
		},
		
		setPort: function(port) {
			this.port = port;
			return this;
		},
		
		setApiKeyName: function(apiKeyName) {
			this.apiKeyName = apiKeyName;
			return this;
		},
		
		setApiKey: function(apiKey) {
			this.apiKey = apiKey;
			return this;
		}
	};


