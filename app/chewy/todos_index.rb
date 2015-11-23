class TodosIndex < Chewy::Index
  define_type Todo do
    field :title
  end
end
