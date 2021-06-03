(function ($) {
    $.fn.connect_4 = function (options) {

        $("#start").click(function (e) {
            e.preventDefault();

            // RECUPERER DATA UTILISATEURS //
            function get_data() {
                let data_array = $("form").serializeArray(),
                    len = data_array.length,
                    form_data = {};

                for (i = 0; i < len; i++) {
                    form_data[data_array[i].name] = data_array[i].value;
                }
                return form_data;
            }
            let form_data = get_data();
            console.log(form_data);

            let player1 = {
                id: "1",
                name: form_data.name1,
                color: form_data.color1,
                row: form_data.rows,
                col: form_data.cols,
            }

            let player2 = {
                id : "2",
                name: form_data.name2,
                color: form_data.color2,
                row: form_data.rows,
                col: form_data.cols,
            }

            $("#page1").replaceWith('<div id="page2"></div>');
            $("#page2").append('<table id="table"></table>');
            $("table").before('<div id="score"></div>');
          //  $("#page2").append('<div id="score"></div>');
            
            let puissance_4 = new Game(form_data.rows, form_data.cols, player1, player2, $('#table'));
            
            
            $("#score").append("<h3>Score</h3>");
            $("h3").after("<p class='turn'>" + `It's <b>${player1.name}</b>'s turn !` + "</p>")
            $(".turn").after("<p class='player1'>" + `${player1.name}` + "</p>");
            $(".player1").after("<p class='player2'>" + `${player2.name}` + "</p>");
            $(".player2").after("<button><img src='assets/new.png'></button>");
            $(".player2").after("<button><img src='assets/undo.png'></button>");

        });

    };
})($);