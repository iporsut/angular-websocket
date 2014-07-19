(function() {
    angular.module('angular-websocket', [])
        .value('$NativeWebSocket', WebSocket)
        .factory('$websocket', ['$rootScope','$NativeWebSocket',
            function($rootScope,$NativeWebSocket) {
                var onopenCallback;
                var onmessageCallback;
                var onerrorCallback;
                var oncloseCallback;
                var webSocket;
                return {
                    onopen: function(callback) {
                        onopenCallback = callback;
                    },

                    onmessage: function(callback) {
                        onmessageCallback = callback;
                    },

                    onerror: function(callback) {
                        onerrorCallback = callback;
                    },

                    onclose: function(callback) {
                        oncloseCallback = callback;
                    },

                    open: function(url) {
                        webSocket = new $NativeWebSocket(url);
                        webSocket.onopen = function() {
                            $rootScope.$apply(function() {
                                onopenCallback();
                            });
                        };
                        webSocket.onmessage = function(message) {
                            $rootScope.$apply(function() {
                                onmessageCallback(JSON.parse(message));
                            });
                        };
                        webSocket.onerror = function(error) {
                            $rootScope.$apply(function() {
                                onerrorCallback(error);
                            });
                        };
                        webSocket.onclose = function() {
                            $rootScope.$apply(function() {
                                oncloseCallback();
                            });
                        };
                    },

                    send: function(message) {
                        webSocket.send(JSON.stringify(message));
                    },

                    close: function() {
                        webSocket.close();
                    },
                };
            }
        ]);
})();
