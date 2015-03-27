import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    search: function() {
      var searchBar = this.get('searchBar');
      this.findQuery(searchBar);
    },
  },

  findQuery: function(searchTerm) {
    var bgbUrl = 'https://board-game-bookshelf.herokuapp.com/search/';
    var searchUrl = (bgbUrl + searchTerm);
    var self = this;
    return ajax(searchUrl).then(function(data){
      var normalized = data.map(function(game){
        game.bggId = game.id;
        delete game.id;
        return game;
      });
      self.set('searchResults', normalized);
    });
  }
});
