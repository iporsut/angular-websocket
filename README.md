#Angular WebSocket Module

##Example

```javascript
App = angular.module("App", ["angular-websocket"]);

App.controller("Chat", ["$websocket", "$log", function($websocket, $log) {
    $websocket.onopen(function() {
        $log.log("Connected WebSocket");
    });

    $websocket.onmessage(function(message) {
        $scope.receiveMessage = message;
    });

    $websocket.onerror(function(error) {
        $log.log(error);
    });

    $websocket.onclose(function() {
        $log.log("Close Connection");
    });

    $websocket.open("ws://mywebsocket");

    $scope.sendMessage = function () {
        $websocket.send($scope.message);
    };
}]);

```

```html
<!doctype html>
<html ng-app="App">
<head>
<meta charset="utf-8"/>
</head>
<body>

<div ng-controller="Chat">
    <p>{{ receivemessage }}</p>

    Msg : <input type="text" ng-model="message"/>
    <button ng-click="sendMessage()">Send</button>
</div>

<script src="angular.js"></script>
<script src="angular-websocket.js"></script>
</body>
</html>
```
