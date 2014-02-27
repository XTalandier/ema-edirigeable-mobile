function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "direction/" + s : s.substring(0, index) + "/direction/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "dirContainer",
    style: {
        backgroundColor: "#CACACA",
        borderWidth: "1px",
        borderColor: "black",
        width: "30%",
        height: "34%",
        left: 0,
        top: "33%"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "btnHaut",
    style: {
        left: "33.5%",
        top: "0%",
        height: "33.3%",
        width: "33.4%",
        backgroundImage: "direction/button_top.png"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "btnDroite",
    style: {
        top: "33.3%",
        left: "66.7%",
        height: "33.3%",
        width: "33.3%",
        backgroundImage: "direction/button_right.png"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "btnBas",
    style: {
        left: "33.5%",
        top: "66.6%",
        height: "33.3%",
        width: "33.4%",
        backgroundImage: "direction/button_bottom.png"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "btnGauche",
    style: {
        left: 0,
        top: "33.3%",
        height: "33.3%",
        width: "33.3%",
        backgroundImage: "direction/button_left.png"
    }
} ];