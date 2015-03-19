import Ember from 'ember';

export default Ember.Controller.extend({
  gameImage: "this.thumbnail.[0]",
  fillStyle: function() {
  return 'background-image:'+this.get('gameImage');
}.property('gameImage')

});
