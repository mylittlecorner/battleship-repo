async function fun(finalMap1,finalMap2,ctx1,ctx2) {  
    var count1;
    var count2;
    await sleep(200);
    var map1 = drawHit(finalMap1,ctx1);
    await sleep(200);
    var map2 = drawHit(finalMap2,ctx2);
    count1=0;
    count2=0;
    for(i=1;i<11;i++){
      for(j=1;j<11;j++){
            if(map1[i][j]==3)
            count1++;
            if(map2[i][j]==3)
            count2++;
        }
    }
    if(count1==16){
      document.getElementById("hello").innerHTML = "Player one wins.";
    }
     else if(count2==16){
    document.getElementById("hello").innerHTML = "Player two wins.";
    } 
}  