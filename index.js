
let questaosAtual=0;

let perguntasCorretas=0;

let pct=Math.floor((questaosAtual / questions.length) * 100)  //Calculo para barrinha mover

document.querySelector('.progress--bar').style.width=`${pct}%` //mover a barrinha

mostrarQuestao();

function mostrarQuestao(){
    if(questions[questaosAtual]){
        let q=questions[questaosAtual]; //armazenei na variavel nova

      document.querySelector('.scoreArea').style.display='none'; 
      document.querySelector('.questionArea').style.display='block' //exibir

      document.querySelector('.question').innerHTML=q.question;

      let optionsHtml='';
      for(let i in q.options){
       optionsHtml +=`<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
      }
      document.querySelector('.options').innerHTML=optionsHtml;

//----------------------------------------------------- EVENTO DE CLIQUE PARA ESCOLHER A OPÇÃO 
     document.querySelectorAll('.options .option').forEach(item=>{
        item.addEventListener('click',clicandoOpcao)
      });
    }else{
        finishQuiz()//Finalizando o quiz

    }
}

function clicandoOpcao(e){
    let clickedOption=parseInt(e.target.getAttribute('data-op'))

    if(questions[questaosAtual].answer=== clickedOption){
        perguntasCorretas++;  //variavel criada inicialmente em 0
        //console.log('Acertou')
    }
    questaosAtual++   //indo para próxima pergunta
    mostrarQuestao();
}

function finishQuiz(){

    let points=Math.floor((perguntasCorretas / questions.length)*100)

    if(points<30){
        document.querySelector('.scoreText1').innerHTML='Ta ruim em!!'
        document.querySelector('.scorePct').style.color='#FF0000'
    }else if(points >= 40 && points<70){
        document.querySelector('.scoreText1').innerHTML='Muito bom!!'
        document.querySelector('.scorePct').style.color='#FFFF00'
    }else if(points>=70){
        document.querySelector('.scoreText1').innerHTML='Showw!!'
        document.querySelector('.scorePct').style.color='#0D630D'
    }

    document.querySelector('.scorePct').innerHTML=`Acertou ${points} %`
    document.querySelector('.scoreText2').innerHTML=`Você respondeu ${questions.length} e acertou ${perguntasCorretas}`

    document.querySelector('.scoreArea').style.display='block';
    document.querySelector('.questionArea').style.display='none'
    document.querySelector('.progress--bar').style.width=`100%`
}

function resetEvent(){
    questaosAtual=0;
    perguntasCorretas=0;
    mostrarQuestao();
    document.querySelector('.progress--bar').style.width=`0`
}

const reset=document.querySelector('.resetar')
reset.addEventListener('click',resetEvent)
