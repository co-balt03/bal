const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const finalContent = document.getElementById("finalContent");
const bgMusic = document.getElementById("bgMusic");
const speechController = document.getElementById("speechController");

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

// Show speech bubble at controller
function showSpeech(text){
    const bubble = document.createElement("div");
    bubble.className = "speech show";
    bubble.innerText = text;

    // Append bubble to the controller
    speechController.appendChild(bubble);

    // Position bubble inside controller
    bubble.style.left = "200px"; 
    bubble.style.top = "8px";

    setTimeout(()=>{
        bubble.remove();
    }, 1500);
}

// Move No button randomly but avoid Yes button
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

    // Optional floating heart
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = (newX + noButton.offsetWidth/2) + "px";
    heart.style.top = (newY + noButton.offsetHeight/2) + "px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
}

// Handle No click
noButton.addEventListener("click", ()=>{
    if(count < texts.length){
        showSpeech(texts[count]); // show dialog at controller
        count++;
        moveButton();
    } else {
        noButton.style.display = "none";
    }
});

// Handle Yes click
yesButton.addEventListener("click", ()=>{
    finalContent.style.display = "block";
    yesButton.style.display = "none";
    noButton.style.display = "none";

    // Play background music
    bgMusic.play();
});
