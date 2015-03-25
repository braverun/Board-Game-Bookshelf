import Ember from 'ember';
// import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  isEditing: false,

  actions: {
    destroy: function() {
      /* jshint unused: false */
      this.get('model').destroy();
      alert('Game has been removed');
      this.transitionToRoute('index');
    },

    edit: function() {
      /* jshint unused: false */
      this.set('isEditing', true);
    },

    save: function() {
      /* jshint unused: false */
      this.get('model').save();
      this.set('isEditing', false);
    },
  }
});
