require 'test_helper'

class MapsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @map = maps(:one)
  end

  test "should get index" do
    get maps_url
    assert_response :success
  end

  test "should get new" do
    get new_map_url
    assert_response :success
  end

  test "should create maps" do
    assert_difference('Map.count') do
      post maps_url, params: { map: {  } }
    end

    assert_redirected_to map_url(Map.last)
  end

  test "should show maps" do
    get map_url(@map)
    assert_response :success
  end

  test "should get edit" do
    get edit_map_url(@map)
    assert_response :success
  end

  test "should update maps" do
    patch map_url(@map), params: { map: {  } }
    assert_redirected_to map_url(@map)
  end

  test "should destroy maps" do
    assert_difference('Map.count', -1) do
      delete map_url(@map)
    end

    assert_redirected_to maps_url
  end
end
