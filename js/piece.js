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
                        piece.setH(2);
                break;
        case 'L_forme': piece.mats=[[1,1,1,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]];
                       piece.setH(3);
                break;
        case 't_forme': piece.mats=[[1,0,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
        case 'line' : piece.mats=[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]];
                        piece.setH(1);
                break;
        case 'No_L_forme':piece.mats=[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(3);
                break;
        case 'Z_forme':piece.mats=[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
        case 'No_Z_forme' : piece.mats=[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
    }
}

function rotateForm1(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                break;
        case 'L_forme': piece.mats=[[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
        case 't_forme': piece.mats=[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(3);
                break;
        case 'line' : piece.mats=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,1,1,1]];
                       piece.setH(4);
                break;
        case 'No_L_forme':piece.mats=[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]];
                        piece.setH(2);
                break;
        case 'Z_forme':piece.mats=[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(3);
                break;
        case 'No_Z_forme' : piece.mats=[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(3);
                break;
    }
}

function rotateForm2(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
        case 'L_forme': piece.mats=[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(3);
                break;
        case 't_forme': piece.mats=[[0,0,1,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]];
                        piece.setH(3);
                break;
        case 'line' : piece.mats=[[0,0,0,1],[0,0,0,1],[0,0,0,1],[0,0,0,1]];
                        piece.setH(4);
                break;
        case 'No_L_forme':piece.mats=[[1,1,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]];
                        piece.setH(3);
                break;
        case 'Z_forme':piece.mats=[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
        case 'no_Z_forme':piece.mats=[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                        piece.setH(2);
                break;
    }
}
function rotateForm3(piece)
{
    switch(piece.forme){
        case 'square': piece.mats=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.setH(2);
                break;
        case 'L_forme': piece.mats=[[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]];
                       piece.setH(3);
                break;
        case 't_forme': piece.mats=[[1,1,1,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.setH(3);
                break;
        case 'line' : piece.mats=[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.setH(4);
                break;
        case 'No_L_forme':piece.mats=[[1,0,0,0],[1,0,0,0],[1,1,0,0],[0,0,0,0]];
                       piece.setH(2);
                break;
        case 'Z_forme':piece.mats=[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                       piece.setH(3);
                break;
        case 'No_Z_forme' : piece.mats=[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]];
                       piece.setH(3);
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
    
    /***************************************************************************
     **************** change all the value of the object matrix ***************
     ****************** with the orientation of valX  and ValY *****************
     *********************** Comparing with maxWidth Value *********************
     **************************************************************************/
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



    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * 
     *  call the next Rotation function thanks the next state of rotation of
     *  the object 
     **************************************************************************/
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
   
   /****************************************************************************
    * 
    * @return {Boolean}
    * 
    * return true if the height of the object 
    * and his position on the canvas > max height
    ***************************************************************************/
    isBottom()
    {
        return (this.y+this.h*10)>140;        
    }


    /***************************************************************************
     * 
     * @param {type} pos
     * @return {Boolean}
     * 
     * 
     * Watch if the object got a value of his matrix on the location selected
     **************************************************************************/
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
    
    
    /***************************************************************************
     * 
     * @param {type} i
     * @param {type} j
     * @param {type} w
     * @return {Piece@arr;@arr;mats}
     * 
     * return the position X of the matrix thanks the value in the matrix
     **************************************************************************/
    getMatX( i, j,w)
    {   
       return this.mats[i][j]%w;
    }
    
    /***************************************************************************
     * 
     * @param {type} pos
     * @param {type} max
     * @return {Piece@arr;@arr;mats}
     * 
     * return the  line's position of the matrix thanks pos in the canvas
     **************************************************************************/
    getMatLinIndex(pos,max,w)
    {
        return (pos%max)/w;
    }
    
    /***************************************************************************
     * 
     * @param {type} pos
     * @param {type} max
     * @return {Piece@arr;@arr;mats}
     * 
     * return the Columns position of the matrix thanks pos in the canvas
     **************************************************************************/
    getMatColIndex(pos,max)
    {
        return  Math.floor((pos/max));
    }
    
    
    /***************************************************************************
     * 
     * @param {type} i
     * @param {type} j
     * @param {type} w
     * @return {Piece@arr;@arr;mats}
     * 
     * return the Y position of the matrix thanks pos in the matrix
     **************************************************************************/
    getMatY(i, j,w)
    {
       
       return Math.floor(this.mats[i][j]/w);
    }

    /***************************************************************************
     * 
     * @return {int}
     * 
     * return the X position of the object
     **************************************************************************/
    getX()
    {
        return this.x;
    }
    
    /***************************************************************************
     * 
     * @return {int}
     * 
     * return the Y position of the object
     **************************************************************************/
    getY()
    {
        return this.y;
    }
    
    
    /***************************************************************************
     * 
     *  @return {int}
     * 
     * return the id
     **************************************************************************/
    getId()
    {
        return this.id;
    }
    /***************************************************************************
     * 
     * @return {unresolved}
     * 
     * return the forme of the object
     **************************************************************************/
    getForme()
    {
        return this.forme;
    }
    
    
    /***************************************************************************
     * 
     * @return {unresolved}
     * 
     * return the height of the object
     **************************************************************************/
    getH()
    {
        return this.h;
    }
    
    /***************************************************************************
     ***********************  Coding's part on setter **************************
     **************************************************************************/
     
    /***************************************************************************
     * 
     * @param {type} h
     * @return {undefined}
     * 
     * set the new Height at h
     **************************************************************************/
    setH(h)
    {
        this.h=h;
    }
    
    /***************************************************************************
     * 
     * @param {type} X
     * @return {undefined}
     * 
     * set the new x postion at X
     **************************************************************************/
    setX(x)
    {
       this.x=x;
    }
    
    /***************************************************************************
     * 
     * @param {type} Y
     * @return {undefined}
     * 
     * set the new y position at Y
     **************************************************************************/
    setY(y)
    {
       this.y=y;
    }
    
    
    /***************************************************************************
     * 
     * @param {type} forme
     * @return {undefined}
     * 
     * set the forme of the actual object
     **************************************************************************/
    setForme(forme)
    {
        this.forme=forme;
    }
    
    /***************************************************************************
     * 
     * @return {undefined}
     * 
     * increment of the static id Var
     **************************************************************************/
    upId()
    {
        this.id=incr;
        incr++;
    }
    
    
    /***************************************************************************
     * 
     * @param {type} x
     * @param {type} y
     * @param {type} val
     * @return {undefined}
     * 
     * 
     * watch if a value on the matrix is on the position X and Y of the canvas
     * and put the new Value instead
     **************************************************************************/
    setPositionValue(x,y,val)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                if(this.mats[i][j]===(25*x+(y*10*300)))
                {
                    this.mats[i][j]=val; 
                    break;
                }
            }
        }
    }
    
    
    /***************************************************************************
     * 
     * @param {type} vrai
     * @return {undefined}
     * 
     * Clone all the value of the Object vrai in the actuel Object
     **************************************************************************/
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
        this.setH(vrai.getH());
        this.state=vrai.state;
    }
}




