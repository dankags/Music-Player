//important svg
{/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg> */}
let listLength=playList.length;
let musicIndexPlaying=0;
let  audio =new Audio(playList[musicIndexPlaying].src);
const likeBtn=document.getElementById("like")
const playBtn=document.getElementById("play");
const disk=document.getElementById("disk");
const next=document.getElementById("next");
const previous=document.getElementById("previous");
const musicLoopBtn=document.getElementById("loop");
const shuffleBtn=document.getElementById("shuffle");
const songName=document.getElementById("SongName");
const artistName=document.getElementById("artistName");
const actualMinute=document.getElementById("musicActualTime");
const actualSecond=document.getElementById("musicActualTimeSec");
const actualHour=document.getElementById("musicActualHour");
const actualHourComma=document.getElementById("musicActualHourComma");
const currentSecond=document.getElementById("timeNowSec");
const curentMinute=document.getElementById("timeNowMin");
const currentHour=document.getElementById("timeNowHrs");
const currentHourComma=document.getElementById("timeNowHrsComma");
const meterBar =document.getElementById("audioSlider");
const musicList=document.getElementById("musicContainer");
const playListBtn=document.querySelector(".playListBtn");
const progressWrapper=document.querySelector(".progressbarWrapper");
let loop=false;
let nextPrevCheck=false;
let shuffle=true;
let randomMusic=0;
let play=true;
let list_array=0;
let calcCurrentMinute=0,calcCurrentHour=0,calcCurrentSecond=0;

playListBtn.addEventListener("click",(e)=>{
  let rightWrapper=document.querySelector(".rightWrapper");
  if (nextPrevCheck) {
    rightWrapper.style.setProperty("--rightWrapperDisplay","none");
    document.querySelector(".leftWrapper").style.display="block";
    playListBtn.innerHTML='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11066)"> <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11066"> <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)"></rect> </clipPath> </defs> </g></svg>';
    nextPrevCheck=false;
  } else {
    rightWrapper.style.setProperty("--rightWrapperDisplay","block");
    document.querySelector(".leftWrapper").style.display="none";
    playListBtn.innerHTML='<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>';
    nextPrevCheck=true;
  }
});
function loadMusic(index){
    songName.innerHTML=playList[musicIndexPlaying].musicName;
    artistName.innerHTML=playList[musicIndexPlaying].artistName;
   disk.style.background=`url(${playList[musicIndexPlaying].img})`;
   disk.style.backgroundSize="cover";
}
function timeUpdate(check){

    audio.addEventListener("timeupdate",(e)=>{
      const currentTime=e.target.currentTime;
      const duration=e.target.duration;
      if(currentTime===duration){
        if (loop) {
          musicIndexPlaying=musicIndexPlaying;
        }else{
          musicIndexPlaying=musicIndexPlaying>=listLength?musicIndexPlaying=0:++musicIndexPlaying;
        }
        audio.src=`${playList[musicIndexPlaying].src}`;
        storeData();
        playing();
        renderEndTime();
        disk.style.background=`url(${playList[musicIndexPlaying].img})`;
        disk.style.rotate="0";
        loadMusic(musicIndexPlaying);
        audio.play();
    }else{
             storeData();
             calcCurrentHour=Math.floor(currentTime / 3600);
             calcCurrentMinute=Math.floor(currentTime % 3600 / 60);
             calcCurrentSecond=Math.floor(currentTime % 3600 % 60);
            meterBar.style.width=`${(100*currentTime)/duration}%`;
          
            
            curentMinute.innerHTML= calcCurrentMinute < 10 ? "0" + calcCurrentMinute : calcCurrentMinute;
            currentSecond.innerHTML= calcCurrentSecond < 10 ? "0" + calcCurrentSecond : calcCurrentSecond;
            if(calcCurrentHour===0 || calcCurrentHour===NaN){
                currentHour.innerHTML="";
                currentHourComma.innerHTML=""
            }else{
              // currentHour.style.display="block";
              //   currentHourComma.innerHTML=":"
                currentHour.innerHTML=calcCurrentHour;
                currentHourComma.innerHTML=":";
            }
          }
    });
}
//default settings
function defaultRender(){
  audio.addEventListener("loadeddata",()=>{
    const calcMusicMinuteTime= Math.floor(audio.duration % 3600 / 60);
  const calcMusicHour=Math.floor(audio.duration / 3600);
  const calcMusicSec=Math.floor(audio.duration % 3600 % 60);
  actualMinute.innerHTML= calcMusicMinuteTime < 10 ? "0"+calcMusicMinuteTime : calcMusicMinuteTime;
  actualSecond.innerHTML= calcMusicSec < 10 ? "0"+calcMusicSec : calcMusicSec;
  if(calcMusicHour===0 || calcMusicHour===NaN){
  actualHour.innerHTML="";
  actualHourComma.innerHTML="";
  }else{
  actualHour.innerHTML=calcMusicHour;
  actualHourComma.innerHTML=":";
  }
  })
    timeUpdate(nextPrevCheck);

}
const previousProcess=JSON.parse(localStorage.getItem("currentProcess"));
previousProcess.index=previousProcess.index===null?previousProcess.index=0:previousProcess.index;
musicIndexPlaying=previousProcess.index>=listLength?musicIndexPlaying=0:previousProcess.index;
audio.src=previousProcess.musicSrc===null?playList[musicIndexPlaying].src:previousProcess.musicSrc;
renderEndTime();
window.onload=()=>{
  audio.currentTime=previousProcess.currentTimeDuation;
  loadMusic(musicIndexPlaying);
  timeUpdate(nextPrevCheck);
    playing();
}

