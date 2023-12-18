var siteNameInput =document.getElementById('siteNameInput');
var siteUrlInput = document.getElementById('siteUrlInput');
var tableBody = document.getElementById('tBody')


///////////////////local storage///////////////////////////////
var siteContainer ;

    if(localStorage.getItem('sites') !=null){
        siteContainer = JSON.parse(localStorage.getItem('sites'));
        displaySite(siteContainer);
    }else{
        siteContainer = [];}

////////////////////// add sites//////////////////////////////////////
function addSite(){
    var site ={
        siteName : siteNameInput.value ,
        siteUrl : siteUrlInput.value ,
    }
    if (validName() , validURL() == true){
        siteContainer.push(site);
        localStorage.setItem('sites', JSON.stringify(siteContainer));
        clearForm();
        displaySite(siteContainer);
    }else{
        alert(`
        Site Name or Url is not valid, Please follow the rules below :
       1- Site name must contain at least 3 characters 
       (first character is capital)
       2- Site URL must be a valid one
        `)
    }
  
}
/////////clear form /////////////////////////
function clearForm(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
}
////////////////////////////////////////////

////////////////dispaly/////////////////
function displaySite(arr){
    var cartoona =``;
    for(var i = 0 ; i < arr.length ; i++){
        var siteIndex = i + 1;
        
    
        cartoona +=`     
        <tr>
            <td>${siteIndex}</td>
            <td>${arr[i].siteName}</td>
            <td><a href="${arr[i].siteUrl}" target="_blank" class="btn btn-info btn-sm">visit</a></td>
            <td><a onclick="deleteSite(${i})" class="btn btn-danger btn-sm ">Delete</a></td>
        </tr>
        `
    }
       tableBody.innerHTML= cartoona;
}

////////////////delete/////////////////////

function deleteSite(deleteIndix){
    siteContainer.splice(deleteIndix ,1)
    localStorage.setItem('sites', JSON.stringify(siteContainer));
    displaySite(siteContainer)
}

///////////////validation//////////////////
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i'); 
    
      if(pattern.test(siteUrlInput.value)){
        siteUrlInput.classList.replace('is-invalid','is-valid');
        return true;
      }else{
        siteUrlInput.classList.add('is-invalid');
      return false;
      }
}



function validName(){
    var regex = /^[A-Z]{1}[a-z]/;
    if(regex.test(siteNameInput.value)){
        siteNameInput.classList.replace('is-invalid','is-valid');
        return true;
    }else{
        siteNameInput.classList.add('is-invalid');
        return false;
    }
    
}
/////////////////////////////////////////////////

// localStorage.clear()