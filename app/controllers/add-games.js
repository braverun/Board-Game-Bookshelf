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
      console.log(gameData);
    }
  },

  findQuery: function(searchTerm) {
    var bgbUrl = 'https://board-game-bookshelf.herokuapp.com/search/';
    var searchUrl = (bgbUrl + searchTerm);
    console.log(searchUrl);
    this.findAll(searchUrl);
  },


  findAll: function(searchUrl) {
      /* jshint unused: false */
      var self = this;
      return ajax(searchUrl).then(function(data){
        self.set('this.searchResults', data);
        console.log(data);
      });
  },


});




// Parse Info
// appId:D79LREfrKhwYb7VQZkivDUqymZKDCYWwzxGMKWzQ
//
// restAPI:QXmLRZJdjwEMeaWgeS2VFWLVq8hDVgekS8ynssAv
