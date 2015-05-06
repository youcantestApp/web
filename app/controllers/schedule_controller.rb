class ScheduleController < ApplicationController
  skip_before_action :verify_authenticity_token
  def getAll

    @data = Array.new

    @schedules = Schedule.all
    
    @schedules.each_with_index { |item, idx|
      if(item[:resultId])
        @results = Result.find(item[:resultId])
        if (@results)
          @element = ScheduleResult.new(item, @results)
        else
          @element = ScheduleResult.new(item, nil)
        end

        @data.push(@element)
      else
        @element = ScheduleResult.new(item, nil)
        @data.push(@element)
      end
    }

    render json: @data
  end
end
