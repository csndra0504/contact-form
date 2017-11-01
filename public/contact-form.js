$(document).ready(function () {

  const sendEmailBtn = $('#send_email');

  sendEmailBtn.on('click', (e) => {

    e.preventDefault();

    const data = {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    };

    // console.log(data);

    $.get('/send', data, (d) => {
      console.log(d);
      if (d === "sent") {
        console.log('sent');
      }
    })
  });
});


