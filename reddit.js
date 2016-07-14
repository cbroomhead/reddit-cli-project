var request = require('request');
var inquirer = require('inquirer');
var requestAsJson = require('./requestAsJson.js').requestAsJson;

function getHomepage(callback) {
  var homepageURL = 'https://reddit.com/.json';
  requestAsJson(homepageURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response); // look at the result and explain why we're returning .data.children
    }
  });
}

function getSortedHomepage(sortingMethod, callback) {
  var sortedURL = 'https://reddit.com/' + sortingMethod + '/.json';
  requestAsJson(sortedURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response); // look at the result and explain why we're returning .data.children
    }
  });
}


function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  var subredditdURL = 'https://reddit.com/r/' + subreddit + '/.json';
  requestAsJson(subredditdURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response); // look at the result and explain why we're returning .data.children
    }
  });
}
// var SUBREDDIT = getSubreddit ('crossfit', function (err, res){
//   if (err){
//     console.log("there is an error 3");
//   }
//   else {
//     console.log(res);
//   }
// });


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var SortedSubredditdURL = 'https://reddit.com/r/' + subreddit + '/' + sortingMethod + '.json';
  requestAsJson(SortedSubredditdURL, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response);
    }
  });
}

function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
  var allSubreddits = 'https://reddit.com/subreddits.json';
  requestAsJson(allSubreddits, function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var response = res.data.children;
      callback(null, response);
    }
  });
}

module.exports = {
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddits: getSubreddits
};


var menuChoices = [
  {
    name: 'get Homepage',
    value: 'homepage'
  },
  {
    name: 'get Subreddit',
    value: 'Subreddit'
  },
  {
    name: 'get SubredditSS',
    value: 'Subreddits'
  }

];


var homePageMenu = [
  {
    name: 'just homepage',
    value: 'homepage2'
  },
  {
    name: 'sorted homepage',
    value: 'sortedhomepage'
  }
  ];

var homePageMenuSorted = [{
    name: 'hot',
    value: 'hot'
  },
  {
    name: 'new',
    value: 'new'
  },
  {
    name: 'rising',
    value: 'rising'
  },
  {
    name: 'controversial',
    value: 'controversial'
  },
  {
    name: 'top',
    value: 'top'
  },
  {
    name: 'gilded',
    value: 'gilded'
  },
  {
    name: 'wiki',
    value: 'wiki'
  },
  {
    name: 'promoted',
      value: 'promoted'
    }

    ];


    function usingInquirer() {
      inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
      }).then(
        function(answers) {
          if (answers.menu === 'homepage') {
            getHomepage(function(err, res) {
              if (err) {
                console.log(err);
              }
              else {
                inquirer.prompt({
                  type: 'list',
                  name: 'menu',
                  message: 'Homepage or sorted?',
                  choices: homePageMenu
                }).then(
                  function(secanswers) {
                    if (err) {
                      console.log(err)
                      }
                      else {
                        if (secanswers.menu === 'homepage2') {
                          res.forEach(function(item) {
                            console.log("____________________")
                            console.log(item.data.title);
                            console.log(item.data.url);
                            console.log(item.data.score);
                          })
                        }
                        else {
                          inquirer.prompt({
                              type: 'list',
                              name: 'name',
                              message: 'Which sort method (tab) do you want to see?',
                              choices: homePageMenuSorted
                            }).then(
                              function(thirdanswers) {
                                //////////////
                                if (err) {
                                  console.log(err)
                                }
                                else {
                                  if (thirdanswers.name === 'hot') {
                                    getSortedHomepage('hot', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                  if (thirdanswers.name === 'new') {
                                    getSortedHomepage('new', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                  if (thirdanswers.name === 'rising') {
                                    getSortedHomepage('rising', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                  if (thirdanswers.name === 'controversial') {
                                    getSortedHomepage('controversial', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                  if (thirdanswers.name === 'top') {
                                    getSortedHomepage('top', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                  if (thirdanswers.name === 'gilded') {
                                    getSortedHomepage('gilded', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                  if (thirdanswers.name === 'wiki') {
                                    getSortedHomepage('wiki', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }
                                   if (thirdanswers.name === 'promoted') {
                                    getSortedHomepage('promoted', function(err, res) {
                                      if (err) {
                                        console.log(err)
                                      }
                                      else {
                                        res.map(function(item) {
                                          console.log(item.data.title);
                                        })
                                      }
                                    })
                                  }                           
                            }
                          })
                      }
                    }
                  })
              }
            })
          }
          //else if for other menu items
        })
    }

    usingInquirer();
