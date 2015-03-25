import Ember from 'ember';

export default Ember.Controller.extend({
  sortBy: 'nameString',
  sortedGames: function(){
    var sortBy = this.get('sortBy');
    return this.get('model').sortBy(sortBy);
  }.property('model.@each', 'sortBy')
});
