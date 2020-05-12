var fgimage = null;
var bgimage = null;

function clearRes() {
  console.log("start clear");
  var compositeCanvas = document.getElementById("canComposite");
  var context = compositeCanvas.getContext("2d");
  context.clearRect(0, 0, compositeCanvas.width, compositeCanvas.height);
}

function uploadForeground() {
  var fileinput = document.getElementById("fginput");
  fgimage = new SimpleImage(fileinput);  
  var fgcanvas = document.getElementById("fgCan");  
  fgimage.drawTo(fgcanvas);
}

function uploadBackground() {
  var fileinput = document.getElementById("bginput");
  bgimage = new SimpleImage(fileinput);  
  var bgcanvas = document.getElementById("bgCan");  
  bgimage.drawTo(bgcanvas);
}

function compose() {
  if (fgimage == null || !fgimage.complete()) {
    alert("foreground not loaded");
    return;
  }
  if (bgimage == null || !bgimage.complete()) {
    alert("background not loaded");
    return;
  }
  clearRes();
  var finalImage = doGreenScreen();
  var compositeCanvas = document.getElementById("canComposite");
  finalImage.drawTo(compositeCanvas);
}

function doGreenScreen() {  
  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  
  for(var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var greenThreshold = pixel.getRed() + pixel.getBlue();
    if (pixel.getGreen() > greenThreshold) {
      var bgPixel = bgimage.getPixel(x, y);
      output.setPixel(x, y, bgPixel);
    } else {
      output.setPixel(x, y, pixel);
    }
  }
  
  return output;
}