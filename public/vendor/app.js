// custom application code

$(function() {
  // setup
  $('#loading').hide();
  
  // uniform
  $("select, input:checkbox, input:radio, input:file").uniform();
  
  // jquery.layout
  var layout = $('body').layout({
    defaults: {
      fxName: 'drop',
      fxSpeed: 'fast',
      enableCursorHotkey: false,
      spacing_open: 6,
      spacing_closed: 0
    },
    north: {
      size: 80,
      spacing_open: 1,
      closable: false,
      resizable: false,
      slidable: false      
    },
    south: {
      size: 60,
      initClosed: true
    },
    west: {
      size: 300,
      initClosed: true,
      
      onresize: function () {
        $("#accordion_west").accordion("resize");
      }
    },
    east: {
      size:	300,
      
      onresize: function () {
        $("#accordion_east").accordion("resize");
      }
    },
    center: {
      onresize: function () {
        $("#accordion_center").accordion("resize");
      }
    }
  });
  
  // jquery-ui
  $("#accordion_west").accordion({header: "h3", fillSpace: true});
  $("#accordion_east").accordion({header: "h3", fillSpace: true});
  $("#accordion_center").accordion({header: "h3", fillSpace: true});
  $(".button").button();
  
  // events
  $(".button.toggle").click(function() { 
    layout.toggle('west');
    $("#accordion_west").accordion("resize");
  });
  
  // non-selectable text
  $.extend($.fn.disableTextSelect = function() {
    return this.each(function() {
      if ($.browser.mozilla) {
        $(this).css('MozUserSelect','none');
      } else if ($.browser.msie) {
        $(this).live('selectstart',function(){return false;});
      } else {
        $(this).mousedown(function(){return false;});
      }
    });
  });
  $('.noSelect').disableTextSelect();
  
  // ajax
  $.ajaxSetup({ dataType: 'json' });
  $('#loading').ajaxStart(function() {
    $(this).fadeIn(500);
  });
  $('#loading').ajaxStop(function() {
    $(this).fadeOut(500);
  });
  
  // sammy
  (function($) {

    var app = $.sammy(function() {
      this.use(Sammy.NestedParams);
      this.use(Sammy.Title);
      this.use(Sammy.JSON);
      
      this.get('#/', function(context) {
        $.ajax({ url: '/users/get', success: function(items) {
          $("#users_partial").render(items).appendTo("#users");
        }})
      });
      
      this.get('#/:pane/accordion/:section', function() {
        var section = this.params['section'];
        var pane    = this.params['pane'];
        $("#accordion_" + pane).accordion('activate', section - 1);
      });
      
      this.post('#/users/post', function() {
        var data = this.params.toHash();
        $.ajax({ type: "POST", url: "/users/seed", data: data });
        this.log(data);
        return false;
      });

    });

    $(function() {
      app.run('#/');
    });

  })(jQuery);
  
});

function changeHash(h) {
  window.location.hash = h;
}
