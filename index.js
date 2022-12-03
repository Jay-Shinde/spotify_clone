console.log("spotify");

//intializing variables
let songindex = 2;
let audioElement = new Audio("song/aud2.mp3");
let masterPlay = document.getElementById("masterPlay");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let myProgressbarr = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let playbtnOnitem = Array.from(
  document.getElementsByClassName("playbtnOnitem")
);

let songs = [
  {
    songName: "Let me love you",
    filePath: "song/aud1.mp3",
    coverPath: "covers/cover1.png",
    length: "03:13"
  },
  {
    songName: "Asman ko chukar dekha",
    filePath: "song/aud2.mp3",
    coverPath: "covers/cover2.png",
    length: "04:01"
  },
  {
    songName: "Hanuman Chalisa",
    filePath: "song/aud3.mp3",
    coverPath: "covers/cover3.png",
    length: "12:97"
  },
  {
    songName: "Instrumental Medley",
    filePath: "song/aud4.mp3",
    coverPath: "covers/cover4.png",
    length: "06:13"
  },
  {
    songName: "Zara Zara Behakata hai (female)",
    filePath: "song/aud5.mp3",
    coverPath: "covers/cover5.png",
    length: "03:05"

  },
  {
    songName: "Hich  amuchi Prarthana",
    filePath: "song/aud6.mp3",
    coverPath: "covers/cover6.png",
    length: "04:01"
  },
  {
    songName: "Saudagar sauda karr",
    filePath: "song/aud7.mp3",
    coverPath: "covers/cover7.png",
    length: "07:97"
  },
];

document.getElementById("bottomsongname").innerHTML = songs[1].songName;

//audioElement.play();

//listen to events
const makeallbtnsplay = () => {
  playbtnOnitem.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};
function timestamp( time ){
  let x = time % 60;
  let y = Math.trunc(time/60);
  return ("0" + y).slice(-2)+':'+ ("0" + x).slice(-2) ;

}

songitem.forEach((element, i) => {
  //console.log(element);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songname")[0].innerHTML = songs[i].songName;
  element.getElementsByClassName("tracktime")[0].innerHTML = songs[i].length;
  
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document.getElementById(`${songindex}`).classList.add("fa-circle-pause");
    document.getElementById(`${songindex}`).classList.remove("fa-circle-play");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    makeallbtnsplay();
    gif.style.opacity = 0;
    
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  document.getElementById(`tracktime${songindex}`).innerHTML = timestamp(Math.floor(audioElement.currentTime));


  myProgressbarr.value = progress;
  
});

myProgressbarr.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressbarr.value * audioElement.duration) / 100;
});

playbtnOnitem.forEach((element) => {
  element.addEventListener("click", (e) => {
    //console.log(e.target);
    if(e.target.classList == "fa-regular playbtnOnitem fa-2x fa-circle-play"){
      makeallbtnsplay();
    document.getElementById(`tracktime${songindex}`).innerHTML = timestamp(audioElement.duration);
      e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.currentTime = 0;
    songindex = parseInt(e.target.id);
    document.getElementById("bottomsongname").innerHTML = songs[songindex-1].songName;
    audioElement.src = `song/aud${songindex}.mp3`;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    }
    else{
      
      
      audioElement.pause();
      e.target.classList.add("fa-circle-play");
      e.target.classList.remove("fa-circle-pause");
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
    }
    
  });
});

prev.addEventListener('click', ()=>{
  document.getElementById(`tracktime${songindex}`).innerHTML = timestamp(audioElement.duration);
  if (audioElement.paused) {
    
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  }

  if(songindex == 1){
    songindex = 7;
    makeallbtnsplay();
    document.getElementById('7').classList.add("fa-circle-pause");
    document.getElementById('7').classList.remove("fa-circle-play");
    document.getElementById("bottomsongname").innerHTML = songs[6].songName;

  }
  else{
    songindex -= 1;
    makeallbtnsplay();
    document.getElementById(`${songindex}`).classList.add("fa-circle-pause");
    document.getElementById(`${songindex}`).classList.remove("fa-circle-play");
    document.getElementById("bottomsongname").innerHTML = songs[songindex-1].songName;
  }
  audioElement.src = `song/aud${songindex}.mp3`;
    audioElement.play();
    
    gif.style.opacity = 1;


});
next.addEventListener('click', ()=>{
  document.getElementById(`tracktime${songindex}`).innerHTML = timestamp(audioElement.duration);

  if (audioElement.paused) {
    
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  }


  if(songindex == 7){
    songindex = 1;
    makeallbtnsplay();
    document.getElementById("1").classList.add("fa-circle-pause");
    document.getElementById("1").classList.remove("fa-circle-play");
    document.getElementById("bottomsongname").innerHTML = songs[0].songName;

  }
  else{
    songindex += 1;
    makeallbtnsplay();
    document.getElementById(`${songindex}`).classList.add("fa-circle-pause");
    document.getElementById(`${songindex}`).classList.remove("fa-circle-play");
    document.getElementById("bottomsongname").innerHTML = songs[songindex-1].songName;
  }
  audioElement.src = `song/aud${songindex}.mp3`;
    audioElement.play();
    
    gif.style.opacity = 1;


});