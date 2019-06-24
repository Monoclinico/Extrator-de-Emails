//Incluir @GMAIL **Maiúsculo
var E$all = /(\b|\s|^)([A-z0-9\.]+)(\@)([A-z0-9\.]+)((\.com)|(\.COM))((\.br)?)/;
var E$gmail = /(\b|\s|^)([A-z0-9\.]+)(\@)(gmail)((\.com)|(\.COM))/;
var E$hotmail = /(\b|\s|^)([A-z0-9\.]+)(\@)(hotmail)((\.com)|(\.COM))/;
var E$outlook = /(\b|\s|^)([A-z0-9\.]+)(\@)(outlook)((\.com)|(\.COM))/;
var E$yahoo = /(\b|\s|^)([A-z0-9\.]+)(\@)(yahoo)((\.com)|(\.COM))/;
var E$zoho = /(\b|\s|^)([A-z0-9\.]+)(\@)(zoho)((\.com)|(\.COM))/;
var E$icloud = /(\b|\s|^)([A-z0-9\.]+)(\@)(icloud)((\.com)|(\.COM))/;
var E$uol = /(\b|\s|^)([A-z0-9\.]+)(\@)(uol)((\.com)|(\.COM))((\.br))/;
var E$live = /(\b|\s|^)([A-z0-9\.]+)(\@)(live)((\.com)|(\.COM))/;

document.body.onload = function () {
  document.getElementById("numberemailsn").innerHTML = 0;
  clearAll("datatext");
  clearAll("emails");
}

document.getElementById('testbutton').addEventListener('click',matchPattern);
document.getElementById('clearall').addEventListener('click',function(){clearAll("datatext")});
document.getElementById('copybutton').addEventListener('click',copyAll);
document.getElementById('datatext').setAttribute("placeholder","Cole aqui o conteúdo de qualquer documento, site ou texto. Depois clique em Extrair!");

function matchPattern (){
  var text$principal = document.getElementById("datatext").value;
  var p = document.getElementById("optionsmail").value;
  var no$numbers = document.getElementById("nonumbers").checked;
  var alpha$order = document.getElementById("alphaorder").checked;
  var lower$all = document.getElementById("lowerall").checked;

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
  pattern$text = RegExp(pattern$text,'g')
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
    document.getElementById("emails").value = list$emails.join("\n");
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