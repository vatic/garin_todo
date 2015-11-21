json.array!(@todos) do |todo|
  json.extract! todo, :id, :title, :deadline_at
end
