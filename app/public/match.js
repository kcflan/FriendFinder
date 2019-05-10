$(document).ready(() => {
  $('#submit-btn').on('click', (event) => {
    event.preventDefault();
    
    let validForm = () => {
        let isValid = false;
        if (($('#name').val().trim()  !== '') && ($('#photo').val().trim() !== '')){
            isValid = true;
        }
        return isValid;
    }
    if (validForm()){
    let answerSubmission = {        
        answer1: $('#question1').val().trim(),
        answer2: $('#question2').val().trim(),
        answer3: $('#question3').val().trim(),
        answer4: $('#question4').val().trim(),
        answer5: $('#question5').val().trim(),
        answer6: $('#question6').val().trim(),
        answer7: $('#question7').val().trim(),
        answer8: $('#question8').val().trim(),
        answer9: $('#question9').val().trim(),
        answer10: $('#question10').val().trim()      
    };
    let friend = {
        routeName: ($('#name').val().trim()).replace(/\s+/g, "").toLowerCase(), 
        name: $('#name').val().trim(),
        photoURL: $('#photo').val().trim(),
        scores: Object.values(answerSubmission)
    };
    // send new friend to apiRoutes
    $.post('/api/friends', friend, (data) => {
         
      if (data) {
       //console.log('You matched!', data.name, data.photoURL);
       
       //show modal when data comes back
       $('#friendName').text(data.name);
       $('#friendPhoto').attr('src', data.photoURL);
       $('#exampleModal').modal({show: true, backdrop: 'static', keyboard: false});
      //  $('#exampleModal').modal('show');
      }      
      else {
        alert('Sorry, could not add friend at this time.');
      }

      // Clear the form when submitting
      $('#name').val('');
      $('#photo').val('');
    });
    }
  });
});
