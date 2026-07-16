let num1="";
let num2=""; 
let op="";
let result; 

let display=document.getElementById("display"); 
let numbers=document.querySelectorAll(".number"); 
let operators=document.querySelectorAll(".operator"); 
let percentageBtn=document.querySelector(".percentage");
let equal=document.getElementById("equal"); 
let clearBtn=document.getElementById("clearBtn"); 
let cutBtn=document.getElementById("cutBtn");
let equalPressed=false;


function calculate(a,oper,b){ 
    if(oper==="+"){
        result=a+b;
    }else if(oper==="-"){
        result=a-b;
    }else if(oper==="*"){
        result=a*b;
    }else if(oper==="/"){
        if(b==0){
            throw new Error("Division by 0");

        }
        result=a/b;
    } 


    
}

function showResult(){
    if(num1=="" && op=="" && num2==""){
        display.innerText="0";
    }else{
        if(op=="*"){
            display.innerText=`${num1}x${num2}`;
        }else if(op=="/"){
            display.innerText=`${num1}÷${num2}`;
        }else{
            display.innerText=num1+op+num2;
        }
    }

}



for(let number of numbers){
    number.addEventListener("click",()=>{ 
        if(equalPressed){
            num1="";
            num2="";
            op="";  
            equalPressed=false;
        }
        if(op==""){
            if(number.innerText=='.'){
                if(!String(num1).includes('.')){
                    num1+=number.innerText;
                }
                
            }else{
                num1+=number.innerText;
            }
            showResult();
            // display.innerText=num1;
            
        }else{
            //operator is present so build num2 now


            if(number.innerText=='.'){
                if(!num2.includes('.')){
                    num2+=number.innerText;
                }
                
            }else{
                num2+=number.innerText;
            }

            
            
            // let temp; 
            // // console.log(typeof temp); 
            // for(let i of display.innerText){
            //     if(i=='+' || i=='-' || i=='x' || i=='/' || i=='%'){
            //         temp=display.innerText.indexOf(i,1); 
            //         break;
            //     } 
            // } 

            // display.innerText=num1+op+num2;
            showResult();
        }
    })
}

for(let operator of operators){
    operator.addEventListener("click",()=>{
        
        if(equalPressed){
            num2="";
            op="";  
            equalPressed=false;
        }

        if(op=="" && num1===""){
            return; // no number entered yet, ignore operator press
        }

        // previous calculation(if we already have nums on screen )

        if(op!="" && num2!=""){
            try {
                // showResult();
                calculate(Number(num1),op,Number(num2));
                num1=result;
                num2="";
                // showResult();
                // display.innerText=result;
                
                // num1=result;
                
            } catch (error) {
                display.innerText="Error"; 
                num1="";
                result="";
                op=""; //check , i am not sure but everything should be reset once we hit error
                num2="";

                return;
                                
            }
            
        }
        // display.innerText+=operator.innerText;
        // showResult();

        if(operator.innerText=="x"){
            op="*";
        }else if(operator.innerText=="÷"){
            op="/";
        }else{
            op=operator.innerText; 
        }
        
        showResult();

    })
}

percentageBtn.addEventListener("click",()=>{
    if(equalPressed){
        num2="";
        op="";  
        equalPressed=false;
    }

    if(op==""){ //op is not , which means obv num2 is also not there ,, hence we only have num1
        if(num1==""){
            return; //prevent % without typing anything
        }
        num1=num1/100;
    }else{
        //op is there
        if(num2==""){
            return; // prevent situations like : 25+% , ie after op directly % 
        }
        num2=num1*num2/100;
    } 

    showResult();
})

equal.addEventListener("click",()=>{
    if(op!="" && num2!=""){
        try {
            calculate(Number(num1),op,Number(num2));
            display.innerText=result;
            num1=result;
            
        } catch (error) {
            display.innerText="Error";
            num1="";
            num2="";
            result="";
            op=""; 
            return;
       
        }
        
    }else{
        // display.innerText=Number(num1);
        showResult();
    }

    op="";
    num2="";
    equalPressed=true;
})


clearBtn.addEventListener("click",()=>{
    display.innerText="";
    num1="";
    num2=""; 
    result="";
    op="";

})

cutBtn.addEventListener("click",()=>{
    equalPressed=false;
    if(op==""){
        // only num1 we have
        num1=String(num1).slice(0,-1);
    }else{
        if(num2==""){
            //only operator we have 
            op="";
        }else{
            //num2 construction started
            num2=num2.slice(0,-1);
        }
    }

    // display.innerText=num1+op+num2; 
    showResult();
    
})