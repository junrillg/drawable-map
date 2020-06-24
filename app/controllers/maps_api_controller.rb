class MapsApiController < ActionController::API
  include Response
  include ExceptionHandler

  def create
    id = request.params[:id]
    @map = Map.find(id)
    @map[:data] = JSON.parse request.body.read
    @map.save

    json_response(@map, :created)
  end

  def show
    id = request.params[:id]
    @map = Map.find(id)
    json_response(@map)
  end
end
