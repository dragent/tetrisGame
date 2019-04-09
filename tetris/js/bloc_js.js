/* 
 * 
 * 
 * 
 */


$(document).ready(function()
{
   
    var tableau_Mat=["L_forme","No_L_forme","Z_forme","No_Z_forme","t_forme","line","square"];
    var descend=true;
    var $cadre=$("#cadre").get(0);
    var $ctx=$("#cadre").get(0).getContext('2d');
    var $pseudo;
    var w,h,rand,x,y,val_x,val_y;
    var point=0;
    var piece_act;
    var Tab_piece=new Array;
    
    
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
                if(pieceAff.mat[i][j]!==0)
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
        for(i=0;i<Tab_piece.length;i++)
        {
            x=Tab_piece[i].getX();
            y=Tab_piece[i].getY();
            creaAlea(Tab_piece[i]);
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
                case 40 : val_y+=h;
                    break;
            }
        });
        val_x=0;
        w=$cadre.width/12;
        h=10;
        val_y=h;
        rand=Math.floor(Math.random() * Math.floor(tableau_Mat.length));
        y=0;
        x=5*w;
        piece_act=new piece(tableau_Mat[rand]);
        piece_act.miseEnPlace(x,$cadre.width);
        draw();
    });
    

    
  
    
    /********************
     * 
     * @param {type} piece_act
     * @return {Boolean}
     */
    function  verifLoose(piece_act)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                if((piece_act.mat[i][j]<$cadre.width)&&(piece_act.mat[i][j]>0))
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
                for(var k=0;k<Tab_piece.length;k++)
                {   
                    if(Tab_piece[k].isOnIt(temp.mat[i][j]))
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /*
     * 
     */
    function verifBorder(temp)
    {
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<4;j++)
            {   
                if((temp.getMatX(i,j,w)<0)||(temp.getMatX(i,j,w)>w))
                    return true;
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
                clone.mat[i][j]=vrai.mat[i][j];
            }
        }
    }
    function draw()
    {
        $ctx.clearRect(0,0,$cadre.width,$cadre.height);
        if(Tab_piece.length>0)
            dessin();
        creaAlea(piece_act);
        quadrillage();
        temp=new piece(piece_act.getForme());
        clone(temp, piece_act);
        if((!(piece_act.touchefond($cadre.height,$cadre.width)))&&(descend) && !(verifBorder(temp)))
        { 
            temp.changement(val_x,val_y,$cadre.width);
            if(verif(temp))
            {
                descend=false;
            }
            else
            {
                
                clone(piece_act,temp);
                y+=val_y;
                x+=val_x;
                val_x=0;
                val_y=h;
            }
            window.requestAnimationFrame(function(){setTimeout(draw, 200);});
        }
        else
        {
            descend=true;
            Tab_piece.push(piece_act);
            y=0;
            x=5*w;
            val_x=0;
            val_y=h;
            rand=Math.floor(Math.random() * Math.floor(tableau_Mat.length));
            if(!verifLoose(piece_act))
            {
                
                piece_act=new piece(tableau_Mat[rand]);
                piece_act.miseEnPlace(x,$cadre.width);
                window.requestAnimationFrame(function(){setTimeout(draw, 200);});
            }
            else
            {
                $("#cadre").css("visibility","hidden");
            }
        }
    }    
});