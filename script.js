const form=document.querySelector('.form1');
const form2=document.querySelector('.form2');
const containerFirst=document.querySelector('.first');
const containerSecond=document.querySelector('.second');
const containerThird=document.querySelector('.third');
const firstname=document.querySelector('.firstname');
const surename=document.querySelector('.surename');
const phone=document.querySelector('.phone');
const email=document.querySelector('.email');
const pesel=document.querySelector('.pesel');
const dateOfBirth=document.querySelector('.dateOfBirth');
const Idnumber=document.querySelector('.Idnumber');
const select=document.querySelector('.select');
const type=document.querySelector('.type');
const timer=document.querySelector('.timer');
const input=document.querySelector('input');


//FirstStep
const emailPattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phonePattern= /^\d{9}$/;
const namesPattern=/[a-zA-Z]/i;

form.addEventListener('submit',nextPage =(e) => {
    e.preventDefault();
    let errors=[];
    
    if(firstname.value === ""){ 
      errors.push({ el: firstname});
    }else if( !firstname.value.match(namesPattern)){
        errors.push({ el: firstname});
    }else{
      firstname.classList.add('correct');
    }
    if(surename.value === ""){
      errors.push({ el: surename});
    }else if( !surename.value.match(namesPattern)){
      errors.push({el: surename});
    }else{
      surename.classList.add('correct');
    }
    if( phone.value!="" && !phone.value.match(phonePattern)){
      errors.push({el: phone});
    }else{
      phone.classList.add('correct');
    }
    if(email.value!="" && !email.value.match(emailPattern) ){
      errors.push({ el: email});
    }else{
      email.classList.add('correct');
    }
    // if(select.options !="dowodu" || select.options !="paszportu"){
    //   errors.push({ el: select});
    // }else{
    //   select.classList.add('correct');
    // }


    if(errors.length > 0){
      showErrors(errors);
      return false;
    }

    function showErrors(errors){
      errors.map((err)=>{
        err.el.classList.add('error');
      });
    }

      containerFirst.classList.remove('active');
      containerSecond.classList.add('active');
              document.querySelector('.showName').textContent=`Imię: ${firstname.value}`
              document.querySelector('.ShowSurename').textContent=`Nazwisko: ${surename.value}`
              document.querySelector('.ShowPhone').textContent=`Telefon: ${phone.value}`
              document.querySelector('.ShowEmail').textContent=`Email: ${email.value}`
   
      return true;

    
     
})


//SecondStep



form2.addEventListener('submit',nextPage=(e)=>{
    e.preventDefault();

    let errors=[];

    if(pesel.value === ""){ 
      errors.push({ el: pesel});
    }else if(ParsePesel(pesel.value)){
        errors.push({ el: pesel});
    }else if(pesel.value.length !=11){
      errors.push({ el: pesel});
  }else{
      pesel.classList.add('correct');
    }
  
   
    if(Idnumber.value === ""){
      errors.push({el: Idnumber});
    }else if(Idnumber.value.length < 6){
      errors.push({el: Idnumber});
    }else{
    Idnumber.classList.add('correct');
    }

    if(errors.length > 0){
      showErrors(errors);
      return false;
    }
  
       containerSecond.classList.remove('active');
       containerThird.classList.add('active');
       clearInterval(tiktak);
       timer.remove();
       document.querySelector('.showPesel').textContent=`Pesel: ${pesel.value}`
       document.querySelector('.showDateOfBirth').textContent=`Data urodzenia: ${dateOfBirth.value}`
       document.querySelector('.showIdDocument').textContent=`Numer ${type.textContent}: ${Idnumber.value}`
       return true;

       function showErrors(errors){
        errors.map((err)=>{
          err.el.classList.add('error');
        });
      }

})



select.addEventListener('change', ()=>{
   type.textContent=` ${select.options[select.selectedIndex].value}`;
   Idnumber.disabled=false;
})

//timer


    let startingMinutes = 5;
    let time = startingMinutes*60;
    let seconds;
    const tiktak=setInterval(countdown, 1000);

    function countdown() {
     
     const minutes=Math.floor(time/60);
     seconds=time % 60;

     seconds=seconds <10 ? "0"+seconds :seconds;
     if (time === 0) {
      alert("Przerwanie wypełniania formularza z powodu przekroczenia czasu oczekiwania");
      location.reload();
    }
        
       timer.textContent =`Czas na wypełnienie formularza ${minutes}:${seconds}`;
       document.querySelector('.showTime').textContent=`Czas wypełniania formularza:${4-minutes}:${60-seconds}`;
      time--;
     
       
    }

      
  
    let day,month,year;
   
    //pesel
    function ParsePesel(id)
    {
      
      const s = pesel.value;

      //Sprawdź, czy wszystkie znaki to cyfry
      var aInt = new Array();
      for (i=0;i<11; i++)
      {
        aInt[i] = parseInt(s.substring(i,i+1));
        if (isNaN(aInt[i]))
        {
          SetError(1);
          return;
        }
      }
    
      //Sprawdź sumę kontrolną
      var wagi = [1,3,7,9,1,3,7,9,1,3,1];
      var sum=0;
      for (i=0;i<11;i++)
        sum+=wagi[i]*aInt[i];
      if (SetError((sum%10)!=0))
        return;
    
      //Policz rok z uwzględnieniem XIX, XX, XXI i XXII wieku
       year = 1900+aInt[0]*10+aInt[1];
      if (aInt[2]>=2 && aInt[2]<8)
        year+=Math.floor(aInt[2]/2)*100;
      if (aInt[2]>=8)
        year-=100;
    
       month = (aInt[2]%2)*10+aInt[3];
       day = aInt[4]*10+aInt[5];
    
      //Sprawdź poprawność daty urodzenia
      if (SetError(!checkDate(day,month,year)))
        return;
      var plec = (aInt[9]%2==1)?"M":"K";
    
      //Uzupełnij pola wchodzące w skład numeru PESEL
      if(day < 10){
          day="0"+day;
      }
      if(month < 10){
        month="0"+month;
      }
      dateOfBirth.value=`${day}-${month}-${year}`;

    }
   
    function SetError(c){
       
      return c;
    }
    function checkDate(d,m,y)
    {
      var dt = new Date(y,m-1,d);
      return dt.getDate()==d &&
            dt.getMonth()==m-1 &&
            dt.getFullYear()==y;
    }

    
