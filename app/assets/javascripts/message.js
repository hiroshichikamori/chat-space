$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="chat_main_contents-message" data-message-id="${message.id}">
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
      var html = `<div class="chat_main_contents-message" data-message-id="${message.id}">
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


  var reloadMessages = function() {
    // console.log(last_message_id);
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.chat_main_contents-message:last').data("message-id");
    
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        console.log(message);
        insertHTML += buildHTML(message)
        $('.chat_main_contents').append(insertHTML);
        $('.chat_main_contents').animate({ scrollTop: $('.chat_main_contents')[0].scrollHeight});
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
    })
    .fail(function() {
      console.log('error');
    });
  };
  //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
})