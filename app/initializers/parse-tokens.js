import Ember from 'ember';

export function initialize(/* container, application */) {
  Ember.$.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "D79LREfrKhwYb7VQZkivDUqymZKDCYWwzxGMKWzQ",
      "X-Parse-REST-API-Key": "QXmLRZJdjwEMeaWgeS2VFWLVq8hDVgekS8ynssAv"
    }
  });
}

export default {
  name: 'parse-tokens',
  initialize: initialize
};
