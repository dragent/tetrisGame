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
    var w,h,rand,x,y,valX,valY;
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

     /**************************************************************************
      * 
      * @return {undefined}
      * 
      *  All the following function color the piece
      *************************************************************************/
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
    
    
    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * draw the grid
     **************************************************************************/
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
    
    /***************************************************************************
     * 
     * @param {type} pieceAff
     * @return {undefined}
     * 
     * Create random Piece
     **************************************************************************/
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
    
    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * draw all the piece in tabPiece
     **************************************************************************/
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
   
    /***************************************************************************
     * 
     * asynchron function updating the time
     * 
     **************************************************************************/
    async function getTime()
    {
        var $time=$("#time");
        var dt= new Date($.now());
        $time.text(dt.getHours()+"h : "+dt.getMinutes()+"m : "+dt.getSeconds()+"s");
        delete dt;
        setTimeout(getTime,1000);
    }
    
    
    /***************************************************************************
     * 
     * create all event listener in jQuery
     * 
     **************************************************************************/
    function eventCrea()
    {
        $(document).keydown( function(e)
        {
           switch(e.which) 
            {
                case 39:    if((!descend)&&(!(pieceAct.isBottom())))
                            {
                                valX=w;
                                valY=0;
                                modifPieceAct();
                                $ctx.clearRect(0,0,$cadre.width,$cadre.height);
                                drawPictures();
                                creaRand(pieceAct);
                                grid();
                                valY=h;
                            }
                           
                        break;
                case 37 :   if((!descend)&&(!(pieceAct.isBottom())))
                            {
                                valX=-w;
                                valY=0;
                                modifPieceAct();
                                $ctx.clearRect(0,0,$cadre.width,$cadre.height);
                                drawPictures();
                                creaRand(pieceAct);
                                grid();
                                valY=h;
                            }
                    break;
                case 40 :   
                            var temp=new Piece(pieceAct.forme);
                            temp.clone(pieceAct);
                            temp.change(valX,valY,$cadre.width);
                            isOnOtherPiece(temp);
                            if((!descend)&&(!(pieceAct.isBottom())))
                            {
                                pieceAct.clone(temp);
                                $ctx.clearRect(0,0,$cadre.width,$cadre.height);
                                drawPictures();
                                creaRand(pieceAct);
                                grid();
                            }
                            else if (pieceAct.isBottom())
                            {
                                descend=true;
                            }
                            
                    break;
                case 32:    var temp=new Piece(pieceAct.forme);
                            temp.clone(pieceAct);
                            temp.rotate();
                            valX=0;
                            valY=0;
                            temp.change(valX,valY,$cadre.width);
                            isOnOtherPiece(temp);
                            if((!descend)&&(!(pieceAct.isBottom())))
                            {
                                pieceAct.clone(temp);
                                $ctx.clearRect(0,0,$cadre.width,$cadre.height);
                                drawPictures();
                                creaRand(pieceAct);
                                grid();
                             }
                        valY=h;
                        break;
            }
            descend=false;
        });
    }
    
    
    
    /*******************************************************************************************************
     * 
     * Part with all the initializing function
     * 
     ******************************************************************************************************/
    function cssSwitcher()
    {
        if($('#pseudoText').val()!=='')
        {
            $pseudo=$("#pseudoText").val();
        }
        else
        {
            $pseudo="Player 1";
        }
        $("#valid").css("visibility","hidden");
        $("#pseudoText").css("visibility","hidden");
        $("#pseudo").css("visibility","hidden");
        $("#cadre").css("visibility","visible");
        $("#pseudoJoueur").text($pseudo);
        $("#Points").text(point+" pts.");
    }
    
    /***************************************************************************
    * 
    * 
    *
    * @return {undefined}     
    * 
    * 
    * initialize all the variable
    ***************************************************************************/
    function initVar()
    {
        valX=0;
        w=$cadre.width/12;
        h=10;
        valY=h;
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
    
    /**************************************************************************
     * starting function
     *************************************************************************/
    
    $("#valid").click(function ()
    {
        eventCrea();
        initVar();
        cssSwitcher();
        draw();
    });
    
    
    /***************************************************************************
     * 
     * @param {type} start
     * @return {undefined}
     * 
     *
     * 
     * get the upline of the one that we read at each loop iteration and put all
     * the values of the superior one in our actual one
     * 
     **************************************************************************/
    function deleteLine(start)
    {
        var i,j;
        var actualPiece;
        var indexX,indexY;
        for(i=start;i>0;i--)
        {
            for(j=0;j<12;j++)
            {
                indexY=pieceAct.getMatColIndex(j*25+i*$cadre.width,$cadre.width,h);
                indexX=pieceAct.getMatLinIndex(j*25+i*$cadre.width,$cadre.width,w);
                actualPiece=memoryPiecesLines[indexY][indexX];
                if(actualPiece!==-1)
                {
                    if(i===start)
                    {
                       tabPieces[actualPiece].setPositionValue(j,i,0);                 
                    }
                    else
                    {
                        tabPieces[actualPiece].setPositionValue(j,i,25*j+((1+i)*10*300)); 
                    }
                    memoryPiecesLines[indexY][indexX]=memoryPiecesLines[indexY-1][indexX];
                }
                    
            }
                
        }
        for(j=0;j<12;j++)
        { 
            memoryPiecesLines[0][j]=-1;
        }
    }
    
    
    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * create a temp piece for modification and create
     **************************************************************************/
    
    function modifPieceAct()
    {
        temp=new Piece(pieceAct.getForme());
        temp.clone(pieceAct);
        temp.change(valX,valY,$cadre.width);
        isOnOtherPiece(temp);
        if(!descend)
        {
            pieceAct.clone(temp);
            
            valX=0;
        }
        delete temp;
    }
    
    
    
    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * give the id of actual piece and register in the Canvas's matrix
     * 
     **************************************************************************/
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
    
    
    /***************************************************************************
     * 
     * debugging's function
     * 
     **************************************************************************/
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
    
    /***************************************************************************
     * 
     * part handing the verification function
     *
     **************************************************************************/
    
    /***************************************************************************
     * 
     * @param {type} pieceAct
     * @return {Boolean}
     * 
     * Watch if the tetris touch the top border of the canvas
     * 
     **************************************************************************/
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
    
    /***************************************************************************
     * 
     * @param {type} temp
     * @return {Boolean}
     * 
     * 
     * Watch if a other piece was there before
     * 
     **************************************************************************/
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

    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * watch if the lines was full and ask the delete of this one
     * and improve the score if the lines is full
     * 
     **************************************************************************/
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
               point+=10;
               $("#Points").text(point+" pts.");
               deleteLine(i);
           }
       }
    }
    
  
    
    
    /***************************************************************************
     * 
     * Function which turn without stopping, core of the program
     * Call other functions + create new piece or call the end of the program (or the reastart)
     * 
     * create a new random piece and switch the visibility between the replay text
     * and the game
     **************************************************************************/
    function draw()
    {
        $ctx.clearRect(0,0,$cadre.width,$cadre.height);
        drawPictures();
        creaRand(pieceAct);
        grid();
        if((!(pieceAct.isBottom()))&&(!descend))
        { 
            modifPieceAct();
            window.requestAnimationFrame(function(){setTimeout(draw, 500);});
        }
        else
        {
            descend=false;
            pieceAct.upId();
            tabPieces.push(pieceAct);
            pushPiece();
            verifLines();
            
            valX=0;
            if(!isLoose(pieceAct))
            {
                
                rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
                pieceAct=new Piece(tableauMats[rand]);
                pieceAct.setUp(x,$cadre.width);
                window.requestAnimationFrame(function(){setTimeout(draw, 1000);});
                    
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