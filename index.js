
let alllinksarr =[]

const Clink =document.getElementById("clink")
const Savec =document.getElementById("savec")
const Saveauto = document.querySelector("#saveauto")
const Allclinks = document.getElementById("allclinks")
const DeleteButton = document.querySelector("#clearbutton")

const linksFormLocalStorage = JSON.parse(localStorage.getItem("links"))



if (linksFormLocalStorage){
    alllinksarr =linksFormLocalStorage
    render(alllinksarr)
}


// can use "dblclick" to run code when double clicked
DeleteButton.addEventListener("click" ,function(){
    localStorage.clear();
    alllinksarr =[]
    render(alllinksarr);
})



function savehandle() {
    alllinksarr.push(Clink.value)
    Clink.value = "";
    localStorage.setItem("links",JSON.stringify(alllinksarr))
    render(alllinksarr);
    
}


Saveauto.addEventListener("click" , function(){
    // gives link of the opened tab or active tab
    chrome.tabs.query({active:true , currentWindow :true}, function (tabs){
        alllinksarr.push(tabs[0].url)
        localStorage.setItem("links" , JSON.stringify( alllinksarr ))
        render(alllinksarr)
    })

})


// renders all the links
function render(alllinks){
let listItems =""

for (let i = 0; i < alllinks.length; i++) {
    // listItems += "<li><a target = '_blank' href ='"+ alllinksarr[i] +"'>" + alllinksarr[i] + "</a></li>" 
    // using template string u can make code more readable and better
    listItems +=`
     <li>
     <a target = '_blank' href ='${alllinks[i]}'>
      ${alllinks[i]}  
      </a>
     </li>
     `
// diff ways to add elements
        // Allclinks.innerHTML += "<li>" + alllinksarr[i] + "</li>" 
        
        // // creating elements
        // const li =document.createElement("li")
        // li.textContent =alllinksarr[i]
        // Allclinks.append(li)
}
Allclinks.innerHTML = listItems
}

