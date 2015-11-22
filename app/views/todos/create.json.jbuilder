json.extract! @todo, :id, :title, :deadline_at, :user_id
json.html render 'todos/todo.html.erb', todo: @todo
