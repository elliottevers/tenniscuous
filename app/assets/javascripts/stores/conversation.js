(function () {
  var CONVERSATIONS_INDEX_CHANGE_EVENT = "conversationsIndexChange";

  var _conversations = [];

  var resetConversations = function (conversations_identifiers) {
    _conversations = conversations_identifiers;
  };

  window.ConversationStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _conversations.slice();
    },

    addConversationsIndexChangeListener: function (callback) {
      this.on(CONVERSATIONS_INDEX_CHANGE_EVENT, callback);
    },

    removeConversationsIndexChangeListener: function (callback) {
      this.removeListener(CONVERSATIONS_INDEX_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case ConversationConstants.ALL_CONVERSATIONS_FETCHED:
          resetConversations(payload.conversations_identifiers);
          ConversationStore.emit(CONVERSATIONS_INDEX_CHANGE_EVENT);
          break;
      }
    })
  });
 })();
