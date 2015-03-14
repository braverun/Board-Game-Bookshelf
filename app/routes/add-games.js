import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Route.extend({

  findAll: function(name) {
      /* jshint unused: false */
      return ajax("https://board-game-bookshelf.herokuapp.com/search");
  }

});
