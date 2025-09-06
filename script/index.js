const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

// id: 103;
// level: 2;
// meaning: "খোলা";
// pronunciation: "ওপেন";
// word: "Open";

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = " ";

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">Meaning / pronunciation</p>
        <div class="text-2xl font-bangla font-medium">${word.meaning} / ${word.pronunciation}</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-high"></i></button>

        </div>
      </div>
        
        `;
    wordContainer.appendChild(card);
  });
};
const displayLesson = (lessons) => {
  // 1. get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. get into every lesson
  for (let lesson of lessons) {
    console.log(lesson);
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class= "btn btn-outline btn-primary " > 
        <i class="fa-solid fa-book-open"> </i> lesson -${lesson.level_no} </button>
        
        `;
    // 4.append child
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
