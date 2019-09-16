
$(function() {
  /**
   * JQUERY GLOBAL VARIABLES
   */

  // Render HTML variables
  let horns = [];
  let keywords = [];
  let selectKeyword = '';
  let selectSort = 'title';

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
  $('#filter').on('change', function() {
    // Get horn animal keyword to filter by
    selectKeyword = this.value;

    // Render horn animal photos by keyword filter
    renderImagesByKeywordAndSort(selectKeyword, selectSort);
  });

  /**
   * Select sort
   */
  $('#sort').on('change', function() {
    // Get sort option
    selectSort = this.value;

    // Render horn animal photos by sort order
    renderImagesByKeywordAndSort(selectKeyword, selectSort);
  })

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
      renderImagesByKeywordAndSort('default', selectSort);
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

    const source = document.getElementById("filter-template").innerHTML;
    const template = Handlebars.compile(source);
    const name = {
      valName: 'default',
      optName: 'Filter by Keyword'
    }
    const html = template(name);
    $('#filter').append(html);

    optionNames.forEach(optionName => {
      // Append option to select
      const name = {
        valName: optionName,
        optName: optionName
      };
      const html = template(name);
      $('#filter').append(html);
    });
  }

  /**
   * Render horn animal photos through a keyword filter
   * @param {String} keywordFilter
   * @param {String} sortOrder
   */
  function renderImagesByKeywordAndSort(keywordFilter, sortOrder) {
    // Reset images
    $('.photo-template').remove();

    // Sort array by sortOrder before walking array
    switch (sortOrder) {
    case 'title':
      horns.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
      break;
    case 'horn-count':
      horns.sort((a, b) => {
        return a.horns < b.horns ? -1 : 1;
      });
      break;
    default:
      break;
    }

    const source = document.getElementById("photo-template").innerHTML;
    const template = Handlebars.compile(source);

    horns.forEach(horn => {
      if (keywordFilter === 'default' || keywordFilter === horn.keyword) {
        const html = template(horn);
        $('main').append(html);
      }
    });
  }
});
