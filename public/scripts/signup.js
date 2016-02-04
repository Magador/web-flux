var form = document.forms[0];
var button = form.signup;

button.addEventListener('click', function(e) {
  e.stopPropagation();

  aja()
    .method('post')
    .url('/auth/signup')
    .body({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value
    })
    .on('204', function (response) {
      document.querySelector('#error-messages').textContent = response;
    })
    .on('201', function () {
      document.location = "/feeds.html";
    })
    .go();

});
