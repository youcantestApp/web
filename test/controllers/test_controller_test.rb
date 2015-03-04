require 'test_helper'

class TestControllerTest < ActionController::TestCase
  test "should get save" do
    get :save
    assert_response :success
  end

  test "should get getAll" do
    get :getAll
    assert_response :success
  end

  test "should get get" do
    get :get
    assert_response :success
  end

end
