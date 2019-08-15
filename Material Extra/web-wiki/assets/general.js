$(function(){
  $('[id$=-toggle-button]').click(function(){
    const related = this.id.split('-')[0];
    const arrow_dir = this.firstChild.className.split(' ')[1].split('-')[2];
    console.log(this.firstChild);
    this.firstChild.className = (arrow_dir == 'right') ? "fas fa-chevron-down" : "fas fa-chevron-right";
    $(`#${related}-toggle`).slideToggle(100);
  })
})


