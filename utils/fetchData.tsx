import store from '@/app/store';

export default class fetchData {
    static async PostData(vUrl: string, vData: any) {
        try {
            var pData = vData;
            var pHeaders;
            if (!(pData instanceof FormData)) {
                pData = JSON.stringify(pData);
                pHeaders = {
                    //'Accept': 'application/json, text/plain, */*',
                    'Accept': '*/*',
                    'Content-Type': 'application/json; charset=utf-8'
                };
            }

            var pBaseUrl = window.runtimeConfig?.API_BASE_URL;
            var pResponse = await fetch(pBaseUrl + vUrl, {
                method: 'POST',
                headers: pHeaders,
                credentials: 'include',
                body: pData,
                mode: 'cors'
            });
            var pText = await pResponse.text();
            var pJson;
            try {
                pJson = JSON.parse(pText);
                if (pJson?.d != null)
                    pJson = pJson.d;
            } catch (error) {
            }

            if (pResponse.ok) 
                return pJson || pText;
            else if (pJson != null)
                throw pJson;
            else if (pText != null)
                throw pText;
            else
                throw pResponse.statusText;
        } catch (error2: any) {
            throw error2;
        }
    }

    static async GetData(vUrl: string) {
        var pBaseUrl = store.getState().serverConfig.baseUrl;
        var pResponse = await fetch(pBaseUrl + vUrl, {
            credentials: 'include'
        });
        const pData = await pResponse.text();
        try {
            const pJson = JSON.parse(pData);
            return pJson;    
        } catch (error) {
            return pData;
        } 
    }
}