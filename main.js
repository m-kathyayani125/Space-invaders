
const scoreEl=document.getElementById('scoreEl');
/* *** 1.SETTING UP THE CANVAS*** */
const canvas=document.getElementById('canvas1')
const c = canvas.getContext('2d')

//fixing the dimensions of canvas to fit covering the whole screen
canvas.width= 1024
canvas.height=576


/* *** 2.CREATING THE PLAYER*** */
class Player{
    constructor(){
       

        this.velocity = {
            x:0,
            y:0
        }
        this.rotation=0
        this.opacity=1
        const image=new Image()
        image.src='My project.png'

        //giving image dimensions will not be applied if not put in loop since it needs time to load
        image.onload=()=>{
            const scale=0.13//scale of image to make it smaller
            this.image=image
            this.width=image.width*scale
            this.height=image.height*scale

            
            //positioning the image after loading
            this.position = {
                //x strats from left to right
                //y starts from top to bottom
    
                x:canvas.width / 2 - this.width / 2,//centering the player//canvas.width/2 will make the left side of the player to be in the center..but to make the image to be in the center we need to subtract half of the width of the image
                y:canvas.height - this.height -20//canvas.height will make the player to be at out of screen//but to make the player to be in the screen we need to subtract the height of the player//it still is very close to the bottom of the screen so we subtract 20
    
            }
        }

    }
    draw(){
        //temporary rectangle for player
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x,this.position.y,this.width,this.height)

       
        c.save()
        c.globalAlpha=this.opacity
        //setting image to player
        //but the image needs to be loaded before it can be drawn
        //if(this.image)//saying if image is loaded then draw it
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
        c.restore()
    }

    update(){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x//adding velocity to position//to make the player move

        }
        
    }
    
}
/* *** 4.CREATING THE projectile*** */

//STEPS:
//1.create projectile--done by creating Projectile class
//2.create array to store projectiles--projectiles=[]
//3.add action to keydown event listener for space --projectiles.push(new Projectile())
//4.garbage collection of projectiles out of screen--by splice in animate function

//4.1 creating projectile class

