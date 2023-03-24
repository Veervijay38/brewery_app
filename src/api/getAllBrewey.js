import axios from "axios";
import { useQuery } from "react-query";

export const baseUrl = "https://api.openbrewerydb.org/breweries";


export const getSearchbreweries = async (search) => {
    try {
      const Url = `${baseUrl}/search?query=${search}&per_page=10`;
      const response = await axios.get(Url);
      console.log("Breweries========>", response);
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("Something is wrong");
      }
    } catch (error) {
      console.log("Soemthing is wrong", error);
    }
  };

export const getAllbreweries = async () => {
  try {
    const Url = `${baseUrl}?per_page=15`;
    const response = await axios.get(Url);
    console.log("Breweries========>", response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Something is wrong");
    }
  } catch (error) {
    console.log("Soemthing is wrong", error);
  }
};

export const getbyNamebreweries = async (search) => {
  try {
    const Url = `${baseUrl}?by_name=${search}&per_page=15`;
    const response = await axios.get(Url);
    console.log("Breweries========> getbyNamebreweries", response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Something is wrong");
    }
  } catch (error) {
    console.log("Soemthing is wrong", error);
  }
};
export const getbyCitybreweries = async (search) => {
  try {
    const Url = `${baseUrl}?by_city=${search}&per_page=15`;
    const response = await axios.get(Url);
    console.log("Breweries========> getbyCitybreweries", response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Something is wrong");
    }
  } catch (error) {
    console.log("Soemthing is wrong", error);
  }
};

export const UseGetAllBrebweries = () => {
  const { isLoading, data, refetch } = useQuery(["allBreweries"], () =>
    getAllbreweries()
  );
  console.log("log after hitting the API ", data, isLoading);
  return { data, isLoading, refetch };
};
