module TodosHelper

  # state is nil or boolean
  def active_css(state, template)
    state == template ? 'active':''
  end


  def todos_filter_button(title, filter_criteria, button_class = "btn-filter btn btn-lg btn-primary")
    link_to title,
      user_todos_path(current_user, params.slice(:search).merge(filter_criteria)),
      class:  "#{button_class} #{active_css(params[filter_criteria.keys.first].to_s, filter_criteria.values.first.to_s)}" 
  end

end
