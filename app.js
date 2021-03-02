var deck = ["wood", "wood", "fiber", "stone", "berries", "berries", "minnows"]
var nightCards = ["nothing", "terror", "animal", "gain1", "voice2"]
var forage = 0
var health = 6
var round = 1
var wood = 0
var fiber = 0
var stone = 0
var forageBet = 0
var shelter = 0
var basket = 0
var spear = 0
var items = 0

function main() {

  $("#build").on("click", function(event){
    toBuildingWindow()
    buildSpear()
    buildBasket()
    buildShelter()
    closeWindow()
  });

  $(".life").on("click", function(event) {
    if ($("#forage").hasClass("hidden")) {
      $(".errorText").text("You have already forfeit hearts today. ")
      $(".errorExplain").text("You may only forfeit hearts before your forage action. ")
      $(".textBox").removeClass("hidden")
      closeWindow()
    } else {
      if (forageBet == 3) {
        $(".errorText").text("You have reached the heart limit for today. ")
        $(".errorExplain").text("You may only forfeit up to 3 hearts for foraging per day. ")
        $(".textBox").removeClass("hidden")
        closeWindow()
      } else {
        var bet = this.id
        $('#' + bet).addClass("hidden")
        forageBet++
        health--
      }
    }
  });

  $("#forage").on("click", function(event) {
    if (forageBet == 0) {
      $(".errorText").text("You have not bet hearts for foraging. ")
      $(".errorExplain").text("Before foraging, you must bet an amount of hearts equal to the amount of items you wish to forage for. (3 hearts max per day.) ")
      $(".textBox").removeClass("hidden")
      closeWindow()
    } else {
      if (basket == 1){
        forageBet++
      }

      var cards;
      for (cards = forageBet; cards > 0; cards--) {
        var items = deck[Math.floor(Math.random() * 7)]
        // $("#card" + cards).text(items)
        $("#resource" + cards).removeClass("hidden").attr("src", "images/" + items +".jpg")
        if (items == "wood") {

          wood++;
        } else if (items == "stone") {
          stone++;
        } else if (items == "fiber") {
          fiber++;
        } else if (items == "berries") {
          health++
          heal()
        } else if (items == "minnows") {
          var i;
          for (i = 0; i < 2; i++) {
            health++
            heal()
          }
        }
      }
      $("#wood").text(" " + wood)
      $("#stone").text(" " + stone)
      $("#fiber").text(" " + fiber)
      $("#forage").addClass("hidden")
      healthCheck()
      console.log("You foraged, health = " + health)
    }

  });

  $("#sleep").on("click", function(event) {
    $(".roundNumber").text(round)

    nightPhase()
  });

  $("#fireAction").on("click", function(event) {
    if (wood >= 1) {
      fireOn()
    } else {
      $(".errorText").text("You do not have enough wood for this action. ")
      $(".errorExplain").text("You must have at least 1 wood to light a fire. ")
      $(".textBox").removeClass("hidden")
      closeWindow()
    }
  });

  $("#nextDay").on("click", function(event) {
    newRound()
  });

}

function startGame() {
  $(".playBtn").on("click", function(event) {
    $(".startGame").addClass("hidden")
    $(".control, .information, .roundNumber, .cardArea, .build").removeClass("hidden")
    $("").text(round)

    var audio = new Audio('audio/music.mp3');
    audio.play();
    main();
  });
}

function nightPhase() {
  $("#nextDay").removeClass("hidden")
  $("#sleep, #fireAction, #forage, #card1, #card2,  #card3, #card4").addClass("hidden")
  $("#card5").removeClass("hidden")


  $(".dayText").html("Night: " + round)
  $(".dayTrees, .dayMountain").fadeOut(700)
  $(".nightTrees, .nightMountain").delay(700).fadeIn(700)
  $("body").css("background-color", "black")
  $(".title").css("color", "white")
  $(".gameC, .information, .effects, .dayText,  .days").css("border-color","white", "color", "white")
  $(".effects, .dayText").css("color", "white")
  // $(".card").text("")

  nightEvent()
  healthCheck()


}

