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

    console.log(chosen);

    for (entry of friends) {
      if (chosen === entry.routeName) {
        return res.json(entry);
      }
    }
    return res.json(false);
  });

  // Create New Friends - takes in JSON input
  app.post('/api/friends', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newFriend = req.body;
    // let newFriend = {
    //     routeName: 'routeNames 2',
    //     name: 'name 3 33',
    //     photoURL: 'https://picsum.photos/id/237/200/300',
    //     scores: ['4', '5', '1', '2', '3', '4', '5', '1', '2', '3']
    //   };
    
    // Using a RegEx Pattern to remove spaces from newFriend
    // https://www.regexbuddy.com/regex.html
    //
    newFriend.routeName = newFriend.name.replace(/\s+/g, '').toLowerCase();

    console.log(newFriend);

    friends.push(newFriend);

    res.json(newFriend);
  });

  app.post('/api/clear', (req, res) => {
    friends.length = 0;
    res.json({ ok: true });
  });
};

module.exports = apiRoutes;
