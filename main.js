
/* *** 1.SETTING UP THE CANVAS*** */
const canvas=document.getElementById('canvas1')
const c = canvas.getContext('2d')

//fixing the dimensions of canvas to fit covering the whole screen
canvas.width= window.innerWidth
canvas.height=window.innerHeight

/* *** 2.CREATING THE PLAYER*** */
class Player{
    constructor(){
       

        this.velocity = {
            x:0,
            y:0
        }
        
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

       


        //setting image to player
        //but the image needs to be loaded before it can be drawn
        //if(this.image)//saying if image is loaded then draw it
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    
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
        this.radius=3
        this.velocity=velocity
    }
    draw(){//for projectile to be drawn
        c.beginPath()
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle='red'
        c.fill()
        c.closePath()
    }
    update(){//for projectile to move
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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

        this.width=cols*25//width of grid
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
let frames=1//initiaalising frame count to 0
let randomInterval=Math.floor((Math.random()*500)+200)//to create random interval between 500 and 1000 for sprawning grids
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)

    //5.3 calling invader.update to animate enemy
    //invader.update()

    player.update()
    //player.draw()
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

    //6.4 to display a invader
    grids.forEach(grid=>{
        grid.update()
        grid.invaders.forEach(invader=>{
            invader.update({velocity:grid.velocity})//6.7 each invader has diff velocity..to make invaders move
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
    if(frames%randomInterval===0){
        frame=0
        grids.push(new Grid())
        randomInterval=Math.floor((Math.random()*500)+500)
    }
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





