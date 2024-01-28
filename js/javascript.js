
// let currentSong = 0
var number = 0
var songForPlay = "";
var articles = []
var buttonSong = []
var opt = 0 
var click = 0 
class Music {
  constructor() {
    this.currentSongs = 0;
   }
   
 }
 $(document).ready(function(){
  fetchData()
 })


  function fetchData(){
    $.ajax({
      url:'https://script.google.com/macros/s/AKfycbz8uT7xuMGlfnIKRaB98i1Ixpy-9ktodhSSm0Ju8gCIs_6jB7g3wP_OTSPy8reV-PU2Pg/exec',
      
      type:'GET',
      success: function (respone) {
        try {
          if(respone.status === 200){
            arrayOfData(respone.data)
          }else{
            $('#playList').html(Error)
          }
        } catch (error) {
          $('#playList').html(Error)
        }
      },
      
      error:function(err){
        console.log(err);
      }

    })
  }
  
  function arrayOfData(getDataFromServer){
    let getData = []
    for(data of getDataFromServer){
        getData.push(data)
    }
    articles = getData
   appendArticle(getDataFromServer)
   refiltSong()
    searchSong()
  }
  
  
let appendArticle = function(data){
  console.log(buttonSong)
  let song = []
  let content = ''
  let widthsize = $(window).width() 
  for(article of data){
    if(widthsize<500){
      content +=`<tr id="card">
      <th scope="row"></th>
       <td >${article.SONG_TITLE}
        <p><sub>${article.SINGER}</sub>
         <span><sup>${article.PRODUCT}</sub></span>
        </p>
      </td>
      </tr>`
    }else{
      content +=`<tr id="card">
    <th scope="row"></th>
    <td>${article.SONG_TITLE}</td>
    <td>${article.SINGER}</td>
    <td>${article.PRODUCT}</td></tr>`
    }
    song.push(article)
  }
  $('#playList').html(content)
    clickPlay(song)
    ending(song)

}

  function toPlay(getContent){
   
    let song = new Music()
    currentSong = song.currentSongs
  addBG(currentSong)
  //to find url song
  $("#audioPlayer")[0].src = getContent[currentSong].SONG_TITLE
  //to find tittle
  showTittle(getContent,currentSong)

  // console.log(getContent[currentSong][2]);
 
  }
  
  function clickPlay(getContent){
    
  $('#playList #card').click(function(e){
    e.preventDefault()
    console.log($(this).index())
    number = $(this).index()
    let song = new Music()
    currentSong = song.currentSongs
    currentSong = $(this).index()
    console.log(currentSong)
    //$("#audioPlayer")[0].src = urlSongs[currentSong]
    $("#audioPlayer")[0].src = getContent[currentSong].SONG_URL
    removeBG()
    addBG(currentSong)
    $("#audioPlayer")[0].play()

    // $("#songTitle").html("បទ: "+getContent[currentSong][0])
    showTittle(getContent,currentSong)
    
  })
  }

 

  function ending(getContent){
    let index = [] //use for count index
   for(d in getContent){
      index.push(d)
   }

    $('#audioPlayer')[0].addEventListener("ended", function(e){
      //Codition for increase number
      if(click === 1){
        if(opt === 0){
          currentSong ++ 
          opt = 1
        }else{
          opt = 0
        }
      }else{
        currentSong ++
      }
      
        
      if(currentSong!= index.length){
        $("#audioPlayer")[0].src = getContent[currentSong].SONG_URL
        $("#audioPlayer")[0].play()
        showTittle(getContent,currentSong)

        removeBG()
        addBG(currentSong)
      }else {
        currentSong = 0
        $("#audioPlayer")[0].src = getContent[currentSong].SONG_URL
        showTittle(getContent,currentSong)

        removeBG()
        addBG(currentSong)
      }
      
    })
  }
  function addBG(getBG){
    $('#playList #card').eq(getBG).addClass("custom-color")
    //Change logo play
    $('#playList #iconPlay').eq(getBG).html("<i class='far fa-pause-circle'></i>")
  // to find index
  //$('#playList #card').eq(getBG).index()
  }
  function removeBG(){
    $('#playList #card').removeClass("custom-color")
    $('#playList #iconPlay').html("<i class='far fa-play-circle'></i>")
  }
  function showTittle(getCon,getCur){
    document.title = getCon[getCur].SONG_TITLE
    $("#songTitle").html("បទ: "+getCon[getCur].SONG_TITLE)
  // $('#singerTitle').html("អ្នកចម្រៀង: "+getCon[getCur][1])

  }


  let searchSong = function(){
    $("#searchValue").keyup(function(){
      let value = $(this).val()
      let reSearch =  searchBar(value,articles)  
      appendArticle(reSearch)
      clickPlay(reSearch)
      click = 1
    })
    
    function searchBar(value,data){
      let result = []
      for(newData of data){
        value = value.toLowerCase()
         let song = newData.SONG_TITLE.toLowerCase()
        if(song.includes(value)){
          result.push(newData)
        }
      }
      return result
    } 
    
  }
  function refiltSong(){
    $('#emoSong').click(function(e){
      e.preventDefault()
      click = 1
     // console.log($("#playList").empty())
      let title = "កំសាន្ត"
      let a = resultSong(title, articles)
     // alert($("body").find("#playList").length)
     
        return  appendArticle(a)
    })

    $('#cultureSong').click(function(e){
      e.preventDefault()
      
      let title = "ប្រពៃណី"
      let a = resultSong(title, articles)
     // alert($("body").find("#playList").length)
      if($("body").find("#playList").length == 1){
        //$("#playList #card").remove()
        return  appendArticle(a)
      }
    })

  }

  function resultSong(title,datas){
    let filter = title.toLowerCase()
    let song = []
      for(data of datas){
        let songRhymt = data.SONG_RHYTM.toLowerCase()
        if(songRhymt.includes(filter)){
          song.push(data)
        }
      }
      return song
  }
  


