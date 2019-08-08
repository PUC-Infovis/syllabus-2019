class Slide{
  constructor(num){
    this.num = num;
    this.current_state = 0;
    this.states = {};
    this.states_count = 0;
    this.next = null;
    this.prev = null;
  }

  addState(State){
    this.states[this.states_count] = State;
    this.states_count++;
  }

  render(){
    let slides = document.getElementsByClassName('slide');
    [...slides].forEach(slide => {
      slide.style.display = "none";
    });
    document.getElementById(this.num).style.display = "block";
    this.states[this.current_state].render();
  }

  forward(){
    if (this.current_state + 1 == this.states_count){
      if(this.next != null){
        this.next.render();
        return this.next;
      }
    }
    else {
      this.current_state++;
      this.states[this.current_state].render();
    }
    return this;
  }

  back(){
    if (this.current_state - 1 < 0){
      if (this.prev){
        this.prev.render();
        return this.prev;
      }
    }
    else {
      this.current_state--;
      this.states[this.current_state].render();
    }
    return this;
  }
}

class State{
  constructor(parent, num){
    this.num = num;
    this.parent = parent;
  }

  render(){
    let current_slide_states = document.getElementById(this.parent.num).querySelectorAll('.state');
    current_slide_states.forEach(state => {
      state.style.display = 'none';
    });
    current_slide_states[this.num].style.display = "block";
  }
}

class Slider{
  constructor(){
    this.current_slide = null;
  }

  addSlide(Slide){
    if (!this.current_slide){
      this.current_slide = Slide;
    }
    else {
      let current_slide = this.current_slide;
      while (current_slide.next != null){
        current_slide = current_slide.next;
      }
      current_slide.next = Slide;
      Slide.prev = current_slide;
    }
  }

  askLeft(){
    document.getElementById('left').style.display = "block";
  }

  askRight(){
    document.getElementById('left').style.display = "none";
    document.getElementById('right').style.display = "block";
  }

  start(){
    document.getElementById('right').style.display = "none";
    this.current_slide.render();
  }

  forward(){
    this.current_slide = this.current_slide.forward();
    document.getElementById('number').innerText = this.current_slide.num + 1;
  }

  back(){
    this.current_slide = this.current_slide.back();
    document.getElementById('number').innerText = this.current_slide.num + 1;
  }
}