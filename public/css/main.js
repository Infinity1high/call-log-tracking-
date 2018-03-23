
//check which formshould be submited 
function checkform(){
    if (document.getElementById('newClient').disabled==true){
        document.getElementById('old').submit(); 
    }
    else if(document.getElementById('oldClient').disabled==true){
        document.getElementById('new').submit();
    }
}

//function to search and find div element inside div !!
function findChildElement (idOfElement, idOfChild) {
  let element = document.getElementById(idOfElement);
  return element.querySelector(`[id=${idOfChild}]`);
}
//remove and add  class
function remove_class(div_name, class_name){
  div_name.classList.remove(class_name);
}
function add_class(div_name, class_name){
  div_name.classList.add(class_name);
}

//enable options which are disabled in form by default 
function enable_option_sales(){
  var call_reason_sales_ = document.getElementById("call_reason_sales").value;
  var payment_issue_ = document.getElementById('payment_issue');
  var language_= findChildElement('newClient','language'); //function findChildElement created above
  if (call_reason_sales_ == "Payment issues") {
        payment_issue_.disabled=false;
       // remove_class(payment_issue_,'locked');   
        
  }
  else if (call_reason_sales_ !== "Paymen issues") {
         payment_issue_.disabled=true;
         payment_issue_.options[0].selected=true;
       //  add_class(payment_issue_,'locked');  
  }

  if(call_reason_sales_ == 'Wrong language') {
        language_.disabled=false;
       // remove_class(language_,'locked');
  }        
  else if(call_reason_sales_ !== 'Wrong language'){ 
        language_.disabled=true;
        language_.options[0].selected = true;
       // add_class(language_,'locked');
  }        
}

function enable_option_support() { 
  var call_reason_support_ =document.getElementById("call_reason_support").value;
  var cancellation_reason_ = document.getElementById('cancellation_reason');
  var language_= findChildElement('oldClient','language'); //function findChildElement created above
  if (call_reason_support_ == "Cancellation request"){
        cancellation_reason_.disabled=false;
       // remove_class(cancellation_reason_,'locked'); 
  }
  else if (call_reason_support_ !== 'Cancellation request') {
        cancellation_reason_.disabled=true;
        cancellation_reason_.options[0].selected = true;
      //  add_class(cancellation_reason_,'locked'); 
  }
  if(call_reason_support_ == 'Wrong language') {
      language_.disabled=false;
     // remove_class(language_,'locked');
  }        
  else if(call_reason_support_ !== 'Wrong language'){ 
      language_.disabled=true;
      language_.options[0].selected = true;
     // add_class(language_,'locked');
  }        
}


//timer

function getTime(){
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds(); 
  if (minutes.toString().length===1) {
    minutes='0'+ minutes;
  }
  if (seconds.toString().length===1) {
    seconds='0'+ seconds;
  }
  get_time=hours +':' + minutes +':'+ seconds;
}

var time=0;
var running=0;
timeStart=0;
timeEnd=0;
timeDuration=0;
function startTimer(){
  getTime();
  if ((running===0) && (time===0) ){
    console.log('Start');
    running=1;
    addTime();
    timeStart=get_time;
    document.getElementById('callEnd').disabled=false;
    document.getElementById('timeStart').innerHTML = timeStart;
    document.getElementById('time_start').value = timeStart;
    document.getElementById('callStart').innerHTML='Reset';
  }
  if (time!==0) {
     console.log(time);
    console.log('Reset');   
    running=0;
    time=time-time-1;
    document.getElementById('callEnd').disabled=true;
    document.getElementById('timer').innerHTML='00:00:00';
    document.getElementById('callStart').innerHTML='Start';
    document.getElementById('timeStart').innerHTML='';
    document.getElementById('time_start').value = '';
    document.getElementById('timeEnd').innerHTML='';
  }
}
function endTimer(){;
  getTime()  
  running=0;
  timeEnd=get_time;
  document.getElementById('callEnd').disabled=true;
  document.getElementById('timeEnd').innerHTML = timeEnd;
  document.getElementById('time_end').value = timeEnd;
  document.getElementById('time_duration').value = duration;

}
function addTime(){
  if (running==1){
  setTimeout(function(){
    time++;
    var hour=Math.floor(time/10/60/60);
    var min=Math.floor(time/10/60);
    var sec=Math.floor(time/10);
    if (sec>=60){
      sec=Math.floor(time/10)-min*60;
    }
    if (min>=60){
      min=Math.floor(time/10)-hour*60;
    }
    if (hour<10){
      hour="0"+hour;
    }
   if (min<10){
      min="0"+min;
    }
    if (sec<10){
      sec="0"+sec;
    }
    
  duration=hour+':'+min + ':'+sec;  
  document.getElementById('timer').innerHTML= duration;
    addTime();
},100);
  }
}


window.onload=function(){
  newClient=document.getElementById('newClient');
  oldClient=document.getElementById('oldClient');
  changeNew=document.getElementById('changeNew');
  changeOld=document.getElementById('changeOld');
//disable and enable div
function disable(div_name, title){
      div_name.disabled = true;
      add_class(div_name,'disabled');
      add_class(title,'disabled-light');
        /*var nodes = div_name.getElementsByTagName('*');
            for(var i = 0; i < nodes.length; i++){
                nodes[i].disabled = true;
              }*/
           }
           
function enable(div_name, title){
    div_name.disabled = false;
    remove_class(div_name,'disabled');
    remove_class(title,'disabled-light');
       /* var nodes = div_name.getElementsByTagName('*');
            for(var i = 0; i < nodes.length; i++){
               if(nodes[i].classList.contains('locked') !== true){
                  nodes[i].disabled = false;
               }
              }*/
            }         

disable(oldClient, changeOld); // make one option disabled by default !!!

//switch between tabs with old client and new
changeOld.addEventListener('click', function(){
     enable(oldClient, changeOld);
     disable(newClient, changeNew);
}, false);
changeNew.addEventListener('click', function(){
     enable(newClient,changeNew);
     disable(oldClient,changeOld);
}, false);


}