function nightEvent() {
  if (round >= 8) {
    rescued()
  } else {
    var encounter = nightCards[Math.floor(Math.random() * 5)]
      console.log(encounter)
      $("#resource5").attr("src", "images/" + encounter +".jpg").removeClass("hidden")

    if (encounter == "gain1") {

      heal()
      health++

    } else if (encounter == "terror") {
      hurt()
      health--


    } else if (encounter == "voice2") {
      if (!$(".fire").hasClass("hidden")) {

      } else {
        var i;
        for (i = 0; i < 2; i++) {
          hurt()
          health--
        }
      }

    } else if (encounter == "animal") {
      if(spear == 1){
        spear--
        $("#spearBtn").addClass("hidden")
      }
      else{
        hurt()
        health--
      }

    }
    else if ( encounter == "nothing"){
      if (!$(".fire").hasClass("hidden")){
        health++
        heal()
        console.log("Fire healed you.")
      }
      else{
        console.log("No fire, nothing happens.")
      }
    }
    healthCheck()
  }
}

function hurt() {
  if (!$("#heart6").hasClass("hidden")) {
    $("#heart6").addClass("hidden")

  } else if (!$("#heart5").hasClass("hidden")) {
    $("#heart5").addClass("hidden")

  } else if (!$("#heart4").hasClass("hidden")) {
    $("#heart4").addClass("hidden")

  } else if (!$("#heart3").hasClass("hidden")) {
    $("#heart3").addClass("hidden")

  } else if (!$("#heart2").hasClass("hidden")) {
    $("#heart2").addClass("hidden")

  } else if (!$("#heart1").hasClass("hidden")) {
    $("#heart1").addClass("hidden")

  }
  healthCheck()
}

function fireOn() {
  $(".fire").removeClass("hidden")
  $(".noFire").addClass("hidden")
  $("#fireAction").addClass("hidden")
  wood--
  $("#wood").text(" " + wood)
}

function fireOff() {
  $(".fire").addClass("hidden")
  $(".noFire").removeClass("hidden")
  $("#fireAction").addClass("hidden");
}

function newRound() {

  forageBet = 0
  round++
  fireOff()
  $("#forage, #fireAction, #sleep").removeClass("hidden")
  $("#nextDay, .resource").addClass("hidden")

  $("body").css(
    "background-color", " #7c9473"
  );
  $("body").css({
    "color": "black"
  })
  $("#sleep, #fireAction, #forage, #card1, #card2,  #card3").removeClass("hidden")
  if(basket == 1 ){
    $("#card4").removeClass("hidden")
  }
  $("#card5").addClass("hidden")
  $(".gameC, .information, .effects, .days  ").css("border-color","black")
  $(".effects, .dayText, .days, .title").css("color", "black")

  $(".dayText").html("Day: " + round)
  $(".dayTrees, .dayMountain").delay(700).fadeIn(700)
  $(".nightTrees, .nightMountain").fadeOut(700)
  healthCheck()

}

function closeWindow() {
  $(".closeBtn").on("click", function(event) {
    $(".textBox, .buildingMenu").addClass("hidden");
  })
}

function toBuildingWindow() {
    $(".buildingMenu").removeClass("hidden")
    $(".textBox").addClass("hidden")
  }

function gameReset() {
  $(".closeBtn").on("click", function(event) {
    window.location.reload()

  })
}

function heal() {
  if (health <= 6){

    if ($("#heart1").hasClass("hidden")) {
      $("#heart1").removeClass("hidden")

    } else if ($("#heart2").hasClass("hidden")) {
      $("#heart2").removeClass("hidden")

    } else if ($("#heart3").hasClass("hidden")) {
      $("#heart3").removeClass("hidden")

    } else if ($("#heart4").hasClass("hidden")) {
      $("#heart4").removeClass("hidden")

    } else if ($("#heart5").hasClass("hidden")) {
      $("#heart5").removeClass("hidden")

    } else if ($("#heart6").hasClass("hidden")) {
      $("#heart6").removeClass("hidden")

    }
  }
  else{
    health = 6
    console.log("Full Health, health = " + health)
  }

}

