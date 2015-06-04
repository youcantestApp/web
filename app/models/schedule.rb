class Schedule < Base
  include Mongoid::Document

  store_in collection:"schedules"

  field :user, type: String

  field :testId, type: String
  field :scheduleDate, type: DateTime
  field :executionDate, type: DateTime
end
