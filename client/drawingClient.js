var programCode = function(processingInstance) {
    with (processingInstance) {
      size(400, 500);
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
        var object = 0;
        var guess = 0;
        var labels = ["cow", "banana", "snowflake", "bug", "book", "jar", "snake", "tree", "slide", "socks", "shoe", "water", "heart", "hat", "kite", "dog", "mouth", "duck", "eyes", "skateboard", "bird", "boy", "apple", "girl", "mouse", "door", "house", "star", "whale", "jacket", "shirt", "hippo", "beach", "egg", "cookie", "cheese", "ice cream cone", "spoon", "spiderweb", "cat", "sun", "cup", "ghost", "flower", "pie", "bone", "grapes", "bell", "jellyfish", "bunny", "truck", "door", "monkey", "spider", "bread", "alligator", "bat", "clock", "lollipop", "moon", "doll", "orange", "ear", "basketball", "bike", "airplane", "pen", "worm", "seashell", "rocket", "cloud", "bear", "corn", "chicken", "purse", "glasses", "carrot", "turtle", "pencil", "horse", "dinosaur", "head", "lamp", "snowman", "ant", "giraffe", "cupcake", "chair", "leaf", "bed", "snail", "baby", "balloon", "bus", "cherry", "crab", "football", "robot", "basketball", "piano"]
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
            strokeWeight(1);
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
                    if(scene === 1) {
                        object = Math.floor(Math.random() * 100);
                    }
                    mouseIsPressed = false;
                }
            }
        };

        var startButton = new Button(200, 300, 150, 75, "PLAY", 1);
        var drawButton = new Button(200, 300, 175, 75, "DRAW", 2);
        var restartButton = new Button(200, 400, 225, 50, "NEW WORD", 1);
        var quitButton = new Button(350, 475, 75, 40, "QUIT", 0);

        function startWindow() {
            background(253, 255, 148);
            fill(0);
            textSize(40);
            textAlign(CENTER);
            text("Piction(AI)ry", 200, 75);

            startButton.draw();

        }

        function wordWindow() {
            background(253, 255, 148);
            fill(0);
            textSize(40);
            textAlign(CENTER);

            text("Your word is " + labels[object], 200, 50);


            drawButton.draw();
        }

        function restartWindow() {
            restartButton.draw();
            quitButton.draw();
        }

        function drawWindow(objectToGuess, timeToDraw) {
            if(mouseX < 20 && mouseY < 20) {
               background(255);
            }

            var d = new Date();
            var secs = d.getSeconds();
            if((timeToDraw - (secs - time)) % 60 <= 0) {
                scene = 3;
            }
            //upper horizontal banner
            noStroke();
            fill(200, 200, 200);
            rect(200, 25, 400, 50);
            textAlign(CENTER);
            fill(0);
            textSize(40);
            text((timeToDraw - (secs - time)) % 60, 350, 40);
            textSize(30);
            text(objectToGuess, 100, 35);

            //lower horizontal banner
            fill(200, 200, 200);
            rect(200, 475, 400, 50);
            fill(0);
            text("AI guess: " + labels[guess], 100, 485);
            quitButton.draw();

            strokeWeight(4);
            if(mouseIsPressed && mouseY > 45 && mouseY < 455) {
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
                wordWindow();
            }
            else if(scene === 2) {
                drawWindow(labels[object], 20);
            }
            else if(scene === 3) {
                restartWindow();
            }
        }
    }};

  // Get the canvas that ProcessingJS will use
  var canvas = document.getElementById("canvas");
  // Pass the function to ProcessingJS constructor
  var processingInstance = new Processing(canvas, programCode); 
