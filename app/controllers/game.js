import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  isAdded: false,

  actions: {
    addGame: function() {
      var game = this.get('model');
      console.log(game);

      this.set('isAdded', true);
      return ajax({
         url: "https://api.parse.com/1/classes/Game/",
        type: "POST",
        data: JSON.stringify(game),
      });

    },
  },
});
