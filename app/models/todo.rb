class Todo < ActiveRecord::Base
  belongs_to :user

  paginates_per 5

  update_index('todos') { self }

  default_scope { order('updated_at DESC') }

  scope :done, -> { where(done: true) }
  scope :in_progress, -> { where(done: false) }

  validates :title, presence: true
  validates :deadline_at, presence: true
  validate :deadline_is_greater_then_now?, on: :create

  def deadline_is_greater_then_now?
    if deadline_at < Time.now
      errors.add(:deadline_at, 'Deadline must be in the future!')
    end
  end

  def make_done
    update(done: true)
  end


  class << self

    def search(search_string, done)
      if search_string.blank?
        #Todo.all
        if done.blank?
          TodosIndex.query( query_string: { query: '*'} ).limit(5).load
        else
          TodosIndex.query( query_string: { query: '*'} ).filter(term: { done: done}).limit(5).load
        end
        
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
