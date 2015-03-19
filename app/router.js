import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('add-games');
  this.route('game-details', {path: '/game/:game_id'});
});

export default Router;
