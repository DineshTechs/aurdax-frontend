document.addEventListener('DOMContentLoaded', function () {
    var masternode = getURL(window.location.search.substring(1)).ref;
    if (masternode) { localStorage.setItem("masternode", masternode) }
    else {
        //localStorage.setItem("masternode", "0x0000000000000000000000000000000000000000")
    }

});


function getURL(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}