/************************************* */
/*  GAME CREATED BY PLAYMO90STRILOGY   */
/************************************* */


//Audio ON-OFF
function changeAudio(change){
    const audio_button= document.querySelector('#audio_button');
    const play_button= document.querySelector('#play_button');

    if(change){ //If audio on
        //Change onclick attributes of play and audio buttons.
        play_button.setAttribute('onclick','gameplay(true)');
        audio_button.setAttribute('onclick','changeAudio(false)');

        //Change images of audio button.
        audio_button.src="./images/button_sound_off.png"
        audio_button.onmouseover= function() {this.src='./images/button_sound_off.png';};
        audio_button.onmouseout=function() {this.src='./images/button_sound_hover.png';};

    }else{ //If audio off
        //Change onclick attributes of play and audio buttons.
        play_button.setAttribute('onclick','gameplay(false)');
        audio_button.setAttribute('onclick','changeAudio(true)');

        //Change images of audio button.
        audio_button.src="./images/button_sound_hover.png"
        audio_button.onmouseover=function() {this.src='./images/button_sound_hover.png';};
        audio_button.onmouseout=function() {this.src='./images/button_sound_off.png';};
    }
}

//Show Tutorial and Info page
function showPage(show, page){

    if(show){
        //Hide Title page buttons
        const div_buttons= document.querySelector('#buttons_div_id');
        const div_play_button= document.querySelector('#play_div_id');
    
        div_buttons.style.display="none";
        div_buttons.style.zIndex="-1";
        div_play_button.style.display="none";
        div_play_button.style.zIndex="-1";

        if(page=="tutorial"){
            //Show Tutorial
            document.querySelectorAll(".tutorial_div").forEach(function(element){
                element.classList.add("visible");
            });

            const div_close_button= document.querySelector('.close_button_div');
            div_close_button.style.display='flex';
            div_close_button.style.zIndex="1";

        }else if(page=="info"){
            //Show Info
            const div_info= document.querySelector('#info_div_id');
            div_info.style.display="flex";
            div_info.style.zIndex="1";

        }else if(page=="game_over"){
            //Show Game Over
            const div_game_over= document.querySelector('#game_over_div_id');
            div_game_over.style.display="flex";
            div_game_over.style.zIndex="1";

        }
        

    }else{
        //Show Title page buttons
        const div_buttons= document.querySelector('#buttons_div_id');
        const div_play_button= document.querySelector('#play_div_id');
    
        div_buttons.style.display="flex";
        div_buttons.style.zIndex="1";
        div_play_button.style.display="flex";
        div_play_button.style.zIndex="1";

        if(page=="tutorial"){
            //Hide Tutorial
            document.querySelectorAll(".tutorial_div").forEach(function(element){
                element.classList.remove("visible");
            });
            
            const div_close_button= document.querySelector('.close_button_div');
            div_close_button.style.display='none';
            div_close_button.style.zIndex="-1";

        }else if(page=="info"){
            //Hide Info
            const div_info= document.querySelector('#info_div_id');
            div_info.style.display="none";
            div_info.style.zIndex="-1";

        }else if(page=="game_over"){
            //Hide Game Over
            const div_game_over= document.querySelector('#game_over_div_id');
            div_game_over.style.display="none";
            div_game_over.style.zIndex="-1";
        }
        
    }

}



