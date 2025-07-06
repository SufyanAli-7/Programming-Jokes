let btn = document.querySelector("button");
let jokeElement = document.querySelector(".joke");
let buttonText = document.querySelector(".button-text");
let loadingSpinner = document.querySelector(".loading-spinner");

btn.addEventListener("click", async () => {
    // Show loading state
    setLoadingState(true);
    
    try {
        let joke = await getJokes();
        displayJoke(joke);
    } catch (error) {
        displayJoke("Oops! Something went wrong. Please try again! 🤖");
    } finally {
        setLoadingState(false);
    }
});

let url = "https://v2.jokeapi.dev/joke/Programming?type=single";

async function getJokes() {
    try {
        let res = await axios.get(url);
        return res.data.joke;
    } catch (e) {
        console.log("Error:", e);
        return "No More Jokes! Maybe the API is taking a coffee break ☕";
    }
}

function displayJoke(joke) {
    // Add fade out animation
    jokeElement.style.opacity = '0';
    jokeElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        jokeElement.innerText = joke;
        // Add fade in animation
        jokeElement.style.transition = 'all 0.5s ease-in-out';
        jokeElement.style.opacity = '1';
        jokeElement.style.transform = 'translateY(0)';
        
        // Add bounce animation to the entire card
        const card = jokeElement.closest('.bg-white\\/95');
        card.classList.add('animate-bounce-in');
        
        setTimeout(() => {
            card.classList.remove('animate-bounce-in');
        }, 600);
    }, 250);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-not-allowed');
        buttonText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
    } else {
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
        buttonText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    }
}