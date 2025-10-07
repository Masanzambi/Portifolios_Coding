
const canvasElement = document.querySelector("canvas");
const context = canvasElement.getContext("2d");
const linewidth = 15;
const gapx = 10;
const mouse = { x:0, y:0 };

const field = {
    w :window.innerWidth,
    h : window.innerHeight,
    draw: function() {
        context.fillStyle = "#286047";
        context.fillRect(0, 0, this.w, this.h);
    }
};

const line = {
    w: 15,
    h: field.h,
    draw: function(){
        context.fillStyle = "#ffffff";
        context.fillRect(
           field.w / 2 - this.w / 2,
            0,
            this.w,
            this.h
        )
    }
}


function setup() {
    canvasElement.width = context.width = field.w;
    canvasElement.height = context.height = field.h;
}

function draw() {
    field.draw();
    line.draw();
    bola.draw();
    raqueteDireita.draw();
    raqueteEsquerda.draw();
    placar.draw();
}
    // Desenho da linha central
 
    context.fillStyle = "#ffffff";
    

    // Desenho da Raquete direita
    const raqueteDireita ={
        x:field.w - line.w - gapx,
        y:100,
        w:line.w,
        h:200,
        speed: 5,
        _move: function(){
            if(this.y + this.h / 2 < bola.y + bola.r){
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        },
        speedUp: function(){
            this.speed += 2;
        },
        draw: function(){
            context.fillStyle = "#ffffff";
            context.fillRect(this.x, this.y, this.w, this.h);
            this._move();
        }

    }
    

    // Desenho da Raquete esquerda
        const raqueteEsquerda ={
        x:gapx,
        y:100,
        w:line.w,
        h:200,
        _move: function(){
            this.y=mouse.y - this.h / 2;
        },
        draw: function(){
            context.fillStyle = "#ffffff";
            context.fillRect(this.x, this.y, this.w, this.h);
            this._move();
        }
    }
    

    // Desenho da Bola
    const bola = {
        x: 0,
        y: 0,
        r: 20,
        speed: 5,
        direcaoY: 1,
        direcaoX: 1,
        _calcPosition: function(){
           //verifica as laterais superior e inferior da tela
            if (this.x > field.w - this.r - raqueteDireita.w - gapx){
                if (this.y + this.r > raqueteDireita.y &&
                    this.y - this.r < raqueteDireita.y + raqueteDireita.h){
                    //Rebate a bola invertendo a direção X
                    this._reverseX();
                } else { 
                    //Ponto do jogador 1  
                    placar.increaseHumanoPontuando();   
                    this._pointUp();                   
                }
                
            }
            // verifica a pontuação do jogador 2
            if ( this.x < this.r + raqueteEsquerda.w + gapx){
                // verifica se raquete esta a posição Y da bola
                if (this.y + this.r > raqueteEsquerda.y &&
                    this.y - this.r < raqueteEsquerda.y + raqueteEsquerda.h){
                    //Rebate a bola invertendo a direção X
                    this._reverseX();
                } else {
                    //Ponto do jogador 2
                    placar.increaseComputadorPontuando();
                    this._pointUp();
                }
            }

            if (
                (this.y - this.r  < 0 && this.direcaoY < 0) ||
                (this.y > field.h - this.r && this.direcaoY > 0)
            ){
                //Rebate a bola invertendo a direção Y
                this._reverseY();
            }
        },
        _reverseY: function(){
            this.direcaoY *= -1;
              // 1 * -1 = -1
        },
        _reverseX: function(){
            this.direcaoX *= -1;
                // -1 * -1 = 1
        },  
        _speedUp: function(){
            this.speed += 3;

        },  
        _pointUp: function(){
            this.x = field.w / 2;
            this.y = field.h / 2;
            this._speedUp();
            raqueteDireita.speedUp();

        },
        _move: function(){
            this.x += this.direcaoX * this.speed;   
            this.y += this.direcaoY * this.speed;
        },  
        draw: function(){
            context.fillStyle = "#ffffff";
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            context.fill();
            this._move();
            this._calcPosition();
        }
    };

    
    //Placar
    const placar = {
        Humano: 0,
        Computador: 0,
        increaseHumanoPontuando: function(){ 
            this.Humano++;
        },
        increaseComputadorPontuando: function(){
            this.Computador++;
        },

        draw: function(){
    context.font = "bold 30px Arial";
    context.textAlign = "center";
    context.textBaseline = "center";
    context.fillStyle = "#01231d";
    context.fillText(this.Humano, window.innerWidth /4,50);
    context.fillText(this.Computador, window.innerWidth / 4 + window.innerWidth / 2, 50);

}
    }

setup();
draw();
window.AnimationFrame = ( function() {
    return(
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout( callback, 1000 / 60  );
        }       
    )   
} )();


function main(){
    window.AnimationFrame(main);
    draw();
}
setup();
main(); 

canvasElement.addEventListener("mousemove", function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});

