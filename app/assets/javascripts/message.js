$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="chat_main_contents-message">
                    <div class="chat_main_contents-message-detail">
                      <div class="chat_main_contents-message-detail-user-name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main_contents-message-detail-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat_main_contents-message-body">
                      <p class="chat_main_contents-message-body-text">
                        ${message.content}
                      </P>
                      <img class="chat_main_contents-massage-body-image" src="${message.image}">
                    </div>
                  </div>`
    } else {
      var html = `<div class="chat_main_contents-message">
                    <div class="chat_main_contents-message-detail">
                      <div class="chat_main_contents-message-detail-user-name">
                        ${message.user_name}
                      </div>
                      <div class="chat_main_contents-message-detail-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat_main_contents-message-body">
                      <p class="chat_main_contents-message-body-text">
                        ${message.content}
                      </P>
                    </div>
                  </div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_main_contents').append(html);
      $('.chat_main__form__text').val('');
      $('.chat_main__form__btn').prop('disabled', false);
      $('.chat_main_contents').animate({ scrollTop: $('.chat_main_contents')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.chat_main__form__btn').attr('disabled',false);
    })
  })
})