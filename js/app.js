
$(function(){
  const horns = [];
  // const keywords = [];

  function Horn(rawHorn) {
    this.description = rawHorn.description;
    this.horns = rawHorn.horns;
    this.image = rawHorn.image_url;
    this.keyword = rawHorn.keyword;
    this.title = rawHorn.title;

    horns.push(this);

    // if (!keywords.includes(rawHorn.keyword)) {
    //   keywords.push(rawHorn.keyword);
    // }
  }

  const dataPath = './data/page-1.json';

  $.get(dataPath, (rawHorns) => {
    rawHorns.forEach((rawHorn) => {
      new Horn(rawHorn);
    });

    horns.forEach(horn => {
      // Create new tag from template
      $('main').append('<section class="photo-template"></section>');

      // Fill new tag
      $('main').last().append(`<h2>${horn.title}</h2>`);
      $('main').last().append(`<img src="${horn.image}" alt="${horn.description}" width="250px" height="250px">`);
      $('main').last().append(`<p>${horn.description}</p>`);
      $('main').last().append('<br>')
    });

    // keywords.forEach(keyword => {
    //   $('select').append(`<option value="${keyword}">${keyword}</option>`)
    // });
  });
});
