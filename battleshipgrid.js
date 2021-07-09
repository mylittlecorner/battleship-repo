let drawGrid = function(w, h,id,shipMap) {

    let canvas = document.getElementById(id);
    let ctx = canvas.getContext('2d');

    ctx.textBaseline = 'middle'; 

    //Center Horizontally
    ctx.textAlign = 'center'; 
            
    ctx.canvas.width  = w;
    ctx.canvas.height = h;

    const alphabet= ['A','B','C','D','E','F','G','H','I','J'];
    const numbers= ['1','2','3','4','5','6','7','8','9','10'];
    const ships=[4,3,3,2,2];

    let i=0;
    let j=0;

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
    i=0;
    j=0;

    for (x=boxDim;x<=w-boxDim*2;x+=boxDim) { //tworzymy białe tło pod grida
        for (y=boxDim;y<=h-boxDim*2;y+=boxDim) {
            ctx.fillStyle= "white";
            ctx.fillRect(x, y, boxDim, boxDim);
        }
    }

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

    return ctx;
    };