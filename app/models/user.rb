class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :todos
  accepts_nested_attributes_for :todos

  def self.admin
    User.find_by(admin: true)
  end

  def self.not_admin
    User.find_by(admin: false)
  end

end
