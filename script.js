const fileInputs = document.querySelectorAll('.images-upload input[type="file"]');
const generateBtn = document.getElementById("generate-btn");
const gameOutput = document.querySelector(".game-output");
const cards = document.querySelectorAll(".card");

const images = [];

fileInputs.forEach((input, index) => {
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      images[index] = event.target.result;
      const preview = input.previousElementSibling;
      preview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
});

generateBtn.addEventListener("click", () => {
  //   if (images.length !== 30) {
  //     alert("Please upload all 30 images before generating the game.");
  //     return;
  //   }

  const gameCards = generateGame();
  displayGame(gameCards);
});

function generateGame() {
  // This is a simplified version of the algorithm
  // It may not guarantee the "Spot It" property for all pairs
  const gameCards = [];

  for (let i = 0; i < 30; i++) {
    const card = new Set();
    while (card.size < 6) {
      const randomIndex = Math.floor(Math.random() * 30);
      card.add(randomIndex);
    }
    gameCards.push(Array.from(card));
  }

  return gameCards;
}

function displayGame(gameCards) {
  cards.forEach((card, index) => {
    const cardImages = gameCards[index].map((imageIndex) => images[imageIndex]);
    card.innerHTML = cardImages.map((src) => `<div class="img" style="background-image: url('${src}');background-position: center;background-size:cover;"></div>`).join("");
  });
}

const printBtn = document.getElementById("print-btn");

printBtn.addEventListener("click", () => {
  const element = document.querySelector(".game-output");
  const opt = {
    margin: 10,
    filename: "roni-ravitz-dobble-game.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF
  html2pdf().set(opt).from(element).save();
});
