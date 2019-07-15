let E$all = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)([a-z0-9\.\_\-]+)((\.com))((\.br)?)/;
let E$allbr = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)([a-z0-9\.\_\-]+)((\.com)?)((\.br))/;
let E$gmail = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(gmail)((\.com))((\.br)?)/;
let E$hotmail = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(hotmail)((\.com))((\.br)?)/;
let E$outlook = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(outlook)((\.com))((\.br)?)/;
let E$yahoo = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(yahoo)((\.com))((\.br)?)/;
let E$zoho = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(zoho)((\.com))((\.br)?)/;
let E$icloud = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(icloud)((\.com))((\.br)?)/;
let E$uol = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(uol)((\.com))((\.br)?)/;
let E$bol = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(bol)((\.com))((\.br)?)/;
let E$live = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(live)((\.com))((\.br)?)/;
let E$terra = /(\b|\s|^)([a-z0-9\.\_\-]+)(\@)(terra)((\.com))((\.br)?)/;

document.body.onload = function () {
  document.getElementById("numberemailsn").innerHTML = 0;
  document.getElementById("separator").value = "";
  clearAll("datatext");
  clearAll("emails");
  let list$of$inputs = document.querySelectorAll("input[type='checkbox']");
  for (let pu = 0; pu < list$of$inputs.length;pu++ ){
    list$of$inputs[pu].checked = false;
  }
}

document.getElementById('datatext').setAttribute('placeholder','Cole aqui o conteúdo de \
qualquer documento, site ou texto. Depois clique em Extrair!');
document.getElementById('emails').setAttribute('placeholder','Vazio');
document.getElementById('testbutton').addEventListener('click',matchPattern);
document.getElementById('clearall').addEventListener('click',function(){clearAll("datatext")});
document.getElementById('copybutton').addEventListener('click',copyAll);

function matchPattern (){
  if (document.getElementById("datatext").value.length > 0){
    function getSeparator() {
      let sep$carac = document.getElementById("separator").value;
      
      if (typeof (sep$carac) != "string"){
        sep$carac = String(sep$carac);
      }
      if ((sep$carac == undefined)||(sep$carac.length == 0)||(sep$carac == null)){
        sep$carac = "\n";
      }
      return sep$carac;
    }
    
    let pattern$text;
    let list$emails;
    let text$principal = document.getElementById("datatext").value;
    let p = document.getElementById("optionsmail").value;
    let no$numbers = document.getElementById("nonumbers").checked;
    let no$hyphens = document.getElementById("withouthyphen").checked;
    let alpha$order = document.getElementById("alphaorder").checked;
    let lower$all = document.getElementById("lowerall").checked;
    let double$mails = document.getElementById("doublemails").checked;
    let case$insensitive = document.getElementById("caseinsensitive").checked;

    switch (p) {
      case 'all':
        pattern$text = E$all;
        break; 
      case 'allbr':
        pattern$text = E$allbr;
        break; 
      case 'gmail':
        pattern$text = E$gmail;
        break;
      case 'hotmail':
        pattern$text = E$hotmail;
        break;
      case 'outlook':
        pattern$text = E$outlook;
        break;
      case 'yahoo':
        pattern$text = E$yahoo;
        break;
      case 'zoho':
        pattern$text = E$zoho;
        break;
      case 'icloud':
        pattern$text = E$icloud;
        break;
      case 'uol':
        pattern$text = E$uol;
        break;
      case 'bol':
        pattern$text = E$bol;
        break;
      case 'live':
        pattern$text = E$live;
        break;
      case 'terra':
        pattern$text = E$terra;
        break;  
      default:
        pattern$text = E$all;
      }
  pattern$text = pattern$text.toString().slice(1,-1);
    if (no$numbers) {
      pattern$text = pattern$text.replace(/0-9/g,'');
    }  
    if (document.getElementById("checkalphabet").checked) {
      let alphabet$list = document.getElementById("alphabetlist").value;
      pattern$text = pattern$text.replace("|^)","|^)("+alphabet$list.toString()+")");
    }  
    if (no$hyphens){
      pattern$text = pattern$text.replace(/\\-/g,'');
      pattern$text = pattern$text.replace('(\\b|\\s|^)','(\\s|^)');
    }

    pattern$text = case$insensitive ? RegExp(pattern$text,'gi') : RegExp(pattern$text,"g");
    list$emails = text$principal.match(pattern$text);
    
    if (list$emails != null){
        if (lower$all) {
          list$emails = list$emails.map(function (l) {return l.trim().toLocaleLowerCase()});
        }else{
          list$emails = list$emails.map(function (l) {return l.trim()});
        }
        if (alpha$order) {
          list$emails.sort();
        }
        if (double$mails){
          list$emails = list$emails.filter(function(e,i){return list$emails.indexOf(e) == i});
        }
      document.getElementById("emails").value = list$emails.join(getSeparator());
      document.getElementById("numberemailsn").innerHTML = list$emails.length;
    }else{
      document.getElementById("emails").value = '';
      document.getElementById("numberemailsn").innerHTML = 0;
    }
  }else{
    alert("O campo está vazio");
  }  
}

function copyAll (){
  let area$mails$copy = document.getElementById("emails");
  if (area$mails$copy.value.length < 1){
    alert("Não há nada para ser selecionado");
  }else{
    document.getElementById('emails').select();
    document.execCommand('copy');
  }
}

function clearAll (area) {
  document.getElementById(area).value = "";
}