let input = document.getElementById("file-input");
let json;

input.onchange = (e) => {
    var reader = new FileReader();
    reader.onload = (e) => {
        json = JSON.parse(e.target.result);
        displayOrdersProcessedByDay();
    };
    reader.readAsText(e.target.files[0]);
}

const ordersByDay = {};

function displayOrdersProcessedByDay() {
    json.forEach(ordersByUserPerDay => {
        const date = ordersByUserPerDay.date.slice(0, 10);
        if (ordersByDay[date]) {
            ordersByDay[date] += ordersByUserPerDay["Nombre de lignes"];
        } else {
            ordersByDay[date] = ordersByUserPerDay["Nombre de lignes"];
        }
    });
    
    let previousDay = null;
    for (const [key, value] of Object.entries(ordersByDay)) {
        // if (previousDay) {
        //     console.log(previousDay[0].substring(8, 10));
        //     if (key.substring(8, 10) - previousDay[0].substring(8, 10) >= 2) {
        //         document.getElementById("days").innerHTML += `<br/>`;
        //     }
        // }
        document.getElementById("days").innerHTML += `<div>${key} : <b>${value}</b></div>`;
        // previousDay = [key, value];
    }
}