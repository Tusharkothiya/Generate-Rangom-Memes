const memeButton = document.querySelector(".meme-btn");
const image = document.querySelector("img");
const memeTitle = document.querySelector(".meme-title");
// const memeAuthor = document.querySelector(".meme-author");

const updateData = (url, title) => {
    image.setAttribute("src", url);
    memeTitle.innerHTML = title;
    // memeAuthor.innerHTML = author;
};

const generateMeme = () => {
    fetch("https://api.imgflip.com/get_memes")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.data && data.data.memes.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.data.memes.length);
                const meme = data.data.memes[randomIndex];
                updateData(meme.url, meme.name, 'Unknown Author');
            } else {
                throw new Error('No meme data found');
            }
        })
        .catch((error) => {
            console.error('Error fetching meme data:', error);
        });
};

memeButton.addEventListener("click", generateMeme);
