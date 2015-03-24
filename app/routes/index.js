import Ember from 'ember';
// import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('game').then(function(response){
      console.log(response);
      return response.map(function(game) {
        game.id = game.objectId;
        delete game.objectId;
        return game;
      });
    });
  }
});
