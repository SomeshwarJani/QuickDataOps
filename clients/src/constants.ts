export enum ROUTES {
  HOME = "/",
  USERDATA = "/user-data",
}

export enum STATICSTRINGS {
  IDSTRING = "/?id=",
  ID = "id",
}
export enum APIS {
  FETCHSECTORS = "https://quickdataopsserver.vercel.app/api/sectors",
  FETCH_SELECTED_ROW_DATA = "https://quickdataopsserver.vercel.app/api/edit/",
  SUBMITFORM = `https://quickdataopsserver.vercel.app/api/submit`,
  UPDATEDATA = "https://quickdataopsserver.vercel.app/api/update",
  DELETEDATA = "https://quickdataopsserver.vercel.app/api/delete/",
  FETCHUSERDATA = "https://quickdataopsserver.vercel.app/api/userdata",
}
