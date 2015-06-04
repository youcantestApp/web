class IndexController < ApplicationController
  def home
    render "home", :layout => false
  end
  def index
    @message = 'HOME WITH USER ' + @userName
  end
end
