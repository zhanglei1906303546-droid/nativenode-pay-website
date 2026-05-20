const domain = 'mock.shop';

export async function shopifyFetch({ query, variables = {} }: { query: string, variables?: any }) {
  const endpoint = `https://${domain}/api/2024-07/graphql.json`;
  
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return {
      status: 500,
      body: (error as Error).message
    };
  }
}

export async function getProducts() {
  return shopifyFetch({
    query: `
      query getProducts {
        products(first: 8) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `
  });
}