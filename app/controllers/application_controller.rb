class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  @userName = nil

  before_filter :getUser

  def getUser
    @userName = params[:user]
  end

  def returnUnauthorizedAction
    render :json => {:error => "you dont have permission to do this action"}.to_json, :status => 401
    return
  end

end
