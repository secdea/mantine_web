import store from '@/app/store';

export default class fetchData {
    static async PostData(vUrl: string, vData: any) {
        try {
            var pData = vData;
            var pHeaders;
            if (!(pData instanceof FormData)) {
                pData= JSON.stringify(pData);
                pHeaders = {
                    //'Accept': 'application/json, text/plain, */*',
                    'Accept': '*/*',
                    'Content-Type': 'application/json; charset=utf-8'
                };
            }

            var pBaseUrl = store.getState().serverConfig.baseUrl;
            var pResponse = await fetch(pBaseUrl + vUrl, {
                method: 'POST',
                headers: pHeaders,
                credentials: 'include',
                body: pData,
                mode: 'cors'
            });
            var pText = await pResponse.text();
            try {
                pData = JSON.parse(pText);
                if (pData?.d != null)
                    pData = pData.d;
            } catch (error) {
            }

            if (pResponse.ok)
                return pData;
            else if (pData != null)
                throw pData;
            else if (pText != null)
                throw new Error(pText);
            else
                throw new Error(pResponse.statusText);
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