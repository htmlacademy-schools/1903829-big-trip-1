const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({url: 'points'}).then(ApiService.parseResponse);
  }

  get offers() {
    return this.#load({url: 'offers'}).then(ApiService.parseResponse);
  }

  get cities() {
    return this.#load({url: 'destinations'}).then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this.#load({
      url: `points/${ point.id }`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  addPoint = async (point) => {
    const response = await this.#load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  deletePoint = async (point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${ this.#endPoint }/${ url }`,
      { method, body, headers },
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  };

  #adaptToServer = (point) => {
    const adaptedPoint = {
      'id': point.id,
      'is_favorite': point.favorite,
      'date_from': point.date.start,
      'date_to': point.date.end,
      'base_price': Number(point.basePrice),
      'type': point.type.currentType.title,
      'destination': {
        'name': point.city.currentCity.name,
        'description': point.city.currentCity.description,
        'pictures': [
          {
            'src': point.city.currentCity.pictures.src,
            'description': point.city.currentCity.pictures.description
          }
        ]
      },
      'offers': point.type.currentType.selectedOffers,
    };
    return adaptedPoint;
  };

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${ response.status }: ${ response.statusText }`);
    }
  };

  static catchError = (err) => {
    throw err;
  };
}
