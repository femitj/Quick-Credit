window.onload = () => {

  function animateSlogan() {
  // all slogan class in an array
  const slogan = document.querySelectorAll('p.slogan');

  let counter = 0;

  // add the animation to the first element
  slogan[counter].classList.add('slogan-anime')
      setInterval(() => {

          // when counter resets to -1, ensure aniamtion class is removed form the last element
          if (counter == -1){
              slogan[slogan.length - 1].classList.remove('slogan-anime')
          }
          
          // keep the countng going on
          ++counter

          // this is to remove the animation from the last element
          if (counter > 0){
              slogan[counter - 1].classList.remove('slogan-anime')
          }

          let steps = slogan[counter].innerHTML.length
          slogan[counter].style.animation = `typing 3.5s steps(${steps}, end), blink-caret 1s  infinite`

          // add the aniamation class to each elemeent
          slogan[counter].classList.add('slogan-anime')

          // reset the counter when it reaches the last element
          if (counter == slogan.length - 1){
              counter = -1
          }
      }, 5000);

  }

animateSlogan()

}
/*
document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var dataText = [ "We provide short term soft loans to individuals; <p>as a way to alleviate poverty and empower low income earners.</p>"];
  
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 20000);
     }
     // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
       StartTextAnimation(i + 1);
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});
*/