class Test < Base
  include Mongoid::Document

  store_in collection:"tests"

  field :user, type: String

  field :name, type: String
  field :description, type: String

  embeds_one :context
  embeds_many :asserts
  embeds_many :actions

end
