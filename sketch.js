let branches = [];
let branchLength = 20;
let targetBranchLength = 20;
let cursorMoved = false;

const MAX_SIZE = 130;

function setup() {
  //// SONG 1: chaotic
  // song = loadSound('');
  //// SONG 2: chiller
  // song = loadSound('');
  createCanvas(windowWidth, windowHeight);
  // Use degrees instead of radians
  angleMode(DEGREES);
  frameRate(5);
  loop();
}

function draw() {
  clear()
  background(100)

  translate(width / 2, height / 2 + 200)
  branch(branchLength)
  textSize(16);
  text('the plum tree will grow if you remain still.', 50, 50);

  // Increment targetBranchLength and reset if it exceeds 200
  if (frameCount % 10 === 0) { // Change the length every 50 frames
    targetBranchLength += 15;
    if (targetBranchLength > MAX_SIZE) {
      noLoop()
      setTimeout(() => {
        text('congrats! you made it to the end', 50, 75);  
      }, 1000)
    }
  }

  // Use lerp for a smooth transition
  branchLength = lerp(branchLength, targetBranchLength, 0.5);
}

function mouseMoved() {
  targetBranchLength = 10
  cursorMoved = true
}

function branch(len) {
  // Save current drawing state including transformation and styles
  push()
  
  // Draw branch if len is large enough
  if (len > 10) {
    // Set thickness of branch: length is 10-100, stroke weight 1-15 ?
    strokeWeight(map(len, 10, 100, 1, 15))
    // Set color of branch
    stroke(70, 40, 20)
    // Draw branch from origin of last save
    line(0, 0, 0, -len)
    // Move origin to end of just drawn line, for subsequent branches
    translate(0, -len)
    // Rotate branch by random angle to create more natural look
    rotate(random(-20, -30))
    // Draw next branch but decrease length
    branch(len * random(0.7, 0.9))
    // Rotate next branch and draw
    rotate(random(50, 60))
    branch(len * random(0.7, 0.9))
  } else {
    // Make leaves  
    const r = 80 + random(-20, 20)
    const g = 120 + random(-20, 20)
    const b = 40 + random(-20, 20)
    // Set color for leaves with some transparency
    fill(r, g, b, 200) 
    // Remove outline
    noStroke()

    // Create custom shape for leaves
    beginShape()
    // First half of leaf
    for (let i = 45; i < 135; i++) {
      const rad = 15
      const x = rad * cos(i)
      const y = rad * sin(i)
      // Add point to shape!
      vertex(x, y)
    }
    // Second half
    for (let i = 135; i >45; i--) {
      const rad = 15
      const x = rad * cos(i)
      const y = rad * sin(-i) + 20
      vertex(x, y)
    }
    endShape(CLOSE)
    
    if (targetBranchLength > 50 && random(targetBranchLength, MAX_SIZE) > MAX_SIZE-0.5) {
      const r = 97
      const g = 47
      const b = 75
      fill(randColor(r), randColor(g), randColor(b), 200);
      ellipse(0,0,8,8)
      if (random(0, 3) < 1) {
        fill(randColor(r), randColor(g), randColor(b), 200);
        ellipse(4,0,7,8)
      }
      
      if (random(0,3) > 1) {
        fill(randColor(r), randColor(g), randColor(b), 200);
        ellipse(0,4,8,7)
      }
    }
  }
  // Restore previously saved drawing state
  // Ensures that transform and styles do not affect other parts of drawing
  pop()
}

function randColor(code) {
  return code + random(-20, 20)
}