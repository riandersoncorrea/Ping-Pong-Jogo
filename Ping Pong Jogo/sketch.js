// variaveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 24;
let raio = diametro/2;

// velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

// variaveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYRaqueteOponente = 6;

let colidiu = false;

// placar
let meusPontos = 0;
let pontosOponente = 0;
let textJogador1 = 'Jogador 1';
let textJogador2 = 'Jogador 2';

// sons
let raquetada;
let ponto;
let trilha;
let bg;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("pontos.mp3");
  raquetada = loadSound("raquetada.mp3");
  bg = loadImage('bg.png');
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  
}

function draw() {
  background(bg);
  visibilidadeBolinha ();
  movimentoBolinha();
  colisaoBorda();
  visibilidadeRaquete(xRaquete,yRaquete);
  movimentoRaquete1();
  //colisaoRaquete1();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  visibilidadeRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentoRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  atribuirPontos ();
  bolinhaNaoFicaPresa();
}

function visibilidadeBolinha (){
  fill(color(173,255,47))
  circle(xBolinha, yBolinha, diametro);
  
}

function movimentoBolinha (){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda (){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= (-1);
  } 
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= (-1);
  }
}

function visibilidadeRaquete(x,y){
  fill(color(47,79,79))
  rect(x, y, larguraRaquete, alturaRaquete);
  
}

function movimentoRaquete1(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 8, 305); //limitar a movimentacao da raquete para n ultrapassar as bordas
}

function colisaoRaquete1 (){
  if(xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete ){
     velocidadeXBolinha *= (-1);
    raquetada.play();
     }
}

function colisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete , xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= (-1);
    raquetada.play();
  }
}

 function movimentoRaqueteOponente(){
   if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
   yRaqueteOponente = constrain(yRaqueteOponente, 8, 305); //limitar a movimentacao da raquete do oponente para n ultrapassar as bordas
 }

function incluirPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(47,79,79));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170, 26);
  text(textJogador1, 170, 48);
  fill(color(47,79,79));
  rect(450,10,40,20);
  fill(255);
  text(pontosOponente, 470, 26);
  text(textJogador2, 470, 48);
  
}

function atribuirPontos (){
  if (xBolinha > 590) {
    meusPontos ++;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente ++;
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23;
    }
}

