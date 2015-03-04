class TestController < ApplicationController
  def save
  end

  def getAll
    @tests = Test.all

    render json: @tests
  end

  def get
  end
end
