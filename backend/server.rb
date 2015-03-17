require "sinatra"
require "json"
require "bgg-api"
require "sinatra/cross_origin"

configure do
  enable :cross_origin
end

get "/search/:title" do |title|
  content_type :json
  bgg = BggApi.new
  items = bgg.search( {query: title, type: 'boardgame'} )["item"] || []
  return items.take(10).map do |game|
    bgg.thing({id: game["id"]})["item"].first
  end.to_json
end
