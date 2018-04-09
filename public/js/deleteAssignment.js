 $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            firstName: {
              identifier  : 'firstName',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter the first name'
                }
              ]
            },
            lastName: {
              identifier  : 'lastName',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter the last name'
                }
              ]
            },
            employeeNumber: {
              identifier  : 'employeeNumber',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your employee number'
                }
              ]
            }
          }
        })
      ;
    })
  ;
  
  $('.ui.dropdown').dropdown();
