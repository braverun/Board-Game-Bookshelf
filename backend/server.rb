require "sinatra"
require "json"
require "bgg-api"
require "sinatra/cross_origin"

configure do
  enable :cross_origin
end

set :allow_methods, [:get, :post, :options]

get "/search/:title" do |title|
  content_type :json
  bgg = BggApi.new
  items = bgg.search( {query: title, type: 'boardgame'} )["item"] || []
  return items.take(10).map do |game|
    bgg.thing({id: game["id"]})["item"].first
  end.to_json
end

options "*" do
  response.headers["Access-Control-Allow-Headers"] = request.env["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]
  status 200
  body ''
end
