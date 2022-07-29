import axios from "axios";

export const wordpressData = async (query, variables, headers) => {
  try {
    const res = await axios.post(
      process.env.URL_WORDPRESS,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getAllProducts = async () => {
  const query = `
  {
  products(first: 999, where: {orderby: {field: DATE, order: ASC}}) {
    edges {
      node {
        id
        onSale
        name
        slug
        status
        description
        image {
          altText
          link
          mediaItemUrl
        }
        ... on SimpleProduct {
          id
          name
          price
        }
      }
    }
  }
}`;

  const res = await wordpressData(query);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.products?.edges || [];
};

export const getAllProductsSlug = async () => {
  const query = `
  {
  products(first:999) {
    edges {
      node {
        id
        slug
      }
    }
  }
}`;

  const res = await wordpressData(query);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.products?.edges || [];
};

export const getAllProductsByCategory = async (category = "") => {
  const query = `
    query getAllProductsByCategory($category: String) {
       products(where: {category: $category, orderby: {field: DATE, , order:ASC}}) {
        edges {
          node {
            id
            onSale
            name
            slug
            status
            description
            databaseId
            image {
              altText
              mediaItemUrl
            }
            ... on SimpleProduct {
              id
              name
              price
            }
          }
        }
      }
    }
  `;

  const variables = {
    category,
  };

  const res = await wordpressData(query, variables);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.products?.edges || [];
};

export const getProductBySlug = async (slug = "") => {
  const query = `query getProductBySlug($slug: ID!) {
                  product(idType: SLUG, id: $slug) {
                    id
                    onSale
                    name
                    slug
                    status
                    description
                    databaseId
                    image {
                      altText
                      mediaItemUrl
                    }
                    ... on SimpleProduct {
                      id
                      name
                      price
                    }
                  }
                }`;

  const variables = {
    slug,
  };

  const res = await wordpressData(query, variables);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.product || [];
};

export const mutationCreateCustomer = async ({ customer }) => {
  const query = `
    mutation ($input: RegisterCustomerInput!) {
      registerCustomer(input: $input) {
        customer {
          username
          email
          id
        }
      }
    }
  `;

  const variables = {
    "input": {
      "email": customer?.email || "",
      "username": customer?.username || "",
      "password": customer?.password || "",
    },
  };

  const res = await wordpressData(query, variables);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res.data?.registerCustomer?.customer || [];
};

export const mutationLogin = async ({ user }) => {
  const query = `
     mutation LoginUser($input:LoginInput!) {
        login( input: $input ) {
    			customer{
            billing{
              country
              firstName
              lastName
            }
            sessionToken
            jwtAuthToken
            jwtRefreshToken
          }
    			user {
            id
            username
            email
            databaseId
          }
        }
      }
  `;

  const variables = {
    "input": {
      "username": user?.username || "",
      "password": user?.password || "",
    },
  };

  const res = await wordpressData(query, variables);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.login || [];
};

export const mutationSetItemsCart = async ({ items = [], userData = null }) => {
  const query = `
    mutation addCart($input: AddCartItemsInput!){
      addCartItems(input: $input){
          cart{
    contents{
      edges{
        node{
          key
          quantity
          subtotal
          total
          total
          product{
            node{
               id
            onSale
            name
            slug
            status
            description
            databaseId
            image {
              altText
              mediaItemUrl
            }
            ... on SimpleProduct {
              id
              name
              price
              stockQuantity
            }
            }
          }
        }
      }
    }
    total
    totalTax
    subtotal
    subtotalTax
  }
      }
    }
  `;

  const variables = {
    input: {
      items: items.map((item) => ({
        productId: item?.databaseId || "",
        quantity: item?.quantity || "",
      })),
    },
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }
  return res?.data?.addCartItems?.cart || [];
};

export const mutationCustomer = async ({ newCustomer, userData }) => {
  const query = `
      mutation updateCustomer($input: UpdateCustomerInput!){
      updateCustomer(input: $input){
        customer{
            billing{
              country
              firstName
              lastName
            }
            sessionToken
            jwtAuthToken
            jwtRefreshToken
          }
      }
    }
  `;

  const variables = {
    input: {
      id: userData?.user?.databaseId,
      billing: {
        firstName: newCustomer?.firstname || "",
        lastName: newCustomer?.lastname || "",
        country: newCustomer?.country || "",
      },
    },
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.updateCustomer?.customer || [];
};

export const getCartService = async ({ userData }) => {
  const query = `
    query getCart{
      cart{
        contents{
          edges{
            node{
              key
              quantity
              subtotal
              total
              total
              product{
                node{
                  id
                onSale
                name
                slug
                status
                description
                databaseId
                image {
                  altText
                  mediaItemUrl
                }
                ... on SimpleProduct {
                  id
                  name
                  price
                }
                }
              }
            }
          }
        }
        total
        totalTax
        subtotal
        subtotalTax
      }
    }
  `;

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, {}, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res.data?.cart || [];
};

export const mutationClearCart = async ({ userData }) => {
  const query = `
    mutation clearCart($input: EmptyCartInput!){
      emptyCart(input: $input){
        deletedCart{
          total
        }
      }
    }
  `;

  const variables = {
    "input": {
      "clearPersistentCart": true,
    },
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data || [];
};

export const checkout = async ({ userData }) => {
  const query = `
    
   mutation checkout($input: CheckoutInput!){
    checkout(input: $input ){
      redirect
      customer{
        id
        username
        email
      }
    	order{
        orderNumber
        total
        date
        paymentMethodTitle
        orderKey
        lineItems{
          edges{
            node{
              quantity
              total
              product{
                node{
                  name
                  description
                  id
                }
              }
            }
          }
        }
      }
      result
      
    } 
  }
  `;

  const variables = {
    "input": {
      "billing": {
        "firstName": userData?.customer?.billing?.firstName || "",
        "lastName": userData?.customer?.billing?.lastName || "",
        "email": userData?.user?.email || "",
      },
      "isPaid": true,
      "paymentMethod": "stripe",
      "shipToDifferentAddress": false,
    },
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.checkout;
};

export const removeItemsFromCart = async ({ userData, keys = [] }) => {
  const query = `
      mutation remove($input:RemoveItemsFromCartInput!){
        removeItemsFromCart(input:$input){
          cart{
          contents{
            edges{
              node{
                key
                quantity
                subtotal
                total
                total
                product{
                  node{
                    id
                  onSale
                  name
                  slug
                  status
                  description
                  databaseId
                  image {
                    altText
                    mediaItemUrl
                  }
                  ... on SimpleProduct {
                    id
                    name
                    price
                    stockQuantity
                  }
                  }
                }
              }
            }
          }
          total
          totalTax
          subtotal
          subtotalTax
        }
      }
    }
  `;

  const variables = {
    "input": {
      keys,
    },
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.cart || [];
};

export const addItemToCart = async ({ userData, product }) => {
  const query = `
mutation addCart($input: AddToCartInput!) {
  addToCart(input: $input) {
    cartItem {
      key
      product {
        node {
          id
          onSale
          name
          slug
          status
          description
          databaseId
          image {
            altText
            mediaItemUrl
          }
          ... on SimpleProduct {
            id
            name
            price
            stockQuantity
          }
        }
      }
    }
  }
}
  `;

  const variables = {
    input: {
      "productId": product.databaseId,
    },
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.addToCart?.cartItem || [];
};

export const getUserById = async ({ userData, id }) => {
  const query = ` 
    query getUser($input:Int!){
      customer(customerId: $input){
        id,
        username,
        email,
        databaseId,
        billing{
          country,
          firstName,
          lastName
        }
        jwtRefreshToken
        sessionToken
      }
    }
  `;

  const variables = {
    input: id || 0,
  };

  let headers = {};

  if (userData) {
    headers = {
      Authorization: `Bearer ${userData?.jwtAuthToken}`,
    };
  }

  const res = await wordpressData(query, variables, headers);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.customer || [];
};

export const refreshToken = async ({ refreshToken }) => {
  const query = `
    mutation refreshAuthToken($input: RefreshJwtAuthTokenInput!){
      refreshJwtAuthToken(input:$input){
        authToken
      }
    }
  `;

  const variables = {
    input: {
      "jwtRefreshToken": refreshToken || "",
    },
  };

  const res = await wordpressData(query, variables);

  if (res?.errors) {
    throw new Error(res?.errors[0].message || "Error");
  }

  return res?.data?.refreshJwtAuthToken;
};
