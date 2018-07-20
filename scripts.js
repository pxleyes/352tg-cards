'use strict';

//
// No external JavaScript libraries are used or required
// Plugins used are autoprefixer and babel
//
(function () {
  'use strict';

  // Create object literal with project variables

  var galleryVariables = {
    galleryAuthor: document.querySelector('.js-modal-author'),
    galleryButton: document.querySelector('.js-close-button'),
    galleryLinks: document.querySelectorAll('a[data-toggle="galleryModal"]'),
    galleryModal: document.querySelector('.js-gallery-reveal'),
    galleryOverlay: document.querySelector('.js-gallery-overlay'),
    galleryPreview: document.querySelector('.js-modal-preview'),
    galleryPreviewAuthor: document.querySelector('.js-modal-author')
  };
  
  // Fade in function
  var fadeIn = function fadeIn(element) {
    // Create variable with initial opacity
    var elementOpacity = 0.1;

    // Create timer for fadeIn function
    var timer = setInterval(function () {
      if (elementOpacity >= 1) {
        // Reset interval
        clearInterval(timer);
      }

      // Set element opacity to elementOpacity
      element.style.opacity = elementOpacity;

      // Increase value of elementOpacity
      elementOpacity += elementOpacity * 0.1;

      // Show element
      element.style.display = 'block';
    }, 15);
  };

  // Fade out function
  var fadeOut = function fadeOut(element) {
    // Create variable with initial opacity
    var elementOpacity = 1;

    // Create timer for fadeOut function
    var timer = setInterval(function () {
      if (elementOpacity <= 0.1) {
        // Reset interval
        clearInterval(timer);

        // Hide element
        element.style.display = 'none';
      }

      // Set element opacity to elementOpacity
      element.style.opacity = elementOpacity;

      // Decrease value of elementOpacity
      elementOpacity -= elementOpacity * 0.1;
    }, 15);
  };

  // Open reveal dialog by clicking on images
  for (var x = 0, y = galleryVariables.galleryLinks.length; x < y; x++) {
    // Add event listener for image containers
    galleryVariables.galleryLinks[x].addEventListener('click', function (e) {
      e.preventDefault();

      // Get clicked image
      var image = e.target;

      // Get src of the image
      var imageSrc = image.getAttribute('src');

      // Get alt of the image
      var imageAlt = image.getAttribute('alt');

      // Set alt attribute of preview image to clicked image
      galleryVariables.galleryPreview.setAttribute('alt', imageAlt);

      // Set src attribute of preview image to clicked image
      galleryVariables.galleryPreview.setAttribute('src', imageSrc);

      // Set preview headline to alt of clicked phot
      galleryVariables.galleryPreviewAuthor.textContent = imageAlt;

      // Avoid openning modal unless its content is loaded
      if (galleryVariables.galleryPreview.getAttribute('src').length > 0 && galleryVariables.galleryPreview.getAttribute('alt').length > 0 && galleryVariables.galleryPreviewAuthor.textContent.length > 0) {
        // Add Foundation class to hide overflow
        document.body.classList.add('is-reveal-open');

        // Show modal dialog
        galleryVariables.galleryModal.style.display = 'block';

        // Show modal overlay (fade it in)
        fadeIn(galleryVariables.galleryOverlay);
      }
    });
  }

  // Close reveal dialog
  galleryVariables.galleryButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Hide modal overlay (fade it out)
    fadeOut(galleryVariables.galleryOverlay);

    // Wait before overlay fades out
    setTimeout(function () {
      // Hide modal dialog
      galleryVariables.galleryModal.style.display = 'none';

      // Reset alt attribute of preview image
      galleryVariables.galleryPreview.setAttribute('alt', '');

      // Reset src attribute of preview image
      galleryVariables.galleryPreview.setAttribute('src', '');

      // Reset text for preview headline
      galleryVariables.galleryPreviewAuthor.textContent = '';

      // Remove Foundation class to hide overflow
      document.body.classList.remove('is-reveal-open');
    }, 250);
  });
})();