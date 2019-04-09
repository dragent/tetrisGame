/* 
 * 
 * 
 * 
 */


$(document).ready(function()
{
   
    var tableauMats=["L_forme","No_L_forme","Z_forme","No_Z_forme","t_forme","line","square"];
    var descend=true;
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
    
    function creaCarre()
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
    
    function quadrillage()
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
    
    
    function creaAlea (pieceAff)
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
            case "square" : creaCarre();
                break;
        }
      /*  console.log(pieceAff.getX());
        console.log(pieceAff.getY());*/
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
    function dessin()
    {
        tmpX=x;
        tmpY=y;
        for(i=0;i<tabPieces.length;i++)
        {
            x=tabPieces[i].getX();
            y=tabPieces[i].getY();
            creaAlea(tabPieces[i]);
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
                        break;
                case 37 : val_x=-w;
                    break;
                case 40 : noEvent=false;
                    break;
                case ' ': pieceAct.rotate();
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
        pieceAct.miseEnPlace(x,$cadre.width);
        draw();
    });
    

    
  
    
    /********************
     * 
     * @param {type} pieceAct
     * @return {Boolean}
     */
    function  verifLoose(pieceAct)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                if((pieceAct.mats[i][j]<$cadre.width)&&(pieceAct.mats[i][j]>0))
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
    function verif(temp)
    {
        
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                for(var k=0;k<tabPieces.length;k++)
                {   
                    if(tabPieces[k].isOnIt(temp.mats[i][j]))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    
    function clone(clone,vrai)
    {
        clone.setX(vrai.getX());
        clone.setY(vrai.getY());
        clone.id=vrai.id;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                clone.mats[i][j]=vrai.mats[i][j];
            }
        }
    }
    
    function draw()
    {
        $ctx.clearRect(0,0,$cadre.width,$cadre.height);
        if(tabPieces.length>0)
            dessin();
        creaAlea(pieceAct);
        quadrillage();
        temp=new piece(pieceAct.getForme());
        clone(temp, pieceAct);
        if((!(pieceAct.touchefond($cadre.height,$cadre.width)))&&(descend) )
        { 
            temp.changement(val_x,val_y,$cadre.width);
            if(verif(temp))
            {
                descend=false;
            }
            else
            {
                
                clone(pieceAct,temp);
                val_x=0;
            }
            if(noEvent)
                window.requestAnimationFrame(function(){setTimeout(draw, 200);});
            else
            {
               noEvent=true;
               draw();
            }
        }
        else
        {
            descend=true;
            tabPieces.push(pieceAct);
            val_x=0;
            rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
            if(!verifLoose(pieceAct))
            {
                
                pieceAct=new piece(tableauMats[rand]);
                pieceAct.miseEnPlace(x,$cadre.width);
                window.requestAnimationFrame(function(){setTimeout(draw, 200);});
                    
            }
            else
            {
                if ( confirm( "Message à afficher" ) ) {
                    tabPieces=[];
                    rand=Math.floor(Math.random() * Math.floor(tableauMats.length));
                    pieceAct=new piece(tableauMats[rand]);
                    pieceAct.miseEnPlace(x,$cadre.width);
                    window.requestAnimationFrame(function(){setTimeout(draw, 200);});
                } else {
                    // Code à éxécuter si l'utilisateur clique sur "Annuler" 
                }
            }
        }
    }    
});