class ResultController < ApplicationController
  skip_before_action :verify_authenticity_token

  def getById
    @resultId = params[:id]

    if(@resultId)
      @result = Result.find(@resultId)

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

      @results = Result.where(testId: @testId).order_by(:executionDate => 'desc')

      @results.each_with_index { |item, idx|
        @data[:results].push(item)
      }

      render json: @data
      return
    end

    render :json => {:error => "documentNotFound"}.to_json, :status => 400
  end
end
