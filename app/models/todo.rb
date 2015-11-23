class Todo < ActiveRecord::Base
  belongs_to :user

  update_index('todos#todo') { self }

  default_scope { order('updated_at DESC') }

  validates :title, presence: true
  validates :deadline_at, presence: true
  validate :deadline_is_greater_then_now?

  def deadline_is_greater_then_now?
    if deadline_at < Time.now
      errors.add(:deadline_at, 'Deadline must be in the future!')
    end
  end

end
