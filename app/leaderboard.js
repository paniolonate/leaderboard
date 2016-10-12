/**
 * Created by Nathan Nahina on 10/11/2016.
 */
// new mongo database collection
PlayersList = new Mongo.Collection('players');

console.log("Hello World");

//Runs on browser
if(Meteor.isClient){
  console.log("Hello client");
  //Helper functions can be defined here
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer) {
        return "selected";
      }
    }
  });

  //Events start block
  Template.leaderboard.events({
    'click .player': function(){
      //Before using session had to add it in cmd line via 'meteor add session'
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);

    }
  });
}

//Run on command line
if(Meteor.isServer){
  console.log("Hello server");

}