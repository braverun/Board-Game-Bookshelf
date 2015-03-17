import Ember from 'ember';
import ajax from 'ic-ajax';

var bgbUrl = "https://board-game-bookshelf.herokuapp.com/search/";

export default Ember.Route.extend({

  findAll: function(name) {
      /* jshint unused: false */
      return ajax(bgbUrl);
  },

});
