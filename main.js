
const array_commodities = ["gold","silver","bonds","industrial","grain","oil"];
const array_movements = ["↓ ","↑ ", "div "];
const array_degrees = ["5¢","10¢","20¢"];
const usd_sign = "$ ";
const universal_par_value = 1;
const initial_zero = 0;
const current_price = "_current_price";
const current_status = "_current_status";
const order_qty = "_order_qty"
const order_sum = "_order_sum";
const buy_average_price = "_buy_average_price";
const total_stock = "_total_stock";
const total_spent = "_total_spent";
const market_cap = "_market_cap";
const profit_loss = "_profit_loss";

function function_first_load(event) { // initial values;
    for (let x of array_commodities) {
        document.getElementById(x + current_price).innerHTML = usd_sign + universal_par_value.toFixed(2);
        document.getElementById(x + order_sum).innerHTML = usd_sign  + initial_zero.toFixed(2);
        document.getElementById(x + buy_average_price).innerHTML = usd_sign  + initial_zero.toFixed(2);
        document.getElementById(x + total_stock).innerHTML = initial_zero;
        document.getElementById(x + total_spent).innerHTML = usd_sign  + initial_zero.toFixed(2);
        document.getElementById(x + market_cap).innerHTML = usd_sign + initial_zero.toFixed(2);
        document.getElementById(x + profit_loss).innerHTML = usd_sign  + initial_zero.toFixed(2);
    }
    // document.getElementById("total_profit_loss").innerHTML = usd_sign  + initial_zero.toFixed(2);
    document.getElementById("balance").innerHTML = usd_sign + 5000;
}

function function_next(event, step) { // what happens when you press spacebar or "next" button;
    if (event.keyCode === 32 || step == true) {
        var turn_commodity = Math.floor(Math.random() * 6);
        var turn_movement = Math.floor(Math.random() * 3);
        var turn_degree = Math.floor(Math.random() * 3);
        var x = array_commodities[turn_commodity];
        var y = array_movements[turn_movement];
        var z = array_degrees[turn_degree];
        document.getElementById(x + current_status).innerHTML = y + z;

        for (let commodity of array_commodities) {
            if (commodity !== x) {
                document.getElementById(commodity + current_status).innerHTML = "-";
                document.getElementById(commodity + current_status).style.color = "white";
            }
        } 
        
        if (turn_movement == 0) { // 0 index for 1st element in turn_movements array, i.e. "DOWN"
            document.getElementById(x + current_status).style.color = "red";
            document.getElementById(x + current_price).innerHTML = usd_sign + 
            (parseFloat(document.getElementById(x + current_price).innerHTML.replace('$ ', '')) - parseFloat(z)/100).toFixed(2);
        } else if (turn_movement == 1) {  // 1 index for 2nd element in turn_movements array, i.e. "UP"
            document.getElementById(x + current_status).style.color = "green";
            document.getElementById(x + current_price).innerHTML = usd_sign + 
            (parseFloat(document.getElementById(x + current_price).innerHTML.replace('$ ', '')) + parseFloat(z)/100).toFixed(2);
        } else {
            document.getElementById(x + current_status).style.color = "yellow";  // 2 index for 3rd element in turn_movements array, i.e.dividents
            if (parseFloat(document.getElementById(x + current_price).innerHTML.replace('$ ', '')) >= 1){
                function_dividents(x, z);
            }

        }

        function_market_cap(x);
        function_profit_loss(x);
        function_price_reset(x);

        for (let y of array_commodities){ // updates order input quantities: either acc to market price or zeroes it if no input;
            if (document.getElementById(y + order_qty).value >= 0){
                document.getElementById(y + order_sum).innerHTML = usd_sign + 
                (document.getElementById(y + order_qty).value * 
                parseFloat(document.getElementById(y + current_price).innerHTML.replace('$ ', ''))).toFixed(2);
            } else {
                document.getElementById(y + order_qty).value = "";
                document.getElementById(y + order_sum).innerHTML = usd_sign + initial_zero.toFixed(2);
            }

        }
    }   
}

function funcion_buy_calculation(event, commodity_index) { // shows total buy order value as you enter number of stocks to buy;
    var x = array_commodities[commodity_index];
    document.getElementById(x + order_sum).innerHTML = usd_sign + 
        (document.getElementById(x + order_qty).value * parseFloat(document.getElementById(x + current_price).innerHTML.replace('$ ', ''))).toFixed(2);
}


