import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/game/" + id).then(function(game){
      game.id = game.objectId;
      delete game.objectId;
      return game;
    });
  },

  findAll: function(name) {
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/game").then(function(response){
      return response.results.map(function(game) {
        game.id = game.objectId;
        delete game.objectId;
        return game;
      });
    });
  },

  findQuery: function(name, query) {
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/game", {
      data: Ember.$.param({
              where: JSON.stringify(query)
            })
    }).then(function(response){
      return response.results.map(function(game) {
        game.id = game.objectId;
        delete game.objectId;
        return game;
      });
    });
  },

  destroy: function(name, record) {
    /* jshint unused: false */
    return ajax({
      url: "https://api.parse.com/1/classes/game/" + record.id,
      type: "DELETE"
    });
  },

  save: function(name, record) {
    /* jshint unused: false */
    if(record.id) {
      return ajax({
        url: "https://api.parse.com/1/classes/game/" + record.id,
        type: "PUT",
        data: JSON.stringify(record.toJSON())
      }).then(function(response) {
        response.id = response.objectId;
        delete response.objectId;
        return response;
      });
    } else {
      return ajax({
        url: "https://api.parse.com/1/classes/game",
        type: "POST",
        data: JSON.stringify(record.toJSON())
      }).then(function(response) {
        record.updatedAt = response.updatedAt;
        return record;
      });
    }
  }
});
