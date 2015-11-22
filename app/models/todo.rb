class Todo < ActiveRecord::Base
  belongs_to :user
  validates :title, presence: true
  validates :deadline_at, presence: true
end
