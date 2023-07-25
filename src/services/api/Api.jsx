import productApi from "./productApi"

async function fetchProducts() {
    try {
      const res = await productApi.getAll();
      function handler(course) {
        return (course)
      }
      var arrayState = res.data.map(handler)
    } catch (error) {
      console.log(error)
    }
    return (arrayState)
  }

  export default fetchProducts