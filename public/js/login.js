  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            employeeId: {
              identifier: 'employeeId',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your employee ID'
              }]
            },
            lastName: {
              identifier: 'lastName',
              rules: [{
                type: 'empty',
                prompt: 'Please enter your last name'
              }]
            }
          }
        });
    });
  