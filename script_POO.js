class Game {
  constructor(x, y, player1, player2, selector, position) {
    this.x = x;
    this.y = y;
    this.player1 = player1;
    this.player2 = player2;
    this.selector = selector;
    this.click = 0;
    this.position = 0;

    this.createBoard();
    this.over();
    this.clickEvent();


  }

  createBoard() {
    const $table = $(this.selector);
    $table.empty();
    for (let x = 0; x < this.x; x++) {
      const $row = $('<tr>').addClass('row');
      for (let y = 0; y < this.y; y++) {
        const $col = $('<td>').addClass('col empty').attr('value', 0).attr('data-x', x).attr('data-y', y);
        $row.append($col);
      }
      $table.append($row);
    }
  }

  lastCell(y) {
    const cells = $(`.col[data-y='${y}']`);
    for (let i = cells.length - 1; i >= 0; i--) {
      const cell = $(cells[i]);
      if (cell.hasClass('empty')) {
        this.position = ($("[data-x=" + [cell.attr('data-x')] + "]" + "[data-y=" + [cell.attr('data-y')] + "]"));
        return cell;

      }
    }
    return null;
  }

  over() {
    $(".col.empty").mouseenter((e) => {
      const col = e.target.dataset.y;
      const lastEmptyCell = this.lastCell(col);
      lastEmptyCell.addClass('next-black');
    });

    $(".col").mouseleave(function () {
      $('.col').removeClass(`next-black`);
    });
  }

  clickEvent() {
    $(".col.empty").click((e) => {

      const col = e.target.dataset.y;
      const row = e.target.dataset.x;
      console.log($(".col[data-y='" + col + "']"));
      const lastEmptyCell = this.lastCell(col);

      let color1 = this.player1.color;
      let color2 = this.player2.color;

      if (this.click % 2 == 0) {
        lastEmptyCell.removeClass(".col empty");
        lastEmptyCell.addClass(color1).attr("value", this.player1.id);
        $(".turn").replaceWith("<p class='turn'>" + `It's <b>${this.player1.name}</b>'s turn !` + "</p>");

      } else {
        lastEmptyCell.removeClass(".col empty");
        lastEmptyCell.addClass(color2).attr("value", this.player2.id);
        $(".turn").replaceWith("<p class='turn'>" + `It's <b>${this.player2.name}</b>'s turn !` + "</p>");
      }

      this.click++;

      let column_select = $(".col[data-y='" + col + "']");
      let column_verif = "";

      column_select.each((e) => {
        let column = column_select[e];
        
        if ($(column).hasClass(color1)) {
          column_verif += "1";
        }

        if ($(column).hasClass(color2)) {
          column_verif += "2";
        }

        if ($(column).hasClass("empty")) {
          column_verif += "o";
        }

      });

      if (column_verif.includes("1111")) {
        alert(`Congrats ${this.player1.name}, you won!`);

      }
      if (column_verif.includes("2222")) {
        alert(`Congrats ${this.player2.name}, you won!`);

      }

      let row_select = $(".col[data-x='" + row + "']");
      let row_verif = "";

      row_select.each((e) => {
        let rows = row_select[e];
        
        if ($(rows).hasClass(color1)) {
          row_verif += "1";
        }

        if ($(rows).hasClass(color2)) {
          row_verif += "2";
        }

        if ($(rows).hasClass("empty")) {
          row_verif += "o";
        }

      });

      if (row_verif.includes("1111")) {
        alert(`Congrats ${this.player1.name}, you won!`);

      }
      if (row_verif.includes("2222")) {
        alert(`Congrats ${this.player2.name}, you won!`);

      }
    });
  }

};