//pause play button event handler
playBtn.addEventListener("click",function(){
  nextPrevCheck=false;
if (play) {
    defaultRender();
    audio.play();
    disk.style.animationPlayState="running";
    playBtn.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path></svg>';
    play=false;
}else{
    
    audio.pause();
    disk.style.animationPlayState="paused";
    playBtn.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg>';
    play=true;
   
}});
// previous music button event
previous.addEventListener("click",()=>{
   nextPrevCheck=true;
   play=false;
   --musicIndexPlaying; 
   playing();
   audio.src=playList[musicIndexPlaying<=-1? musicIndexPlaying=(listLength - 1):musicIndexPlaying].src;
   storeData();
   renderEndTime();
   loadMusic(musicIndexPlaying);
   playBtn.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path></svg>';
   disk.style.animationPlayState="running";
   let playPromise=audio.play()
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
      audio.autoplay=true;
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
  loadMusic(musicIndexPlaying);
 timeUpdate(nextPrevCheck);
  
})
//next music button event
next.addEventListener("click",()=>{
  nextPrevCheck=false;
  play=false;
  musicIndexPlaying++;
  audio.src=playList[musicIndexPlaying===listLength? musicIndexPlaying=0:musicIndexPlaying].src;
  storeData();
  playing();
  renderEndTime();
  playBtn.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path></svg>';
  disk.style.animationPlayState="running";
 disk.style.background=`url(${playList[musicIndexPlaying].img})`;
  audio.play()
  loadMusic(musicIndexPlaying);
  timeUpdate(nextPrevCheck);
})

//shuffle button event handler
shuffleBtn.addEventListener("click",()=>{
    let prevSong=musicIndexPlaying;
    musicIndexPlaying=Math.floor(Math.random()*listLength);
    if (musicIndexPlaying===prevSong) {
      musicIndexPlaying=Math.floor(Math.random()*listLength);
      playing();
    audio.src=playList[musicIndexPlaying].src;
    storeData();
    loadMusic(musicIndexPlaying);
    disk.style.background=`url(${playList[musicIndexPlaying].img})`;
    disk.style.backgroundSize="cover";
    disk.style.animationPlayState="running";
    audio.play();
    defaultRender();
    } else {
      playing();
    audio.src=playList[musicIndexPlaying].src;
    storeData();
    loadMusic(musicIndexPlaying);
    disk.style.background=`url(${playList[musicIndexPlaying].img})`;
    disk.style.backgroundSize="cover";
    disk.style.animationPlayState="running";
    audio.play();
    defaultRender();
    }
    
});

