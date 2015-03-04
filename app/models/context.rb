class Context
  include Mongoid::Document
  field :url, type: String

  embedded_in :test
end
