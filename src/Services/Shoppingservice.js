import axios from 'axios';
const Shopping_API_BASE_URL="http://localhost:8088/api/shops";

class Shoppingservice{
    getShopping()
    {
        return axios.get(Shopping_API_BASE_URL);
    }

}
export default new Shoppingservice()