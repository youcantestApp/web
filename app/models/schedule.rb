class Schedule < Base
  include Mongoid::Document

  store_in collection:"schedules"

  field :user, type: String

  field :testId, type: String
  field :period, type: Integer
  field :active, type: Boolean, default: true
  field :scheduleDate, type: DateTime
  field :executionDate, type: DateTime
end