//loop button event handler
musicLoopBtn.addEventListener("click",()=>{
    if(!loop){musicLoopBtn.style.fill="#94414f";
         loop=true;
    }else{musicLoopBtn.style.fill="#00000094";
         loop=false;  
    }  
});
//progress bar upddate on click
progressWrapper.addEventListener("click",(e)=>{
  let progressWidthVal=progressWrapper.clientWidth;
  let clickedOffSetX=e.offsetX;
  let songDuration=audio.duration;

  audio.currentTime=(clickedOffSetX/progressWidthVal)*songDuration;
})
//render music list
const ulTag=document.querySelector("ul");
playList.forEach(element=>{

    let liTag=`<li class="musicWrapper" li-index=${element.id}>
    <div class="musicImgWrapper" >
      <img src= ${element.img} alt="" srcset="">
    </div>
    <div class="musicArtistWrapper">
      <span class="musicTitle">${element.musicName}</span>
      <div>
        <span class="musicDescription">${element.artistName}</span>
        <span class="musicLength">${element.duration}</span>
      </div>
    </div>
    <div class="musicMenu" id="musicmenu">
     
    </div>
  </li>`;
  ulTag.insertAdjacentHTML("beforeend",liTag);
  
});
const allListTags=ulTag.querySelectorAll("li");

function playing(){
  let musicAnimation=`<div class="loader">
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
</div>`
    allListTags.forEach(element => {
      let musicmenu=element.querySelector(".musicMenu");
      let musicName=element.querySelector(".musicTitle");
        if (element.classList.contains("playing")||document.querySelector(".musicTitle").classList.contains("titlePlaying")) {
                document.querySelector(".musicTitle").classList.remove("titlePlaying");
                element.classList.remove("playing");
                musicName.classList.remove("playingNow");
                musicmenu.innerHTML="";
            }
        if (element.getAttribute("li-index")==musicIndexPlaying) {
            musicmenu.innerHTML=musicAnimation;
            element.scrollIntoView();
            document.querySelector(".musicTitle").classList.add("titlePlaying");
            musicName.classList.add("playingNow")
            element.classList.add("playing");
        }
        element.setAttribute("onclick","clicked(this)");
    });
}
function clicked(element) {
 
    let getListIndex=element.getAttribute("li-index");
    musicIndexPlaying=getListIndex;
    element.scrollIntoView();
    playing();
    audio.src=playList[musicIndexPlaying].src;
    storeData();
    renderEndTime();
   disk.style.background=`url(${playList[musicIndexPlaying].img})`;
   disk.style.animationPlayState="running";
   playBtn.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path></svg>';
   loadMusic(musicIndexPlaying);
   audio.play();
   defaultRender();
    
   
}
function renderEndTime(){
   if (playList[musicIndexPlaying].liked) {
    likeBtn.style.fill="rgb(219, 58, 85)";
   }else{
    likeBtn.style.fill="rgba(255, 255, 255, 0.82)";
   }
    audio.addEventListener("loadeddata",()=>{
        const calcMusicMinuteTime= Math.floor(audio.duration % 3600 / 60);
        const calcMusicHour=Math.floor(audio.duration / 3600);
        const calcMusicSec=Math.floor(audio.duration % 3600 % 60);
        actualMinute.innerHTML= calcMusicMinuteTime < 10 ? "0"+calcMusicMinuteTime : calcMusicMinuteTime;
        actualSecond.innerHTML= calcMusicSec < 10 ? "0"+calcMusicSec : calcMusicSec;
        if(calcMusicHour===0 || calcMusicHour===NaN){
            actualHour.innerHTML="";
            actualHourComma.innerHTML="";
        }else{
            actualHour.innerHTML=calcMusicHour;
            actualHourComma.innerHTML=":";
        }
    })
}

likeBtn.addEventListener("click",()=>{
  console.log(playList[musicIndexPlaying].liked);
  if (playList[musicIndexPlaying].liked===false) {
    playList[musicIndexPlaying].liked=true;
    likeBtn.style.fill="rgb(219, 58, 85)";
    console.log(playList[musicIndexPlaying].liked);
  } else {
    playList[musicIndexPlaying].liked=false;
    console.log(playList[musicIndexPlaying].liked);
    likeBtn.style.fill="rgba(255, 255, 255, 0.82)";
  }
});
// const localStorage=new localStorage();
function storeData(){
const process={
    index:musicIndexPlaying,
    musicSrc:audio.src,
    currentTimeDuation:audio.currentTime,
    finishTime:audio.duration
};
localStorage.setItem("currentProcess",JSON.stringify(process));
}


