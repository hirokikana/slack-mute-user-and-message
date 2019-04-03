$(function() {
    $('#messages_container').on('DOMSubtreeModified propertychange', function () {
        chrome.runtime.sendMessage({method : "getLocalStorage", key : "mute_word_list"},
                                   function(response) {
                                       $.each(response.data, function() { hide_message(this); });
                                   });
        chrome.runtime.sendMessage({method : "getLocalStorage", key : "mute_user_list"},
                                   function(response) {
                                       $.each(response.data, function() { hide_user(this); });
                                   });
    });
});

function hide_message(target_str) {
    if (target_str.trim() == '') { return false; };
    $('.c-message__content').get().forEach(function(val) {
        if (val.innerText.indexOf(target_str) > -1) {
            val.parentElement.hidden = true;
        }
    });
}

function hide_user(target_user) {
    if (target_user.trim() == '') { return false; };
    $('.c-message__sender').get().forEach(function(val) {
        if (val.children[0].innerText.trim() == target_user) {
            $(val).parents('.c-message__content')[0].parentElement.hidden = true;
        }
    });
}