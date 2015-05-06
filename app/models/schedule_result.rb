class ScheduleResult
  attr_accessor :schedule, :result

  def initialize(schedule, result)
    @schedule = schedule
    @result = result
  end
end