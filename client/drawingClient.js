  var programCode = function(processingInstance) {
    with (processingInstance) {
      size(400, 400); 
      frameRate(30);
        
      // Paste code from Khan Academy here:

      function setup() {

            stroke(4);
            frameRate(25);
        }
        var mouseIsPressed = false;
        var mousePressed = function(){
            mouseIsPressed = true;
        };
        var mouseReleased = function(){
            mouseIsPressed = false;
        };
        var pastX = -1;
        var pastY = -1;
        var points = [];
        var scene = 0;
        var time = 0;

        setup();

        var Button = function(x, y, w, h, text, scene) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.text = text;
            this.scene = scene;
        };

        Button.prototype.isHovered = function() {
            if(mouseX < this.x + this.w / 2 && mouseX > this.x - this.w / 2 && mouseY < this.y + this.h / 2 && mouseY > this.y - this.h / 2) {
                return true;
            }
            return false;
        };

        Button.prototype.draw = function() {
            rectMode(CENTER);
            fill(130, 130, 130);
            if(this.isHovered()) {
                fill(102, 102, 102);
            }
            stroke(0);
            rect(this.x, this.y, this.w, this.h, 20);
            fill(0);
            textSize(this.h * 2/3);
            text(this.text, this.x, this.y + this.h/4);

            if(this.isHovered() && mouseIsPressed) {
                if(mouseIsPressed) {
                    background(255);
                    var d = new Date();
                    time = d.getSeconds();
                    scene = this.scene;
                }
            }
        };

        var startButton = new Button(200, 300, 150, 75, "PLAY", 1);

        function startWindow() {
            background(253, 255, 148);
            fill(0);
            textSize(40);
            textAlign(CENTER);
            text("Piction(AI)ry", 200, 50);

            startButton.draw();

        }
        function drawWindow(object, timeToDraw) {
            if(mouseX < 20 && mouseY < 20) {
               background(255);
            }

            if(mouseX > 380 && mouseY < 20) {
                for(var i = 0; i < points.length - 1; i++) {
                    line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
                }
            }

            var d = new Date();
            var secs = d.getSeconds();
            if((secs - time) % 60 >= timeToDraw) {
                scene = 3;
            }

            strokeWeight(1);
            fill(200, 200, 200);
            rect(200, 25, 400, 50);
            textAlign(CENTER);
            fill(0);
            textSize(40);
            text((timeToDraw - (secs - time)) % 60, 350, 40);
            textSize(30);
            text(object, 100, 35);

            strokeWeight(4);
            if(mouseIsPressed) {
                stroke(0, 0, 0);
                if(pastX >= 0) {
                    line(pastX, pastY, mouseX, mouseY);
                }
                points.push([mouseX, mouseY]);
                pastX = mouseX;
                pastY = mouseY;
            }
            else {
                pastX = -1;
                pastY = -1;
            }
        }

        var draw = function() {
            if(scene === 0) {
                startWindow();
            }
            else if(scene === 1) {
                drawWindow("Banana", 20);
            }
        }
    }};

  // Get the canvas that ProcessingJS will use
  var canvas = document.getElementById("canvas");
  // Pass the function to ProcessingJS constructor
  var processingInstance = new Processing(canvas, programCode); 
