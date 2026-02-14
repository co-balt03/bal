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

// Floating heart creator
function createHeart(x, y){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
}

// Speech bubble for No
function showSpeech(text){
    const bubble = document.createElement("div");
    bubble.className = "speech show";
    bubble.innerText = text;
    speechController.appendChild(bubble);

    // Random near box
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

// Function to pop No outside the white box
function popNoButtonOutside() {
    const boxRect = centerBox.getBoundingClientRect();
    const minOffset = 40;
    const maxOffset = 100;
    const directions = ['top','bottom','left','right'];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    let newX, newY;

    switch(dir){
        case 'top':
            newX = boxRect.left + Math.random()*(boxRect.width - noButton.offsetWidth);
            newY = boxRect.top - minOffset - Math.random()*(maxOffset - minOffset);
            break;
        case 'bottom':
            newX = boxRect.left + Math.random()*(boxRect.width - noButton.offsetWidth);
            newY = boxRect.bottom + minOffset + Math.random()*(maxOffset - minOffset);
            break;
        case 'left':
            newX = boxRect.left - minOffset - Math.random()*(maxOffset - minOffset);
            newY = boxRect.top + Math.random()*(boxRect.height - noButton.offsetHeight);
            break;
        case 'right':
            newX = boxRect.right + minOffset + Math.random()*(maxOffset - minOffset);
            newY = boxRect.top + Math.random()*(boxRect.height - noButton.offsetHeight);
            break;
    }

    newX = Math.max(0, Math.min(window.innerWidth - noButton.offsetWidth, newX));
    newY = Math.max(0, Math.min(window.innerHeight - noButton.offsetHeight, newY));

    noButton.style.position = 'absolute';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';

    createHeart(newX + noButton.offsetWidth/2, newY + noButton.offsetHeight/2);
}

// No button behavior
noButton.addEventListener("click", ()=>{
    if(count < texts.length){
        showSpeech(texts[count]);
        count++;
        popNoButtonOutside(); // pop outside
    } else {
        noButton.style.display = "none";
    }
});

// Yes button behavior
yesButton.addEventListener("click", ()=>{
    centerBox.style.display = "none"; // hide white box
    finalContent.style.display = "block"; // show message

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
