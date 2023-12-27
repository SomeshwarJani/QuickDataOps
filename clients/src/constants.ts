export enum ROUTES {
  HOME = "/",
  USERDATA = "/user-data",
}

export enum STATICSTRINGS {
  IDSTRING = "/?id=",
  ID = "id",
}
enum baseURL {
  url = "https://user-data-task-clients.vercel.app/",
}
export enum APIS {
  FETCHSECTORS = `${baseURL.url}api/sectors`,
  FETCH_SELECTED_ROW_DATA = `${baseURL.url}api/edit/`,
  SUBMITFORM = `${baseURL.url}api/submit`,
  UPDATEDATA = `${baseURL.url}api/update`,
  DELETEDATA = `${baseURL.url}api/delete/`,
  FETCHUSERDATA = `${baseURL.url}api/userdata`,
}
