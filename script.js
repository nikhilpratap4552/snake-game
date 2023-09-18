let inputDir ={x:0, y:0};
let speed= 6;
let lastpaintTime=0;
let score=0;
let snakeArr =[
    {x:13, y:5}
];
food={x:6, y:7};

// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime -lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
    
}
function isCollide(snake) {
    // snake itself collide
    for(let i=1; i< snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y ===snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 23 || snake[0].x <=0 || snake[0].y >= 23 || snake[0].y <= 0){
        return true;
    }


}

function gameEngine(){
    // part1 update snake
    if(isCollide(snakeArr)){
        inputDir ={x:0, y:0};
        alert("GAME OVER . PRESS ANY KEY TO PLAY");
        snakeArr =[{x:13, y:5}];
        score = 0;
    };
    //if snake eaten the food, increment the score
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score +=1;
        scorebox.innerHTML = "score : " +score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+ (b-a)*Math.random()),y:Math.round(a+ (b-a)*Math.random())}
    }
    // move the snake
    for(let i=snakeArr.length - 2; i>=0; i--){
        
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part2 
    
    // display the snake
    Board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement =document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        Board.appendChild(snakeElement);
    });
    //display the food 
    foodElement =document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    Board.appendChild(foodElement);
}


//main logic
window.requestAnimationFrame(main); 
window.addEventListener('keydown',e =>{
    inputDir ={ x:0, y:1} // start game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;   
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        default:
            break;
    }
})


