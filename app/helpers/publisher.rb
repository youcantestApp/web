# blog/app/services/publisher.rb
class Publisher
  # In order to publish message we need a exchange name.
  # Note that RabbitMQ does not care about the payload -
  # we will be using JSON-encoded strings
  def self.fanout(exchange, message = {})
    # grab the fanout exchange
    x = channel.fanout("youcantest.#{exchange}")
    # and simply publish message
    x.publish(message.to_json)
  end

  def self.publish(queue, message = {})
    # grab the fanout exchange
    ch = channel.queue("youcantest.#{queue}")

    # and simply publish message
    ch.publish(message.to_json)
  end


  def self.channel
    @channel ||= connection.create_channel
  end

  # We are using default settings here
  # The `Bunny.new(...)` is a place to
  # put any specific RabbitMQ settings
  # like host or port
  def self.connection
    @connection ||= Bunny.new(:host => 'rabbit', :user => 'admin', :pass => 'admin').tap do |c|
    # @connection ||= Bunny.new(:host => 'ec2-52-26-16-39.us-west-2.compute.amazonaws.com', :user => 'admin', :pass => 'admin').tap do |c|
      #@connection ||= Bunny.new(:host => 'rabbit', :user => 'guest', :pass => 'guest').tap do |c|
      c.start
    end
  end
end