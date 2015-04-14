class User < Base
  include Mongoid::Document

  store_in collection:"users"

  field :username, type: String
  field :password, type: String
  field :session_key, type: String

end
