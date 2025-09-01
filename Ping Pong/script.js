
const canvasElement = document.querySelector("canvas");
const context = canvasElement.getContext("2d");
const linewidth = 15;
const gapx = 10;

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
        draw: function(){
            context.fillStyle = "#ffffff";
            context.fillRect(this.x, this.y, this.w, this.h);
        }

    }
    

    // Desenho da Raquete esquerda
        const raqueteEsquerda ={
        x:gapx,
        y:100,
        w:line.w,
        h:200,
        draw: function(){
            context.fillStyle = "#ffffff";
            context.fillRect(this.x, this.y, this.w, this.h);
        }
    }
    

    // Desenho da Bola
    const bola = {
        x: 370,
        y: 120,
        r: 20,
        speed: 5,
        draw: function(){
            context.fillStyle = "#ffffff";
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            context.fill();
            this._move();
        },
        _move: function(){
            this.x += 1 * this.speed;   
            this.y += 1 * this.speed;
        }
    };

    
    //Placar
    const placar = {
       Humano: 4,
        Computador: 0,
        draw: function(){
    context.font = "bold 30px Arial";
    context.textAlign = "center";
    context.textBaseline = "center";
    context.fillStyle = "#01231d";
    context.fillText("4", window.innerWidth /4,50);
    context.fillText("6", window.innerWidth / 4 + window.innerWidth / 2, 50);

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
