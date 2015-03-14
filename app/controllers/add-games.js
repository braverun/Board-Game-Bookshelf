import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    search: function() {
      var searchBar = this.get('searchBar');
      console.log(searchBar);
      console.log('hello');
    }
  }

});
