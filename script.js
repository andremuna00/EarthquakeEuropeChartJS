/*ANDREA MUNARIN MATRICOLA = 879607*/

$(document).ready(function(){
	
	var ctx = document.getElementById('myChart').getContext('2d');
	
	/*creaiamo la bubble chart, settando tre possibili datasets*/
	var bubble = new Chart(ctx, {
		type: 'bubble',
		backgroundImage: 'mondo.png',
		data:{
			datasets: [{
				label: ["1900-1950"],
				backgroundColor: ['rgba(255,0,0,0.2)','rgba(255,0,0,0.2)'],
				borderColor: 'red'
			},
			{
				label: ["1950-2000"],
				backgroundColor: ['rgba(0,255,0,0.2)','rgba(0,255,0,0.2)'],
				borderColor: 'green'
			},
			{
				label: ["2000-2020"],
				backgroundColor: ['rgba(0,0,255,0.2)','rgba(0,0,255,0.2)'],
				borderColor: 'blue'
			}]
			
		},
		options:{
			scales:{
					yAxes:[{
						ticks:{
							suggestedMax: 60,
							suggestedMin: 0
						},
						display: false
					}],
					xAxes:[{
						ticks:{
							suggestedMax: 60,
							suggestedMin: 0
						},
						display: false
					}]
			},
		}
	});
	
	/*impostiano i dati da caricare nella chart*/
	var data = [{"x":27.5, "y":16+3, "r":15}, {"x":9, "y":14+3, "r":17}];
	var luoghi =["Italia","Spagna"];
	var giorno = ["31/12/1901","12/08/1925"];
	
	var data2 = [{"x":12+3, "y":45, "r":15}, {"x":22+3, "y":35+3, "r":24}];
	var luoghi2 =["Inghilterra","Germania"];
	var giorno2 = ["17/04/1978","18/01/1952"];
	
	var data3 = [{"x":50+3, "y":10+3, "r":20}, {"x":15+3, "y":29+3, "r":58}];
	var luoghi3 =["Turchia","Francia"];
	var giorno3 = ["10/03/2000","15/02/2012"];

	/*aggiungiamo le varie bolle in tempi diversi*/
	function addData(chart, label, data, data2, data3){
		for(i=0;i<data.length;i++)
		{
			let d = data[i];
			let d2 = data2[i];
			let d3 = data3[i];
			let ii = i;
			setTimeout(function(){
				chart.data.datasets[0].data.push(d);
				chart.update();
			},(i+1)*1000);	
			setTimeout(function(){
				chart.data.datasets[1].data.push(d2);
				chart.update();
			},(data.length+i+1)*1000);	
			setTimeout(function(){
				chart.data.datasets[2].data.push(d3);
				chart.update();
			},(data.length+data2.length+i+1)*1000);	
		}
	}
	
	/*richiamiamo la funzione*/
	addData(bubble,"1900-1950",data, data2, data3);
	
	/*modifichiamo la label dei tooltips (quello che vediamo passando sopra con il mouse) attraverso una funzione di callback*/
	bubble.options.tooltips.callbacks.label=function (tooltipItem, data) {/*tooltipItem contiene tutti i tooltipi, mentre data contiene i valori*/
						if(tooltipItem.datasetIndex==0)/*suddivisiamo in baso al dataset in modo da gestire più facilmente gli array con i dati*/
						{
							/*per la posizione x e y riutilizziamo quelle che erano già segnate nel tooltip*/
							return'data : '+giorno[tooltipItem.index]+', luogo : '+luoghi[tooltipItem.index]+', latitudine : '+tooltipItem.yLabel+', longitudine : '+ tooltipItem.xLabel+', intensita : '+data.datasets[0].data[tooltipItem.index].r;
						}
						else if(tooltipItem.datasetIndex==1)
						{
							return'data : '+giorno2[tooltipItem.index]+', luogo : '+luoghi2[tooltipItem.index]+', latitudine : '+tooltipItem.yLabel+', longitudine : '+ tooltipItem.xLabel+', intensita : '+data.datasets[1].data[tooltipItem.index].r;
						}
						else if(tooltipItem.datasetIndex==2)
						{
							return'data : '+giorno3[tooltipItem.index]+', luogo : '+luoghi3[tooltipItem.index]+', latitudine : '+tooltipItem.yLabel+', longitudine : '+ tooltipItem.xLabel+', intensita : '+data.datasets[2].data[tooltipItem.index].r;
						}
						else	
							return "errore";
	};
	
});