class TestController < ApplicationController
  skip_before_action :verify_authenticity_token

  def getAll
    begin
      @tests = Test.where(user: @userName)
    rescue
      render :json => Array.new
      return
    end

    render json: @tests
  end

  def delete
    @testId = params[:id]

    if(@testId)
      @test = Test.find(@testId)

      if(@test.user != @userName)
        return returnUnauthorizedAction()
      end

      @test.delete
      render :json => {:status => "ok"}.to_json
      return
    end

    render :json => {:error => "documentNotFound"}.to_json, :status => 404
  end

  def get
    @testId = params[:testId]

    if(@testId)
      @test = Test.find(@testId)

      if(@test.user != @userName)
        return returnUnauthorizedAction()
      end

      render json: @test
      return
    end

    render :json => {:error => "documentNotFound"}.to_json, :status => 404
  end

  def insert
    @params = params[:data]

    @test = Test.new
    @test.attributes = @params.to_hash
    @test.user = @userName

    begin
      @test.save
    rescue
      render :json => {:error => "badRequestOnSave"}.to_json, :status => 400
    ensure
      render :json => {:id => @test[:_id] }.to_json, :status => 200
    end
  end

  def publish
    @testId = params[:id]

    if (!@testId)
      render :json => {:error => "undefined testId"}.to_json, :status => 400
      return
    end

    @test = Test.find(@testId)

    if(!@test)
      render :json => {:error => "test not found"}.to_json, :status => 404
      return
    end

    if(@test.user != @userName)
      return returnUnauthorizedAction()
    end

    begin
      @schedule = Schedule.new
      @schedule.scheduleDate = DateTime.now
      @schedule.testId = @testId
      @schedule.user = @userName

      @schedule.save

      Publisher.publish("test_queue", { :scheduleId => @schedule[:_id].to_str } )

      render :json => {:response => "ok" }.to_json, :status => 200
      return
    rescue
      render :json => {:error => "badRequestOnPublish"}.to_json, :status => 500
      return
    end
  end
end
