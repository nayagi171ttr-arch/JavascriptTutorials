const groups = {
    groupA: ['aaa', 'bbb', 'ccc', 'ddd'],
    groupB: ['eee', 'fff', 'iii', 'jjj'],
    groupC: ['kkk', 'lll', 'mmm', 'nnn'],
    groupD: ['ooo', 'ppp', 'qqq', 'rrr'],
}
let allQualified = [];
let top4 = [];
let top2 = [];

function run() {
    let result = document.getElementById('resultdisplay');
    result.innerHTML = ""; 
    allQualified = [];  
    for (let groupKey in groups) {
        let currentGroupTeams = groups[groupKey];
     
        result.innerHTML += `<h2>${groupKey.toUpperCase()}</h2>`;

        let pointstabel = {};
        currentGroupTeams.forEach(team => {
            pointstabel[team] = 0;
        });

       
        for (let i = 0; i < currentGroupTeams.length; i++) {
            for (let j = i + 1; j < currentGroupTeams.length; j++) {
                let teamA = currentGroupTeams[i];
                let teamB = currentGroupTeams[j];
                let score1 = Math.floor(Math.random() * 100) + 100;
                let score2 = Math.floor(Math.random() * 100) + 100;

                let winner = score1 > score2 ? teamA : teamB;
                pointstabel[winner] += 2;

                result.innerHTML += `<p>${teamA} (${score1}) vs ${teamB} (${score2}) — Winner: <b>${winner}</b></p>`;
            }
        }

     
         top2 = Object.keys(pointstabel)
            .sort((a, b) => pointstabel[b] - pointstabel[a])
            .slice(0, 2); 

       
        allQualified = allQualified.concat(top2);

        result.innerHTML += `<h3 style="color: blue;">Qualified from ${groupKey}: ${top2.join(" & ")}</h3><hr>`;
    }

    result.innerHTML += `<h2 style="color: green;">Total Qualified Teams (Final 8):</h2>`;
    result.innerHTML += `<p><b>${allQualified.join(", ")}</b></p>`;
    
    console.log("Final 8:", allQualified);

}

    //top4


    function runQuarterFinals(){
        let result = document.getElementById('resultdisplay');
        result.innerHTML+=`<h2 style="color:orange;">Quater-Finals</h2>`;
        top4 = []
        for(let i=0;i<allQualified.length;i+=2){
    
        let teamsA=allQualified[i];
        let teamsB=allQualified[i+1];
 
        let scoreA1=Math.floor(Math.random() * 100)+150;
        let scoreB1=Math.floor(Math.random()*100)+150;

        let semiwinner=scoreA1>scoreB1 ? teamsA : teamsB;
       top4.push(semiwinner);


result.innerHTML += `<p> ${teamsA} (${scoreA1}) vs ${teamsB} (${scoreB1}) — Winner: <b>${semiwinner}</b></p>`;

     
    }

   result.innerHTML += `<hr><h2 style="color: green; text-align: center;">SEMIFINALISTS (TOP 4):</h2>`;
    result.innerHTML += `<h3 style="text-align: center;">${top4.join(" | ")}</h3>`;

    console.log("Top 4 Teams:", top4);
    

    }

    //top2

    function runSemiFinals(){
     let result = document.getElementById('resultdisplay');
    result.innerHTML+=`<h2 style=color:"red";>SEMIFINALS</h2>`;
    
    top2 = [];
    for(let i=0;i<top4.length;i+=2){
        let top2teamA=top4[i];
        let top2teamB=top4[i+1];

        let topscore1=Math.floor(Math.random()*100)+200;
        let topscore2=Math.floor(Math.random()*100)+200;

        let semifinals=topscore1>topscore2 ? top2teamA :top2teamB;
        top2.push(semifinals);

        result.innerHTML+=`<p> ${top2teamA} (${topscore1}) vs ${top2teamB} (${topscore2})- winner:<b>${semifinals}</b></p>`
    }

    result.innerHTML+=`<hr><h2 style="color:green;text-align:center;>Finals(Top 2):</h2>`;
    result.innerHTML+=`<h3 style=text-align:center">${top2.join(" |")}</h3>`;
    console.log("top 2 teams:",top2);
}

//final match

function runFinal(){
    let result = document.getElementById('resultdisplay');
    result.innerHTML+=`<h1 style=color:"blue";>FINALS</h1>`;
    let fin1=top2[0];
    let fin2=top2[1];

    let topscore1=Math.floor(Math.random()*100+200);
    let topscore2=Math.floor(Math.random()*100 +200);

    let finalwin=topscore1>topscore2 ? fin1 : fin2;
    result.innerHTML+=`<p> ${fin1} (${topscore1}) vs ${fin2} (${topscore2})</p>`;
    result.innerHTML+=`<h1 style=color:"green";>Champion:${finalwin}</h1>`;

    console.log("Champion:",finalwin);
    return finalwin;
        
    }

