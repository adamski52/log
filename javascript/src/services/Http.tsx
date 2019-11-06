import fetch from "cross-fetch";

export default class HttpService {
    private static baseUrl = "";

    private static getHeaders(apiKey:string) {
        let headers:any = {
            "Content-Type": "application/json"
        };
        
        if(apiKey) {
            headers["X-API-KEY"] = apiKey;
        }

        return headers;
    }

    private static toJson(response:Response) {
        if(response.ok) {
            return response.json();
        }

        throw response;
    }

    public static get(url:string, apiKey:string = "") {
        

        return fetch(this.baseUrl + url, {
            headers: this.getHeaders(apiKey)
        }).then(this.toJson)
    }

    public static post(url:string, body:any, apiKey:string = "") {
        return fetch(this.baseUrl + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: this.getHeaders(apiKey)
        }).then(this.toJson);
    }

    public static put(url:string, body:any, apiKey:string = "") {
        return fetch(this.baseUrl + url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: this.getHeaders(apiKey)
        }).then(this.toJson);
    }

    public static delete(url:string, apiKey:string = "") {
        return fetch(this.baseUrl + url, {
            method: "DELETE",
            headers: this.getHeaders(apiKey)
        }).then(this.toJson);
    }
}