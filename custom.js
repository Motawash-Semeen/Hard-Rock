document.querySelector('.search-btn').addEventListener('click',function(e){
    e.preventDefault();
    removes();
    let Value = document.querySelector('.in').value;
    console.log(Value);
    firstApi(Value);
    document.querySelector('.in').value = '';
    
})

function removes(){
    let main = document.querySelector('.search-result');
    
        var child = main.lastElementChild; 
        while (child) {
            main.removeChild(child);
            child = main.lastElementChild;
        }
}

async function firstApi(Value){
    let api = await fetch(`https://api.lyrics.ovh/suggest/${Value}`);
    let data = await api.json();
    console.log(data);

    putData(data);
}


function putData(data){
    for(let index=1; index<=5;index++){
        

        let newHtml = `
    <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${data.data[index].title}</h3>
                        <p class="author lead ">Album by <span class="${data.data[index].album.id}">${data.data[index].album.title}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" id="getlys">Get Lyrics</button>
                    </div>
                </div>
    `;
    let main = document.querySelector('.search-result');
    main.insertAdjacentHTML ('beforeend',newHtml);

    }
    
}

document.querySelector('.search-result').addEventListener('click',function(e){
    if(e.target.className.includes('btn')){
        let value = e.target.parentNode.parentNode.children;
        let child = value[0].children[0].innerText
        let lastchild = value[0].children[1].children[0].innerText;
        let id = value[0].children[1].children[0].className;
        console.log(child,lastchild,id);
        finding(child,lastchild,id)
        
    }
})

async function finding(child,lastchild,id){
    let apis = await fetch(`https://api.lyrics.ovh/suggest/${child}`);
        let datas = await apis.json();
        console.log(datas.data.length);
        for(let i=0;i<datas.data.length;i++){
            if(datas.data[i].title==child && datas.data[i].album.title==lastchild && datas.data[i].album.id==id){
                finalApi(datas.data[i].artist.name,datas.data[i].title)
            }
        }
}

async function finalApi(name,title)
{
    let newapi = await fetch(`https://api.lyrics.ovh/v1/${name}/${title}`);
    let newData = await newapi.json();
    console.log(newData);
    if(newData.error){
        document.querySelector('.single-lyrics').innerText = 'No Lyrics Found';
    }
    else{
        document.querySelector('.single-lyrics').innerText = newData.lyrics;
    }
    
    
}
            