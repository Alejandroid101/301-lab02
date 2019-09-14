
$(function() {
  /**
   * JQUERY GLOBAL VARIABLES
   */

  // Render HTML variables
  const horns = [];
  const keywords = [];

  // Datastore variables
  const dataPath = './data/page-1.json';

  /**
   * DATASTORE
   */

  // Get data over AJAX
  $.get(dataPath, (rawHorns) => {
    // Normalize raw data
    rawHorns.forEach((rawHorn) => {
      new Horn(rawHorn);
    });

    // Render page load HTML
    renderSelectOptions(keywords);
    renderPhotosByKeyword('default');

    // Turn on page event listeners
    selectOptionsEventListener();
  });

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
   * EVENT LISTENERS
   */

  function selectOptionsEventListener() {
    $('select').on('change', function() {
      // Get horn animal keyword to filter by
      const keyword = this.value;

      // Render horn animal photos by keyword filter
      renderPhotosByKeyword(keyword);
    });
  }

  /**
   * RENDER HTML
   */

  /**
   * Render distinct horn animal keyword filter select options
   * @param {Array} optionNames
   */
  function renderSelectOptions(optionNames) {
    optionNames.forEach(optionName => {
      // Render select option
      $('select').append(`<option value="${optionName}">${optionName}</option>`);
    });
  }

  /**
   * Render horn animal photos through a keyword filter
   * @param {String} keywordFilter
   */
  function renderPhotosByKeyword(keywordFilter) {
    // Remove .photo-template sections from DOM
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
