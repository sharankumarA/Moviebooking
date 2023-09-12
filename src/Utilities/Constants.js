const API_BASE_URL = "http://20.204.210.216";
const ADMIN_BASE_URL = "http://localhost:49157";

const ENDPOINTS = {

    LOGIN: 'api/MovieBooking',
    SEARCH: 'api/MovieBooking/Movies/Search',
    FORGET: 'api/MovieBooking/forget',
    REGISTER: 'api/MovieBooking/Register',
    CART: 'api/MovieBooking/cart',
    THEATRE: 'api/MovieBooking/theatrename',
    TICKETBOOKED: 'api/MovieBooking/totalticketcount',
    TICKETAVAILABLE: 'api/Admin/ticket-available',
    ADD: 'api/MovieBooking/add/movie',
    DELETE: 'api/MovieBooking/delete',
    TICKETCOUNT: 'api/MovieBooking/MoviestatusTicketcount',
    BOOKEDTICKETCOUNT: 'api/MovieBooking/Bookedseats',
    TICKETCOUNTANDSTATUS: 'api/MovieBooking/ticketcountandstatus',
    UPDATE: 'api/MovieBooking/update/movie'

};

const development = {

    API_URL_LOGIN: `${API_BASE_URL}/${ENDPOINTS.LOGIN}`,
    API_URL_SEARCH: `${API_BASE_URL}/${ENDPOINTS.SEARCH}`,
    API_URL_FORGET: `${API_BASE_URL}/${ENDPOINTS.FORGET}`,
    API_URL_REGISTER: `${API_BASE_URL}/${ENDPOINTS.REGISTER}`,
    API_URL_CART: `${API_BASE_URL}/${ENDPOINTS.CART}`,
    API_URL_THEATRE: `${API_BASE_URL}/${ENDPOINTS.THEATRE}`,
    API_URL_TICKETBOOKED: `${API_BASE_URL}/${ENDPOINTS.TICKETBOOKED}`,
    API_URL_TICKETAVAILABLE: `${ADMIN_BASE_URL}/${ENDPOINTS.TICKETAVAILABLE}`,
    API_URL_ADD: `${API_BASE_URL}/${ENDPOINTS.ADD}`,
    API_URL_DELETE: `${API_BASE_URL}/${ENDPOINTS.DELETE}`,
    API_URL_TICKETCOUNT: `${API_BASE_URL}/${ENDPOINTS.TICKETCOUNT}`,
    API_URL_BOOKEDTICKETCOUNT: `${API_BASE_URL}/${ENDPOINTS.BOOKEDTICKETCOUNT}`,
    API_URL_TICKETCOUNTANDSTATUS: `${API_BASE_URL}/${ENDPOINTS.TICKETCOUNTANDSTATUS}`,
    API_URL_UPDATE: `${API_BASE_URL}/${ENDPOINTS.UPDATE}`

}

export default development;