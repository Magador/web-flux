var signout = document.querySelector('#signout');
signout.addEventListener('click', function (e) {
  e.stopPropagation();

  aja()
    .method('post')
    .url('/auth/signout')
    .on('200', function (res) {
      document.location = "/signin.html";
    })
    .go();
});

var main = document.querySelector('main');

var addFeed = document.querySelector("#addFeed");
var addFeedButton = document.querySelector("#addFeedButton");
addFeedButton.addEventListener('click', function (e) {
  e.stopPropagation();

  var xhr = new XMLHttpRequest();
  xhr.open('get', '/api/feeds?url=' + addFeed.value);
  xhr.addEventListener('load', function (xhr) {
    var div = document.createElement('div');
    div.innerHTML = xhr.target.responseText;
    main.appendChild(populate(div.firstElementChild));
  });
  xhr.send();
});

function populate(node) {
  var section = document.createElement('section');
  var channel = node.firstElementChild;
  var title = channel.querySelector('title');
  var link = channel.innerHTML.match(/<link>([^<]*)/i)[1];

  var h2 = document.createElement('h2');
  h2.innerHTML = '<a href="'+ link +'">'+ (title ? title.textContent: link) +'</a>';
  section.appendChild(h2);

  var toggleFeedButton = document.createElement('button');
  toggleFeedButton.textContent = "Hide feed";
  toggleFeedButton.addEventListener('click', toggleFeed.bind(toggleFeedButton));
  section.appendChild(toggleFeedButton);

  var removeFeedButton = document.createElement('button');
  removeFeedButton.textContent = "Remove feed";
  removeFeedButton.addEventListener('click', removeFeed.bind(removeFeedButton));
  section.appendChild(removeFeedButton);

  var articles = populateItems(channel.querySelectorAll('item'));
  articles.forEach(function (article) {
    section.appendChild(article);
  })
  return section;
}

function populateItems(items) {
  var articles = [];
  items.forEach(function (item) {
    var article = document.createElement('article'),
        title = item.querySelector('title'),
        description = item.querySelector('description').textContent,
        link = item.innerHTML.match(/<link>([^<]*)/i)[1];
    var h3 = document.createElement('h3'),
        div = document.createElement('div');

    h3.innerHTML = '<a href="'+ link +'">'+ (title ? title.textContent: link) +'</a>';
    article.appendChild(h3);

    div.innerHTML = description;
    article.appendChild(div);
    articles.push(article);
    article.classList.toggle('item');
  });
  return articles;
}

function toggleFeed(e) {
  e.stopPropagation();
  e.preventDefault();

  if(this.classList.contains('hidden')) {
    this.textContent = "Hide feed";
  } else {
    this.textContent = "Show feed";
  };
  this.classList.toggle('hidden');
}

function removeFeed(e) {
  e.stopPropagation();
  e.preventDefault();

  this.parentElement.parentElement.removeChild(this.parentElement);
}
