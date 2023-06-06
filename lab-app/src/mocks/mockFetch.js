const playlistsListResponse = 
    [
        { id: 1, name: "testPl1", state: "Public", user_name: "testUser1" },
        { id: 2, name: "testPl2", state: "Private", user_name: "testUser2" }
    ]


export default async function mockFetch(url){
    switch(url){
        case "http://localhost:5000/playlist":{
            return {
                ok: true,
                status: 200,
                json: async () => playlistsListResponse,
            };
        }
        default:{
            throw new Error(`Unhandled request: ${url}`);
        }
    }
} 