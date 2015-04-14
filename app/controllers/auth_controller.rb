class AuthController < ApplicationController

  skip_before_action :verify_authenticity_token

  def login
    @validate = false

    @username = params[:username]

    if(!@username.nil?)
      user = User.find_by(username: @username)

      @password = params[:password]
      if(user.password == @password)
        @validate = true
      end
    end

    if(!@validate)
      render :json => {:error => "user or password not found"}.to_json, :status => 401
      return
    end

    render :json => { :data => "OK" }.to_json, :status => 202
    #redirect_to :controller=> 'index', :action=> 'index', :status => 202
    return
  end
end
