class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :auth

  def index
    @users = User.all
  end

end
