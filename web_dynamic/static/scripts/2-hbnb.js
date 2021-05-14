/*
   Checkbox for the list of amenities
*/
const $ = window.jQuery;

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
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, stat) {
  if (data.status === 'OK' && stat === 'success') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
