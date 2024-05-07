import axios from "axios";

export default async function spotifyAutoplay(trackId: string): Promise<string> {
    try {
        const response = await axios.get('https://open.spotify.com/get_access_token?reason=transport&productType=embed');
        const res = await axios.get(`https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${trackId}`, {
            headers: {
                Authorization: `Bearer ${response.data.accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const randomTrack = res.data.tracks[Math.floor(Math.random() * res.data.tracks.length)];
        return randomTrack.external_urls.spotify;
    } catch (error) {
        console.log(error)
        return null;
    }
}