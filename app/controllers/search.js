import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search: function() {
      var searchBar = this.get('.search-bar');
      console.log(searchBar);
      console.log('hello');
    }
  }
});
