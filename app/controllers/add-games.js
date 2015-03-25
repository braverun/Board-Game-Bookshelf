import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({

  actions: {
    search: function() {
      var searchBar = this.get('searchBar');
      this.findQuery(searchBar);

      // 1. get the search term
      // 2. ajax call to get the results
      // 2a `this.findQuery(searchTerm)`
      //    ideally: `this.store.findQuery('search', searchTerm)`
      // 3. populate a property (e.g. `searchResults`) with the results
      // 4. use {{#each game in searchResults}}
    },

    addGame: function(gameData) {
      /* jshint unused: false */
      var self = this;
      return ajax({
         url: "https://api.parse.com/1/classes/Game/",
        type: "POST",
        data: JSON.stringify(gameData),
      }).then(alert('Added'));
    }
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
