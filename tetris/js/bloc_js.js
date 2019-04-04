/* 
 * 
 * 
 * 
 */



$(document).ready(function()
{
    const L = "L_forme";
    const No_L = "No_L_forme";
    const Z = "Z_forme";
    const No_Z = "No_Z_forme";
    const T = "t_forme";
    const l = "line";
    const S = "square";
    var descend=true;
    var $cadre=$("#cadre").get(0);
    var $ctx=$("#cadre").get(0).getContext('2d');
    var $pseudo;
    var w,h,rand,x,y;
    var point=0;
    var tableau_Mat=["L_forme","No_L_forme","Z_forme","No_Z_forme","t_forme","line","square"];
    var piece_act;
    var Tab_piece=new Array;
    
    function creaLine()
    {
        $ctx.fillStyle='red';
        $ctx.fillRect(x,y,w*4,h);
    }
    
    function creaCarre()
    {
        $ctx.fillStyle='blue';
        $ctx.fillRect(x,y,w*2,h*2);
    }
   
    function creaT()
    {
        $ctx.fillStyle='yellow';
        $ctx.fillRect(x,y,w*3,h);
        $ctx.fillRect(x+w,y+h,w,h);
    }
    
    function creaL()
    {
        $ctx.fillStyle='green';
        $ctx.fillRect(x,y,w,h*3);
        $ctx.fillRect(x+w,y+2*h,w,h);
    }
    
    function creaNoL()
    {
        $ctx.fillStyle='pink';
        $ctx.fillRect(x,y,w,h*3);
        $ctx.fillRect(x-w,y+2*h,w,h);
    }
    function creaZ()
    {
        $ctx.fillStyle='violet';
        $ctx.fillRect(x,y,w*2,h);
        $ctx.fillRect(x+w,y+h,w*2,h);
    }
    function creaNoZ()
    {
        $ctx.fillStyle='purple';
        $ctx.fillRect(x,y+h,w*2,h);
        $ctx.fillRect(x+w,y,w*2,h);
    }
    
    function creaAlea (rand)
    {
        switch(rand)
        {
            case 0 : creaL();
                break;
            case 1 : creaNoL();
                break;
            case 2 : creaZ();
                break;
            case 3 : creaNoZ();
                break;
            case 4 : creaT();
                break;
            case 5 : creaLine();
                break;
            case 6 : creaCarre();
                break;
        }
    }
    
    function found(chaine)
    {
        for(var i=0;i<tableau_Mat.length;i++)
        {
            if(chaine===tableau_Mat[i])
            {
                return i;
            }
        }
        return -1;
    }
    
    $("#valid").click(function (){
        if($('#pseudo_text').val()!=='')
        {
            $pseudo=$("#pseudo_text").val();
            $("#valid").css("visibility","hidden");
            $("#pseudo_text").css("visibility","hidden");
            $("#pseudo").css("visibility","hidden");
            $("#cadre").css("visibility","visible");
            $("#Pseudo_joueur").text($pseudo);
            $("#Points").text(point+" pts.");
            w=$cadre.width/12;
            h=10;
            rand=Math.floor(Math.random() * Math.floor(tableau_Mat.length));
            y=0;
            x=5*w;
            piece_act=new piece(tableau_Mat[rand]);
            piece_act.miseEnPlace(x,$cadre.width);
            draw();
        }
    });
    
    function dessin()
    {
        tmpX=x;
        tmpY=y;
        for(i=0;i<Tab_piece.length;i++)
        {
            x=Tab_piece[i].getX();
            y=Tab_piece[i].getY();
            creaAlea(found(Tab_piece[i].getForme()));
        }
        x=tmpX;
        y=tmpY;
    }
    
    function init()
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
        if(Tab_piece.length>0)
            dessin();
    }
    
    function verif(temp)
    {
        
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                console.log(i,j);
                for(var k=0;k<Tab_piece.length;k++)
                {   
                    if(Tab_piece[k].isOnIt(temp.mat[i][j]))
                        return false;
                }
            }
        }
        return true;
    }
    
    function draw()
    {
        $ctx.clearRect(0,0,$cadre.width,$cadre.height);
        init();
        creaAlea(rand);
        var temp=piece_act;
        if((!(piece_act.touchefond($cadre.height,$cadre.width/12)))&&(descend))
        { 
            temp.changement(0,h,$cadre.width/12);
            if(!verif(temp))
            {
                descend=false;
            }
            piece_act=temp;
            delete temp;
            y+=h;
        }
        else
        {
            descend=true;
            Tab_piece.push(piece_act);
            y=0;
            rand=Math.floor(Math.random() * Math.floor(tableau_Mat.length));
            piece_act=new piece(tableau_Mat[rand]);
            piece_act.miseEnPlace(x,$cadre.width);
        }
        window.requestAnimationFrame(function(){setTimeout(draw, 1000);});
    }
   
    
    
    
});