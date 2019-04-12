/* 
 * 
 * 
 * 
 */

//private static var for id
var incr=0;

//private function on codition side
function   verifSide(actX,i,valX,max)
{
    return (((actX+(i*25)+valX)<0)||((actX+(i*25)+valX)>=max));
}
 
 
/*******************************************************************************
 ************************* private Rotation Function ***************************
 ******************************************************************************/ 
function rotateForm0(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 'L_forme': piece.mats=[[1,1,1,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=3;
                break;
        case 't_forme': piece.mats=[[1,0,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 'line' : piece.mats=[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]];
                        piece.h=4;
                break;
        case 'No_L_forme':piece.mats=[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=3;
                break;
        case 'Z_forme':piece.mats=[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 'No_Z_forme' : piece.mats=[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
    }
}

function rotateForm1(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                break;
        case 'L_forme': piece.mats=[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 't_forme': piece.mats=[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=3;
                break;
        case 'line' : piece.mats=[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=1;
                break;
        case 'No_L_forme':piece.mats=[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]];
                        piece.h=3;
                break;
        case 'Z_forme':piece.mats=[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 'No_Z_forme' : piece.mats=[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
    }
}

function rotateForm2(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 'L_forme': piece.mats=[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 't_forme': piece.mats=[[0,0,1,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]];
                        piece.h=3;
                break;
        case 'line' : piece.mats=[[0,0,0,1],[0,0,0,1],[0,0,0,1],[0,0,0,1]];
                        piece.h=4;
                break;
        case 'No_L_forme':piece.mats=[[1,1,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.h=3;
                break;
        case 'Z_forme':piece.mats=[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
        case 'no_Z_forme':piece.mats=[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.h=2;
                break;
    }
}
function rotateForm3(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=2;
                break;
        case 'L_forme': piece.mats=[[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]];
                       piece.h=3;
                break;
        case 't_forme': piece.mats=[[1,1,1,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=2;
                break;
        case 'line' : piece.mats=[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=1;
                break;
        case 'No_L_forme':piece.mats=[[1,0,0,0],[1,0,0,0],[1,1,0,0],[0,0,0,0]];
                       piece.h=3;
                break;
        case 'Z_forme':piece.mats=[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=2;
                break;
        case 'No_Z_forme' : piece.mats=[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]];
                       piece.h=2;
                break;
    }
}

class Piece  {
    
    /*
     * 
     * @param {type} forme
     * @return {piece}
     * 
     * Constructor of Piece object
     */
    constructor(forme)
    {
        this.x=0;
        this.y=0;
        this.id=incr;
        this.forme=forme;
        rotateForm0(this);
        this.state=0;
    }  
    
    
    /***************************************************************************
     *********** Coding's part on modification and setting position ************
     **************************************************************************/
    
    setUp(x,max)
    {
        this.x+=x;
        this.y=10;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                 if(this.mats[i][j]!==0)
                 {
                      this.mats[i][j]=x+(i*25)+(max*(j*10));
                 }
            }
        }
    }
    
    change(valX,valY,max)
    {
        var sortie=false;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                if(this.mats[i][j]!==0)
                { 
                   if(verifSide(this.x,i,valX,max))
                   {
                       sortie=true;
                   }
                   this.mats[i][j]=(this.x+(25*i)+valX);
                   this.mats[i][j]+=((this.y+j*10+valY)*max);
                 }
                 else
                 {
                      this.mats[i][j]=0;
                 }
            }
        }
        if(sortie)
        {
            for(var i=0;i<4;i++)
            {
                for(var j=0;j<4;j++)
                {
                    if(this.mats[i][j]!==0)
                    {
                        this.mats[i][j]+=-valX;
                    }
                }
            }
        }
        else
        {
          this.x+=valX;
        }
        this.y+=valY;
    }

    rotate()
    {
        this.state=(this.state+1)%4;

        switch(this.state)
        {
            case 0 : rotateForm0(this);
                break;
            case 1 : rotateForm1(this);
                break;
            case 2 : rotateForm2(this);
                break;
            case 3 : rotateForm3(this);
                break;
        }
    }
    
    /***************************************************************************
    ************************* Coding's part of Verification ********************
    ***************************************************************************/
    isBottom(taille_max,largeur)
    {
        var i,j,max=0;
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
               if(max<this.mats[i][j])
               {
                 max=this.mats[i][j];
               }
            }
        }
        max=max/largeur;
        return (taille_max-10)<max;        
    }

    isOnIt( pos)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                if((this.mats[i][j]===pos)&&(pos>0))
                {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**************************************************************************
     ***********************  Coding's part on getter *************************
     *************************************************************************/
    
    getMatX( i, j,w)
    {   
       return this.mats[i][j]%w;
    }
    
    getMatLinIndex(pos,max,w)
    {
        return (pos%max)/w;
    }
    
    getMatColIndex(pos,max)
    {
        return  Math.floor((pos/max));
    }
    
    getMatY(i, j,w)
    {
       
       return Math.floor(this.mats[i][j]/w);
    }
    
    getX()
    {
        return this.x;
    }
    
    getY()
    {
        return this.y;
    }
    
    getId()
    {
        return this.id;
    }
    
    getForme()
    {
        return this.forme;
    }
    
    /**************************************************************************
     ***********************  Coding's part on setter *************************
     *************************************************************************/
    setX(x)
    {
       this.x=x;
    }
    
    setY(y)
    {
       this.y=y;
    }
    
    setForme(forme)
    {
        this.forme=forme;
    }
    
    upId()
    {
        this.id=incr;
        incr++;
    }
    
    setPositionValue(x,y)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                    console.log( "value : "+this.mats[i][j]+"   /  " + (25*x+((y-1)*10*300)+" x "+x+"   y  "+y));
               if(this.mats[i][j]===(25*x+y*10))
                {
                    this.mats[i][j]=25*x+(y-1)*10; 
                    break;
                }
            }
        }
    }
    
    clone(vrai)
    {
        this.setX(vrai.getX());
        this.setY(vrai.getY());
        this.id=vrai.id;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                this.mats[i][j]=vrai.mats[i][j];
            }
        }
        this.state=vrai.state;
    }
}




