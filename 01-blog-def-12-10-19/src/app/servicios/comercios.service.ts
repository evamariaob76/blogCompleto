import { Injectable } from "@angular/core";
import { onErrorResumeNext } from 'rxjs';
import { Observable, of, pipe, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map, catchError, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';


@Injectable()
export class ComerciosService {
  private comercios : Comercio[]=[];
    /*private comercios: Comercio[] = [
        { id: 0,
          nombre: "Restaurante Casa Pedro",
          resumen: "Es uno de los rincones gastronómicos de la villa, que ha sabido mantener en el tiempo los sabores de la vieja cocina castellana, y madrileña después, es Casa Pedro.",
          img: "assets/img/casaPedro/casaPedro.jpg",
          img1: "assets/img/casaPedro/casaPedro1.jpg",
          img2: "assets/img/casaPedro/casaPedro2.jpg",
          aparicion: "1825" ,
          lat: 40.497508 ,
          lng: -3.687059,
          direccion:" Calle de nuestra señora de Valverde, 119",
          cp:"28034 Madrid",
          telefono:"917 34 02 01",
          facebook:"https://www.facebook.com/Restaurante-Casa-Pedro-2028879920670208/?__tn__=%2Cd%2CP-R&eid=ARDT2EBWUga4wWjXnyMhLghn-83KVCV8LwBF0jy48giUTTocM3TgcK5ZMO2jp7Vbg4Dz6AANh9rbaq6q",
          actividad:"restaurante",
          likes: 0
       
        },
        { id:1,
          nombre: "Farmacia Deleuze",
          resumen: " Abierta en 1780 con el nombre de “Botica de San Bernardo”, esta farmacia prodigiosa conserva su original decoración, sobre cuyo estilo hay tantas denominaciones como autores han opinado sobre ello. Digamos que el estilo predominante en la tienda sería el rococó, y el despacho interior obedecería al estilo historicista con elementos neogóticos y árabes. Su primer farmacéutico conocido es Baltasar de Riego, que era pintor además de farmacéutico. Aquí se reunían escritores como Espronceda y Ventura de la Vega.",
          img: "assets/img/deleuze/deleuze.jpg",
          img1: "assets/img/deleuze/deleuze1.jpg",
          img2: "assets/img/deleuze/deleuze2.jpg",
          aparicion: "1780",
          lat: 40.4235481,
          lng:-3.7075543,
          direccion:" Calle de San Bernardo, 39",
          cp:"28015 Madrid",
          telefono:"915 42 09 13",
          facebook:"https://www.facebook.com/pages/Farmacia-Deleuze-Isasi/171909589510209",
          actividad:"farmacia",
          likes: 0

        
        },
        { id:2,
          nombre: "Hotel Petit Palace Posada del Peine",
          resumen: "Hace ya más de 400 años que Juan Posada abre las puertas de esta fonda, situada estratégicamente junto a la Casa de Postas, principal parada de diligencias de la Villa (en esta época Madrid tenía un censo aproximado de 900 coches de caballos), a la que                 llegaban granjeros y comerciantes con productos de las provincias que pernoctaban uno o dos días en la capital. Este alojamiento debe su nombre al característico peine atado a una cuerda, para impedir que los viajeros se lo llevaran, que se encontraba en cada una de sus habitaciones. Un lujo para la época, que le distinguió de los demás establecimientos, adoptando el mismo como emblema.",
          img: "assets/img/petit/petitPalace.jpg",
          img1: "assets/img/petit/petitPalace1.jpg",
          img2: "assets/img/petit/petitPalace2.jpg",
          aparicion: "1610",
          lat: 40.497745,
          lng: -3.706201,
          direccion:" Calle de Postas, 17",
          cp:"28012 Madrid",
          telefono:"915 23 81 51",
          facebook:"https://www.facebook.com/PetitPalaceHotels/",
          actividad:"hotel",
          likes: 0

  

        },
        { id:3,
          nombre: "Farmacia Reina Madre",
          resumen: "Al entrar en la farmacia del número 59 de la calle Mayor, entre el mercado de San Miguel y la Plaza de la Villa, un antiguo olor a madera nos recibe. Parece un local pequeño, nada que ver con la realidad porque en su interior esconde un antiguo laboratorio que hoy es testigo de una parte importante de la historia de Madrid. Mercedes Ramos Cid es, a sus 33 años, la propietaria titular de la farmacia que su abuelo José Cid Guerrero compró en 1931 y posteriormente dirigieron sus tías.",
          img: "assets/img/reina/ReinaMadre.jpg",
          img1: "assets/img/reina/ReinaMadre1.jpg",
          img2: "assets/img/reina/ReinaMadre2.jpg",
          aparicion: "1578",
          lat: 40.415809,
          lng: -3.709696,
          direccion:"Calle Mayor, 59",
          cp:"28013 Madrid",
          telefono:"915 48 00 14",
          facebook:"https://www.facebook.com/pages/Real-Farmacia-de-la-Reina-Madre/1570787816585386",
          actividad:"farmacia",
          likes: 0

       
         },
         { id:4,
          nombre: "Librería San Ginés",
          resumen: "Fundada en 1650, se trata de un pequeño espacio para encontrar tesoros antiguos, libros, láminas o cualquier curiosidad que sea de segunda mano. A pesar de ser un espacio reducido, los turistas y clientes habituales suelen reunirse en torno a su mesa al aire libre para encontrar ese libro ya descatalogado desde un euro. Cada mañana sacan cientos de libros de la caseta de madera situada en el pasadizo de San Ginés para colocarlos cuidadosamente en los anaqueles. La misma operación se repite,363 días al año, o lo que es lo mismo, todo el año excepto los días de Navidad y Año Nuevo. Los libros que están a la venta son usados, en su gran mayoría en castellano, de historia, literatura, acción… con precios a partir de un euro.",
          img: "assets/img/sanGines/SanGines.jpg",
          img1: "assets/img/sanGines/SanGines1.jpg",
          img2: "assets/img/sanGines/SanGines2.jpg",
          aparicion: "1650",
          lat: 40.417371,
          lng: -3.686706721,
          direccion:"Pasadizo de San Ginés, 2",
          cp:"28013 Madrid",
          telefono:"913 66 46 86",
          facebook:"https://www.facebook.com/Librer%C3%ADa-San-Gin%C3%A9s-110087389064491",
          actividad:"libreria",
          likes: 0

         
        },        
        { id:5,
          nombre: "Restaurante Sobrino de Botín ",
          resumen: "Antonio González y José González heredaron el restaurante Sobrino de Botín (Cuchilleros, 17) de su padre,  que a su vez lo había heredado de su abuelo. Este se encargó de mantener todo como lo habían dejado los Botín, la familia francesa que le traspasó el negocio después de fundarlo en 1725 sobre una bodega del siglo XVII. Al no haber cambiado nunca de nombre ni de ubicación,  el Libro Guinness de los Récords les concedió el honor de reconocerlo como el restaurante más antiguo del mundo.",
          img: "assets/img/sobrino/Sobrino.jpg",
          img1: 'assets/img/sobrino/Sobrino1.jpg',
          img2: "assets/img/sobrino/Sobrino2.jpg",
          aparicion: "1725",
          lat: 40.414417,
          lng: -3.707926,
          direccion:"Calle de Cuchilleros, 17",
          cp:"28005 Madrid",
          telefono:"913 66 42 17",
          facebook:"https://www.facebook.com/RestauranteBotin/",
          actividad:"restaurante" ,
          likes: 0
                     
      }
      ];*/

      private httpHeaders = new HttpHeaders();
      private url : string = 'http://localhost:8080/api/comercios';

    constructor(private router: Router,
                private http : HttpClient
                ) {   }

    getComercios() : Observable <Comercio[]>{
      return this.http.get<Comercio[]>(this.url);
    }

    findByName(nombre : string): Observable <Comercio[]>{
      return this.http.get<Comercio[]>(`${this.url}/${nombre}/busqueda`, { headers: this.httpHeaders } );
    }

    getComercio (id: number) : Observable<Comercio>{
        //return this.comercios[i];
      return this.http.get<Comercio>(`${this.url}/${id}`).pipe(
        catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('error al editar:', e.error.mensaje, 'error')
          return throwError(e);
        })
      );
    }
    
    getComerciosAll(page: number): Observable<any> {
      return this.http.get(this.url + '/page/' + page).pipe(
        tap((response: any) => {
          console.log('ComerciosService: tap 1');
          (response.content as Comercio[]).forEach(comercio => console.log(comercio.nombre));
        }),
        map((response: any) => {
          (response.content as Comercio[]).map(comercio => {
            comercio.nombre = comercio.nombre.toUpperCase();
           // comercio.createAt = formatDate(comercio.createAt, 'dd-MM-yyyy','en-US');

            return comercio;
          });
          return response;
        }),
        tap(response => {
          console.log('ClienteService: tap 2');
          (response.content as Comercio[]).forEach(comercio => console.log(comercio.nombre));
        })
      );
    }
    create(comercio: Comercio): Observable<any>{
      return this.http.post<any>(`${this.url}/crear`,comercio,{headers:this.httpHeaders}).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          Swal.fire(  e.error.mensaje, e.error.error, 'error' );
        return throwError(e);
          })
        ); 
    }

    update(comercio: Comercio): Observable<any>{
      return this.http.put<any>(`${this.url}/${comercio.id}`, comercio, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          Swal.fire(  e.error.mensaje, e.error.error, 'error' );
        return throwError(e);
          })
        ); 
    }
  
    delete(id: number): Observable<Comercio[]>{
      return this.http.delete<Comercio[]>(`${this.url}/${id}`, {headers:this.httpHeaders}).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          Swal.fire( e.error.mensaje, e.error.error, 'error' );
        return throwError(e);
          })
        ); 
    }
   addLike(id: number): Observable<Comercio> {
     return this.http.post<any>(`${this.url}/${id}/likes`, { headers: this.httpHeaders } );
        }
        addVisitas(id: number): Observable<Comercio> {
          return this.http.post<any>(`${this.url}/${id}/visitas`, { headers: this.httpHeaders } );
             }
    subirFoto(archivo: File, archivo1:File, archivo2:File, id): Observable<Comercio>{
      let formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("archivo1", archivo1);
      formData.append("archivo2", archivo2);

      formData.append("id", id);
  return this.http.post(`${this.url}/upload`, formData).pipe(
    map((response : any) => response.comercio as Comercio),
    catchError(e =>{
      console.error(e.error.mensaje);
      Swal.fire( e.error.mensaje, e.error.error, 'error' );
    return throwError(e);
      })  
      );

    }


