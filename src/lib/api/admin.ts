import { howl } from "../utils"


//>>>>>>>>>>>>> Categories <<<<<<<<<<<<<<<

export const getCategoriesApi = async (token: string) => {
  return howl("/admin/get-categories", { method: "GET", token })
}

export const createCategoriesApi = async ({body,token}:{body:{name:string},token: string}) => {
  return howl("/admin/add-category", { method: "POST",body, token })
}

export const editCategoriesApi = async ({id,body,token}:{id:string,body:{name:string},token: string}) => {
  return howl(`/admin/add-category/${id}`, { method: "POST",body, token })
}

export const deleteCategoriesApi = async ({id,token}:{id:string,token: string}) => {
  return howl(`/admin/delete-category/${id}`, { method: "DELETE",token })
}
