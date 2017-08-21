/**
 * Created by Louis on 03/08/2017.
 */

document.getElementById('dropdown1').addEventListener('click', function(e) {
    if(e.target && e.target.nodeName == "LI") {
        document.cookie = 'language=' + e.target.id;
        location.reload();
    }
});

document.getElementById('new_post_file_clear_button').addEventListener('click', function(e) {
    const fileField = document.getElementById('new_post_file_field');
    fileField.value="";
    const fileButton = document.getElementById('new_post_file_button');
    fileButton.value="";
});