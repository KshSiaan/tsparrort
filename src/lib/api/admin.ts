import { apiConfig } from "../config"
import { howl } from "../utils"


//>>>>>>>>>>>>> Categories <<<<<<<<<<<<<<<

export const getCategoriesApi = async () => {
  return howl("/get-categories", { method: "GET" })
}

export const createCategoriesApi = async ({body,token}:{body:{name:string},token: string}) => {
  return howl("/admin/add-category", { method: "POST",body, token })
}

export const editCategoriesApi = async ({id,body,token}:{id:string,body:{name:string,_method:string},token: string}) => {
  return howl(`/admin/edit-category/${id}`, { method: "POST",body, token })
}

export const deleteCategoriesApi = async ({id,token}:{id:string,token: string}) => {
  return howl(`/admin/delete-category/${id}`, { method: "DELETE",token })
}

//>>>>>>>>>>>>> Foods <<<<<<<<<<<<<<<

export const getFoods = async ({search,filter}:{search?:string,filter?:string}) => {
  return howl(`/get-products?search=${search??""}&filter=${filter??""}`, { method: "GET", })
}
export const getFoodbyId = async ({id,}:{id:string}) => {
  return howl(`/admin/view-product/${id}`, { method: "GET"})
}

export const addFood = async ({
  body,
  token,
}: {
  body: FormData;
  token: string;
}) => {
  const res = await fetch(`${apiConfig.baseUrl}/admin/add-product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Failed to add food: ${res.statusText}`);
  }

  return res.json();
};

export const updateFoodById = async ({
  id,
  body,
  token,
}: {
  id:string;
  body: FormData;
  token: string;
}) => {
  const res = await fetch(`${apiConfig.baseUrl}/admin/edit-product/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Failed to update food: ${res.statusText}`);
  }

  return res.json();
};

export const deleteFoodById = async ({id,token}:{id:string,token: string}) => {
  return howl(`/admin/delete-product/${id}`, { method: "DELETE", token })
}


// >>>>>>>>>>>>>>>>> Banner Management <<<<<<<<<<<<<<<<<<<<<<



export const updateBanner = async ({
  body,
  token,
}: {
  body: FormData;
  token: string;
}) => {
  const res = await fetch(`${apiConfig.baseUrl}/admin/banner-update`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  
  if (!res.ok) {
    throw new Error(`Failed to update banner: ${res.statusText}`);
  }
  
  return res.json();
};

export const getBanner = async () => {
  return howl('/get-banner', { method: "GET",})
}