import Ember from 'ember';
// import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('game');
  }
});
