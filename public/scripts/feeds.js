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
