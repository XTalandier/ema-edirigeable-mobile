function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "direction/" + s : s.substring(0, index) + "/direction/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "dirContainer",
    style: {
        backgroundColor: "#000000",
        width: "300px",
        height: "300px",
        left: 0,
        top: "50%"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "btnHaut",
    style: {
        left: "25%",
        top: 0,
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-haut.png"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "btnDroite",
    style: {
        left: "50%",
        top: "25%",
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-droite.png"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "btnBas",
    style: {
        left: "25%",
        top: "50%",
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-bas.png"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "btnGauche",
    style: {
        left: 0,
        top: "25%",
        height: "50%",
        width: "50%",
        backgroundImage: "/direction/triangle-gauche.png"
    }
} ];