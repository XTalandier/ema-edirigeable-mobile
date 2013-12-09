function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "fr.logger/" + s : s.substring(0, index) + "/fr.logger/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0008,
    key: "logger",
    style: {
        left: 0,
        bottom: 0,
        height: "300px",
        right: 0,
        color: "#ffffff",
        backgroundColor: "#000000"
    }
} ];