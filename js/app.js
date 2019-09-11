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
    data.forEach((el) => {
      new Animal(el);
    });

    horns.forEach((horn, index) => {
      const hornId = `horn-${index}`;
      $('main').append(`<section id="${hornId}"></section>`);
      $(`#${hornId}`).append(`<h2>${horn.title}</h2>`);
      $(`#${hornId}`).append(`<img src="${horn.image}" alt="${horn.description}" width="250px" height="250px">`);
      $(`#${hornId}`).append(`<p>${horn.description}</p>`);
    });
  });
});
