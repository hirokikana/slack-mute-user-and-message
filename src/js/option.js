$(function() {
    $('#save').click(function() {
        save_list();
    });

    mute_word_list = localStorage.getItem('mute_word_list');
    mute_user_list = localStorage.getItem('mute_user_list');
    
    $('#mute_word_list').val(mute_word_list);
    $('#mute_user_list').val(mute_user_list);
});

function save_list() {
    localStorage.setItem("mute_user_list", $('#mute_user_list').val());
    localStorage.setItem("mute_word_list", $('#mute_word_list').val());

    $('#message').text('保存しました');
    $('#message').show();
    setTimeout(function() {$('#message').fadeOut("slow");}, 1000);
}
