/**
 * Created by Louis on 03/08/2017.
 */

document.getElementById('dropdown1').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == "LI") {
        document.cookie = 'language=' + e.target.id;
        location.reload();
/*
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', 'localhost:8080/', false);
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                // do stuff here
            }
        };

        xmlHttp.send();
*/
    }
});