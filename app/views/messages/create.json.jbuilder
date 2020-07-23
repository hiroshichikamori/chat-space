json.id  @message.id
json.user_name  @message.user.name
json.content  @message.content
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image.url