$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty(); //子要素を空にする？
        if (users.length !== 0) { //検索したユーザーが一人でもいるならtrue
          users.forEach(function(user) {
            addUser(user);
          });
        // } else if (input.length == 0) {
        //   return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  
  $(document).on("click", ".chat-group-user__btn--add", function() { //document .onで常に新しいhtmlを取得 追加ボタン
    const userName = $(this).data("user-name"); //thisはクラス(chat-group〜)のこと。attrで追加する属性がどこのものか指定
    const userId = $(this).data("user-id");
    $(this)
      .parent() //追加ボタンの親要素指定
      .remove(); //追加したあとは検索欄からremoveメソッドを使って削除（追加候補欄削除）
    addDeleteUser(userName, userId); //追加したユーザーの削除のこと
    addMember(userId); 
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() { //追加したメンバーの削除
    $(this)
      .parent()
      .remove();
  });
});