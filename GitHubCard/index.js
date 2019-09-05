/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['https://api.github.com/users/SkylerSlatosch', 'https://api.github.com/users/ian-schwartz', 'https://api.github.com/users/BrandyBecker'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const cards = document.querySelector('.cards')
//call to github API


axios.get('https://api.github.com/users/lorenzosimpson')
.then(response => {
  cards.appendChild(createCard(response.data))
})
.catch(error => {
  console.log('Data not returned', error)
});

axios.get('https://api.github.com/users/lorenzosimpson/followers')
.then(followerRes => {
  followerRes.data.forEach(user => {
    axios.get(`https://api.github.com/users/${user.login}`)
    .then(userRes => {
      cards.appendChild(createCard(userRes.data))
    })
    .catch(error => {
      console.log('Data not returned', error)
    })
  })
})
.catch(error => {
  console.log('Data not returned', error)
});



//begin component builder
function createCard(obj) {
  //create elements
  const newCard = document.createElement('div');
  const newImage = document.createElement('img');
  const cardInfo = document.createElement('div');
  const newName = document.createElement('h3');
  const newUsername = document.createElement('p');
  const newLocation = document.createElement('p');
  const newProfile = document.createElement('p');
  const newLink = document.createElement('a');
  const newFollowers = document.createElement('p');
  const newFollowing = document.createElement('p');
  const newBio = document.createElement('p');

  //add content
  newImage.src = obj.avatar_url;
  newName.textContent = obj.name;
  newUsername.textContent = obj.login;
  newLocation.textContent = obj.location;
  newLink.setAttribute('href', obj.html_url);
  newLink.textContent = 'Github';
  newFollowers.textContent = `${obj.followers} followers`;
  newFollowing.textContent = `${obj.following} following`;
  newBio.textContent = obj.bio;

  //add classLists
  newCard.classList.add('card');
  cardInfo.classList.add('card-info');
  newName.classList.add('name');
  newUsername.classList.add('username');

  //append to newCard
  newCard.appendChild(newImage);
  newCard.appendChild(cardInfo)
  cardInfo.appendChild(newName);
  cardInfo.appendChild(newUsername);
  cardInfo.appendChild(newLocation)
  cardInfo.appendChild(newProfile);
  cardInfo.appendChild(newFollowers);
  cardInfo.appendChild(newFollowing);
  newProfile.appendChild(newLink);
  cardInfo.appendChild(newBio);

  return newCard;
}


// axios.get('https://api.github.com/users/lorenzosimpson/followers')
// .then(response => {
//   console.log(response, 'follower data');
//   response.data.forEach(item => {
//     const follower = createCard(item)
//     cards.appendChild(follower)
//   })
// })
// .catch(error => {
//   console.log('Data not returned', error)
// });

// followersArray.forEach(item => {
//   axios.get(item)
//   .then(response => {
//   console.log(response);
//     cards.appendChild(createCard(response.data))
//   })
//   .catch(error => {
//   console.log('Data not returned', error)
//   });
// })

//post to pages