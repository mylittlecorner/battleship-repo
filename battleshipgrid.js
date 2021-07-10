class Board{

    #w;
    #h;
    #canvas;
    #boxDim;
    #ctx;
    #alphabet= ['A','B','C','D','E','F','G','H','I','J'];
    #numbers= ['1','2','3','4','5','6','7','8','9','10'];

    constructor(w, h,id,boxDim)
    {
        this.#w = w;
        this.#h = h;

        this.#canvas = document.getElementById(id);
        this.#boxDim = boxDim;

        this.#ctx = this.#canvas.getContext('2d');

        this.#ctx.textBaseline = 'middle'; 
        this.#ctx.textAlign = 'center'; 
            
        this.#ctx.canvas.width  = w;
        this.#ctx.canvas.height = h;
    }

    initializeBoard()
    {
        this.drawBackground(this.#w,this.#h,this.#ctx,this.#boxDim,this.#alphabet,this.#numbers);
        this.drawForeground(this.#w,this.#h,this.#ctx,this.#boxDim);
        this.drawGrid(this.#w,this.#h,this.#ctx,this.#boxDim);
    }

    drawBackground(w,h,ctx,boxDim,alphabet,numbers)
    {
        let i=0,j=0;
        let x,y;
    
        for (x=0;x<=w;x+=boxDim) { //tworzymy czarne tło z podpisanymi polami lub pustymi
            for (y=0;y<=h;y+=boxDim) {
                ctx.fillRect(x, y, boxDim, boxDim);
                ctx.fillStyle = "white";
                if((y==0 && x>0) && i<10)
                {
                    ctx.fillText(alphabet[i],x+boxDim/2.5,y+boxDim/2);
                    i++;
                }
    
                if((x==0 && y>0) && j<10)
                {
                    ctx.fillText(numbers[j],x+boxDim/2.5,y+boxDim/2);
                    j++;
                }
                ctx.fillStyle = "black";
            }
        }
    }

    drawForeground(w,h,ctx,boxDim)
    {
        let x=0,y=0;
        for (x=boxDim;x<=w-boxDim*2;x+=boxDim) { //tworzymy białe tło pod grida
            for (y=boxDim;y<=h-boxDim*2;y+=boxDim) {
                ctx.fillStyle= "white";
                ctx.fillRect(x, y, boxDim, boxDim);
            }
        }
    }

    drawGrid(w,h,ctx,boxDim)
    {
        let x,y;
        for (x=boxDim;x<=w;x+=boxDim) { //tworzymy grida
            for (y=boxDim;y<=h;y+=boxDim) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        }
    }

    returnCtx()
    {
        return this.#ctx;
    }


}
