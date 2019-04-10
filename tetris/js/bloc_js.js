/* 
 * 
 * 
 * 
 */


$(document).ready(function()
{
   
    var tableauMats=["L_forme","No_L_forme","Z_forme","No_Z_forme","t_forme","line","square"];
    var descend=false;
    var $cadre=$("#cadre").get(0);
    var $ctx=$("#cadre").get(0).getContext('2d');
    var $pseudo;
    var w,h,rand,x,y,val_x,val_y;
    var point=0;
    var pieceAct;
    var tabPieces=new Array;
    var noEvent =1;
    
    
    /******************************************************************************************************************************************************
     * 
     * 
     *****************************************************************************************************************************************************/
    getTime();
    /******************************************************************************************************************************************************
     * 
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
     * 
     ******************************************************************************************************************************************************/
    async function getTime()
    {
        var $time=$("#time");
        var dt= new Date($.now());
        $time.text(dt.getHours()+"h : "+dt.getMinutes()+"m : "+dt.getSeconds()+"s");
        delete dt;
        setTimeout(getTime,60);
    }
    
    
    
    $("#valid").click(function ()
    {
        if($('#pseudo_text').val()!=='')
        {
            $pseudo=$("#pseudo_text").val();
        }
        else
        {
            $pseudo="Joueur 1";
        }
        $("#valid").css("visibility","hidden");
        $("#pseudo_text").css("visibility","hidden");
        $("#pseudo").css("visibility","hidden");
        $("#cadre").css("visibility","visible");
        $("#Pseudo_joueur").text($pseudo);
        $("#Points").text(point+" pts.");
        val_y=h;
        $(document).keydown( function(e)
        {
           switch(e.which) 
            {
                case 39:val_x=w;
                    val_y=0;
                    modifPieceAct();
                    descend=false;
                    val_y=h;
                        break;
                case 37 : val_x=-w;
                    val_y=0;
                    modifPieceAct();
                    descend=false;
                    val_y=h;
                    break;
                case 40 : val_y=h;
                          modifPieceAct();
                    break;
                case 32: var temp=new piece(pieceAct.forme);
                    temp.clone(pieceAct);
                    temp.rotate();
                    val_x=0;
                    val_y=0;
                    temp.change(val_x,val_y,$cadre.width);
                    isOnOtherPiece(temp);
                    if(!descend)
                    {
                        pieceAct.clone(temp);
                        creaRand(pieceAct);
                    }
                    descend=false;
                    val_y=h;
                    break;
            }
        });
        val_x=0;
        w=$cadre.width/12;
        h=10;
        val_y=h;
        rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
        y=0;
        x=5*w;
        pieceAct=new piece(tableauMats[rand]);
        pieceAct.setUp(x,$cadre.width);
        draw();
    });
    

    function modifPieceAct()
    {
        temp=new piece(pieceAct.getForme());
        temp.clone(pieceAct);
        temp.change(val_x,val_y,$cadre.width);
        isOnOtherPiece(temp);
        if(!descend)
        {
            pieceAct.clone(temp);
            
            val_x=0;
        }
        delete temp;
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
            for(j=0;j<4;j++)
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
            tabPieces.push(pieceAct);
            verifLines();
            val_x=0;
            rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
            if(!isLoose(pieceAct))
            {
                
                pieceAct=new piece(tableauMats[rand]);
                pieceAct.setUp(x,$cadre.width);
                window.requestAnimationFrame(function(){setTimeout(draw, 200);});
                    
            }
            else
            {
                if ( confirm( "Voulez vous rejouez ?") ) {
                    tabPieces=[];
                    descend=false;
                    rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
                    pieceAct=new piece(tableauMats[rand]);
                    pieceAct.setUp(x,$cadre.width);
                    window.requestAnimationFrame(function(){setTimeout(draw, 200);});
                } else {
                    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
                }
            }
        }
    }    
});