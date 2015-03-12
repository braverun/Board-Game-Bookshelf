require "sinatra"
require "json"
require "bgg-api"

get "/search/:title" do |title|
  content_type :json
  bgg = BggApi.new
  items = bgg.search( {query: title, type: 'boardgame'} )["item"] || []
  return items.take(10).map do |game|
    bgg.thing({id: game["id"]})["item"].first
  end.to_json
end
