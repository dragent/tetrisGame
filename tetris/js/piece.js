/* 
 * 
 * 
 * 
 */

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
    
    
    miseEnPlace(x,max)
    {
        this.x+=x;
        this.y=10;
        for(var i=0;i<4;i++)
        {
            for(var j=0;j<4;j++)
            {
                 if(this.mat[i][j]!==0)
                 {
                      this.mat[i][j]=x+(i*25)+(max*(j*10));
                 }
            }
        }
    }
    
    changement(val_x,val_y,max)
    {
        var first=false;
        var min;
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
                           min=this.mat[i][j];
                           first=!first;
                        }
                        else if (min>this.mat[i][j])
                        {
                            min=this.mat[i][j];
                        }
                        this.mat[i][j]=(this.x+(25*i)+val_x);
                        this.mat[i][j]+=((this.y+j*10+val_y)*max);
                     }
                 }
            }
        }
        this.x+=val_x;
        this.y+=val_y;
           
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
        max=max/largeur;
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
    
    isOnIt( pos)
    {
        for(i=0;i<4;i++)
        {
            for(j=0;j<4;j++)
            {
                if((this.mat[i][j]===pos)&&(pos>0))
                {
                    return true;
                }
            }
        }
        return false;
    }
    
    getMatX( i, j,w)
    {   
        console.log(this.mat[i][j]);
       return (this.mat[i][j]%w);
    }
    
    getMatY(i, j,w)
    {
       return(this.mat[i][j]/w);
    }
}




