let counter = 0;

function updateCounter(){
  counter++;
  console.log(counter);
}

function showAndUpdateCounter(){
  updateCounter();
  document.getElementById('counter').innerHTML = counter;
}

function updateText(){
  const input = document.getElementById('input-text').value;
  document.getElementById('text-container').innerHTML = input;
}

function updateColor(){
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  document.getElementById('color-container').style.background = `rgb(${r}, ${g}, ${b})`;
}
