class MessagesController < ApplicationController
  before_action :set_group

  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    # .newはオブジェクトを作るだけ。保存はしないので.saveが必要
    # .createは.new+.save

    if @message.save
       respond_to do |format| #分岐の設定（html,json）
       format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
       format.json
       end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
    
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
