/*
   Checkbox for the list of amenities
*/
const $ = window.jQuery;

$(document).ready(() => {
  const amenList = {};
  const api = 'http://' + window.location.hostname;
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
    Task 5: Request for all places based on amentities
*/
  $('BUTTON').click(function () {
    $.ajax({
      url: api + 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenList) }),
      contentType: 'application/json',
      dataType: 'json',
      success: listPlaces
    });
  });
});

/*
    Task 3: Request API
*/
$.get('http://localhost:5001/api/v1/status/', function (data, stat) {
  if (data.status === 'OK' && stat === 'success') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

/*
    Task 4: fetch places data
*/

function listPlaces (data) {
  $('SECTION.places').append(data.map(place => {
    return `<article>
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}
                </div>
            </div>
            <div class="information">
                <div class="max_guest">${place.max_guest} Guests
                </div>
                <div class="number_rooms">${place.number_rooms} Bedrooms
                </div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms
                </div>
            </div>
            <div class="description">${place.description}
            </div>
          </article>`;
  }));
}
