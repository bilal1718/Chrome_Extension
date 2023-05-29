//Getting elements from the HTML 
let inputElem=document.querySelector('#inputElem');
let buttonElem=document.querySelector('#buttonElem');
let itemList=document.querySelector('#itemList');
let deleteBtn=document.querySelector('#deleteElem');
let saveURL=document.querySelector('#saveUrl');
let saveElem=[];
//Getting data from local storage
let dataFromLocalStorage=JSON.parse( localStorage.getItem("Leads"));
//if there is any data,then it works,if there is not data then it returns null value
if(dataFromLocalStorage){
    saveElem=dataFromLocalStorage;
    render(saveElem);
}
function render(data){
    let listItems="";
    //creating a list of inputs
    for (let i = 0; i < data.length; i++) {
         listItems += `<li class='list-group-item list-group-item-danger'>
         <a target='_blank' href='${data[i]}'>
         ${data[i]}
          </a>
          </li>`
    }
    itemList.innerHTML=listItems;
    console.log( localStorage.getItem("Leads") );
    }
  saveURL.addEventListener('click',saveTabs);
  function saveTabs(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        saveElem.push(tabs[0].url)
        localStorage.setItem("Leads", JSON.stringify(saveElem) )
        render(saveElem);
    })
}
    
    
deleteBtn.addEventListener('dblclick',deleteInpo);
function deleteInpo(){
    localStorage.clear();
    saveElem=[];
    render(saveElem);
}
//when user clicks on save button
buttonElem.addEventListener('click',saveInput);
//it runs this function
function saveInput(){
    const inputValue = inputElem.value.trim(); // Remove leading/trailing whitespace
    if (inputValue !== '') {
    saveElem.push(inputElem.value);
inputElem.value="";
localStorage.setItem("Leads", JSON.stringify(saveElem) )
      render(saveElem);
    }
}

