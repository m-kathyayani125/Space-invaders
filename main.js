
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

        this.rotation=0

        const image=new Image()
        image.src='My project.png'

        //giving image dimensions will not be applied if not put in loop since it needs time to load
        image.onload=()=>{
            const scale=0.15//scale of image to make it smaller
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

       c.save()//captures the current state of canvas

        // when we call rotate then canvas rotates over top left corner
        //so we capture the current position of the player and move the canvas to center of the player
        //so we need to translate the canvas to the center of the player
        c.translate(player.position.x + player.width / 2, 
        player.position.y + player.height / 2)
        //this.position.x this.position.y is the top left corner of the player
        //this.position.x + this.width / 2,this.position.y + this.height / 2 is the center of the player

       c.rotate(this.rotation)//rotating the canvas


        //to take canvas back to its position
        c.translate(-player.position.x - player.width / 2,- player.position.y - player.height / 2)
        //setting image to player
        //but the image needs to be loaded before it can be drawn
        
        if(this.image)//saying if image is loaded then draw it
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    
        c.restore()//restores the state of canvas
    }



    update(){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x//adding velocity to position//to make the player move

        }
        
    }
}

const player= new Player();
player.draw()
//the above line doesnot display image as it needs time for image to load and the function is called only once befor the image loads
//so we need to call the function again by then image loads and get displayed

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
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    //player.draw()

    //to prevent player moving out of screen to left
    if(keys.a.pressed && player.position.x >0){
        player.velocity.x = -5//moving left by 5 pixels when a is pressed
        player.rotation=-0.15//to add tilting effect while moving left
    }

    //to prevent player moving out of screen to right
    //player.position.x will mark till the left border of player image..so it alone will only prevent its left border from going out of screen
    //so we need to add the width of the player image to it to pull the image left onto screen when prssed entirely right
    else if(keys.d.pressed && player.position.x +player.width < canvas.width ){
        player.velocity.x = 5//moving right by 5 pixels when d is pressed
    } 
    //we also need to make the player to stop when no key is pressed so we need to add else statement  
    else{
        player.velocity.x = 0
    }
}

animate()

/* ***MOVING THE PLAYER*** */
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
            //player.velocity.x=-5
            break

    }
})
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


// here moving player has 3 steps..
//1.putting the player idle when no key is pressed--done by const keyys block
//2.moving the player when key is pressed--done by keydown event listeners
//3.stopping the player when key is released--done by keyup event listeners and else statement in animate function
