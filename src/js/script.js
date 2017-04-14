$(function() {
    $('#msgs_div').on('DOMSubtreeModified propertychange', function () {
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

function replace_message(target_str, replace_str) {
    $('.message_body').get().forEach(function(val) {
        if (val.innerText.indexOf(target_str) > -1) {
            val.innerText = val.innerText.replace(target_str, replace_str);
        }
    });
}

function hide_message(target_str) {
    if (target_str == '') { return false; };
    $('.message_body').get().forEach(function(val) {
        if (val.innerText.indexOf(target_str) > -1) {
            val.parentElement.hidden = true;
        }
    });
}

function hide_user(target_user) {
    if (hide_user == '') { return false; };
    var user_id = find_user_id(target_user);
    $('.message_body').get().forEach(function(val) {
        if (val.parentElement.parentElement.getAttribute('data-member-id') == user_id) {
            val.parentElement.hidden = true;
        }
    });

    $('.message_gutter').get().forEach(function(val) {
        if (val.children[0].children[0].getAttribute('data-member-id') == user_id) {
            val.hidden = true;
        }
    });
}

function find_user_id(target_user) {
    var user_id;
    $('.message_content_header_left').get().forEach(function(val) {
        if (val.children[0].innerText == target_user) {
            user_id = val.children[0].getAttribute('data-member-id');
        }
    });
    return user_id;
}
