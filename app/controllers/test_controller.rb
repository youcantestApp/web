class TestController < ApplicationController
  skip_before_action :verify_authenticity_token

  def getAll
    begin
      @results = Array.new

      @tests = Test.where(user: @userName)


      @tests.each_with_index { |element, idx|
        @periods = Array.new

        @schedules = Schedule.where(testId: element._id, active: true)

        @schedules.each_with_index { |item, index|
          if(item[:period] > 0)
            @periods.push({ :label  => item[:period] })
          end
        }

        @result = element
        @result[:periods] = @periods

        @results.push(@result)
      }

    rescue
      render :json => Array.new
      return
    end

    render json: @results
  end

  def delete
    @testId = params[:id]

    if(@testId)
      @test = Test.find(@testId)

      if(@test.user != @userName)
        return returnUnauthorizedAction()
      end

      @schedules = Schedule.where(testId: @testId)

      @schedules.each_with_index { |item, idx|
        @results = Result.where(scheduleId: item._id)

        @results.each_with_index { |el, idx|
          el.delete
        }

        item.delete
      }

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

  def executeNow
    @testId = params[:id]
    @period = 0

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
      @schedule.testId = @testId
      @schedule.user = @userName

      @schedule.scheduleDate = DateTime.now
      @schedule.period = @period

      @schedule.save

      Publisher.publish("test_queue", { :scheduleId => @schedule[:_id].to_str } )

      render :json => {:response => "ok" }.to_json, :status => 200
      return
    rescue
      render :json => {:error => "badRequestOnPublish"}.to_json, :status => 500
      return
    end
  end

  def schedule
    @testId = params[:id]
    @period = params[:period]

    if (!@testId)
      render :json => {:error => "undefined testId"}.to_json, :status => 400
      return
    end

    if (!@period || Integer(@period) <= 0)
      render :json => {:error => "undefined period"}.to_json, :status => 400
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
      @schedule = Schedule.find_or_create_by(testId: @testId)

      @schedule.testId = @testId
      @schedule.user = @userName

      @schedule.scheduleDate = DateTime.now
      @schedule.period = @period

      @schedule.save

      render :json => {:response => "ok" }.to_json, :status => 200
      return
    rescue
      render :json => {:error => "error"}.to_json, :status => 400
      return
    end
  end

  def getResults
    begin
      @results = Array.new

      @tests = Test.where(user: @userName)


      @tests.each_with_index { |element, idx|
        @result = { :test => element, :lastResult => nil }

        @lastResults = Result.where(testId: element[:_id].to_str)
        if(@lastResults.length)
          @lastResult = @lastResults.order_by(:executionDate.desc).first
          @result[:lastResult] = @lastResult

          @results.push(@result)
        end
      }

    rescue
      render :json => Array.new
      return
    end

    @results.sort! { |a,b| a[:lastResult] && b[:lastResult] ? b[:lastResult].executionDate <=> a[:lastResult].executionDate : 0 }

    render json: @results
  end


end
