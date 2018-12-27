/*
 * CSVJSON Data Janitor
 *
 * Copyright (c) 2018 Martin Drapeau
 */
APP.datajanitor = function() {

  function go() {
    var inputCollection = window.inputCollection = new Backbone.InputCollection();
    var outputCollection = window.outputCollection = new Backbone.OutputCollection();
    var store = window.store = new Backbone.DataStore(_.extend({}, APP.data, {id: APP.id || null}));

    var sessionsView = new Backbone.SessionsView({
      el: $('#sessions'),
      store: store
    }).render();

    var codeView = new Backbone.CodeView({
      el: $('#tab-code'),
      inputCollection: inputCollection,
      outputCollection: outputCollection,
      store: store
    }).render();

    var dataView = new Backbone.DataView({
      el: $('#tab-data'),
      inputCollection: inputCollection,
      outputCollection: outputCollection,
      store: store,
      codeView: codeView
    }).render();

    new Backbone.ShareView({
      el: $('a.save-permalink').first(),
      store: store
    }).render();

    new Backbone.HireView({
      el: $('button.hire').first(),
      store: store
    }).render();
  }

  Backbone.DataStore.hydrateDefaults();
  if (localStorage.DataJanitorShowCodePage) {
    delete localStorage.DataJanitorShowCodePage;
    $('.nav-tabs a[href="#tab-code"]').tab('show');
  }

  if (APP.id && APP.data_url) {
    // Load from CDN
    $.getJSON(APP.data_url).done(function(data) {
      APP.data = data;
      go();
    });
  } else {
    // No data or bootstrapped in
    go();
  }

};