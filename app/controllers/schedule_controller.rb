class ScheduleController < ApplicationController
  skip_before_action :verify_authenticity_token

  def getAll

    @data = Array.new

    @schedules = Schedule.where(user: @userName)

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

end
