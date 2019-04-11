/* 
 * 
 * 
 * 
 */


$(document).ready(function()
{
    var tableauMats=["L_forme","No_L_forme","Z_forme","No_Z_forme","t_forme","line","square"];
    var descend;
    var $cadre=$("#cadre").get(0);
    var $ctx=$cadre.getContext('2d');
    var $pseudo;
    var w,h,rand,x,y,valX,val_y;
    var point;
    var pieceAct;
    var tabPieces=new Array;
    var memoryPiecesLines;
    
    
    /******************************************************************************************************************************************************
     * 
     *  launcher of clock
     *****************************************************************************************************************************************************/
    getTime();
    
    
    /******************************************************************************************************************************************************
     * Part with all the graphics functions
     *
     ******************************************************************************************************************************************************/

    function creaLine()
    {
        $ctx.fillStyle='red';
    }
    
    function creaSquare()
    {
        $ctx.fillStyle='blue';
    }
   
    function creaT()
    {
        $ctx.fillStyle='yellow';
    }
    
    function creaL()
    {
        $ctx.fillStyle='green';
    }
    
    function creaNoL()
    {
        $ctx.fillStyle='pink';
    }
    function creaZ()
    {
        $ctx.fillStyle='violet';
    }
    function creaNoZ()
    {
        $ctx.fillStyle='purple';
    }
    
    function grid()
    {
        $ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        $ctx.lineWidth  = '0.05';
        for(i=0;i<$cadre.height;i+=10)
        {
            for(j=0;j<$cadre.width;j+=w)
            {
                $ctx.strokeRect(j, i, w, h);
            }
        }
    }
    
    
    function creaRand (pieceAff)
    {
    
        switch(pieceAff.getForme())
        {
            case "L_forme" : creaL();
                break;
            case "No_L_forme" : creaNoL();
                break;
            case "Z_forme" : creaZ();
                break;
            case "No_Z_forme" : creaNoZ();
                break;
            case "t_forme" : creaT();
                break;
            case "line" : creaLine();
                break;
            case "square" : creaSquare();
                break;
        }
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                if(pieceAff.mats[i][j]!==0)
                {
                    $ctx.fillRect(pieceAff.getMatX(i, j,$cadre.width),pieceAff.getMatY(i, j,$cadre.width),w,h);
                }
            }
        }
    }
    function drawPictures()
    {
        tmpX=x;
        tmpY=y;
        for(i=0;i<tabPieces.length;i++)
        {
            x=tabPieces[i].getX();
            y=tabPieces[i].getY();
            creaRand(tabPieces[i]);
        }
        x=tmpX;
        y=tmpY;
    }

    
    /******************************************************************************************************************************************************
     * Part with the Clock's launcher and the Game's launher 
     ******************************************************************************************************************************************************/
    async function getTime()
    {
        var $time=$("#time");
        var dt= new Date($.now());
        $time.text(dt.getHours()+"h : "+dt.getMinutes()+"m : "+dt.getSeconds()+"s");
        delete dt;
        setTimeout(getTime,60);
    }
    
    
    function eventCrea()
    {
        $(document).keydown( function(e)
        {
           switch(e.which) 
            {
                case 39:valX=w;
                    val_y=0;
                    modifPieceAct();
                    val_y=h;
                        break;
                case 37 : valX=-w;
                    val_y=0;
                    modifPieceAct();
                    val_y=h;
                    break;
                case 40 : val_y=h;
                          modifPieceAct();
                    break;
                case 32: var temp=new Piece(pieceAct.forme);
                    temp.clone(pieceAct);
                    temp.rotate();
                    valX=0;
                    val_y=0;
                    temp.change(valX,val_y,$cadre.width);
                    isOnOtherPiece(temp);
                    if(!descend)
                    {
                        pieceAct.clone(temp);
                        creaRand(pieceAct);
                    }
                    val_y=h;
                    break;
            }
            descend=false;
        });
    }
    
    function cssSwitcher()
    {
        if($('#pseudoText').val()!=='')
        {
            $pseudo=$("#pseudoText").val();
        }
        else
        {
            $pseudo="Joueur 1";
        }
        $("#valid").css("visibility","hidden");
        $("#pseudoText").css("visibility","hidden");
        $("#pseudo").css("visibility","hidden");
        $("#cadre").css("visibility","visible");
        $("#pseudoJoueur").text($pseudo);
        $("#Points").text(point+" pts.");
    }
    
    function initVar()
    {
        valX=0;
        w=$cadre.width/12;
        h=10;
        val_y=h;
        y=0;
        x=5*w;
        rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
        pieceAct=new Piece(tableauMats[rand]);
        pieceAct.setUp(x,$cadre.width);
        tabPieces=[];
        point=0;
        descend=false;
        memoryPiecesLines=[15];
        for(var i=0;i<15;i++)
        {
            memoryPiecesLines[i]=[12];
            for(var j=0;j<12;j++)
            {
                memoryPiecesLines[i][j]=-1;
            }
        }
    }
    
    
    $("#valid").click(function ()
    {
        eventCrea();
        initVar();
        cssSwitcher();
        draw();
    });
    
    function deleteLine(start)
    {
        var i,j,k,x,y;
        var upPiece;
        var indexX,indexY;
        for(i=start;i>0;i++)
        {
            for(j=0;j<12;j++)
            {
                memoryPiecesLines[pieceAct.getMatY(i,j,$cadre.width)/10][pieceAct.getMatX(i,j,$cadre.width)/25]=memoryPiecesLines[pieceAct.getMatY(i-1,j,$cadre.width)/10][pieceAct.getMatX(i-1,j,$cadre.width)/25]=pieceAct.getId();
                for(k=0;k<tabPieces.length;k++)
                {
                    if(tabPieces[k].isOnIt((j*25)+((i-1)*$cadre.width)))
                    {
                      for(x=0;x<4;x++)
                      {
                        tabPieces[k]
                        }
                    }
                    else
                    {
                        
                    }
                }
            }
        }
        for(j=0;j<12;j++)
        { 
            memoryPiecesLines[pieceAct.getMatY(i,j,$cadre.width)/10][pieceAct.getMatX(i,j,$cadre.width)/25]=-1;
        }
    }
    
    
    function modifPieceAct()
    {
        temp=new Piece(pieceAct.getForme());
        temp.clone(pieceAct);
        temp.change(valX,val_y,$cadre.width);
        isOnOtherPiece(temp);
        if(!descend)
        {
            pieceAct.clone(temp);
            
            valX=0;
        }
        delete temp;
    }
    
    
    function pushPiece()
    {
        for(var i=0;i<4;i++)
        {
            for(var j =0;j<4;j++)
            {
                if(pieceAct.mats[i][j]!==0)
                {
                   memoryPiecesLines[pieceAct.getMatY(i,j,$cadre.width)/10][pieceAct.getMatX(i,j,$cadre.width)/25]=pieceAct.getId();   
                }
            }
        }
    }
    
    function affichage()
    {
        for(i = 0 ; i<15;i++)
        {
            for(j=0;j<12;j++)
            {
                console.log(memoryPiecesLines[i][j]);
            }
        }
            
    }
    
    /********************
     * 
     * @param {type} pieceAct
     * @return {Boolean}
     */
    function  isLoose(pieceAct)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<pieceAct.h;j++)
            {
                if((pieceAct.mats[i][j]<$cadre.width)&&(pieceAct.mats[i][j]>0)&&(isOnOtherPiece(pieceAct)))
                    return true;
            }
        }
        return false;
    }
    
    /*****************
     * 
     * @param {type} temp
     * @return {Boolean}
     */
    function isOnOtherPiece(temp)
    {
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
            
                for(var k=0;k<tabPieces.length;k++)
                {   
                    if(tabPieces[k].isOnIt(temp.mats[i][j]))
                    {
                        descend=true;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function  verifLines()
    {
       var isLineFull;
       for(i=0;i<15;i++)
       {
           isLineFull=true;
           for(j=0;j<12;j++)
           {
               if(memoryPiecesLines[i][j]===-1)
               {
                   isLineFull=false;
                   break;
               }
           }
           if(isLineFull)
           {
               //console.log("verif");
               point+=10;
               $("#Points").text(point+" pts.");
               //deleteLine(i);
           }
       }
    }
    
  
    
    function draw()
    {
        $ctx.clearRect(0,0,$cadre.width,$cadre.height);
        drawPictures();
        creaRand(pieceAct);
        grid();
        if((!(pieceAct.isBottom($cadre.height,$cadre.width)))&&(!descend))
        { 
            modifPieceAct();
            window.requestAnimationFrame(function(){setTimeout(draw, 200);});
        }
        else
        {
            descend=false;
            pieceAct.upId();
            tabPieces.push(pieceAct);
            pushPiece();
            affichage();
            verifLines();
            valX=0;
            if(!isLoose(pieceAct))
            {
                
                rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
                pieceAct=new Piece(tableauMats[rand]);
                pieceAct.setUp(x,$cadre.width);
                window.requestAnimationFrame(function(){setTimeout(draw, 200);});
                    
            }
            else
            {
                $("#cadre").css("visibility","hidden");
                $("#pseudoTextReplay").val($pseudo);
                $("#fin").css("visibility","visible");
                $("#yes").click(function ()
                {
                    $("#fin").css("visibility","hidden");
                    $("#pseudoText").val($("#pseudoTextReplay").val());
                    eventCrea();
                    initVar();
                    cssSwitcher();
                    draw();
                });
            }
        }
    }    
});