/* jquery-inverter-0.5.js
 *
 * Last modified by: Cory Dorning
 * Last modified on: 09/20/2011
 *
 * Invert Image is a jQuery plugin that uses canvas (or appropriate
 * IE filters) to invert the colors of an image.
 *
 * @TODO
 * =Track State
    Setup method for toggling the state
 *
 */

(function($) {
  $.fn.inverter = function(options) {
    var $images = this,
        
        image = $images.toArray(),

        invert =  {
          canvas: function() {
            var create = function(img) {
                  var canvas = $('<canvas/>').insertAfter( $(img) ).get(0);
                    canvas.setAttribute('height', img.height);
                    canvas.setAttribute('width', img.width);
    
                  var context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0);

                  var imgData = context.getImageData(0, 0, canvas.width, canvas.height),
                      data = imgData.data;

                  for (var i = 0, n = data.length; i < n; i += 4) {
                    // red
                    data[i] = 255 - data[i];

                    // green
                    data[i + 1] = 255 - data[i + 1];

                    // blue
                    data[i + 2] = 255 - data[i + 2];

                    // data[i + 3] is alpha (the fourth element)
                  }

                  // overwrite original image
                  context.putImageData(imgData, 0, 0);
                  $(img).hide();
                },

                toggle = function($img) {
                  if ($img.data('inverter') === 'canvas') {
                    $img
                      .data('inverter', 'image')
                      .show()
                      .next()
                        .hide();
                  } else {
                    $img
                      .data('inverter', 'canvas')
                      .hide()
                      .next()
                        .show();
                  }
                };

            $images.each(function() {
              var image = this,
                  $image = $(this);

              if ($image.data('inverter')) {
                toggle($image);
              } else {
                create(image);
                $image.data('inverter', 'canvas');
              }
            });
          },

          css: function() {
            $images.each(function() {
              var $image = $(this);

              if ($image.css('filter') === 'invert') {
                $image.css('filter', '');
              } else {
                $image.css('filter', 'invert');
              }
            });
          }
        };

        if (navigator.appName === 'Microsoft Internet Explorer') {
          invert.css();
        } else {
          invert.canvas();
        }
     return $images;
  };
})(jQuery);