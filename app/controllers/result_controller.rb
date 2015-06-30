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

  def getListByTestId
    @testId = params[:id]

    @data = {:test => nil, :results => [] }

    if(@testId)
      @test = Test.find(@testId)
      @data[:test] = @test

      @results = Result.where(testId: @testId)

      @results.each_with_index { |item, idx|
        @data[:results].push(item)
      }

      render json: @data
      return
    end

    render :json => {:error => "documentNotFound"}.to_json, :status => 400
  end
end
