(function () {
  var CONVERSATIONS_INDEX_CHANGE_EVENT = "conversationsIndexChange";
  var CONVERSATION_SHOW_CHANGE_EVENT = "conversationShowChangeEvent";

  var _conversations = [];
  var _conversation = {};

  var resetConversations = function (conversations_identifiers) {
    _conversations = conversations_identifiers;
  };

  var resetConversation = function (conversation_information) {
    _conversation = conversation_information;
  };

  window.ConversationStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _conversations.slice();
    },

    conversation: function () {
      return $.extend({}, _conversation);
    },

    addConversationsIndexChangeListener: function (callback) {
      this.on(CONVERSATIONS_INDEX_CHANGE_EVENT, callback);
    },

    removeConversationsIndexChangeListener: function (callback) {
      this.removeListener(CONVERSATIONS_INDEX_CHANGE_EVENT, callback);
    },

    addConversationShowChangeListener: function (callback) {
      this.on(CONVERSATION_SHOW_CHANGE_EVENT, callback);
    },

    removeConversationShowChangeListener: function (callback) {
      this.removeListener(CONVERSATION_SHOW_CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case ConversationConstants.ALL_CONVERSATIONS_FETCHED:
          resetConversations(payload.conversations_identifiers);
          ConversationStore.emit(CONVERSATIONS_INDEX_CHANGE_EVENT);
          break;
        case ConversationConstants.CONVERSATION_FETCHED:
          resetConversation(payload.conversation_information);
          ConversationStore.emit(CONVERSATION_SHOW_CHANGE_EVENT);
          break;
        case ConversationConstants.MESSAGE_CREATED:
          ConversationStore.emit(CONVERSATION_SHOW_CHANGE_EVENT);
          break;
      }
    })
  });
 })();
