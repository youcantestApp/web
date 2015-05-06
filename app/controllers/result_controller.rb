class ResultController < ApplicationController
  skip_before_action :verify_authenticity_token

  def getBySchedule
    @scheduleId = params[:id]

    if(@scheduleId)
      @result = Result.find_by(scheduleId: @scheduleId)

      render json: @result
      return
    end

    render :json => {:error => "documentNotFound"}.to_json, :status => 400
  end
end
