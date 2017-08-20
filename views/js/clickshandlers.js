/**
 * Created by Louis on 03/08/2017.
 */

document.getElementById('dropdown1').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == "LI") {
        document.cookie = 'language=' + e.target.id;
        location.reload();
    }
});