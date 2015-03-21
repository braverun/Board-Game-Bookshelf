import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    destroy: function() {
      /* jshint unused: false */
      var model = this.get('model');
      var self = this;
      return ajax({
        url: "https://api.parse.com/1/classes/Game/" + model.id,
        type: "DELETE"
      }).then(self.transitionToRoute('index')).then(alert("Your game has been destroyed!"));
    },
    }
});
