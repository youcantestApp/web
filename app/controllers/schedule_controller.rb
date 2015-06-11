class ScheduleController < ApplicationController
  skip_before_action :verify_authenticity_token

  def delete
    @testId = params[:id]

    if(@testId)
      @schedule = Schedule.find(@testId)

      if(@schedule.user != @userName)
        return returnUnauthorizedAction()
      end

      @results = Result.where(scheduleId: :id)

      @results.each_with_index { |item, idx|
        item.delete
      }

      @schedule.delete

      render :json => {:status => "ok"}.to_json
      return
    end

    render :json => {:status => "bad request"}.to_json, :status => 400
  end

  def archive
    @testId = params[:id]

    if(@testId)
      @schedule = Schedule.find(@testId)

      if(@schedule.user != @userName)
        return returnUnauthorizedAction()
      end

      @schedule.active = false

      @schedule.save

      render :json => {:status => "ok"}.to_json
      return
    end

    render :json => {:status => "bad request"}.to_json, :status => 400

  end

  def active
    @testId = params[:id]

    if(@testId)
      @schedule = Schedule.find(@testId)

      if(@schedule.user != @userName)
        return returnUnauthorizedAction()
      end

      @schedule.active = true

      @schedule.save

      render :json => {:status => "ok"}.to_json
      return
    end

    render :json => {:status => "bad request"}.to_json, :status => 400

  end



  def getActives

    @data = Array.new

    @schedules = Schedule.where(user: @userName, active: true)

    @schedules.each_with_index { |item, idx|
      @result = {:testName => "default", :schedule => item, :testResult => nil}

      if (item[:testId])
        @test = Test.find(item[:testId])
        if (@test != nil)
          @result[:testName] = @test.name || "default"
        end
      end

      if (item[:resultId])
        @resultData = Result.find(item[:resultId])
        if (@resultData)
          @result[:testResult] = @resultData.testSucceed
        end
      end

      @data.push(@result)
    }

    render json: @data
  end


  def getArchiveds

    @data = Array.new

    @schedules = Schedule.where(user: @userName, active: false)

    @schedules.each_with_index { |item, idx|
      @result = {:testName => "default", :schedule => item, :testResult => nil}

      if (item[:testId])
        @test = Test.find(item[:testId])
        if (@test != nil)
          @result[:testName] = @test.name || "default"
        end
      end

      @data.push(@result)
    }

    render json: @data
  end
end
