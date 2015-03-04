class Assert
  include Mongoid::Document
  field :type, type: String
  field :selector, type: String
  field :value, type: String

  embedded_in :test
end
