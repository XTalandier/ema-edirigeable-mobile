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
        bottom: 0,
        width: "30%",
        height: "33%",
        left: 0,
        color: "black",
        backgroundColor: "#CACACA",
        borderWidth: "1px",
        borderColor: "black"
    }
} ];