//A PARTIR DE AQUÍ SON MÉTODOS SIN BASE DE DATOS
    buscarComercio(termino:string):Comercio[] {
      let Comercios : Comercio[]= [];
      termino=termino.toLowerCase();
        for (let comercio of this.comercios) {
              let nombre= comercio.nombre.toLocaleLowerCase();
                      if(nombre.indexOf(termino)>=0)
                      Comercios.push(comercio);
        }
      return Comercios;
    }


    buscarActividad(actividad:string):Comercio[]{
      let Actividades : Comercio[]= [];
      actividad=actividad.toLowerCase();
        for (let comercio of this.comercios){
              let act= comercio.actividad.toLocaleLowerCase();
                      if(act.indexOf(actividad)>=0)
                      Actividades.push(comercio);
        }
      return Actividades;
    }    
  

    verLikes(id: number){
      return this.comercios[id].likes;
    }
  
    getComercioNombre (i: number){
      return this.comercios[i].nombre;
    }
    getComercioId (i: number) {
      return this.comercios[i].id;
    }
 
 



}
    export class Comercio{
        id:number=null;
        nombre: string="";
        resumen: string="";
        img: string="";
        img1: string="";
        img2: string="";
        aparicion:string="";
        lat: string="";
        lng: string="";
        direccion: string="";
        cp: string="";
        telefono:string="";
        facebook:string="";
        actividad:string="";
        likes:number=0;
        createAt:Date;
        entrada:string="";
        comentarios:[];
        visitas: number = 0;

    };




