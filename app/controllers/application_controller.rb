class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception



  layout :layout_by_resource



  protected

    def auth
      if params[:user_id].nil?
        if current_user.nil?
          redirect_to new_user_session_path
        else
          redirect_to user_todos_path(current_user)
        end
      else
        @user = User.find(params[:user_id])
        unless current_user.admin?
          unless @user == current_user
            redirect_to user_todos_path(current_user), :alert => "Access denied."
          end
        end
      end
    end

    def authenticate_admin_user!
      redirect_to new_user_session_path unless current_user.try(:admin?)
    end

    def layout_by_resource
      if devise_controller?
        "auth"
      else
        "application"
      end
    end
end
