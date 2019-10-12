import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { ComerciosService, Comercio} from '../../servicios/comercios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  
})

export class AdminComponent implements OnInit {
  comercios: Comercio[] = [];
  comercio : Comercio;
  totalLikes : number = 0;
  i : number=0;
  totaldef:any[]=[];
  
  constructor(private authService: AutenticacionService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private comerciosService : ComerciosService) { }

    ngOnInit() {
      this.comerciosService.getComercios().subscribe(
        comercios => console.log(comercios),
       );
      
      this.comerciosService.getComercios().pipe(
        tap(response =>{
          let comercios = response as Comercio[];
          comercios.forEach(comercio =>{//array para recorrer todos los comercios
            this.totalLikes+= comercio.likes;//suma de todos los likes para utilizar en la fórmula de la gráfica de pastel
            this.barChartLabels.push(comercio.nombre);//añado cada uno de los nombres de los comercios a la data de la gráfica barra
            this.barChartData[0].data.push(comercio.likes);//añado los likes de los comercios a la  data de la gráfica barra
            this.barChartData[1].data.push(comercio.comentarios.length);//añado cada uno de los comentarios (longitud total)  a la data de la gráfica barra
            this.barChartData[2].data.push(comercio.visitas);//añado cada uno de las visitas de los comercios a la  data de la gráfica barra
            this.pieChartLabels.push(comercio.nombre);//añado cada uno de los nombres de los comercios a la gráfica pastel
            this.pieChartData.push(comercio.likes);//añado los likes de los comercios a la data de gráfica pastel para utilizarlo en una función
            this.i++;// con la variable i determino el número de comercios
          }
          );
          for(var x=0;x<=this.i;x++){//utilizo  los datos del pieCVharData para calcualr porcentaje de likes de cada comercio y lo añado al array
           this.pieChartData[x]=Math.round(((this.pieChartData[x]*100/this.totalLikes))*10)/10;
          }

        this.pieChartColors = [{//llamo a la función para determinar el número de comercios y asginarle color
          backgroundColor: this.getUnir()
        }];
    })).subscribe( comercios => this.comercios = comercios
     )
  }

    cargarComercio():void{//llama a ComerciosService para cargar todos los comercios en pantalla
      this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id){
        this.comerciosService.getComercio(id).subscribe((comercio => this.comercio = comercio));
  
      }
      })
    }
  cerrarSesion() :void{//cierra sesión del admin
    swal.fire('Has cerrado correctamente la sesión ', '', 'success');
    this.authService.logout();
    this.router.navigate(['/home']);
    }

    VerSuscriptores(){//redirige a la página para ver los suscriptores
      this.router.navigate(['/clientes/page/0']); 
    }
    
    VerComercios(){//redirige a la página para ver los comercios
      this.router.navigate(['/likes']);
    }


  
    //PORCENTAJE DE LIKES. PASTEL

   // Trozos del pastel - Etiquetas. Se inicializan vacías, en la llamada al servicio se agregan
  public pieChartLabels: Label[] = [];

  // Trozos del pastel - Cantidades. Se inicializan vacías, en la llamada al servicio se agregan
  public pieChartData: number[] = [];

  // Trozos del pastel - Colores. Se inicializan vacías, en la llamada al servicio se  determina el número de comercios
  //y mediante las funciones getRandomColor() (para mostrar un color aletorio) y getUnir() (para unir los colores en un array) se agregan
  public pieChartColors=[
    {backgroundColor: []}
  ];
  // Opciones de la gráfica
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: 'Porcentaje de likes',
      fontSize: 20,
      fontColor: 'black',
      display: true
    },
    legend: {
      position: 'top',
    },
    plugins: {
     datalabels: {
        formatter: (value, ctx) => {
          const label = "";
          return label;
        },
        color: '#fff',
      }
    }
  };
  
  //INTERACCIÓN DE LOS NAVEGANTES CON EL CONTENIDO. BARRAS

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public barChartOptions: ChartOptions = {          
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    title: {
      text: 'Interacción de los navegantes con el contenido',
      fontSize: 20,
      fontColor: 'black',
      display: true
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    legend: {
      labels: { 
        boxWidth: 40 
      }     
    },
    layout: {
      padding: {
          left: 50,
          right: 0,
          top: 10,
          bottom: 10
      }
    }
  };

  public barChartLabels: Label[] = [];//inicilizo a 0 para cargar los datos en el servicio
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [//datos en leyenda
    { data: [], label: 'Número de likes' },
    { data: [], label: 'Número de comentarios' },
    { data: [], label: 'Número de visitas' },
  ]
 
  //Función que devuelve color aleatorio cada vez que se carga la página en la gráfica pastel
   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var x=0; x<this.i;x++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }
  //Función que une los colores aletorios en un array en función del número de comercios, conocido con la variable i en la gráfica pastel
  getUnir(){
    for(var x=0;x<=this.i;x++){
  this.totaldef.push(this.getRandomColor());
    }
    return this.totaldef;
  }

}