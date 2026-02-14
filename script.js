const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const finalContent = document.getElementById("finalContent");
const bgMusic = document.getElementById("bgMusic");
const speechController = document.getElementById("speechController");
const bgVideo = document.getElementById("bgVideo");
const centerBox = document.getElementById("centerBox");

let count = 0;
const texts = [
    "Sure naba?",
    "Hindi nga?",
    "Ayaw mo na talaga?",
    "Please?",
    "Uyy",
    "...",
    "Ms Ace :c"
];

// Function to create speech bubble
function showSpeech(text){
    const bubble = document.createElement("div");
    bubble.className = "speech show";
    bubble.innerText = text;
    speechController.appendChild(bubble);

    const boxRect = centerBox.getBoundingClientRect();
    const directions = ['top','bottom','left','right'];
    const dir = directions[Math.floor(Math.random()*directions.length)];
    let x, y;

    const margin = 10;
    const maxOffset = 100;

    switch(dir){
        case 'top':
            x = boxRect.left + Math.random()*(boxRect.width - bubble.offsetWidth);
            y = boxRect.top - bubble.offsetHeight - margin - Math.random()*maxOffset;
            break;
        case 'bottom':
            x = boxRect.left + Math.random()*(boxRect.width - bubble.offsetWidth);
            y = boxRect.bottom + margin + Math.random()*maxOffset;
            break;
        case 'left':
            x = boxRect.left - bubble.offsetWidth - margin - Math.random()*maxOffset;
            y = boxRect.top + Math.random()*(boxRect.height - bubble.offsetHeight);
            break;
        case 'right':
            x = boxRect.right + margin + Math.random()*maxOffset;
            y = boxRect.top + Math.random()*(boxRect.height - bubble.offsetHeight);
            break;
    }

    x = Math.max(0, Math.min(window.innerWidth - bubble.offsetWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - bubble.offsetHeight, y));

    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';

    setTimeout(()=>{ bubble.remove(); }, 1500);
}

// Function to create floating hearts
function createHeart(x, y){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
}

// Handle No button click
noButton.addEventListener("click", ()=>{
    if(count < texts.length){
        showSpeech(texts[count]);
        count++;
        popNoButtonOutside(); // now moves outside after click
    } else {
        noButton.style.display = "none";
    }
});

// Function to pop No button around the box (like speech bubbles)
function popNoButtonOutside() {
    const boxRect = centerBox.getBoundingClientRect();

    const margin = 10; // minimal distance from box
    const maxOffset = 80; // max distance

    const directions = ['top','bottom','left','right'];
    const dir = directions[Math.floor(Math.random() * directions.length)];

    let newX, newY;

    switch(dir) {
        case 'top':
            newX = boxRect.left + Math.random() * (boxRect.width - noButton.offsetWidth);
            newY = boxRect.top - noButton.offsetHeight - margin - Math.random() * maxOffset;
            break;
        case 'bottom':
            newX = boxRect.left + Math.random() * (boxRect.width - noButton.offsetWidth);
            newY = boxRect.bottom + margin + Math.random() * maxOffset;
            break;
        case 'left':
            newX = boxRect.left - noButton.offsetWidth - margin - Math.random() * maxOffset;
            newY = boxRect.top + Math.random() * (boxRect.height - noButton.offsetHeight);
            break;
        case 'right':
            newX = boxRect.right + margin + Math.random() * maxOffset;
            newY = boxRect.top + Math.random() * (boxRect.height - noButton.offsetHeight);
            break;
    }

    // Move the button
    noButton.style.position = 'absolute';
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
}

// Trigger pop when clicking No
noButton.addEventListener("click", ()=>{
    popNoButtonOutside();
});

// Handle Yes button click
yesButton.addEventListener("click", ()=>{
    centerBox.style.display = "none"; // hide box

    finalContent.style.display = "block"; // show final message

    // play bg video & music
    bgVideo.style.display = "block";
    setTimeout(()=>{ bgVideo.style.opacity = 1; },50);
    bgVideo.play();
    bgMusic.play();

    // floating hearts
    for(let i=0;i<10;i++){
        const randX = Math.random()*window.innerWidth;
        const randY = window.innerHeight;
        createHeart(randX, randY);
    }
});







