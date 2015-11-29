class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :todos
  accepts_nested_attributes_for :todos

  def role
    admin? ? 'admin':'user'
  end

  def self.admin
    User.where(admin: true)
  end

  def self.not_admin
    User.where(admin: false)
  end

end
