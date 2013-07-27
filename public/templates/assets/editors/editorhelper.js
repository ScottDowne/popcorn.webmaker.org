(function( global, $ ) {
  var plugins = {};

  var EditorHelper = function() {
    throw "Do not use EditorHelper in this manner. Use EditorHelper.init instead.";
  };

  // This fix is to ensure content-editable still updates correctly, and deals with ie9 not reading document.activeElement properly
  function blurActiveEl() {
   if ( document.activeElement && document.activeElement.blur ) {
      document.activeElement.blur();
    }
  }

  function calculateFinalPositions( event, ui, trackEvent, targetContainer, container, options ) {
    var target = targetContainer.getBoundingClientRect(),
        height = container.clientHeight,
        width = container.clientWidth,
        top = ui.position.top,
        left = ui.position.left,
        targetHeight = target.height,
        targetWidth = target.width,
        minHeightPix = targetHeight * ( ( options.minHeight || 0 ) / 100 ),
        minWidthPix = targetWidth * ( ( options.minWidth || 0 ) / 100 );

    top = Math.max( 0, top );
    left = Math.max( 0, left );
    height = Math.max( minHeightPix, height );
    width = Math.max( minWidthPix, width );

    if ( ( container.offsetTop + height ) > targetHeight ) {
      top = targetHeight - height;
    }

    if ( ( container.offsetLeft + width ) > targetWidth ) {
      left = targetWidth - width;
    }

    height = ( height / targetHeight ) * 100;
    width = ( width / targetWidth ) * 100;

    if ( options.end ) {
      options.end();
    }

    // Enforce container size here, instead of relying on the update.
    container.style.width = width + "%";
    container.style.height = height + "%";

    blurActiveEl();

    trackEvent.update({
      height: height,
      width: width,
      top: ( top / targetHeight ) * 100,
      left: ( left / targetWidth ) * 100
    });
  }

  EditorHelper.init = function( butter ) {


  };

  EditorHelper.addPlugin = function( plugin, callback ) {
    plugins[ plugin ] = callback;
  };

  global.EditorHelper = EditorHelper;

}( window, window.jQuery ));
