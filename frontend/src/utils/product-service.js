import { getPaginatedProductsApi, getProductByIdApi } from "./api-service";

export async function getProductById(productId) {
  return await getProductByIdApi(productId)
}

export async function getPaginatedProducts(params) {
  // const startIndex = pageIndex * pageSize;
  // const endIndex = startIndex + pageSize;

  // let data = PRODUCTS;

  // // Filter data by criteria
  // if (filterBy.checkedBrands) {
  //   data = data.filter((item) => filterBy.checkedBrands.includes(item.brand));
  // }

  // if (filterBy.type) {
  //   data = data.filter((product) => product.type === filterBy.type);
  // }

  // // Filter data by search key
  // data = data.filter((product) =>
  //   product.name.toLowerCase().includes(searchKey.toLowerCase())
  // );

  // //Filter data by price
  // data = data.filter((product) => product.price > minPrice);

  // data = data.filter((product) => product.price < maxPrice);

  // // Sort data
  // switch (sortBy) {
  //   case SORT_BY.NEWEST:
  //     data = [...data].sort((a, b) => a.id - b.id);
  //     break;
  //   case SORT_BY.OLDEST:
  //     data = [...data].sort((a, b) => b.id - a.id);
  //     break;
  //   case SORT_BY.PRICE_HIGH:
  //     data = [...data].sort((a, b) => a.price - b.price);
  //     break;
  //   case SORT_BY.PRICE_LOW:
  //     data = [...data].sort((a, b) => b.price - a.price);
  //     break;
  // }

  // // Paginating
  // const paginatedData = data.slice(startIndex, endIndex);

  const { items } = await getPaginatedProductsApi(params);

  return {
    total: items.length,
    data: items,
  };
}
