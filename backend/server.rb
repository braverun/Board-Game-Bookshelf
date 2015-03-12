require "sinatra"
require "json"
require "bgg-api"

get "/search/:title" do |title|
  content_type :json
  bgg = BggApi.new
  bgg.search( {query: title, type: 'boardgame'} ).to_json
end
