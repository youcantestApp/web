class Result < Base
  include Mongoid::Document

  store_in collection:"testResults"

  field :scheduleId, type: String
  embeds_many :passed, class_name: "ResultData"
  embeds_many :fails, class_name: "ResultData"
end

class ResultData < Base
  include Mongoid::Document

  field :message, type: String

  embedded_in :result
end
