class Game{
    constructor(){

    }

    getState(){
        var gameStateref = database.ref('gameState')
        gameStateref.on("value",function(data){
            gameState = data.val();
        })
    }
    update(state){
        database.ref('/').update({
            gameState: state
        })
    }
    start(){
        if(gameState === 0){
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }
        
        car1 = createSprite(100,200);
        car1.addImage(white);
        car2 = createSprite(300,200);
        car2.addImage(red);
        car3 = createSprite(500,200);
        car3.addImage(blue);
        car4 = createSprite(700,200);
        car4.addImage(black);
        carA = [car1, car2, car3, car4]
    }
    play(){
        form.hide();
        //textSize(40)
        //text("Game Starts", 120, 100);
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        if(allPlayers !== undefined){
            background(ground);
            image(track, 0, -displayHeight*4, displayWidth, displayHeight*5)
            var index = 0;
            var x = 250;
            var y;
            for(var plr in allPlayers){
                index = index +1;
                x = x +200;
                y = displayHeight -allPlayers[plr].distance ;
                carA[index -1].x = x;
                carA[index -1].y = y;
                if(index === player.index){
                    stroke(10)
                    fill("red")
                    ellipse(x, y, 60, 60)
                    carA[index-1].shapeColor = "red"
                    camera.position.x = displayWidth/2;
                    camera.position.y = carA[index-1].y;
                }
                //if(plr === "player" + player.index){
                    //fill("red")
                //}else{
                    //fill("black")
                //}
            //displayPosition += 20 
            //textSize(15);
            //text(allPlayers[plr].name+":"+allPlayers[plr].distance, 120, displayPosition)
            }

        }
        if(keyDown(UP_ARROW) && player.index !== null){
            player.distance += 50
            player.update()
        }
        if(player.distance>5250){
            gameState = 2;
            player.rank = player.rank+1
            Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }
    end(){
      console.log("Game Has Ended");
      console.log(player.rank);
      var message = createElement('h2');
      message.html("congratulations "+ player.name + "!!! Your rank is " + player.rank)
      message.position(displayWidth/2 -70, displayHeight/4);
    }
}