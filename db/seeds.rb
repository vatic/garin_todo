user1 = User.create!(
  :email => 'u3@user.com',
  :password => '12345678',
  :password_confirmation => '12345678'
)

user1.todos << Todo.create(title: 'Hello from U3', deadline_at: Time.now + 60*60*24*rand)

user2 = User.create!(
  :email => 'u4@user.com',
  :password => '12345678',
  :password_confirmation => '12345678'
)

user2.todos << Todo.create(title: 'U4 Hello', deadline_at: Time.now + 60*60*24*rand)
