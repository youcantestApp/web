class Result < Base
  include Mongoid::Document

  store_in collection:"testResults"

  field :user, type: String

  field :testId , type: String
  field :scheduleId, type: String
  field :executionDate, type: DateTime
  field :testName, type: String
  field :testSucceed, type: Boolean

  embeds_many :actions, class_name: "ActionResultData"
  embeds_many :asserts, class_name: "AssertResultData"
end

class ActionResultData < Base
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
end


class AssertResultData < Base
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
end
