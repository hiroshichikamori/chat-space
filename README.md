## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, index: true|

### Association
- has_many :groups, through: :groups_users
- has_many :users
- has_many :groups_users

アイウエオ
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many :users、through: :groups_users
- has_many :messages
- has_many :groups_users


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user 

