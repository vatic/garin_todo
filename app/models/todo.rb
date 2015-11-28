class Todo < ActiveRecord::Base
  belongs_to :user

  paginates_per 5

  update_index('todos') { self }

  default_scope { order('updated_at DESC') }

  validates :title, presence: true
  validates :deadline_at, presence: true
  validate :deadline_is_greater_then_now?

  def deadline_is_greater_then_now?
    if deadline_at < Time.now
      errors.add(:deadline_at, 'Deadline must be in the future!')
    end
  end

  class << self

    def search(search_string)
      if search_string.blank?
        Todo.all
        #TodosIndex.query( match_all: { } ).load
        
      else
        if search_string =~ /\*/
          TodosIndex.query( wildcard: {title: search_string } ).limit(5).load
        else
          TodosIndex.query(query_string: {query: search_string } ).limit(5).load
        end
      end
    end

  end

end
