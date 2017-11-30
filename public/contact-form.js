$(document).ready(function () {

  const sendEmailBtn = $('#send_email');
  const nameField =  $('#name');
  const emailField =  $('#email');
  const messageField =  $('#message');

  sendEmailBtn.on('click', (e) => {

    e.preventDefault();

    const data = {
      name: nameField.val(),
      email: emailField.val(),
      message: messageField.val()
    };

    // console.log(data);

    $.get('/send', data, (d) => {
      if (!d.error) {
        console.log('success!');
        swal(
          'Thanks for emailing me!',
          "I've sent a confirmation to your email address. :)",
          'success'
        );
        nameField.val('');
        emailField.val('');
        messageField.val('');
      }else{
        swal(
          'Oops...',
          'Something went wrong! Please try again.',
          'error'
        )
      }
    })
  });
});


