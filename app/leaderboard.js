/**
 * Created by Nathan Nahina on 10/11/2016.
 */
// new mongo database collection
PlayersList = new Mongo.Collection('players');

console.log("Hello World");

//Runs on browser
if(Meteor.isClient){

  //Helper functions can be defined here
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({}, { sort: {score: -1, name : 1}}); // -1 to sort in descending order
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer) {
        return "selected";
      }
    },

    'selectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne({ _id: selectedPlayer });
    }
  });

  //Events start block
  Template.leaderboard.events({
    'click .player': function(){
      //Before using session had to add it in cmd line via 'meteor add session'
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },

    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, { $inc: {score: 5 } });
    },

    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, { $inc: {score: -5 } });
    }
  });
}

//Run on command line
if(Meteor.isServer){
  console.log("Hello server");

}