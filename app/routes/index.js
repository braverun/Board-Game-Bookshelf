import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return ajax("https://api.parse.com/1/classes/Game", {
      data: {
        order: 'createdAt'
      }
    }).then(function(response){
      return response.results.map(function(game) {
        game.id = game.objectId;
        delete game.objectId;
        return game;
      });
    });
  }
});
