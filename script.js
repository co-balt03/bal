const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const finalContent = document.getElementById("finalContent");
const bgMusic = document.getElementById("bgMusic");
const speechController = document.getElementById("speechController");
const bgVideo = document.getElementById("bgVideo");
const centerBox = document.querySelector(".centerBox");

let count = 0;
const texts = [
    "Sure ka ba?",
    "Hindi nga?",
    "Ayaw mo talaga?",
    "Please, I need you!",
    "Hoy seryoso!",
    "Bili na!!",
    "Ms Ace :c"
];

// Show speech bubble
function showSpeech(text){
    const bubble = document.createElement("div");
    bubble.className = "speech show";
    bubble.innerText = text;
    speechController.appendChild(bubble);
    bubble.style.left = "0px"; 
    bubble.style.top = "8px";

    setTimeout(()=>{ bubble.remove(); }, 1500);
}

// Move No button randomly inside white box
function moveButton(){
    const yesRect = yesButton.getBoundingClientRect();
    const boxRect = centerBox.getBoundingClientRect();

    let newX, newY;
    do {
        newX = Math.random() * (boxRect.width - noButton.offsetWidth);
        newY = Math.random() * (boxRect.height - noButton.offsetHeight);
    } while (
        newX < yesRect.right - boxRect.left && newX + noButton.offsetWidth > yesRect.left - boxRect.left &&
        newY < yesRect.bottom - boxRect.top && newY + noButton.offsetHeight > yesRect.top - boxRect.top
    );

    noButton.style.left = newX + "px";
    noButton.style.top = newY + "px";

    createHeart(newX + boxRect.left + noButton.offsetWidth/2, newY + boxRect.top + noButton.offsetHeight/2);
}

// Create floating heart
function createHeart(x, y){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
}

// No button click
noButton.addEventListener("click", ()=>{
    if(count < texts.length){
        showSpeech(texts[count]);
        count++;
        moveButton();
    } else {
        noButton.style.display = "none";
    }
});

// Yes button click
yesButton.addEventListener("click", ()=>{
    finalContent.style.display = "block";
    yesButton.style.display = "none";
    noButton.style.display = "none";

    // Show and fade-in video
    bgVideo.style.display = "block";
    setTimeout(()=>{ bgVideo.style.opacity = 1; },50);
    bgVideo.play();

    // Play music
    bgMusic.play();

    // Hearts for celebration
    for(let i=0;i<10;i++){
        const randX = Math.random() * window.innerWidth;
        const randY = window.innerHeight;
        createHeart(randX, randY);
    }
});
