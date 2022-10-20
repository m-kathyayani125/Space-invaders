
/* *** 1.SETTING UP THE CANVAS*** */
const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')

//fixing the dimensions of canvas to fit covering the whole screen
canvas.width= window.innerWidth
canvas.height=window.innerHeight

/* *** 2.CREATING THE PLAYER*** */
class Player{
    constructor(x,y,radius,color){
       

        this.velocity = {
            x:0,
            y:0
        }

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

        //setting image to player
        //but the image needs to be loaded before it can be drawn
        if(this.image)//saying if image is loaded then draw it
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }


}

const player= new Player();
player.draw()
//the above line doesnot display image as it needs time for image to load and the function is called only once befor the image loads
//so we need to call the function again by then image loads and get displayed
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.draw()
}

animate()

/* *** 3.MOVING THE PLAYER*** */
