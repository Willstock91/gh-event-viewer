export const GhService = {

    getEventData: function(selected){
        let url = selected === 'public' ? 'https://api.github.com/events' : 'https://api.github.com/users/Willstock91/events/public';
        return fetch(url).then(res => res.json());
    },

    getEventDetails: function(eventId, username) {
        let url = `https://api.github.com/users/${username}/events/public`;
        return fetch(url).then(res => {
            var json = res.json();
            return json.then(data => data.filter(d => d.id = eventId));
        });
    }
}

export default GhService;