class TodosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo, only: [:update, :destroy]
  before_action :set_user, only: [:update, :create, :destroy]

  respond_to :json


  def index

    @todos = Todo.search(params[:search]).page params[:page]

  end


  # POST /users/:user_id/todos
  # POST /users/:user_id/todos.json
  def create
    @todo = @user.todos.build(todo_params)
    @todo.save
    respond_with(@user, @todo)
  end
  
  # PATCH/PUT /users/:user_id/todos/1
  # PATCH/PUT /users/:user_id/todos/1.json
  def update
    @todo.update(todo_params)
    respond_with(@user, @todo)
  end

  # DELETE /users/:user_id/todos/1
  # DELETE /users/:user_id/todos/1.json
  def destroy
    @todo.destroy
    respond_with(@user, @todo)
  end



  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def todo_params
      params.require(:todo).permit(:title, :deadline_at, :done)
    end
end
