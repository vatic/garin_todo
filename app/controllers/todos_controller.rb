class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]


  def index
    @todos = Todo.all
  end

  def show
  end

  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:title, :deadline_at)
    end
end
