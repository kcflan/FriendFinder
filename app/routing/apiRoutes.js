//load the friends array data
let friends = require('../data/friends');

let apiRoutes = app => {
  //display all friends
  app.get('/api/friends', (req, res) => {
    res.json(friends);
  });
  //display an individual friend, TODO make name unique
  app.get('/api/friends/:friend', (req, res) => {
    let chosen = req.params.friend;
    //console.log(chosen);
    for (entry of friends) {
      if (chosen === entry.routeName) {
        return res.json(entry);
      }
    }
    return res.json(false);
  });

  let compareScores = (array1, array2) => {
    let resArray = [];
    for (let i = 0; i < array1.length; i++) {
      resArray.push(Math.abs(array1[i] - array2[i]));
    }
    //return the sum of the array playing with reduce, pretty slick. 
    //takes the array of absolute differences, and reduces them to one value, goes through each and adds them to running accumulated total. 
    return resArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  };

  // Create New Friends - takes in JSON input
  app.post('/api/friends', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newFriend = req.body;
    let match;
    //start score at a hundred so that the friend always matches the first person in the array.
    //largest variation with 10 Questions at 1-5, is 4*10 = 40.
    //TODO for expanded cases, can make it friends[0].scores.length * (number of choices), which would be 50.
    let score = 100;

    //loop thru each friend in friends
    for (friend of friends) {
      //compare the two arrays of scores and return a sum of the differences between the newfriend and each friend in the array. 
      let comp = compareScores(friend.scores, newFriend.scores);
      //set match equal to friend if score is more that the compared score
      if (score > comp) {
        match = friend;
        score = comp;
      }
    }

    friends.push(newFriend);
    res.json(match);
  });

  app.post('/api/clear', (req, res) => {
    friends.length = 0;
    res.json({ ok: true });
  });
};

module.exports = apiRoutes;
