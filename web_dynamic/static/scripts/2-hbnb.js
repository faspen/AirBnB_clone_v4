/*
   Checkbox for the list of amenities
*/
const $ = window.$;

$(document).ready(() => {
  const amenList = {};
  $('input[type=checkbox]').on('click', function () {
    if ($(this).prop('checked') === true) {
      amenList[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenList[$(this).attr('data-id')];
    }
    if (Object.keys(amenList).length > 0) {
      $('.amenities H4').html(Object.values(amenList).join(', ') + '&nbsp;');
    } else {
      $('.amenities H4').html('&nbsp;');
    }
  });
  /*
    Task 3: Request API
*/
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
