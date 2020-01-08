const initial_state = {
    user:{},
    isloggin:false,
    whichpage:'Home',
    access_token:'',
    siteurl:'http://www.thelittlebigkidcompany.com.ng',
    //siteurl:'http://localhost/CustomerApp/public',
    products:{},
    deals:{},
    orders:[],
    orderdetails:{},
    customerdetails:{}
};

const DataReducer = (state = initial_state, action) => {
    switch(action.type){
        case 'LOGIN':
                return Object.assign({}, state, {
                isloggin:true,
                access_token:action.data.access_token,
                user:action.data.user
        });
        case 'LOGOUT':
                return Object.assign({}, state, {
                isloggin:false,
                access_token:'',
                user:{}
        });
        case 'WHICHPAGE':
                return Object.assign({}, state, {
                whichpage:action.data.page
        });
        case 'PRODUCTS':
                return Object.assign({}, state, {
                products:action.data.products
        });
        case 'DEALS':
                return Object.assign({}, state, {
                deals:action.data.deals
        });
        case 'CUSTOMER':
                return Object.assign({}, state, {
                customerdetails:action.data.details
        });
        case 'ORDERS':
                return Object.assign({}, state, {
                orders:action.data.orders
        });
        case 'ORDERDETAILS':
                return Object.assign({}, state, {
                orderdetails:action.data
        });
    }
    return state;
};
export default DataReducer;        