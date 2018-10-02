var ratio=[];
var heightPct=[];
var scaleFact=[1.2,1.4,1.4];
$(document).ready(function() {
  var i;
  for(i=0;i<3;i++){
    ratio[i]=ratioFun($("#image"+(i+1)));
    heightPct[i]=getHeightPercentage($("#image"+(i+1)));
  }
  //image1=$("#image1");
  //var rat=ratio(image1);
  
  $("#1").css("border-bottom-color", "rgba(0, 0, 0, 1)");
  $("body").css("overflow", "hidden");
  $("html").scrollTop(0);
  setBindings();
});
function ratioFun(image) {
  return image.width()/image.height();
}
function setBindings() {
  var current = id = "1";
  var isMoving = false;

  function resetMoving() {
    isMoving = false;
  }
  $(".linkref").click(function(e) {
    e.preventDefault();
    id = e.currentTarget.id
    if (isMoving || id == current) {
      return false;
    }
    isMoving = true;
    movePage(current, id, resetMoving);
    current = id;

    return false;
  });


  $(window).bind('mousewheel DOMMouseScroll', function(e) {
    if (isMoving) return false;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      if (current == "1") {
        return false;
      }
      id = (parseInt(current) - 1).toString();
    } else {
      if (current == "3") {
        return false;
      }
      id = (parseInt(current) + 1).toString();
    }
    isMoving = true;
    movePage(current, id, resetMoving);
    current = id;
    return false;
  });
  $(window).resize(function() {
    console.log("resize");
    if (isMoving) {
      return;
    }
    $("html").scrollTop($("#page" + id).offset().top);
    resizeImage();
  });
}
function resizeImage(){
  for(i=0;i<3;i++){
    $("#image"+(i+1)).css("height", heightPct[i]+"%");
    var wid=$("#image"+(i+1)).height()*ratio[i];
    $("#image"+(i+1)).css("width", wid+"px");
    //ratio[i]=ratio($("#image"+(i+1)));
    //heightPct[i]=getHeightPercentage($("#image"+(i+1)));
  }
}
function movePage(current, id, end) {
  $("html").animate({
    scrollTop: $("#page" + id).offset().top
  }, 1500, "easeInOutCubic");
  current = parseInt(current);
  id = parseInt(id);
  var fadeOutText = "#heading" + current + ", #paragraph" + current;
  var fadeOutLine = "#line" + current;
  $(fadeOutText).animate({
    "color": "rgba(1, 1, 1, 0)"
  }, 1000);
  $(fadeOutLine).animate({
    "border-bottom-color": "rgba(1, 1, 1, 0)"
  }, 1000);
  $("#"+current).animate({"border-bottom-color":"rgba(0, 0, 0, 0)"}, 500, function() {
    $("#"+id).animate({"border-bottom-color":"rgba(0, 0, 0, 1)"}, 500);
  });
  //scale image
  for(i=0;i<3;i++){
    $("#image"+(i+1)).css("width", $("#image"+(i+1)).width());
    $("#image"+(i+1)).animate({"height":(heightPct[i]*scaleFact[i])+"%"}, 700);
    $("#image"+(i+1)).animate({"height":(heightPct[i])+"%"}, 700);
    //ratio[i]=ratioFun($("#image"+(i+1)));
    //heightPct[i]=getHeightPercentage($("#image"+(i+1)));
  }
  var fadeInP = "#paragraph" + id;
  var fadeInH = "#heading" + id;
  var fadeInLine = "#line" + id;
  var originalWidth = getWidthPercentage($(fadeInLine));
  var originalPLeft = getLeftPercentage($(fadeInP));
  var originalHLeft = getLeftPercentage($(fadeInH));
  var positionFactor = (id % 2 == 1 ? -1 : 1) * 3;
  var fromPLeft = originalPLeft + positionFactor;
  var fromHLeft = originalHLeft + positionFactor;
  $(fadeInP).css("left", fromPLeft + "%");
  $(fadeInH).css("left", fromHLeft + "%");
  $(fadeInP).css("color", "rgba(0,0,0,0)");
  $(fadeInH).css("color", "rgba(0,0,0,0)");
  $(fadeInLine).css("width", "0");
  
  setTimeout(function() {
    $(fadeInLine).animate({
      "width": originalWidth + "%"
    }, 1000, "easeOutExpo");

    $(fadeInH).animate({
      "left": originalHLeft + "%",
      "color": "black"
    }, 1000, "easeOutExpo");
    setTimeout(function() {
      $(fadeInP).animate({
        "left": originalPLeft + "%",
        "color": "black"
      }, 1000, "easeOutExpo", function() {
end();
      resetPage(current);
      $("html").scrollTop($("#page" + id).offset().top);
    for(i=0;i<3;i++){
    $("#image"+(i+1)).css("height", heightPct[i]+"%");
$("#image"+(i+1)).css("width", "auto");
    //$("#image"+(i+1)).animate({"height":(heightPct[i]*scaleFact[i])+"%"}, 700);
    //$("#image"+(i+1)).animate({"height":(heightPct[i])+"%"}, 700);
    //ratio[i]=ratioFun($("#image"+(i+1)));
    //heightPct[i]=getHeightPercentage($("#image"+(i+1)));
  }
});
    }, 150);

  }, 1200);
}

function resetPage(last) {
  var text = "#heading" + last + ", #paragraph" + last;
  var line = "#line" + last;
  $(text).css("color", "black");
  $(line).css("border-bottom-color", "black");
}

function getWidthPercentage(o) {
  return o.width() / o.parent().width() * 100;
}
function getHeightPercentage(o) {
  return o.height() / o.parent().height() * 100;
}
function getLeftPercentage(o) {
  return o.position().left / o.parent().width() * 100;
}
