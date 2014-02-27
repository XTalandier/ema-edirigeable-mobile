function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "fr.logger/" + s : s.substring(0, index) + "/fr.logger/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0008,
    key: "logger",
    style: {
        bottom: 0,
        width: "25%",
        height: "33%",
        left: 0,
        color: "black",
        backgroundColor: "#f1f1f1",
        borderWidth: "1px",
        borderColor: "#cccccc",
        font: {
            fontSize: 12
        }
    }
} ];