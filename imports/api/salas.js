import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Salas = new Mongo.Collection('salas');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('salas', function salasPublication() {
    return Salas.find({
    });
  });
  Meteor.publish('sala', function salasPublication(owner) {
    return Salas.find({
      owner:owner
    });
  });
}

Meteor.methods({
  'salas.insert'(text) {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Salas.insert({
      name:text,
      players:[ Meteor.users.findOne(this.userId).username],
      createdAt: new Date(),
      owner: Meteor.users.findOne(this.userId).username,
    });
  },
  'salas.remove'() {
    let username = Meteor.users.findOne(this.userId).username;
    const sala = Salas.findOne({owner:username});
    if ( sala.owner !== username) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Salas.remove({owner:username});
  },
  'salas.join'(idOwner) {
    Salas.update({owner:idOwner}, { $push: { players:Meteor.users.findOne(this.userId).username} });
  },

});

