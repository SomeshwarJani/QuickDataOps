export enum ROUTES {
  HOME = "/",
  USERDATA = "/user-data",
}

export enum STATICSTRINGS {
  IDSTRING = "/?id=",
  ID = "id",
}
export enum APIS {
  FETCHSECTORS = "https://user-data-task-server.vercel.app/api/sectors",
  FETCH_SELECTED_ROW_DATA = "https://user-data-task-server.vercel.app/api/edit/",
  SUBMITFORM = `https://user-data-task-server.vercel.app/api/submit`,
  UPDATEDATA = "https://user-data-task-server.vercel.app/api/update",
  DELETEDATA = "https://user-data-task-server.vercel.app/api/delete/",
  FETCHUSERDATA = "https://user-data-task-server.vercel.app/api/userdata",
}
