import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { Post } from './post';

@Injectable()
export class PostService {

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<Post[]> {

    /*=========================================================================|
    | Pink Path                                                                |
    |==========================================================================|
    | Pide al servidor que te retorne los posts ordenados de más reciente a    |
    | menos, teniendo en cuenta su fecha de publicación. Filtra también        |
    | aquellos que aún no están publicados, pues no deberían mostrarse al      |
    | usuario.                                                                 |
    |                                                                          |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer el      |
    | filtro y ordenación de los datos en tus peticiones, pero te ayudo        |
    | igualmente. La querystring debe tener estos parámetros:                  |
    |                                                                          |
    |   - Filtro por fecha de publicación: publicationDate_lte=fecha           |
    |   - Ordenación: _sort=publicationDate&_order=DESC                        |
    |                                                                          |
    | Una pista más, por si acaso: HttpParams.                                 |
    |=========================================================================*/

    const options = {
    params: new HttpParams()
      .set("publicationDate_lte", new Date().getTime().toString() )
      .set("_sort","publicationDate")
      .set("_order","Desc")
    }

    
    return this._http.get<Post[]>(`${environment.backendUri}/posts`, options);
  }

  getUserPosts(id: number): Observable<Post[]> {

    /*=========================================================================|
    | Red Path                                                                 |
    |==========================================================================|
    | Ahora mismo, esta función está obteniendo todos los posts existentes, y  |
    | solo debería obtener aquellos correspondientes al autor indicado. Añade  |
    | los parámetros de búsqueda oportunos para que retorne solo los posts que |
    | buscamos. Ten en cuenta que, además, deben estar ordenados por fecha de  |
    | publicación descendente y obtener solo aquellos que estén publicados.    |
    |                                                                          |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer el      |
    | filtro y ordenación de los datos en tus peticiones, pero te ayudo        |
    | igualmente. La querystring debe tener estos parámetros:                  |
    |                                                                          |
    |   - Filtro por autor: author.id=autor                                    |
    |   - Filtro por fecha de publicación: publicationDate_lte=fecha           |
    |   - Ordenación: _sort=publicationDate&_order=DESC                        |
    |                                                                          |
    | Una pista más, por si acaso: HttpParams.                                 |
    |=========================================================================*/

     return this._http.get<Post[]>(`${environment.backendUri}/posts`);
  }

  getCategoryPosts(id: number): Observable<Post[]> {

    /*=========================================================================|
    | Yellow Path                                                              |
    |==========================================================================|
    | Ahora mismo, esta función está obteniendo todos los posts existentes, y  |
    | solo debería obtener aquellos correspondientes a la categoría indicada.  |
    | Añade los parámetros de búsqueda oportunos para que retorne solo los     |
    | posts que buscamos. Ten en cuenta que, además, deben estar ordenados por |
    | fecha de publicación descendente y obtener solo aquellos que estén       |
    | publicados.                                                              |
    |                                                                          |
    | Este Path tiene un extra de dificultad: un objeto Post tiene una         |
    | colección de objetos Categoria, y 'JSON Server' no permite filtrado en   |
    | colecciones anidadas. Por tanto, te toca a ti darle una solución a este  |
    | marrón. Una posibilidad sería aprovechar el operador 'map' de los        |
    | observables. Sirven para transformar flujos de datos y, de alguna forma, |
    | es lo que vamos buscando. Podríamos obtener todos los posts y luego      |
    | filtrarlos por categoría en 'map'. Ahí te lo dejo.                       |
    |                                                                          |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer el      |
    | filtro y ordenación de los datos en tus peticiones, pero te ayudo        |
    | igualmente. La querystring debe tener estos parámetros:                  |
    |                                                                          |
    |   - Filtro por fecha de publicación: publicationDate_lte=fecha           |
    |   - Ordenación: _sort=publicationDate&_order=DESC                        |
    |                                                                          |
    | Una pista más, por si acaso: HttpParams.                                 |
    |=========================================================================*/

     return this._http.get<Post[]>(`${environment.backendUri}/posts`);
  }

  getPostDetails(id: number): Observable<Post> {
    return this._http.get<Post>(`${environment.backendUri}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {

    /*=========================================================================|
    | Purple Path                                                              |
    |==========================================================================|
    | Utiliza el cliente HTTP para guardar en servidor el post indicado. La    |
    | ruta sobre la cual tienes que hacer la petición POST es '/posts'.        |
    | Recuerda que siempre que se crea una entidad en servidor es una buena    |
    | práctica retornar la misma con los datos actualizados obtenidos tras la  |
    | inserción.                                                               |
    |=========================================================================*/

    return null;
  }

}
