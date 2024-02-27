const allSelectedBtn = document.querySelectorAll(".selected-btn");

for (let btn of allSelectedBtn) {
  btn.addEventListener("click", function (event) {
    // total player
    const totalPlayer = playerCount(".list-decimal");
    if (totalPlayer.length >= 5) {
      alert("Already selected five player");
      return;
    }

    // paerent element find (player name)
    const parentElement = event.target.parentNode;
    const childEle = parentElement.children[0].innerText;

    // list
    const list = document.getElementById("list");
    // create li
    const createEle = document.createElement("li");
    createEle.innerText = childEle;
    const totalCount = list.appendChild(createEle);

    // btn disabled
    if (btn) {
      btn.setAttribute("disabled", true);
      btn.style.backgroundColor = "#282f3c";
      btn.style.cursor = "no-drop";
      btn.style.color = "rgb(122 122 122)";
    }
  });
}

//each player entertain cost
document
  .getElementById("calculate")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // total player count
    const totalPlayerCount = playerCount(".list-decimal");
    const totalPlayer = totalPlayerCount.length;

    // per player cost
    const perPlyaerCost = inputFieldById("perPlayer");
    const perPlayerTotalCost = perPlyaerCost * totalPlayer;

    // Player Expenses value
    display("playerExpenses", perPlayerTotalCost);
  });

//   final player cost colaculation
document
  .getElementById("total-calculate")
  .addEventListener("click", function (event) {
    event.preventDefault();
    // player total expen cost playerExpenses
    const playerTotalExpen = document.getElementById("playerExpenses");
    const playerTotalExpenString = playerTotalExpen.innerHTML;
    const playerTotalExpenCost = parseInt(playerTotalExpenString);
    console.log(playerTotalExpenCost);

    // manager cost
    const managerCost = inputFieldById("manager");
    console.log(managerCost);

    // coach cost
    const coachCost = inputFieldById("coach");
    console.log(coachCost);

    // final total cost
    const totalFinalCost = playerTotalExpenCost + managerCost + coachCost;
    console.log(totalFinalCost);

    display("final-cost", totalFinalCost);
  });
