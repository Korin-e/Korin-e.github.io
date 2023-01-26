OpenWindow('home');

var topZIndex = 1;
var $window; // initialize variable containing selected window
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; // initialzie positions
// do stuff when the window header is clicked
$('#Desktop')
.on('mousedown', '.window .window-header', WindowGrab)
.on('mousedown', '.window', PushToTop)
.on('click', '.window .close-btn', CloseWindow);

// ============================================================= Drag Window

// stuff that takes place the moment before the mouse moves
function WindowGrab(event) {
   event.preventDefault();
   // set $window to parent of selected header
   $window = $(this).parent();

   // get mouse position on startup
   pos3 = event.pageX;
   pos4 = event.pageY;
   // stop moving window when mouse released
   $(document).mouseup(WindowDrop);
   // move window when mouse moves
   $(document).on('mousemove', WindowDrag);
}

function WindowDrag(event) {
   event.preventDefault();
   // calculate new cursor position
   pos1 = pos3 - event.clientX;
   pos2 = pos4 - event.clientY;
   pos3 = event.clientX;
   pos4 = event.clientY;
   // set elements new position
   offset = $window.offset();
   $window.offset({top: offset.top - pos2, left: offset.left - pos1});
}

function WindowDrop() {
   // remove mousemove event
   $(document).off('mousemove');
}

function PushToTop(event) {
   event.preventDefault();
   $(this).css('z-index', ++topZIndex);
}
function PushToTop() {
   $(this).css('z-index', ++topZIndex);
}

// ============================================================= Open Window

function OpenWindow(windowID) {
   $.getJSON( "./assets/pages/" + windowID + ".json", function( data ) {
      if ($('#'+windowID).length > 0 && data.single) {
         $('#'+windowID).css('z-index', ++topZIndex);
         return;
      }

      $('#Desktop').append('<div class="window" id="'+windowID+'">'
      + '<div class="window-header">'
      + '<div class="row readonly">'
      + '<div class="column window-title"><img src="./assets/window-icons/'+data.icon+'.png"> '+data.title+'</div>'
      + '<div class="column window-x"><button type="button" class="btn close-btn">X</button></div>'
      + '</div></div></div>');
      
      $('#'+windowID).css('z-index', ++topZIndex);

      $('#'+windowID).append('<div class="window-subheader readonly">'
      + '<p>'+data.sub+'</p></div>');

      $('#'+windowID).append('<div class="window-content"></div>');
      $('#'+windowID+' .window-content').load('./assets/pages/'+windowID+'.html');
   });
}

/*
function OpenWindow(windowName) 
{  
   // check for duplicate windows
   if ($('#'+windowName).length > 0)
   {
      $('#'+windowName).css('z-index', ++topZIndex);
      return;
   }
   // initial creation of window (main div and header)
   $('#Desktop').append('<div class="window" id="'+windowName+'">'
   + '<div class="window-header" id="'+windowName+'-header">'
   + '<div class="row readonly">'
   + '<div class="column window-title"></div>' // <<<<< icon and title
   + '<div class="column window-x"><button type="button" class="btn close-btn">X</button></div>' 
   + '</div></div></div>'); // <<<<< close button
   // move to top
   $('#'+windowName).css('z-index', ++topZIndex);
   // create the rest of the window (subheader and content box)
   $('#'+windowName).append('<div class="window-subheader readonly">'
   + '<p>josh > pages > '+windowName+'</p></div>');
   $('#'+windowName).append('<div class="window-content"></div>')
   // load icon and title
   $('#'+windowName+' .window-title').load('assets/pages/'+windowName+'.html .window-icon');
   $('#'+windowName+' .window-content').load('assets/pages/'+windowName+'.html .container');
   
}
*/

function CloseWindow(event) {
   $(this).closest('.window').remove();
   event.preventDefault();
   console.log("CLOSE");
}