function healthCheck() {
  if (health <= 0) {
    console.log(health)
    gameOver()
  }
  else if(health > 6){
    health = 6
    console.log("Health reset = " + health)
  }
  else {}
  console.log(health)
}

function gameOver() {
  $(".errorText").text("You have have died! ")
  $(".errorExplain").text("You have no more hearts. ")
  $(".textBox").removeClass("hidden")
  $("#forage, #sleep, #fireAction").addClass("hidden")
  gameReset()
}

function rescued() {
  $(".errorText").text("Rescue has arrived! ")
  $(".errorExplain").text("You collapse to the ground and breath a sigh of relief. You are safe.  ")
  $(".textBox").removeClass("hidden")
  $("#forage, #sleep, #fireAction").addClass("hidden")
  gameReset()
}

function buildSpear(){
  $("#spear").on("click", function(event){
    if (wood < 1 || stone < 1){
      $(".errorText").text("You do not have the resources for this item. ")
      $(".errorExplain").text("Useful for fending off animals. Cost: 1 stone + 1 wood. ")
      $(".textBox").removeClass("hidden")
    }
    else if (spear == 1){
      $(".errorText").text("You already have a Spear. ")
      $(".errorExplain").text("You cannot have more than one Spear at a time. ")
      $(".textBox").removeClass("hidden")
    }
    else {
      wood--
      stone--
      spear++
      items++
      $(".errorText").text("You built a spear!. ")
      $(".errorExplain").text("Useful for fending off animals. ")
      $(".textBox").removeClass("hidden")

      $("#wood").text(" " + wood)
      $("#stone").text(" " + stone)
      $("#fiber").text(" " + fiber)
      $("#spearBtn").removeClass("hidden")
    }

  })

}

function buildBasket(){
  $("#basket").on("click", function(event){
    if (fiber < 2 || wood < 1){
      $(".errorText").text("You do not have the resources for this item. ")
      $(".errorExplain").text("Cost: 2 fiber + 1 wood. ")
      $(".textBox").removeClass("hidden")
    }
    else if (basket == 1){
      $(".errorText").text("You already have a Basket. ")
      $(".errorExplain").text("You cannot have more than one Basket at a time. ")
      $(".textBox").removeClass("hidden")
    }
    else {
      wood--
      fiber = fiber - 2
      basket++
      items++
      $(".errorText").text("You built a Basket!. ")
      $(".errorExplain").text("Allows you to gain an extra foraging item. ")
      $(".textBox").removeClass("hidden")

      $("#wood").text(" " + wood)
      $("#stone").text(" " + stone)
      $("#fiber").text(" " + fiber)
      $("#basketBtn").removeClass("hidden")
      $("#card4").removeClass("hidden")
    }

  })

}

function buildShelter(){
  $("#shelter").on("click", function(event){
    if (wood < 2 || stone < 2 || fiber < 2){
      $(".errorText").text("You do not have the resources for this item. ")
      $(".errorExplain").text("Cost: 2 stone + 2 wood + 2 fiber. ")
      $(".textBox").removeClass("hidden")
    }
    else if (shelter == 1){
      $(".errorText").text("You already have a Shelter. ")
      $(".errorExplain").text("You cannot have more than one Shelter at a time. ")
      $(".textBox").removeClass("hidden")
    }
    else {
      wood - 2
      stone - 2
      fiber - 2
      shelter++
      $(".errorText").text("You built a Shelter! ")
      $(".errorExplain").text("Prevents wheather events. ")
      $(".textBox").removeClass("hidden")

      $("#wood").text(" " + wood)
      $("#stone").text(" " + stone)
      $("#fiber").text(" " + fiber)
      $("#shelterBtn").removeClass("hidden")
    }

  })
}

startGame();
