const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn)=> btn.classList.remove("active"))
}


const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add("active")
        displayLevelWord(data.data)
    });
};

const loradWordDetail= async (id) => {
    const url =`https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)

}

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML=`
        <div>
        <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> ${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <span class="btn">Syn1</span>
        <span class="btn">Syn1</span>
        <span class="btn">Syn1</span>
      </div>

    `;
    document.getElementById("word_modal").showModal()


}

// id: 103;
// level: 2;
// meaning: "খোলা";
// pronunciation: "ওপেন";
// word: "Open";

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = " ";

  if (words.length == 0){
    wordContainer.innerHTML = `
     <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-5 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png"> </img>
        <p class="text-xl font-medium text-gray-400">এই lesson এ এখনো
        কোন Vocabulary যুক্ত করা হয়নি </p>
        <h2 class="font-bold text-4xl">নেক্সট lesson এ যান</h2>

      </div>
     
    
    `
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-md text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning / pronunciation</p>
        <div class="text-2xl font-bangla font-medium">${word.meaning ? word.meaning:  "অর্থ পাওয়া যায়নি" } / ${word.pronunciation}</div>
        <div class="flex justify-between items-center">
          <button onclick="loradWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]"><i class="fa-solid fa-circle-info"></i></button>
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class= "btn btn-outline btn-primary lesson-btn" > 
        <i class="fa-solid fa-book-open"> </i> lesson -${lesson.level_no} </button>
        
        `;
    // 4.append child
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