function gameplay(audioActivated){


    /* -------------- GAME VARIABLES -------------- */

    //Canvas
    const title_screen= document.querySelector('#title_screen_id');
    title_screen.style.display='none';
    const canvas = document.querySelector('canvas');
    canvas.style.display="flex";
    const c = canvas.getContext('2d');

    canvas.width = 853;
    canvas.height = 591;

    //Background
    c.fillRect(0, 0, canvas.width, canvas.height);



    //Audio
    var audioOn=audioActivated;

    //Audio: Background Music
    var bk_music= new Audio();
    bk_music.src= "./audio/bk_music.mp3";
    bk_music.loop="true";

    if(audioOn){
        bk_music.play();
    }
    
    //Audio: other sounds
    const fb_audio= "./audio/fireball.mp3";
    const dragons_audios= ["./audio/d1.mp3", "./audio/d2.mp3", "./audio/d3.mp3", "./audio/d4.mp3", "./audio/d5.mp3", "./audio/d6.mp3", "./audio/d7.mp3"];
    const magic_audio= "./audio/m1.mp3";
    const magic_bar_audio= "./audio/m4.mp3";
    const magic_blast_audio= "./audio/m5.mp3";
    let mb_audio_already_played=false;
    const hit_audio= ["./audio/hit1.mp3", "./audio/hit2.mp3", "./audio/hit3.mp3"]
    const game_over_audio="./audio/lose4.mp3";



    //Player
    let player_can_shoot= true;
    let game_over= false


    //Enemies
    let spawn_enemies_interval= 2000;
    let enemy_velocity= 1;
    let last_enemy_x_position=0;
    let enemies = [];
    let all_enemies_dead=false;

    //Fireballs
    let fireBalls = [];

    //Energies
    const spawn_energies_interval=8000;
    let energies= [];
    let last_energy_x_position=0;

    //Explosions
    let explosions=[];
    let magic_blast;

    //Clouds
    const cloudSpritesArray=["./sprites/clouds1.png", "./sprites/clouds2.png", "./sprites/clouds3.png", "./sprites/clouds4.png"];
    let clouds=[];

    //Bars: Helath and Magic Bars
    hb_sprites= ["./sprites/hb1.png", "./sprites/hb2.png", "./sprites/hb3.png", "./sprites/hb4.png", "./sprites/hb5.png", "./sprites/hb6.png", "./sprites/hb7.png", "./sprites/hb8.png", "./sprites/hb9.png", "./sprites/hb10.png", "./sprites/hb11.png"];
    mb_sprites= ["./sprites/mb1.png", "./sprites/mb2.png", "./sprites/mb3.png", "./sprites/mb4.png", "./sprites/mb5.png", "./sprites/mb6.png", "./sprites/mb7.png", "./sprites/mb8.png", "./sprites/mb9.png", "./sprites/mb10.png", "./sprites/mb11.png", ]
    



    /* -------------- CLASSES -------------- */

    class Sprite{
        constructor({height, 
            width, 
            position, 
            imageSrc, 
            scale = 1,
            framesMax = 1,
            offset = { x: 0, y: 0 }
        }){

            this.height = height;
            this.width = width;
            this.position = position;     
            this.image= new Image();
            this.image.src= imageSrc;
            this.scale = scale;         //Enlarge or Diminish sprite dimension.
            this.framesMax = framesMax; //Total number of frames of Sprite Animation.
            this.framesCurrent = 0;
            this.framesElapsed = 0;
            this.framesHold = 5;        //To slow down animation.
            this.offset = offset;    
        }

        
        draw(){
            c.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            )
        }


        animateFrames() {
            this.framesElapsed++
        
            if (this.framesElapsed % this.framesHold === 0) {
              if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
              } else {
                this.framesCurrent = 0
              }
            }
          }


        update(){
            this.draw();
            this.animateFrames()
        }

    }

    class No_Animation_Sprite {
        constructor({
            height, 
            width, 
            position, 
            imageSrc, 
            velocity
        }){
            this.height = height;
            this.width = width;
            this.position = position;     
            this.image= new Image();
            this.image.src= imageSrc;
            this.velocity=velocity;

        }

        draw(){
            c.drawImage(this.image, this.position.x, this.position.y);
        }

        update(){
            this.draw();

            //Update position
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
        }
        
    }

    class Background extends No_Animation_Sprite{
        constructor({
            height, 
            width, 
            position,
            imageSrc,
            velocity,
        }){
            super({height, width, position, imageSrc, velocity});
            
        }

        update(){
            
            this.draw();

            //Update position

            if(this.position.y >= canvas.height){
                this.position.y=(0-this.height)+4;
            }else{
                this.position.y += this.velocity.y;
            }

            
        }

    }

    class Bar {
        constructor({
            height, 
            width, 
            position,
        }){ 
            this.height=height;
            this.width=width;
            this.position=position;    
            this.image= new Image();
            this.image.src= hb_sprites[0];
            this.level= 0;

        }

        draw(){
            c.drawImage(this.image, this.position.x, this.position.y);
        }

        update(sprites){
            
            this.image.src= sprites[this.level];
            this.draw();

        }

    }
    
    class Player extends Sprite{
        constructor({
            height, 
            width, 
            position, 
            imageSrc,
            scale = 1,
            framesMax = 1,
            offset = { x: 0, y: 0 }, 
            velocity, 
            sprites,
        }){
            super({height, width, position, imageSrc, scale, framesMax, offset});

            this.dead = false;
            this.lifeHP = 100;
            this.score = 0;
            this.oldScore = 0;
            this.magicShot= false;
            this.velocity=velocity;
            this.sprites= sprites;
            this.framesHold = 11;
            this.magicXP=0;

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }

        }

        switchSprite(sprite) {
  
            if(sprite!='death'){
                // override when fighter gets hit
                if (
                    this.image === this.sprites.takeHit.image &&
                    this.framesCurrent < this.sprites.takeHit.framesMax - 1
                ){
                    return
                }
            }
            
              
        
            switch (sprite) {
              case 'idle':
                if (this.image !== this.sprites.idle.image) {
                  this.image = this.sprites.idle.image
                  this.framesMax = this.sprites.idle.framesMax
                  this.framesHold= 11;
                  this.framesCurrent = 0
                }
                break
        
              case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                  this.image = this.sprites.takeHit.image
                  this.framesMax = this.sprites.takeHit.framesMax
                  this.framesHold= 11;
                  this.framesCurrent = 0
                }
                break
        
              case 'death':
                if (this.image !== this.sprites.death.image) {
                  this.image = this.sprites.death.image
                  this.framesMax = this.sprites.death.framesMax
                  this.framesHold= 3;
                  this.framesCurrent = 0
                }
                break
            }
        }

          
        takeHit() {
        this.lifeHP -= 10;
    
            if (this.lifeHP <= 0) {
                this.switchSprite('death');
                this.dead=true;
                play_F(game_over_audio,1);
                bk_music.pause();
            } else this.switchSprite('takeHit')
        }


        update(){
            if (
                this.image === this.sprites.takeHit.image &&
                this.framesCurrent === this.sprites.takeHit.framesMax - 1
              ){
                this.switchSprite('idle');
              }

            if (
            this.image === this.sprites.death.image &&
            this.framesCurrent === this.sprites.death.framesMax - 1
            ){
            game_over=true;
            return;
            }

            this.draw();
            this.animateFrames()

        }

        
    }

    class Enemy extends Sprite{
        constructor({
            height, 
            width, 
            position, 
            imageSrc,
            scale = 1,
            framesMax = 1,
            offset = { x: 0, y: 0 }, 
            velocity, 
            sprites,
        }){

            super({height, width, position, imageSrc, scale, framesMax, offset});
            this.velocity= velocity;
            this.alreadyHit= false;
            this.sprites= sprites;

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }
        }

        
        update(){
            this.draw();

            //Update position
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;

            this.animateFrames();
        }

    }

    class FireBall extends Sprite{
        constructor({height, 
            width, 
            position, 
            imageSrc, 
            scale = 1,
            framesMax = 1,
            offset = { x: 0, y: 0 },
            sprites,
            velocity, 
        }){
            super({height, width, position, imageSrc, scale, framesMax, offset});
            this.velocity= velocity;
            this.sprites=sprites;
            this.framesHold = 10;

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }

        }
        
        update(){
            this.draw();

            //Update position
            this.position.y -= this.velocity.y;

            this.animateFrames();
            
        }
    }

    class Energy extends Sprite{
        constructor({
            height, 
            width, 
            position, 
            imageSrc,
            scale = 1,
            framesMax = 1,
            offset = { x: 0, y: 0 },
            sprites, 
            velocity
        }){
            super({height, width, position, imageSrc, scale, framesMax, offset});
            this.velocity=velocity;
            this.sprites= sprites;
            this.framesHold=6;

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }

        }

        update(){
            this.draw();

            //Update position
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;

            this.animateFrames();

        }
        
    }

    class Explosion extends Sprite{
        constructor({
            height, 
            width, 
            position, 
            imageSrc,
            scale = 1,
            framesMax = 1,
            offset = { x: 0, y: 0 },
            sprites,
        }){
            super({height, width, position, imageSrc, scale, framesMax, offset});
            this.sprites= sprites;
            this.framesHold=3;
            this.animation_end=false;

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }

        }

        animateFrames() {
            this.framesElapsed++
        
            if (this.framesElapsed % this.framesHold === 0) {
              if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
              } else {
                this.animation_end=true;
              }
            }
          }


        update(){

            //If the explosion animation is still playing
            if(!this.animation_end){
                this.draw();
                this.animateFrames();
            }else{
                //destroy object
                return this.animation_end;
            }
            
        }
    }





    /* -------------- OBJECTS CREATION -------------- */


    const bk1= new Background({
        height: 591,
        width: 853,
        position:{
            x: 0,
            y: 0,
        },
        imageSrc: "./sprites/sky_1_bk.png",
        velocity:{
            x: 0,
            y: 0.3,
        },
        
    });

    const bk2= new Background({
        height: 591,
        width: 853,
        position:{
            x: 0,
            y: 0-590,
        },
        imageSrc: "./sprites/sky_2_bk.png",
        velocity:{
            x: 0,
            y: 0.3,
        },
        
    });


    const healthBar= new Bar({
        height: 64,
        width: 192,
        position: {
            x: (canvas.width/2)-10,
            y: 2,
        },
    });

    const magicBar= new Bar({
        height: 64,
        width: 192,
        position: {
            x: (canvas.width/2)-192+10,
            y: 2,
        },
    });

    const player = new Player({
        height: 60,
        width: 130,
        position:{
            x: canvas.width/2, 
            y: canvas.height-110
        },
        imageSrc: './sprites/hp_sprites.png',
        framesMax: 4,
        scale:1.1,
        offset: {
            x: 0,
            y: 0
        },
        sprites: {
            idle:{
                imageSrc: './sprites/hp_sprites.png',
                framesMax: 4,
            },
            takeHit: {
                imageSrc: './sprites/hp_hit_sprites.png',
                framesMax: 6,
              },
            death: {
            imageSrc: './sprites/death_sprites.png',
            framesMax: 30,
            },
        },
        velocity:{
            x: 0,
            y: 0
        },   
        
    });




    /* -------------- INTERVALS -------------- */

    //Interval for Enemies creation      
    let interval;                   //Stores the setInterval ID used by clearInterval to stop the timer
    spawn_enemies();
    function spawn_enemies() {      // Function that run at irregular intervals

        createEnemy();
        // Clears the previous setInterval timer
        clearInterval(interval);
        interval = setInterval(spawn_enemies, spawn_enemies_interval);
    }
    
    //Interval for Energies creation
    setInterval(createEnergy, spawn_energies_interval);

    //Interval for player shooting
    setInterval(player_shoot, 500);

    //Interval clouds
    setInterval(createCloud, 3000);






     /* -------------- LISTENERS -------------- */

    //Lister for the mouse movement: the player follows the mouse movement on the x axis.
    window.addEventListener('mousemove', (event) => {
        
        if(!player.dead){
            if(event.x > canvas.width-player.width/2 || event.x < 0 + player.width/2){
                //don't move
            }else{
                player.position.x = event.x-(player.width/2);
            }
        }
        

    });

    //Listener for the mouse click: the player attacks the enemy.
    window.addEventListener('click', (event) => {
        
        if(!player.dead){
            //If the click occours outside the canvas, it's not considered.
            if(event.x > canvas.width || event.x < 0 || event.y > canvas.height || event.y < 0){
                //click not allowed
            }else if(player_can_shoot){
                //Fireball audio
                play_F(fb_audio, 0.5);
                createFireBall();
                //Player has to wait for a few milliseconds before he can shoot again.
                player_can_shoot=false;
            }
        }
        

    });

    //Listener for the space-bar press: the player uses the magic blast.
    window.addEventListener('keydown', (event) => {

        if(!player.dead){

            if(event.key==' ' || event.key=='Space' || event.key==32){
                if(player.magicShot){
                    //Magic shot energy goes back to 0. Update points and magic bar.
                    player.magicXP=0;
                    magicBar.level=0;
                    //Player can't use magic shot again
                    player.magicShot=false;
    
                    all_enemies_dead=true;
    
                    createMagicBlast()
    
                    //Audios
                    play_F(magic_blast_audio,1);
                    mb_audio_already_played=false; //Magic-bar audio reset.
                    random_audio(dragons_audios);
                    random_audio(dragons_audios);
                    random_audio(dragons_audios);
                }
            }

        }
        
    })






    /* -------------- ANIMATION ------------------- */


    function animate(){

        
        if(!game_over){ //If the player is not dead yet, animate the game.

            window.requestAnimationFrame(animate);
            //Clean canvas
            c.fillStyle = 'black';
            c.fillRect(0, 0, canvas.width, canvas.height);

            //Update background
            bk1.update();
            bk2.update();

            //Update score display
            score_display();

            //Update clouds
            if(clouds.length > 0){
                clouds.forEach((cloud, index) => {
                    cloud.update();
                    //Remove clouds out of the canvas
                    if(cloud.position.y > canvas.height){
                        clouds.splice(index, 1);
                        delete cloud;
                    }

                });
            }


            //Update player movements
            player.update();


            //If Magic shot has been fired, kill all the enemies
            if(all_enemies_dead){
                player.score+= enemies.length*10;

                enemies.length=0;
                all_enemies_dead=false;

                checkDifficulty();
            }


            //Update enemies movements
            if(enemies.length > 0){
                enemies.forEach((enemy, index) => {

                    enemy.update();

                    //Remove enemies out of the canvas
                    if(enemy.position.y > canvas.height){
                        enemies.splice(index, 1);
                        delete enemy;
                    }

                    //Check collision with player
                    collisionEnemyPlayer(enemy);

                });
            }


            //If there are fireballs that have been shot, update their movements
            if(fireBalls.length > 0){
                fireBalls.forEach((fireBall, index) => {

                    fireBall.update();

                    //Remove fireballs out of the canvas
                    if(fireBall.position.y < 0){
                        fireBalls.splice(index, 1);
                        delete fireBall;
                    }

                    //Check collision with fireballs
                    collisionFireBalls(fireBall, index);
                });
            }


            //Update explosions until the end of their animation
            if(explosions.length > 0){
                explosions.forEach((explosion, index) => {

                    if(explosion.update()){
                        explosions.splice(index, 1);
                        delete explosion;
                    }

                });
            }


            //Update Magic blast until the end of its animation
            if(magic_blast!=null){

                if(!magic_blast.animation_end){
                    magic_blast.update();
                }else{
                    magic_blast=null;
                }

            }
            

            //If energies have been spawn, update their movements.
            if(energies.length > 0){
                energies.forEach((energy, index) => {
                    
                    energy.update();

                    //Remove energies out of the canvas
                    if(energy.position.y > canvas.height){
                        energies.splice(index, 1);
                        delete energy;
                    }

                    //Check collision iwth player
                    collisionEnergyPlayer(energy, index);
                });
            }


            //Update Health and Magic Bars
            healthBar.update(hb_sprites);
            magicBar.update(mb_sprites);




        }else{ //If the player is dead: show Game Over Screen.
            //Hide canvas
            canvas.style.display="none";
            //Show title screen
            title_screen.style.display='flex';
            //Report final score to player
            let final_score= document.querySelector('#score_id')
            final_score.textContent="Score: "+player.score;
            //Show game over page
            showPage(true,'game_over');
        }
}

    animate();



   


    /* -------------- FUNCTIONS -------------- */


    //Creation

    function createFireBall(){

        var fireball_height= 50;
        var fireball_width= 21;


        var fireBall = new FireBall({
            height: fireball_height,
            width: fireball_width,
            position:{
                x: (player.position.x + player.width/2)-fireball_width/2,
                y: (player.position.y-(fireball_height+30)),
            },
            imageSrc: './sprites/fireball_sprites.png',
            framesMax: 4,
            scale:1.2,
            offset: {
                x: 0,
                y: 0
            },
            velocity:{
                x: 0,
                y: player.velocity.y+5,
            },
        });

        fireBalls.push(fireBall);
    }


    function createEnemy(){
        var enemy_width=140;
        var enemy_height=65;
        var randomNumber = Math.floor(Math.random() * (canvas.width - enemy_width + 1));

        // Don't let the enemies overlap.
        while(last_enemy_x_position-enemy_width < randomNumber && randomNumber <= last_enemy_x_position + enemy_width){
            randomNumber = Math.floor(Math.random() * (canvas.width - enemy_width + 1));
        }


        var enemy= new Enemy({
            height: enemy_height,
            width: enemy_width,
            position:{
                x: randomNumber, 
                y: 0-enemy_height
            },
            imageSrc: './sprites/enemy_sprites.png',
            framesMax: 8,
            scale:0.7,
            offset: {
                x: 0,
                y: 0
            },
            velocity:{
                x: 0,
                y: enemy_velocity
            },
        });

        enemies.push(enemy);
        last_enemy_x_position=randomNumber;
    }


    function createEnergy(){
        var energy_width=50;
        var energy_height= 45;
        var randomNumber = Math.floor(Math.random() * (canvas.width - energy_width + 1));

        // Don't let the enemies overlap.
        while(last_energy_x_position-energy_width < randomNumber && randomNumber <= last_energy_x_position + energy_width){
            randomNumber = Math.floor(Math.random() * (canvas.width - energy_width + 1));
        }


        var energy= new Energy({
            height: energy_height,
            width: energy_width,
            position:{
                x: randomNumber, 
                y: 0-energy_height,
            },
            imageSrc: './sprites/energy_sprites.png',
            framesMax: 10,
            scale:1,
            offset: {
                x: 0,
                y: 0
            },
            velocity:{
                x: 0,
                y: 2
            }            
        });

        energies.push(energy);
        last_energy_x_position=randomNumber;
    }


    function createCloud(){
        var cheight= 173;
        var cwidth= 242;
        var img="";
        var randomXposition = Math.floor(Math.random() * (canvas.width - cwidth + 1));
        var randomSprite= Math.floor(Math.random() * (3 - 0 + 1));

        img= cloudSpritesArray[randomSprite];

        var cloud = new No_Animation_Sprite({
            height: cheight,
            width: cwidth,
            position:{
                x: randomXposition,
                y: 0-cheight,
            },
            imageSrc: img,
            velocity:{
                x: 0,
                y: 0.3,
            },
            
        })

        clouds.push(cloud);

    }


    function createExplosion(enemy){

        var explosion= new Explosion({
            height: 60,
            width: 60,
            position:{
                x: (enemy.position.x+10), 
                y: (enemy.position.y-10),
            },
            imageSrc: './sprites/enemy_explosion_sprites.png',
            framesMax: 17,
            scale:1.2,
            offset: {
                x: 0,
                y: 0
            },
        });

        explosions.push(explosion);

    }

    function createMagicBlast(){
        var m_width=80;
        var m_height= 80;

        magic_blast= new Explosion({
            height: 296,
            width: m_width,
            position:{
                x: (canvas.width/2)-((m_width/2)*3), 
                y: (canvas.height/2)-((m_height/2)*4),
            },
            imageSrc: './sprites/magic_blast_sprites.png',
            framesMax: 14,
            scale:3,
            offset: {
                x: 0,
                y: 0
            },
            framesHold: 7,
        });
    }


    //Collision

    function collisionFireBalls(fireball, indexF){

        //If there are enemies I check for every enemies if there's collision with the fireball.
        if(enemies.length > 0){
            enemies.forEach((enemy, index) => {

                //If they inersect on the y axis
                if(fireball.position.y <= enemy.position.y + enemy.height){

                    //If they intersect on the x axis.
                    if( fireball.position.x + fireball.width >= enemy.position.x &&
                        fireball.position.x <= enemy.position.x + enemy.width){

                        //Create hit explosion
                        createExplosion(enemy);

                        //Dying dragon sound
                        random_audio(dragons_audios);

                        //Eliminate fireball
                        fireBalls.splice(indexF, 1);
                        delete fireball;
                        
                        //Eliminate enemy that has been hit
                        enemies.splice(index, 1);
                        delete enemy;

                        //Player score increases
                        player.score+=10;

                        //Check if it's time to increase the game difficulty.
                        checkDifficulty();

                    }
                }
            })
        }    
    }


    function collisionEnemyPlayer (enemy){

        if(!player.dead){

            //If they inersect on the y axis
            if(player.position.y <= enemy.position.y + enemy.height){
                        
                //If they intersect on the x axis
                if(player.position.x + player.width >= enemy.position.x &&
                    player.position.x <= enemy.position.x + enemy.width){

                        //If there is not already been a collision with this enemy, then the attack is valid.
                        if(!enemy.alreadyHit){
                            enemy.alreadyHit=true;
                            play_F(hit_audio[2],0.5);
                            
                            //player.lifeHP-=10;
                            player.takeHit();
                            healthBar.level++;
                        }
                }  
            }

        }

        
    }


    function collisionEnergyPlayer (energy, indexE){

        if(!player.dead){

            //If they inersect on the y axis
            if(player.position.y <= energy.position.y + energy.height){
                
                //If they intersect on the x axis
                if(player.position.x + player.width >= energy.position.x &&
                    player.position.x <= energy.position.x + energy.width){

                    //Eliminate energy
                    energies.splice(indexE, 1);
                    delete energy;

                    //Audio magic
                    play_F(magic_audio, 1);

                    //Player's life XPs increase
                    if(player.lifeHP+10 <= 100){
                        player.lifeHP+=10;
                        healthBar.level--;
                        
                    }else{

                        if(player.magicXP<100){
                            player.magicXP+=10;
                            magicBar.level++;
                            
                        }

                        if(player.magicXP==100){
                            player.magicShot=true;

                            if(!mb_audio_already_played){
                                play_F(magic_bar_audio, 1);
                                mb_audio_already_played=true;
                            }
                        }
                    }
                        
                }  
            }

        }
        
    }


    //Audio

    function play_F(file, volume){

        if(audioOn){

            var audio = document.createElement('audio');
            audio.src = file;
            document.body.appendChild(audio);
            audio.volume= volume;
            audio.play();
            
            audio.onended = function () {
            this.parentNode.removeChild(this);
            }

        }
        
      }


    function random_audio(audio_array){
        var randomNumber= Math.floor(Math.random() * ((audio_array.length-1) - 0 + 1));
        play_F(audio_array[randomNumber], 1);
    }


    //Others

    function player_shoot(){
        player_can_shoot= true;

    }


    function checkDifficulty(){
        if(player.score >= (player.oldScore + 100)){
            if((spawn_enemies_interval-150)>150){
                spawn_enemies_interval-=150;
            }
            enemy_velocity+=0.08;

            player.oldScore=player.score;
        }
    }


    function score_display(){
    let score_string= "SCORE: "+player.score;

    c.fillStyle = 'black';
    c.font = "bold 15pt Verdana";
    //syntax : .fillText("text", x, y)
    c.fillText(score_string, 10 , 38);
    }


}

