import Ember from 'ember';
import Model from 'ember-magic-man/model';

export default Model.extend({
  nameString: Ember.computed.alias('name.0.value')
});
