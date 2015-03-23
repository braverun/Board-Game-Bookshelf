import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  isEditing: false,

  actions: {
    destroy: function() {
      /* jshint unused: false */
      var model = this.get('model');
      var self = this;
      return ajax({
        url: "https://api.parse.com/1/classes/Game/" + model.id,
        type: "DELETE"
      }).then(alert('Game has been removed')).done(self.transitionToRoute('index'));
    },

    edit: function() {
      /* jshint unused: false */
      // var notes = this.get('js-user-notes');
      this.set('isEditing', true);
      console.log(notes);
    },

    save: function() {
      /* jshint unused: false */
      var model = this.get('model');
      // TODO: this.('model').save();
      return ajax ({
        url: "https://api.parse.com/1/classes/Game/" + model.id,
        type: "PUT",
        data: JSON.stringify({userNotes: model.get('userNotes')})
      });

    },
  }
});
