let requestModule=(function(){
    function makeGET(url,q){
        try {
            let url=new URL()
            if (q) {
                Object.keys(q).map(function(a) {
                    return url.searchParams.append(a,q[a])
                })
            }        
            return fetch(url,{
                'crossDomain': true,
                'Content-Type': 'application/json',
                'postman-token': 'e8b0e747-f8b8-16bb-66e1-20852ca0639d'
            })   
        } catch (error) {
            console.log(error)
        }
    }

    function makePOST(url,obj){
        try {
            return fetch(urls,{
                'method': 'POST',
                'crossDomain': true,
                'headers':{
                    'Content-Type': 'application/json',
                    'postman-token': 'e8b0e747-f8b8-16bb-66e1-20852ca0639d'
                },
                'body':JSON.stringify(obj)
            })   
        } catch (error) {
            console.log(error)
        }
    }

    function makePUT(url,obj){
        try {
            return fetch(urls,{
                'method': 'PUT',
                'crossDomain': true,
                'headers':{
                    'Content-Type': 'application/json',
                    'postman-token': 'e8b0e747-f8b8-16bb-66e1-20852ca0639d'
                },
                'body':JSON.stringify(obj)
            })   
        } catch (error) {
            console.log(error)
        }
    }

    function makeDELETE(url,obj){
        try {
            return fetch(urls,{
                'method': 'DELETE',
                'crossDomain': true,
                'headers':{
                    'Content-Type': 'application/json',
                    'postman-token': 'e8b0e747-f8b8-16bb-66e1-20852ca0639d'
                },
                'body':JSON.stringify(obj)
            })   
        } catch (error) {
            console.log(error)
        }
    }

    function getJSON(d) {
        return d.json()
    }

    return{
        GET:makeGET,
        POST:makePOST,
        PUT:makePUT,
        DELETE:makeDELETE,
        JSON:getJSON
    }
}())