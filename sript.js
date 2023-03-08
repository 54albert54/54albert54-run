window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width=1450;
    canvas.height=720;
    let enemies=[];
    let score=0;
    let gameover=false;
    const fullScreentButton=document.getElementById=('fullScreenButton');
    let newEnemigo=70


function  myFunction(){
    

}

    class InputHandler{
        constructor(){
            this.keys=[];
            this.touchY='';
            this.touchTreshold=30;
            window.addEventListener('keydown', e=> {
                if ((e.key === "ArrowDown"     ||
                     e.key === "ArrowUp"       ||
                     e.key === "ArrowLeft"     ||
                     e.key === "ArrowRight"     )
                && this.keys.indexOf(e.key)===-1){
                    this.keys.push(e.key)
                  
                } else if (e.key==='Enter' && gameover)restart();

             })
            window.addEventListener('keyup', e =>{
               if (e.key==="ArrowDown"   ||
                   e.key === "ArrowUp"   ||
                   e.key === "ArrowLeft" ||
                   e.key === "ArrowRight" ){
                  this.keys.splice(this.keys.indexOf(e.key),1);
                }         
             });
             window.addEventListener('touchstart', e =>{                
                this.touchY=e.changedTouches[0].pageY
             });
             window.addEventListener('touchmove', e =>{
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
                if (swipeDistance <-this.touchTreshold && this.keys.indexOf('swipe up')===-1) this.keys.push('swipe up');
               else if  (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down')===-1) this.keys.push('swipe down')
                     
               
               
               
               {
                        this.keys.push('swipe down');
                        if (gameover)restart();
                     }
                     
            
                
             });
             window.addEventListener('touchend', e =>{
              
                this.keys.splice(this.keys.indexOf('swipe up'),1)
                this.keys.splice(this.keys.indexOf('swipe down'),1)
                
                
             });
        };
    };
    class Player{
        constructor(gameWidth,gameHeight){
            this.gameHeight=gameHeight-18;
            this.gameWidth=gameWidth;
            this.width=200;
            this.height=200;
            
            this.x=150;
            this.y=this.gameHeight-this.height;
            this.image=playerImage;
            this.frameX=2;
            this.maxFrame=8
            this.frameY=0;
            this.fps=20;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=0;
            this.vy=0;
            this.weight=1;       
        }
    restart(){
        this.x=150;
        this.y=this.gameHeight-this.height-18;
        this.maxFrame=8
        this.frameY=0;


    }

        draw(context){
            //context.fillStyle='white';
            //context.fillRect(this.x, this.y, this.width, this.height )
            ////context.strokeStyle='white'
            ////context.beginPath()
            ////context.arc(this.x + this.width/2, 45+this.y +this.width/3, this.width/3,0,Math.PI*2);
           
            ////context.stroke();
            
            
           

            context.drawImage(this.image, this.frameX*this.width,this.frameY*this.height,this.width,this.height, this.x,this.y, this.width, this.height)
          }
        update(input, deltaTime,enemies){
            //colicion detection
            enemies.forEach(enemy=>{
                const dx =(enemy.x +enemy.width/3-20) - (this.x+this.width/6);
                const dy =(enemy.y+ enemy.height/3) -( 25+this.y +this.height/6);
                const distance =Math.sqrt(dx*dx+dy*dy);
                if (distance<enemy.width/3 +this.width/3){
                    gameover=true;

                }
            })

            //sprite animation
            if (this.frameTimer > this.frameInterval){
            if (this.frameX>=this.maxFrame)this.frameX=0;
            else this.frameX++;
            this.frameTimer=0
            }else{
                this.frameTimer+=deltaTime
            }
            


            // horizontal movement
            if (input.keys.indexOf("ArrowRight") >-1){
            this.speed=5;}
            else if (input.keys.indexOf("ArrowLeft") >-1){
                this.speed=-5;}

            else if (input.keys.indexOf("ArrowUp") >-1 || input.keys.indexOf('swipe up') >-1 && this.onGround()){
                    this.vy-=25;}

           
            else (this.speed=0)

            //horizontal movement 
            this.x+=this.speed;

            if (this.x<0)this.x=0
            else if (this.x>this.gameWidth-this.width)this.x=this.gameWidth-this.width;
            else if (this.y<0)this.y=0
            
            // verical movement
            this.y+=this.vy;
            if (!this.onGround()){
                this.vy+=this.weight;
                this.maxFrame=5;
                this.frameY=1;
                if (this.y <0)this.y+=this.weight;

            } else { this.vy=0;
                this.frameY=0;
                this.maxFrame=8;
                
                
            }
           
        }
        onGround() {
        return this.y >=this.gameHeight-this.height;
        }
       

    };
    class Background{
        constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.image=backgroundImage;
         this.x=0;
         this.y=0;
            this.width=2400;
            this.height=720; 
            this.speed =5;  
            
            
        }

        restart(){
            this.x=0;
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y, this.width, this.height)
            context.drawImage(this.image,this.x+ this.width-this.speed,this.y, this.width, this.height)
        }
        update(){
            this.x-=this.speed;
            if(this.x < 0- this.width)this.x=0

        }


    };
    class Enemy{
        constructor(gameWidth,gameHeight){
            this.gameWidth=gameWidth;
            this.gameHeight=gameHeight-30;
            this.width=160;
            this.height=119;
            this.image=enemyImage;        
            this.x= this.gameWidth;
            this.y=this.gameHeight-this.height;
            this.frameX=0;
            this.maxFrame= 5;
            this.fps=20;
            this.frameTimer=0;
            this.frameInterval= 1000/this.fps;
            this.speed=8
            this.markedForDeletation=false;

            this.image=enemyImage; 

            
             

        }
        draw(context){
            context.drawImage(this.image,this.frameX*this.width,0, this.width,this.height, this.x, this.y,this.width,this.height)
            //context.lineWidth=5;

            //context.strokeStyle='blue'
            //context.beginPath()
            //context.arc(this.x , this.y , this.width/2,0,Math.PI*2);
            //context.stroke();
            //context.strokeStyle='white'
            //context.beginPath()
            //context.arc(this.x-25 + this.width/2 ,  this.y +this.width/3, this.width/3,0,Math.PI*2);
            //context.stroke();           
            //context.strokeRect(this.x , this.y ,this.width, this.height)
           
        
       
        }
        update(deltaTime){
            if (this.frameTimer >this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX=0;
                else this.frameX++;                
                this.frameTimer=0;
                }else{
                    this.frameTimer+=deltaTime;
                }   
                this.x-=this.speed 
                if (this.x < 0-this.width)score++,this.markedForDeletation=true
                    
         }
                }

    function handleEnemies(deltaTime){
        
        if (enemyTimer > enemyInterval+randomEnemyInterval){
            enemies.push(new Enemy(canvas.width,canvas.height))


             randomEnemyInterval=Math.floor(Math.random()*100*newEnemigo);
             newEnemigo=newEnemigo-1
            enemyTimer=0
            console.log(newEnemigo)
            
           
            
         }else{
             
            enemyTimer+=deltaTime
         }
        
        enemies.forEach(enemy =>{
            enemy.draw(ctx)
            enemy.update(deltaTime)
        });
        enemies=enemies.filter(enemies=> !enemies.markedForDeletation)
        

       
        
  
        

    };
    function displayStatusText(context,ctx){
        
        context.fillStyle= 'black'
        context.font = '40px helvetica'
        context.fillText('Score: '+ score,22,55)
        context.fillStyle= 'white'
        context.font = '40px helvetica'
        context.fillText('Score: '+ score,22,50)
        if (gameover){
            context.fillStyle= 'black'
        context.font = '40px helvetica'
        context.fillText('GamerOver, desliza asia abajo',canvas.width/4,210)
        context.fillStyle= 'white'
        context.font = '40px helvetica'
        context.fillText('GamerOver, desliza asia abajo',canvas.width/4,205)
        }

    };

    function restart(){
        player.restart();
        background.restart();
        enemies=[];
        score=0;
        gameover=false;
        animate(0)
    };




    const input= new InputHandler();    
    const player= new Player( canvas.width, canvas.height);
    const background= new Background (canvas.width, canvas.height);
    
    
    function toggleFullScrean(){
        console.log(document.fullscreenElement);
        if (!document.fullscreenElement){
            canvas.requestFullscreen().catch(err =>{alert(`error, can't enable full-screen mode: ${err.message}`);});
        }else{
            document.exitFullscreen();
        }
    };
  
    
    let lastTime=0;
    let enemyTimer=0;
    let enemydifucult=50;
   
    let enemyInterval=500;
    let randomEnemyInterval=Math.random()*1;
    
    

    function animate(timeStamp){
        const deltaTime=timeStamp-lastTime;
        lastTime=timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx)
       background.update();
        player.draw(ctx)
        player.update(input,deltaTime,enemies)
        handleEnemies(deltaTime)
        displayStatusText(ctx)
      
        
        
       if (!gameover) requestAnimationFrame(animate)


    };
    animate(0)
   

});