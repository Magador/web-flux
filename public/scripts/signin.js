var form = document.forms[0],
    button = form.signin;

button.addEventListener('click', function(event) {
  event.preventDefault();


  aja()
    .method('post')
    .url('/auth/signin')
    .body({
      username: form.username.value,
      password: form.password.value
    })
    .on('401', function (response) {
      document.querySelector('#error-messages').textContent = response;
    })
    .on('202', function () {
      document.location = "/feeds.html";
    })
    .go();
});