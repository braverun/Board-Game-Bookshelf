import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function(params) {
    return ajax("https://api.parse.com/1/classes/Game/" + params.game_id).then(function(response){
      // return response.results.map(function(game) {
      //   game.id = game.objectId;
      //   delete game.objectId;
      //   return game;
      // });
      return response.results;
    });
  }
});
