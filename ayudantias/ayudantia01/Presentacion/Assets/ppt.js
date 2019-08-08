let slide = 0;
let states, slides_count;;
let state = 0;
const slides = {};
let current_slide = 0;
let current_state = 0;
const slider = new Slider();
let left_keyCode = null;
let right_keyCode = null;


document.addEventListener("DOMContentLoaded", function(event) { 
  slides_count = document.getElementsByClassName('slide').length;
  for (let i = 0; i < slides_count; i++){
    let slide  = new Slide(i);
    document.getElementById(i).querySelectorAll('.state').forEach((el, num) => {
      let state = new State(slide, num);
      slide.addState(state);
    });
    slider.addSlide(slide);
  }
  // slider.current_slide.render();
  slider.askLeft();
});

document.addEventListener("keydown", event => {
  if (left_keyCode != null && right_keyCode != null){
    console.log(event.keyCode)
    switch (event.keyCode) {
      case right_keyCode:
        slider.forward();
        break;
      case left_keyCode:
        slider.back();
        break;
    }
  }
  else if (left_keyCode == null){
    left_keyCode = event.keyCode;
    slider.askRight();
  }
  else {
    right_keyCode = event.keyCode;
    slider.start();
  }
});