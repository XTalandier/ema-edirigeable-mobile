function mockServer() {
    function connect() {
        if (null == socket || socket.state == Ti.Network.Socket.CLOSED) {
            socket = Titanium.Network.Socket.createTCP({
                host: "10.0.2.1",
                port: 40404,
                listenQueueSize: 100,
                accepted: accepted,
                closed: function() {
                    info("Closed listener");
                },
                error: function(e) {
                    Ti.UI.createAlertDialog({
                        title: "Listener error: " + e.errorCode,
                        message: e.error
                    }).show();
                }
            });
            try {
                socket.listen();
                info("###Listening on " + socket.host + ":" + socket.port);
                socket.accept(acceptedCallbacks);
            } catch (e) {
                info("Exception: " + e);
            }
        }
    }
    function accepted(e) {
        var sock = e.inbound;
        connectedSockets.push(sock);
        info("ACCEPTED: " + sock.host + ":" + sock.port);
        Ti.Stream.pump(sock, pumpCallback, 1024, true);
        socket.accept(acceptedCallbacks);
    }
    function pumpCallback(e) {
        var sock = e.source;
        if (-1 == e.bytesProcessed) {
            info("<EOF> - Closing the remote socket!");
            removeSocket(sock);
            sock.close();
        } else if (null == e.errorDescription || "" == e.errorDescription) {
            info("DATA: " + e.buffer.toString());
            try {
                var s = JSON.stringify(retVal);
                var msg = "HTTP/1.1 200 OK\n";
                msg += "Date: " + new Date() + "\n";
                msg += "Connection: close\n";
                msg += "Content-Type: text/json\n";
                msg += "Content-Length: " + s.length + "\n";
                msg += "\n";
                msg += s;
                sock.write(Ti.createBuffer({
                    value: msg
                }));
                sock.close;
            } catch (e) {
                info("Exception: " + e);
            }
        } else info("READ ERROR: " + e.errorDescription);
    }
    function removeSocket(sock) {
        var index = connectedSockets.indexOf(sock);
        -1 != index && connectedSockets.splice(index, 1);
    }
    var info = Ti.API.info;
    var socket = null;
    var connectedSockets = [];
    var retVal = {
        dirigeableId: "08-00-27-00-B4-D2",
        date: new Date(),
        gpsStatus: {
            Message: "Débranché",
            Code: 150
        },
        temperatureSensorStatus: {
            Message: "Débranché",
            Code: 450
        },
        altitude: 0,
        longitude: 4.089306,
        latitude: 44.132297,
        velocity: 0,
        heading: 0,
        measuredTemperature: Math.floor(40 * Math.random())
    };
    var acceptedCallbacks = {
        error: function(e) {
            removeSocket(e.socket);
        }
    };
    connect();
}

mockServer();