class Projectile{
    constructor({position,velocity}){
        this.position=position
        this.radius=4
        this.velocity=velocity
    }
    draw(){//for projectile to be drawn
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle='#DC5F00'
        c.fill()
        c.closePath()
    }
    update(){//for projectile to move
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
/* *** 9.CREATING INVADER PROJECTILE*** */

//STEPS:
//1.create rectangular projectiles for invader--done by creating InvaderProjectile class
//2.create array to store projectiles--invaderProjectiles=[]
//3.defining shoot function for invader--invaderProjectiles.push(new InvaderProjectile())
//4. calling update function of invader projectile
//5. sprawning invader projectiles
//6. garbage collection of projectiles out of screen--by splice in animate function
//7.collision detection for invader projectiles to remove player when ivader projectiles hit player
//8. creating particles for invader projectiles
//9. dissapearing invader projectiles when hit by player projectile

//9.1 creating InvaderProjectile class
class InvaderProjectile{
    constructor({position,velocity}){
        this.position=position
        this.velocity=velocity

        this.width=3
        this.height=10
    }
    draw(){//for projectile to be drawn
        c.fillStyle='#FFB200'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){//for projectile to move
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    
}

/* *** 10.ENEMY EXPLOSION*** */

//STEPS:
//1.create enemy explosion--done by creating Particle class
//2.create array to store particles--particles=[]
//3.rending particles--particles.push(new Particle())
//4.creating particles
//5.fading particles

class Particle{
    constructor({position,velocity,radius,color,fades}){
        this.position=position
        this.radius=radius
        this.color=color
        this.velocity=velocity
        this.opacity=1
        //11.2
        this.fades=fades
    }
    draw(){//for projectile to be drawn
        c.save()
        //10.5 fading particles
        c.globalAlpha=this.opacity
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle=this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    update(){//for projectile to move

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    
        //10.5 fading particles
        if(this.fades)
        this.opacity -= 0.01
        //but these come back after fading...so we need to remove them when opacity is less than 0--done by splice in animate function
    }
}

/* *** 5.CREATING THE ENEMY*** */
//STEPS:
//1.create enemy--done by creating Enemy class
//2.create invader object
//3.call invader.update to animate enemy

//5.1 creating enemy class
class Invader{
    constructor({position}){//6.6 diff position for each invader
       

        this.velocity = {
            x:0,
            y:0
        }

        const image=new Image()
        image.src='alien.png'

        //giving image dimensions will not be applied if not put in loop since it needs time to load
        image.onload=()=>{
            const scale=0.25//scale of image to make it smaller
            this.image=image
            this.width=image.width*scale
            this.height=image.height*scale

            
            //positioning the image after loading
            this.position = {
                //x strats from left to right
                //y starts from top to bottom
    
                x:position.x,
                y:position.y
            }
        }

    }
    draw(){
        //temporary rectangle for player
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x,this.position.y,this.width,this.height)

        //setting image to player
        //but the image needs to be loaded before it can be drawn
        if(this.image)//saying if image is loaded then draw it
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }

    update({velocity}){//passes velocity that grid shd move
        if(this.image){
            this.draw()
            this.position.x += velocity.x//adding velocity to position//to make the player move
            this.position.y += velocity.y//adding velocity to position//to make the player move

        }
        
    }

    //9.3 creating shoot function for invader
    shoot(invaderProjectiles){
        invaderProjectiles.push(new InvaderProjectile({
            position:{//projectile comes from bottom middle of invader
                x:this.position.x+this.width/2,
                y:this.position.y+this.height
            },
            velocity:{
                x:0,
                y:5
            }
        }))
                
    }
}

/* *** 6.CREATING MULTIPLE ENEMIES*** */

//STEPS:
//1.create container for enemies--done by creating Grid class
//2.like that we have multiple grids--done by grids=[]
//3.each grid has multipe enemies--done by invaders=[]
//4.to display a enemy..for each grid..for each enemy..draw enemy--done by grid.invaders.forEach(invader=>invader.update())
//5.creating multiple rows and cols of enemies in each grid--nested for loop with random rows and cols(but all are overlapping since all have same position)
//6.to avoid overlapping we need to add some random position to each enemy--done by passing position argument to constructor of Invader class--where position is set in for loop as x:i*25
//7.to make the grid move we need to pass velocity to update function of invader(adding velocity to position of grid will not effect inavders movement)--done by invader.update({velocity:grid.velocity}) in foreach loop of animate function
//8.to grid to bounce when touches edges of screen:--done by if statement in update function of grid class
//9.everytime the bounce they need to go closer and closer to the player(but only once when it hits edge)--done by this.velocity.y=0 outside and this.velocity.y=30 inside of if statement  of update function of grid class

//6.1 creating grid class
class Grid{//grid is the container for the enemies
    constructor(){
        this.position={
            x:0,
            y:0
        }
        this.velocity={
            x:3,
            y:0
        }

        //6.3 each grid has multipe enemies
        //creating array to store enemies
        this.invaders=[]

        //6.5 creating multiple rows and cols of enemies in each grid
        //to create multiple enemies
        const cols=Math.floor(Math.random()*5+10)//random number of cols between 10 and 15
        const rows=Math.floor(Math.random()*3+2)//random number of rows between 2 and 5

        this.width=cols*30//width of grid
        for(let i=0;i<cols;i++){
            for(let j=0;j<rows;j++){
            this.invaders.push(
                new Invader(
                {position:{//6.6 to avoid overlapping we need to add some random position to each enemy
                    x:i*25,//25 determines the spacing between enemies
                    y:j*25}
                }
            ))
        }
    }

    }
    update(){
        //6.7 to make grid move(but not invaders)
        this.position.x += this.velocity.x//creating movement for the grid
        this.position.y += this.velocity.y

        //6.9 moving horizontal after a shift in vertical by hitting edge
        this.velocity.y=0

        //6.8 to grid to bounce when touches edges of screen
        if(this.position.x+this.width>=canvas.width || this.position.x<=0){
            this.velocity.x=-this.velocity.x//for the grid to move in the opposite direction when hits the edge of screen

            //6.9 moving vertically after a hit to edge
            this.velocity.y=30//for the grid to move down when hits the edge of screen
            // but it shd move 30 pixels down only when it hits the edge of screen
            //else it shd move horizontally..so we need to set the velocity.y to 0 out of if..meaning it moves down only when hits edge
        }
    }
}

const player= new Player();

//4.2 creating array to store projectiles
const projectiles=[]//array to store projectiles
//if projectilr object is creted here then it will be created only once and will not be created again
//so we need to create it in the event listener

//5.2 creating invader object
//const invader=new Invader()

//6.2 creating array to store grids
//creating multiple grids with invaders in it
const grids=[new Grid()]
//player.draw()
//the above line doesnot display image as it needs time for image to load and the function is called only once befor the image loads
//so we need to call the function again by then image loads and get displayed

//9.2 creating array to store invader projectiles
const invaderProjectiles=[]

//10.2 creating array 
const particles=[]


//3.1 player idle when no key is pressed
//to help keyboard event listener to know which key is pressed
// generally keydown only enebles the player to move once key is pressed but the player keeps moving and wont stop..
//for that we initially put pressed as false and then when key is pressed we make it true and when key is released we make it false..
//setting pressed as false by default so becomes true only when pressed
const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    space:{
        pressed:false
    }

}
/* *** 7. SPRAWNING GRIDS*** */

//STEPS:
//1.initialise frames to create frames after certain frame count.
//2.create random frame count intervals
//3.increment framecount for every frame
//4.push new grid after certain frame count interval

//7.1 initialising frames count
let frames=1//initiaalising frame count to 0


//7.2 creating random frame count intervals
let randomInterval=Math.floor((Math.random()*500)+200)//to create random interval between 500 and 1000 for sprawning grids
//9.9 game over 
let game={
    over:false,
    active:true
}
let score=0
/* *** 11.BACKGROUND STARS*** */
//STEPS:
//1.create random stars in background
//2.prevent fading
//3.respawn stars after going out of screen

//11.1 creating random stars in background
for(let i=0;i<100;i++){
    particles.push(new Particle({
        position:{
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height
        },
        velocity:{
            x:0,
            y:0.3
        },
        radius:Math.random()*1.5,
        color:'white'
    }))
}

function createParticles({object,color,fades}){
    for(let i=0;i<15;i++){
        particles.push(new Particle({
            position:{x:object.position.x+object.width/2,y:object.position.y+object.height/2},
            velocity:{x:(Math.random()-0.5)*5,y:(Math.random()-0.5)*5},
            radius:Math.random()*3,
            color:color || '#2192FF',
            fades
        }))
    }
}
function animate(){
    if(!game.active)return

    requestAnimationFrame(animate)
    c.fillStyle='#251B37'
    c.fillRect(0,0,canvas.width,canvas.height)

    //5.3 calling invader.update to animate enemy
    //invader.update()

    player.update()
    //player.draw()
    
    //10.3 rendering particles
    particles.forEach((particle,i)=>{

        //11.3 respawning stars after going out of screen
        if(particle.position.y-particle.radius>canvas.height){
            particle.position.x=Math.random()*canvas.width,
            particle.position.y=-particle.radius

        }


        //10.5 removing particles after opacity is 0
        if(particle.opacity<=0)
        {
            setTimeout(()=>{
            particles.splice(i,1)
            },0)
        }
        else{
        particle.update()
        }
    })
    //9.4 calling update function of invader projectile
    invaderProjectiles.forEach((invaderProjectile,index)=>{//to animate invader projectiles 

        //9.6 garbage collection for invader projectiles
        if(invaderProjectile.position.y+invaderProjectile.height>=canvas.height){//to remove invader projectiles when they hit the bottom of screen
            setTimeout(()=>{//to remove invader projectiles after 1 second  
                invaderProjectiles.splice(index,1)//to remove invader projectiles from array
            },0)
        }
        else
        invaderProjectile.update()

        //9.7 collision detection for invader projectiles to remove player when ivader projectiles hit player
        if(invaderProjectile.position.x+invaderProjectile.width>=player.position.x 
            && invaderProjectile.position.x<=player.position.x+player.width 
            && invaderProjectile.position.y+invaderProjectile.height>=player.position.y ){
                console.log('youlose')
                //9.9 disappearing player and invader projectile when player is hit by invader projectile
                setTimeout(()=>{//to remove invader projectiles after 1 second  
                    invaderProjectiles.splice(index,1)//to remove invader projectiles from array
                    player.opacity=0
                    game.over=true
                },0)
                setTimeout(()=>{//to stop game after the player dies
                    
                    game.active=false
                },1500)
                //9.8 creating particles when player is hit
                createParticles({
                    object:player,
                    color:'#FF731D',
                    fades:true
                })
            }
    })
    projectiles.forEach((projectile,index)=>{
        projectile.update()
        //4.4 garbage collection
        if(projectile.position.y+projectile.radius<=0){
            //pojectile.position.y calculatyed from top to center of projectilr (circle)..+projectilr.radius calculates from top to bottom of circle..if less than zero then out of screen
           setTimeout(()=>{
            projectiles.splice(index,1)//remove that projectilr with respective index- one at once
            },0)//to prevent flashing of projectile
        }
        else projectile.update()
    })

    /* *** 8. SHOOT INVADERS*** */
    //STEPS:
    //1.collision detection between projectile and invader
    //2.if collision detected then remove projectile and invader
    //3.update grid width as ivaders die
    //4.remove grid if all invaders are dead

    //6.4 to display a invader
    grids.forEach((grid,gridIndex)=>{
        grid.update()

        //9.5 sprawning invader projectiles
        if(frames%100===0 && grid.invaders.length>0){
            grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(invaderProjectiles)
        }
        grid.invaders.forEach((invader,i)=>{
            invader.update({velocity:grid.velocity})//6.7 each invader has diff velocity..to make invaders move

            //8.1.collision detection
            projectiles.forEach((projectile,index)=>{
                if(
                    projectile.position.y-projectile.radius<=invader.position.y+invader.height &&//from top to projectilr top is less than projectile bottom
                    projectile.position.x+projectile.radius>=invader.position.x &&//if right of projectile is greater than left side of invader
                    projectile.position.x-projectile.radius<=invader.position.x+invader.width &&//left od projectile is less than right of invader
                    projectile.position.y+projectile.radius>=invader.position.y//bottom of projectile is greater than top of invader
                ){

                    
                    //8.2 if collision detected then remove projectile and invader
                    setTimeout(()=>{
                        const invaderFound=grid.invaders.find(invader2=>invader2===invader)//to find the invader that is hit
                        const projectileFound=projectiles.find(projectile2=>projectile2===projectile)//to find the projectile that is hit


                        if(invaderFound && projectileFound){

                            score+=100
                            console.log(score)
                            scoreEl.innerHTML=score
                            //10.4 creating particles
                            createParticles({
                                object:invader,
                                fades:true
                            })
                            grid.invaders.splice(i,1)//remove that invader with respective index- one at once
                            projectiles.splice(index,1)//remove that projectilr with respective index- one at once
                        
                            //8.3 updating grid width
                            if(grid.invaders.length>0){//if there are invaders left in the grid
                                const firstInvader=grid.invaders[0]
                                const lastInvader=grid.invaders[grid.invaders.length-1]

                                grid.width=lastInvader.position.x-firstInvader.position.x+lastInvader.width//grid width is updated to distance between left od first invader to right of last invader
                                grid.position.x=firstInvader.position.x//grid position is updated to left of first invader
                            }
                            //8.4 removing grid if all invaders are dead
                            else{
                                grids.splice(gridIndex,1)
                            }
                        }
                    },0)//to prevent flashing of projectile
                }
            })

        })
    })

    //to prevent player moving out of screen to left
    if(keys.a.pressed && player.position.x >0){
        player.velocity.x = -5//moving left by 5 pixels when a is pressed
        
    }

    //to prevent player moving out of screen to right
    //player.position.x will mark till the left border of player image..so it alone will only prevent its left border from going out of screen
    //so we need to add the width of the player image to it to pull the image left onto screen when prssed entirely right
    else if(keys.d.pressed && player.position.x +player.width < canvas.width ){
        player.velocity.x = 5//moving right by 5 pixels when d is pressed
    } 
    //3.3 making idle back after key is released 
    //we also need to make the player to stop when no key is pressed so we need to add else statement  
    else{
        player.velocity.x = 0
    }
    console.log(frames)
    //7.4 push new grid for different frame count intervals
    if(frames%randomInterval===0){
        frame=0
        grids.push(new Grid())
        randomInterval=Math.floor((Math.random()*500)+500)
    }

    
    //7.3 incrementing framecount for every frame
    frames++//increment in frame count after each frame
}

animate()

/* ***3.MOVING THE PLAYER*** */
// here moving player has 3 steps..
//1.putting the player idle when no key is pressed--done by const keyys block
//2.moving the player when key is pressed--done by keydown event listeners
//3.stopping the player when key is released--done by keyup event listeners and else statement in animate function


//3.2 moving the player when key is pressed
//when key presed it moves
window.addEventListener('keydown',({key})=>{

    if(game.over)return//to prevent player from moving when game is over
    //console.log(key)
    switch(key){
        case 'a':
            console.log('left')
           
            keys.a.pressed=true
            break;
        case 'd':
            console.log('right')
            //player.velocity.x=-5
            keys.d.pressed=true
            break
         case ' ':
            console.log('space')
            //4.3 creating multiple projectiles
            projectiles.push(new Projectile({
                position:{//from where projectiles shd start
                    x:player.position.x+player.width/2,//to make the projectile to come from the center of the player
                    y:player.position.y},
                velocity:{x:0,y:-15}//drops projectile whenever space is pressed
                //-5 to make it move up
            }))//but projectiles once creted will be there in array even if they are out of screen
            //so we need to do garbage collection to remove them frm array as soon as they are out of screen
            break

    }
})

//3.3 stopping the player when key is released
//when key is released it stops
// the const keys block and event listeners together makes the player to move only once when key is pressed and stops when key is released
window.addEventListener('keyup',({key})=>{
    //console.log(key)
    switch(key){
        case 'a':
            console.log('left')
            keys.a.pressed=false
            break;
        case 'd':
            console.log('right')
            keys.d.pressed=false
            break
         case ' ':
            console.log('space')
            //player.velocity.x=-5
            break

    }
})





