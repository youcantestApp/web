class TestController < ApplicationController
  skip_before_action :verify_authenticity_token
  def getAll
    @tests = Test.all

    render json: @tests
  end

  def get
    @testId = params[:testId]

    if(@testId)
      @test = Test.find(@testId)

      render json: @test

      return
    end

    render :json => {:error => "documentNotFound"}.to_json, :status => 404
  end

  def insert
    @params = params[:data]

    @test = Test.new
    @test.attributes = @params.to_hash

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

    begin
      Publisher.publish("test_queue", { :testId => @testId } )
    rescue
      render :json => {:error => "badRequestOnPublish"}.to_json, :status => 400
    ensure
      render :json => {:response => "ok" }.to_json, :status => 200
    end
  end
end
