class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]


  def index
    @todos = Todo.all
  end

  def show
  end

  private

    def set_todo
      @user = User.find(params[:id])
    end

    def todo_params
      params.require(:user).permit(:name, :nickname, :email)
    end
end
