$(function(){
  const horns = [];

  function Animal(data) {
    this.description = data.description;
    this.horns = data.horns;
    this.image = data.image_url;
    this.keyword = data.keyword;
    this.title = data.title;

    horns.push(this);
  }

  $.get('/data/page-1.json', (data) => {
    // console.log(data);
    data.forEach((el) => {
      new Animal(el);
    });

    console.log(horns);

    horns.forEach((horn) => {
      $('section h2').text(horn.title);
      $('section img[src=""]').attr(horn.image);
    });
  });
});
