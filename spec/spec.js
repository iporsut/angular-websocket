describe("angular-websocket module", function() {
    var websocketTest;
    var MockUrl;
    var MockOnOpen;
    var MockOnMessage;
    var MockOnError;
    var MockOnClose;
    var sendSpy = jasmine.createSpy("send");
    var closeSpy = jasmine.createSpy("close");

    var MockNativeWebSocket = function (url) {
        MockUrl = url;
        return {
            set onopen(callback) {
                MockOnOpen = callback;
            },

            set onmessage(callback) {
                MockOnMessage = callback;
            },

            set onerror(callback) {
                MockOnError = callback;
            },
            
            set onclose(callback) {
                MockOnClose = callback;
            },

            send: sendSpy,
            close: closeSpy,
        }
    };

    beforeEach(module('angular-websocket'));
    beforeEach(module(function($provide) {
        $provide.value("$NativeWebSocket", MockNativeWebSocket);
    }));

    beforeEach(inject(function($websocket) {
        websocketTest = $websocket;
    }));

    it("should call onopen when connected", function() {
        var msg;

        websocketTest.onopen(function() {
            msg = "Hello";
        });

        websocketTest.open("ws://localhost/websocket");
        MockOnOpen();

        expect(msg).toEqual("Hello");
    });

    it("should call onmessage when receive message", function() {
        var receiveData;

        websocketTest.onmessage(function(msg) {
            receiveData = msg.data;
        });

        websocketTest.open("ws://localhost/websocket");
        MockOnMessage("{\"data\" : \"Hello World\"}");

        expect(receiveData).toEqual("Hello World");
    });

    it("should call onerror when receive error", function() {
        var onerror = jasmine.createSpy("onerror");
        websocketTest.onerror(onerror);
        websocketTest.open("ws://localhost/websocket");
        MockOnError("error");
        expect(onerror).toHaveBeenCalledWith("error");
    });

    it("should call onclose when connection closed", function() {
        var onclose = jasmine.createSpy("onclose");
        websocketTest.onclose(onclose);
        websocketTest.open("ws://localhost/websocket");
        MockOnClose();
        expect(onclose).toHaveBeenCalled();
    });

    it("should call NativeWebSocket send when websocketTest send", function() {
        websocketTest.open("ws://localhost/websocket");
        websocketTest.send({"data": "Hello World"});
        expect(sendSpy).toHaveBeenCalled();
    });

    it("should call NativeWebSocket close when websocketTest close", function() {
        websocketTest.open("ws://localhost/websocket");
        websocketTest.close();
        expect(closeSpy).toHaveBeenCalled();
    });
});
