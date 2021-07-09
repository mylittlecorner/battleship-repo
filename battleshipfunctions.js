function drawBoxes(myLittleMap,ctx)
{
    let img = new Image();   // Tu tworzymy obraz pudełka
    img.src ='https://static.thenounproject.com/png/2831785-200.png';
    img.onload = function()
    {
    let i=0;
    let k;
    let l;
                for(k=1;k<11;k++)//Po załadowaniu każde pole ze statkiem otrzyma ten obraz
                {
                    for(l=1;l<11;l++)
                    {
                            if(myLittleMap[k][l]==1)
                            {
                                    ctx.drawImage(img,k*boxDim+1, l*boxDim+1, boxDim-1, boxDim-1);

                            }
                    }
                }
    };
    delete img;
}   

function sleep(ms) { //metoda użyta do opóźnienia wystrzału
    return new Promise(resolve => setTimeout(resolve, ms));
 }


let setBoxAmount = function(value){ //zwraca ilość pól x lub y
    return value * boxDim;
}

function randomNumber(min, max) { //:)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function shipMap(){ //nasza mapa. 1 to granica mapy lub statek, 0 to wolne pole gdzie możemy umieść ten statek, 2 będzie na mapie oznaczało 1 pole obok statku aby do siebie nie przylegały

    let row0 = [1,1,1,1,1,1,1,1,1,1,1,1],
        row1 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row2 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row3 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row4 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row5 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row6 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row7 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row8 = [1,0,0,0,0,0,0,0,0,0,0,1],
        row9 = [1,0,0,0,0,0,0,0,0,0,0,1],
       row10 = [1,0,0,0,0,0,0,0,0,0,0,1],
       row11 = [1,1,1,1,1,1,1,1,1,1,1,1];

       return table=[row0,row1,row2,row3,row4,row5,row6,row7,row8,row9,row10,row11];


}


    function drawHit(myLittleMap,ctx)
    {   
        let x = randomNumber(1,10);
        let y = randomNumber(1,10);
        while(myLittleMap[x][y]==3 || myLittleMap[x][y]==4)//sprawdzamy czy mapa nie posiada wartości 3 lub 4 aby losowanie było sprawiedliwe
        {
            x = randomNumber(1,10);
            y = randomNumber(1,10);
        }
        let imgMiss = new Image();   // Obrazek pudło
        imgMiss.src ='https://cdn.pngsumo.com/cross-png-icon-216607-free-icons-library-black-cross-png-982_982.jpg';
        let imgHit = new Image();   // Obrazek trafienie
        imgHit.src ='https://p7.hiclipart.com/preview/621/587/778/no-symbol-computer-icons-clip-art-image-red-cross.jpg';
        if(myLittleMap[x][y]==1)//Jeśli trafiliśmy statek to oznaczamy 3, jeśli pudło to 4
        {
            myLittleMap[x][y]=3;
                imgHit.onload = function()
                {
                                ctx.drawImage(imgHit,x*boxDim+1, y*boxDim+1, boxDim-1, boxDim-1);//trafienie
                };
        }
        else{
            myLittleMap[x][y]=4;
            imgMiss.onload = function()
            {
                            ctx.drawImage(imgMiss,x*boxDim+1, y*boxDim+1, boxDim-1, boxDim-1);//pudło
            };
        }   
        delete imgMiss;
        delete imgHit;
        return myLittleMap; //zwracamy mapę
    }

function randomShipPositionH(ships,myshipmap){
    let index = 0;
    let myshipmapcopy = myshipmap;
    let x;
    let y;
    let i;
    let isOk;
    while (index < ships.length)
    {
            while(true)//ship horizontal alignment
            {
                x = randomNumber(1,10-ships[index]-1); //losujemy tak długo, aż znajdziemy wolne miejsce, gdzie nie ma 2.
                y = randomNumber(1,10);
                isOk=false;
                for(i=0;i<ships[index];i++){
                    if(myshipmapcopy[x+i][y]==0)//Czy jest miejsce tutaj na statek?
                    {
                          if(i==0)
                          {
                            myshipmapcopy[x-1][y+1]=2;   //   2 |2 2 2 |2
                            myshipmapcopy[x-1][y]=2;     //   2 |1 1 1 |2    Otaczamy nasz statek polem, które uniemożliwia w polu 2 umieszczenie statku. Czasami czasami źle rysuje statek
                            myshipmapcopy[x-1][y-1]=2;   //   2 |2 2 2 |2
                          }
                            myshipmapcopy[x+i][y+1]=2;
                            myshipmapcopy[x+i][y]=1;
                            myshipmapcopy[x+i][y-1]=2;
                          if(i==ships[index]-1)
                          {
                            myshipmapcopy[x+i+1][y+1]=2;
                            myshipmapcopy[x+i+1][y]=2;
                            myshipmapcopy[x+i+1][y-1]=2;
                            isOk=true;//Wszystkie pola były dobre, więc zapisujemy
                            myshipmap=myshipmapcopy;// udało się utworzyć statek? Zapisujemy
                          }
                    }
                    else{
                        myshipmapcopy=myshipmap;//Nie udało się utworzyć statku, zajęte pole, szukamy pola dalej i wracamy do prawidłowej mapy
                        break;
                    }
                    
                }
                if(isOk) //Jest okej? Następny statek
                break;
            }
        index++;
    }
    return myshipmap;
}

function randomShipPositionV(ships,myshipmap)
{
    let index = 0;
    let myshipmapcopy = myshipmap; 
    let x;
    let y;
    let i;
    let isOk;
    while (index < ships.length)
    {
            while(true)//ship vertical alignment
            {
                myshipmapcopy=myshipmap;
                x = randomNumber(1,10);
                y = randomNumber(1,10-ships[index]-1);
                isOk=false;
                for(i=0;i<ships[index];i++)
                {
                    if(myshipmapcopy[x][y+i]==0)
                    {
                          if(i==0)
                          {
                            myshipmapcopy[x+1][y-1]=2;
                            myshipmapcopy[x][y-1]=2;
                            myshipmapcopy[x-1][y-1]=2;
                          }
                            myshipmapcopy[x+1][y+i]=2;
                            myshipmapcopy[x][y+i]=1;
                            myshipmapcopy[x-1][y+i]=2;
                          if(i==ships[index]-1)
                          {
                            myshipmapcopy[x+1][y+i+1]=2;
                            myshipmapcopy[x][y+i+1]=2;
                            myshipmapcopy[x-1][y+i+1]=2;
                            isOk=true;
                            myshipmap=myshipmapcopy;
                          }
                    }
                    else{
                        myshipmapcopy=myshipmap;
                        break;
                    }
                }
                if(isOk)
                break;
            }
        index++;
    }
  return myshipmap;
}

