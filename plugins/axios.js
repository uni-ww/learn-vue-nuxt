import qs from 'qs';
export default function({ $axios, redirect }) {
    $axios.onRequest(config => {
    	console.log('Making request to ' + config.url)
        config.data = qs.stringify(config.data, {
            allowDots: true //Option allowDots can be used to enable dot notation
        });
        return config;
    });
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    });
}