function function_order(event, commodity_index, operation) { // buy and sell operations upon pressing "B" and "S" buttons;
    var x = array_commodities[commodity_index];
        if (operation == 0 && // buy operation
             
        parseInt(document.getElementById(x + order_sum).innerHTML.replace('$ ', '')) <= 
        parseInt(document.getElementById("balance").innerHTML.replace('$ ', '')) && 
        
        document.getElementById(x + order_qty).value != "" &&
        
        document.getElementById(x + order_qty).value > 0) {

            document.getElementById("balance").innerHTML = "$ " +
            (parseInt(document.getElementById("balance").innerHTML.replace('$ ', '')) - 
            parseInt(document.getElementById(x + order_sum).innerHTML.replace('$ ', '')));
        
            document.getElementById(x + total_stock).innerHTML =
            (parseInt(document.getElementById(x + total_stock).innerHTML.replace("$ ","")) +
            parseInt(document.getElementById(x + order_qty).value.replace("$ ","")));
         
            document.getElementById(x + total_spent).innerHTML = usd_sign + 
            (parseFloat(document.getElementById(x + total_spent).innerHTML.replace('$ ', '')) +
            parseInt(document.getElementById(x + order_sum).innerHTML.replace('$ ', ''))).toFixed(2);        

            document.getElementById(x + order_sum).innerHTML = usd_sign  + initial_zero.toFixed(2);
            document.getElementById(x + order_qty).value = "";

        }

        if (operation == 1 && // sell operation
        parseInt(document.getElementById(x + order_qty).value.replace('$ ', '')) <= 
        parseInt(document.getElementById(x + total_stock).innerHTML.replace('$ ', '')) &&
        parseInt(document.getElementById(x + order_qty).value.replace('$ ', '')) >= 0) {

            document.getElementById("balance").innerHTML = "$ " +
            (parseInt(document.getElementById("balance").innerHTML.replace('$ ', '')) + 
            parseInt(document.getElementById(x + order_sum).innerHTML.replace('$ ', '')));

            document.getElementById(x + total_stock).innerHTML =
            (parseInt(document.getElementById(x + total_stock).innerHTML.replace("$ ","")) -
            parseInt(document.getElementById(x + order_qty).value.replace("$ ","")));

            document.getElementById(x + total_spent).innerHTML = usd_sign + 
            (parseFloat(document.getElementById(x + total_spent).innerHTML.replace('$ ', '')) -
            parseInt(document.getElementById(x + order_sum).innerHTML.replace('$ ', ''))).toFixed(2);

            document.getElementById(x + order_sum).innerHTML = usd_sign  + initial_zero.toFixed(2);
            document.getElementById(x + order_qty).value = "";

            if (parseFloat(document.getElementById(x + total_stock).innerHTML.replace('$ ', '')) == 0){
                document.getElementById(x + total_spent).innerHTML = usd_sign + initial_zero.toFixed(2);
            }

        }
        function_market_cap(x);         // 
        function_profit_loss(x);        // updates made with each buy/sell operation;
        function_average_price(x);      // 
}

function function_market_cap(commodity){ // calculates current market cap of stocks you are holding;
    document.getElementById(commodity + market_cap).innerHTML = usd_sign + 
    ((parseFloat(document.getElementById(commodity + current_price).innerHTML.replace('$ ', '')) *
    parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', '')))).toFixed(2);
}

function function_profit_loss(commodity){ // calculates profit/loss of stocks you are holding;

    if (parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', '')) == 0) {
        document.getElementById(commodity + profit_loss).innerHTML = usd_sign + initial_zero.toFixed(2);
    } else { 
        document.getElementById(commodity + profit_loss).innerHTML = usd_sign +             
        (parseFloat(document.getElementById(commodity + market_cap).innerHTML.replace('$ ', '')).toFixed(2) - 
        parseFloat(document.getElementById(commodity + total_spent).innerHTML.replace('$ ', '')).toFixed(2)).toFixed(2);
    }

    // print profit/loss value in GREEN, RED or WHITE;
    let red_green = parseFloat(document.getElementById(commodity + profit_loss).innerHTML.replace('$ ', '')).toPrecision(2);
    red_green = red_green.toString(); //If it's not already a String
    red_green = red_green.slice(0, (red_green.indexOf("."))+6); //With 3 exposing the hundredths place
    Number(red_green);
    if (red_green > 0) {
        document.getElementById(commodity + profit_loss).style.color = "green";
    } else if (red_green < 0) {
        document.getElementById(commodity + profit_loss).style.color = "red";
    } else {
        document.getElementById(commodity + profit_loss).style.color = "white";
    }
}

function function_average_price(commodity){ // average = money spent / stocks in portfolio;
    let x = parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', ''));
    if (x > 0){
        document.getElementById(commodity + buy_average_price).innerHTML = usd_sign +
        (parseInt(document.getElementById(commodity + total_spent).innerHTML.replace('$ ', '')) / 
        parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', ''))).toFixed(2);
    } else {
        document.getElementById(commodity + buy_average_price).innerHTML = usd_sign + initial_zero.toFixed(2);
    }
}

function function_price_reset(commodity){ // reset price if goes 0 (deletes all stock) or 2 (returns to 1 and doubles stock)
    let x = parseFloat(document.getElementById(commodity + current_price).innerHTML.replace('$ ', '')).toFixed(2);
    if (x <= 0){ // if market prices goes down : zeroes stocks in possession, you lose everything;
        document.getElementById(commodity + current_price).innerHTML = usd_sign + universal_par_value.toFixed(2);
        document.getElementById(commodity + total_stock).innerHTML = initial_zero;
        document.getElementById(commodity + total_spent).innerHTML = usd_sign + initial_zero.toFixed(2);
        function_average_price(commodity);
        function_market_cap(commodity);
        function_profit_loss(commodity);
    }
    if (x >= 2){ // if market prices goes up to 2 : resets to 1 and doubles stocks in portfolio;
        document.getElementById(commodity + current_price).innerHTML = usd_sign + universal_par_value.toFixed(2);
        document.getElementById(commodity + total_stock).innerHTML =
        parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', '')) * 2;
        function_average_price(commodity);
        function_market_cap(commodity);
        function_profit_loss(commodity);
    }
}

function function_dividents(commodity, degree){
    if (parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', '')) >0){
        document.getElementById(commodity + total_spent).innerHTML = (parseInt(document.getElementById(commodity + total_spent).innerHTML.replace('$ ', '')) -
        (parseInt(document.getElementById(commodity + total_stock).innerHTML.replace('$ ', '')) * parseFloat(degree)/100)).toFixed(2);
    }
}
