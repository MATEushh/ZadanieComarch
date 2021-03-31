const form=document.querySelector('form');
const containerFirst=document.querySelector('.first');
const containerSecond=document.querySelector('.second');
const containerThird=document.querySelector('.third');
const firstname=document.querySelector('.firstname');
const lastname=document.querySelector('.lastname');
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
const emailPattern= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const phonePattern= /^\d{9}$/;
const namesPattern=/[a-zA-Z]/i;

form.addEventListener('submit',nextPage=(e)=>{
    e.preventDefault();
    
    if(firstname.value != "" && firstname.value.match(namesPattern)){
        firstname.classList.add('correct');
         }else{
         firstname.classList.add('error');
        return false;
         }

    if(lastname.value != "" && lastname.value.match(namesPattern)){
            lastname.classList.add('correct');
            
        }else{
            lastname.classList.add('error');
            return  false;
        }

    if(phone.value.match(phonePattern) || (phone.value==="")){
        phone.classList.add('correct');
    }
    else{
        phone.classList.add('error');
       return false;
    }
    if(email.value.match(emailPattern) ||(email.value==="")){
        email.classList.add('correct');
       
    }
    else{
        email.classList.add('error');
        return false;
  }
    
  
   containerFirst.classList.remove('active');
   containerSecond.classList.add('active');
           document.querySelector('.showName').textContent=`Imię: ${firstname.value}`
           document.querySelector('.ShowLastName').textContent=`Nazwisko: ${lastname.value}`
           document.querySelector('.ShowPhone').textContent=`Telefon: ${phone.value}`
           document.querySelector('.ShowEmail').textContent=`Email: ${email.value}`

   return true;
})


//SecondStep

form.addEventListener('submit',nexttPage=(e)=>{
    e.preventDefault();

    ParsePesel(pesel.value)
    if( pesel.value !=""){
        pesel.classList.add('correct');
        }else{
          pesel.classList.add('error');
            return false;
        }
      
       if(Idnumber.value !=""){
           Idnumber.classList.add('correct');
          }else{
           Idnumber.classList.add('error');
           return false;
            }

       containerSecond.classList.remove('active');
       containerThird.classList.add('active');
       clearInterval(tiktak);
       timer.remove();
       document.querySelector('.showPesel').textContent=`Pesel: ${pesel.value}`
       document.querySelector('.showDateOfBirth').textContent=`Data urodzenia: ${dateOfBirth.value}`
       document.querySelector('.showIdDocument').textContent=`Numer ${type.textContent}: ${Idnumber.value}`
       document.querySelector('.showTime').textContent=`Czas wypełniania formularza:${4-minutes}:${60-seconds}`;
       return true;

})

select.addEventListener('change', ()=>{
   type.textContent=` ${select.options[select.selectedIndex].value}`;
   Idnumber.disabled=false;
})

//timer
    let minutes = 4;
    let seconds = 60;
    window.onload = clock = ()=> {
        
        seconds--;
      
      timer.textContent =`Czas na wypełnienie formularza ${minutes}:${seconds}`;
     
      if (minutes === 0 && seconds === 0) {
        alert("Przerwanie wypełniania formularza z powodu przekroczenia czasu oczekiwania");
        location.reload();
      }
      if (seconds === 00) {
        minutes --;
        seconds = 60;
       }
      
    };
    const tiktak=setInterval(clock, 1000)

  
    //pesel
    function ParsePesel(id)
    {
      const s = pesel.value;
      //Sprawdź długość, musi być 11 znaków
      if (SetError(s.length != 11))
        return;
    
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
      var rok = 1900+aInt[0]*10+aInt[1];
      if (aInt[2]>=2 && aInt[2]<8)
        rok+=Math.floor(aInt[2]/2)*100;
      if (aInt[2]>=8)
        rok-=100;
    
      var miesiac = (aInt[2]%2)*10+aInt[3];
      var dzien = aInt[4]*10+aInt[5];
    
      //Sprawdź poprawność daty urodzenia
      if (SetError(!checkDate(dzien,miesiac,rok)))
        return;
      var plec = (aInt[9]%2==1)?"M":"K";
    
      //Uzupełnij pola wchodzące w skład numeru PESEL
      if(dzien < 10){
          dzien="0"+dzien;
      }
      if(miesiac < 10){
        miesiac="0"+miesiac;
      }
      dateOfBirth.value=`${dzien}-${miesiac}-${rok}`;
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
    
    
