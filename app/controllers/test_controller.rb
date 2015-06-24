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

  def schedule
    @testId = params[:id]
    @period = params[:period]

    if (!@testId)
      render :json => {:error => "undefined testId"}.to_json, :status => 400
      return
    end

    if (!@period)
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
      @schedule = Schedule.new
      @schedule.scheduleDate = DateTime.now
      @schedule.testId = @testId
      @schedule.user = @userName
      @schedule.period = @period

      @schedule.save

      if(Integer(@period) == 0)
        Publisher.publish("test_queue", { :scheduleId => @schedule[:_id].to_str } )
      end

      render :json => {:response => "ok" }.to_json, :status => 200
      return
    rescue
      render :json => {:error => "badRequestOnPublish"}.to_json, :status => 500
      return
    end
  end
end
