
$(function() {
  /**
   * JQUERY GLOBAL VARIABLES
   */

  // Render HTML variables
  let horns = [];
  let keywords = [];

  /**
   * EVENT LISTENERS
   */

  /**
   * Pagination page 1
   */
  $('#page-1').on('click', () => {
    // Reset global data
    horns = [];
    keywords = [];

    render(1);
  });

  /**
   * Pagination page 1
   */
  $('#page-2').on('click', () => {
    // Reset global data
    horns = [];
    keywords = [];

    render(2);
  });

  /**
   * Select keyword
   */
  $('select').on('change', function() {
    // Get horn animal keyword to filter by
    const keyword = this.value;

    // Render horn animal photos by keyword filter
    renderImagesByKeyword(keyword);
  });

  /**
   * DATASTORE
   */

  function getData(dataPath) {
    // Get data over AJAX
    $.get(dataPath, (rawHorns) => {
      // Normalize raw data
      rawHorns.forEach((rawHorn) => {
        new Horn(rawHorn);
      });

      // Render page load HTML
      renderSelect(keywords);
      renderImagesByKeyword('default');
    });
  }

  /**
   * DATA CONSTRUCTORS
   */

  /**
   * Horn data constructor
   * @param {Object} rawHorn
   */
  function Horn(rawHorn) {
    this.description = rawHorn.description;
    this.horns = rawHorn.horns;
    this.image = rawHorn.image_url;
    this.keyword = rawHorn.keyword;
    this.title = rawHorn.title;

    horns.push(this);

    if (!keywords.includes(rawHorn.keyword)) {
      keywords.push(rawHorn.keyword);
    }
  }

  /**
   * RENDER HTML
   */

  function render(pageNum) {
    let dataPath = '';

    switch (pageNum) {
    case 1:
      dataPath = `./data/page-${pageNum}.json`;
      break;
    case 2:
      dataPath = `./data/page-${pageNum}.json`;
      break;
    default:
      break;
    }

    getData(dataPath);
  }

  /**
   * Render distinct horn animal keyword filter select options
   * @param {Array} optionNames
   */
  function renderSelect(optionNames) {
    // Reset select
    $('.keyword').remove();

    optionNames.forEach(optionName => {
      // Append option to select
      $('select').append(`<option class="keyword" value="${optionName}">${optionName}</option>`);
    });
  }

  /**
   * Render horn animal photos through a keyword filter
   * @param {String} keywordFilter
   */
  function renderImagesByKeyword(keywordFilter) {
    // Reset images
    $('.photo-template').remove();

    horns.forEach((horn, index) => {
      if (keywordFilter === 'default' || keywordFilter === horn.keyword) {
        // Create new tag from template
        $('main').append(`<section class="photo-template" name="horn-${index}"></section>`);

        // Fill new tag
        $(`section[name="horn-${index}"]`).append(`<h2>${horn.title}</h2>`);
        $(`section[name="horn-${index}"]`).append(`<img src="${horn.image}" alt="${horn.description}" width="250px" height="250px">`);
        $(`section[name="horn-${index}"]`).append(`<p>${horn.description}</p>`);
      }
    });
  }
});
