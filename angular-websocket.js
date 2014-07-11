angular.module('angular-websocket',[])
.factory('$websocket', function() {
    var onopenCallback;
    var onmessageCallback;
    var onerrorCallback;
    var oncloseCallback;
    var webSocket;
    return {
        onopen : function (callback) {
            onopenCallback = callback;
        },

        onmessage : function (callback) {
            onmessageCallback = callback;
        },

        onerror : function (callback) {
            onerrorCallback = callback;
        },

        onclose : function (callback) {
            oncloseCallback = callback;
        },

        open : function(url) {
            webSocket = new WebSocket(url);
            webSocket.onopen = onopenCallback;
            webSocket.onmessage = function (message) {
                onmessageCallback(JSON.parse(message));
            };
            webSocket.onerror = onerrorCallback;
            webSocket.onclose = oncloseCallback;
        },

        send : function(message) {
            webSocket.send(JSON.stringify(message));
        }
    };
});
