class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:show, :edit, :update, :destroy]


  def index
    @todos = Todo.all
  end

  def show
  end
  #
  # PATCH/PUT /users/:user_id/todos/1
  # PATCH/PUT /users/:user_id/todos/1.json
  def update
    respond_to do |format|
      if @todo.update(todo_params)
        format.html { redirect_to @todo, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: user_todo_url(@user, @todo)}
      else
        format.html { render :edit }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def todo_params
      params.require(:todo).permit(:title, :deadline_at)
    end
end
