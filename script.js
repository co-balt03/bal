const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const finalContent = document.getElementById("finalContent");
const bgMusic = document.getElementById("bgMusic");
const speechController = document.getElementById("speechController");

let count = 0;
const texts = [
    "Sure na?",
    "Hindi nga?",
    "Ayaw mo na talaga?",
    "Please?",
    "Uyy",
    "Parang walang pinag samahan oh?",
    "Ms Ace :c"
];

function showSpeech(text){
    const bubble = document.createElement("div");
    bubble.className = "speech show";
    bubble.innerText = text;


    speechController.appendChild(bubble);

    
    bubble.style.left = "200px"; 
    bubble.style.top = "8px";

    setTimeout(()=>{
        bubble.remove();
    }, 1500);
}


function moveButton(){
    const yesRect = yesButton.getBoundingClientRect();
    const overlayRect = document.querySelector(".overlayContent").getBoundingClientRect();

    let newX, newY;
    do {
        newX = Math.random() * (overlayRect.width - noButton.offsetWidth);
        newY = Math.random() * (overlayRect.height - noButton.offsetHeight);
    } while (
        newX < yesRect.right && newX + noButton.offsetWidth > yesRect.left &&
        newY < yesRect.bottom && newY + noButton.offsetHeight > yesRect.top
    );

    noButton.style.left = newX + "px";
    noButton.style.top = newY + "px";

    
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = (newX + noButton.offsetWidth/2) + "px";
    heart.style.top = (newY + noButton.offsetHeight/2) + "px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
}


noButton.addEventListener("click", ()=>{
    if(count < texts.length){
        showSpeech(texts[count]);
        count++;
        moveButton();
    } else {
        noButton.style.display = "none";
    }
});

yesButton.addEventListener("click", () => {
    finalContent.style.display = "block";
    yesButton.style.display = "none";
    noButton.style.display = "none";

    // Show and play background video with fade
    const bgVideo = document.getElementById("bgVideo");
    bgVideo.style.display = "block"; // make it visible
    setTimeout(() => {
        bgVideo.style.opacity = 1; // fade in
    }, 50);
    bgVideo.play();

    // Play background music
    bgMusic.play();
});


