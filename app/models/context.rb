class Context < Base
  include Mongoid::Document
  field :url, type: String

  embedded_in :test
end
