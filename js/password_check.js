$( document ).ready(function() {
    //Password strength meter stuff
    var strength = {
        0: "Worst 😡",
        1: "Bad 😣",
        2: "Weak 😐",
        3: "Good 😏",
        4: "Strong 💪"
      }

      var password = document.getElementById('password');
      var text = document.getElementById('password-strength-text');
      
      password.addEventListener('input', function() {
        var val = password.value;
        var result = zxcvbn(val);
      
        // Update the text indicator
        if (val !== "") {
          text.innerHTML = "Strength: " + strength[result.score]; 
        } else {
          text.innerHTML = "";
        }
      });
});