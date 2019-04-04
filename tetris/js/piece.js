/* 
 * 
 * 
 * 
 */

var $cadre=$("#cadre");
var incr=0;
class piece  {
    
    constructor(forme)
    {
        this.x=0;
        this.y=0;
        this.id=incr;
        incr++;
        this.forme=forme;
        switch(forme){
            case 'square': this.mat=[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]];
                    break;
            case 'L_forme': this.mat=[[1,1,1,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]];
                    break;
            case 't_forme': this.mat=[[1,0,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                    break;
            case 'line' : this.mat=[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]];
                    break;
            case 'No_L_forme':this.mat=[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]];
                    break;
            case 'Z_forme':this.mat=[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]];
                    break;
            case 'No_Z_forme' : this.mat=[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]];
                    break;
        }
      
    }
    
    
    miseEnPlace(   x,max)
    {
        this.x=x;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                 if(this.mat[i][j]!==0)
                 {
                      this.mat[i][j]=this.mat[i][j]+x+(max*j);
                 }
            }
        }
    }
    
    changement(val_x,val_y,max)
    {
        var first=false;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                 if(this.mat[i][j]!==0)
                 {
                     if(this.mat[i][j]!==0)
                     {
                         if(!first)
                         {
                            this.x=this.mat[i][j]%max;
                            this.y=Math.floor(this.mat[i][j]/max);
                            console.log("x  : "+this.x+" y : "+this.y + " mat : "+this.mat[i][j]+" val_y : "+val_y+" max : "+max);
                            first=!first;
                         }
                         this.mat[i][j]=this.mat[i][j]+val_x+(val_y*max);
                         
                     }
                 }
            }
        }
    }

    touchefond(taille_max,largeur)
    {
        var i,j,max=0;
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
               if(max<this.mat[i][j])
               {
                 max=this.mat[i][j];
               }
            }
        }
        max=(Math.floor(max/largeur));
        return (taille_max-10)<max;
        
    }
    getX()
    {
        return this.x;
    }
    
    getY()
    {
        return this.y;
    }
    
    getForme()
    {
        return this.forme;
    }
  
}




