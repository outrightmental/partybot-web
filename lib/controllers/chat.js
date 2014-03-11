var chatUsers = require('../models/chatUsers.js');

/**
 * Author: Nick Kaye <nick@outrightmental.com>
 * Laboratory: Outright Mental Inc.
 */
// export function for listening to the socket
module.exports = function (socket) {
  'use strict';

  var name = chatUsers.getGuestName();

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name,
    users: chatUsers.get()
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('user:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });

  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (chatUsers.claim(data.name)) {
      var oldName = name;
      chatUsers.free(oldName);

      name = data.name;

      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      });

      fn(true);
    } else {
      fn(false);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      name: name
    });
    chatUsers.free(name);
  });
};