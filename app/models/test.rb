class Test
  include Mongoid::Document

  store_in collection:"tests"


  embeds_one :context
  embeds_many :asserts
  embeds_many :actions

end
