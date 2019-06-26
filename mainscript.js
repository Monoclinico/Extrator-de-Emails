var E$all = /(\b|\s|^)([a-z0-9\.\_]+)(\@)([a-z0-9\.]+)((\.com))((\.br)?)/;
var E$gmail = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(gmail)((\.com))/;
var E$hotmail = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(hotmail)((\.com))/;
var E$outlook = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(outlook)((\.com))/;
var E$yahoo = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(yahoo)((\.com))((\.br)?)/;
var E$zoho = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(zoho)((\.com))((\.br)?)/;
var E$icloud = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(icloud)((\.com))/;
var E$uol = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(uol)((\.com))((\.br)?)/;
var E$live = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(live)((\.com))/;
var E$terra = /(\b|\s|^)([a-z0-9\.\_]+)(\@)(terra)((\.com))((\.br)?)/;

document.body.onload = function () {
  document.getElementById("numberemailsn").innerHTML = 0;
  document.getElementById("separator").value = null;
  clearAll("datatext");
  clearAll("emails");
  var list$of$inputs = document.querySelectorAll("input[type='checkbox']");
  for (var pu = 0; pu < list$of$inputs.length;pu++ ){
    list$of$inputs[pu].checked = false;
  }
}

document.getElementById('testbutton').addEventListener('click',matchPattern);
document.getElementById('clearall').addEventListener('click',function(){clearAll("datatext")});
document.getElementById('copybutton').addEventListener('click',copyAll);
document.getElementById('datatext').setAttribute("placeholder","Cole aqui o conteúdo de qualquer documento, site ou texto. Depois clique em Extrair!");

function matchPattern (){
  function getSeparator() {
    var sep$carac = document.getElementById("separator").value;
    
    if (typeof (sep$carac) != "string"){
      sep$carac = String(sep$carac);
    }
    if ((sep$carac == undefined)||(sep$carac.length == 0)||(sep$carac == null)){
      sep$carac = "\n";
    }
    return sep$carac;
  }
  
  var text$principal = document.getElementById("datatext").value;
  var p = document.getElementById("optionsmail").value;
  var no$numbers = document.getElementById("nonumbers").checked;
  var alpha$order = document.getElementById("alphaorder").checked;
  var lower$all = document.getElementById("lowerall").checked;
  var double$mails = document.getElementById("doublemails").checked;
  var case$insensitive = document.getElementById("caseinsensitive").checked;

  switch (p) {
    case 'all':
      pattern$text = E$all;
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
    pattern$text = pattern$text.replace('0-9','');
    pattern$text = pattern$text.replace('0-9','');
  }  
  if (document.getElementById("checkalphabet").checked) {
    var alphabet$list = document.getElementById("alphabetlist").value;
    pattern$text = pattern$text.replace("|^)","|^)("+alphabet$list.toString()+")");
  }  
  pattern$text = case$insensitive ? RegExp(pattern$text,'gi') : RegExp(pattern$text,"g");
  var list$emails = text$principal.match(pattern$text);
  
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
    document.getElementById("emails").value = 'Vazio';
    document.getElementById("numberemailsn").innerHTML = 0;
  }
}

function copyAll (){
  document.getElementById("emails").select();
  document.execCommand('copy');
}

function clearAll (area) {
  document.getElementById(area).value = null;
}