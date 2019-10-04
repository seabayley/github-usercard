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
axios.get('https://api.github.com/users/seabayley')
  .then(response => {
    document.querySelector('.cards').appendChild(createCard(response.data));
  })

  .catch(err => {
    console.log(err);
  })


const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(userName => {
  axios.get(`https://api.github.com/users/${userName}`)
    .then(response => {
      document.querySelector('.cards').appendChild(createCard(response.data));
    })

    .catch(err => {
      console.log(err);
    })
})

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


function createElementWithProps(elemType = 'div', classes, ...properties) {
  let elem = document.createElement(elemType);

  if (typeof (classes) === 'string') {
    elem.classList.add(classes);
  }
  else if (typeof (classes) === 'array') {
    classes.forEach(c => {
      elem.classList.add(c);
    });
  }
  else if (classes == null) {
  }
  else {
    throw "Invalid type passed.";
  }

  properties.forEach(prop => {
    if (prop['img']) {
      elem.src = prop['img'];
    }
    if (prop['href']) {
      elem.href = prop['href'];
    }
    if (prop['text']) {
      elem.textContent = prop['text'];
    }
  })

  return elem;
}

function createCard(userData) {
  let
    cardWrapper = createElementWithProps('div', 'card'),
    imgSrc = createElementWithProps('img', null, { 'img': userData.avatar_url }),
    cardInfo = createElementWithProps('div', 'card-info'),
    name = createElementWithProps('h3', 'name', { 'text': userData.name }),
    userName = createElementWithProps('p', 'username', { 'text': userData.login }),
    locInfo = createElementWithProps('p', null, { 'text': ("Location: " + userData.location) }),
    proInfo = createElementWithProps('p'),
    aLink = createElementWithProps('a', null, { 'href': userData.url }, { 'text': userData.url }),
    followers = createElementWithProps('p', null, { 'text': ("Followers: " + userData.followers) }),
    following = createElementWithProps('p', null, { 'text': ("Following: " + userData.following) }),
    bioInfo = createElementWithProps('p', null, { 'text': ("Bio " + userData.bio) });

  proInfo.appendChild(aLink);
  cardInfo.append(name, userName, locInfo, proInfo, followers, following, bioInfo);
  cardWrapper.append(imgSrc, cardInfo);
  return cardWrapper;
}