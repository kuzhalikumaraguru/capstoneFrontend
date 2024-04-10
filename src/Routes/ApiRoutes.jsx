const ApiRoutes = {
  SIGN_IN: {
    path: "/user/login",
    authenticate: false,
  },
  SIGN_UP: {
    path: "/user/createUser",
    authenticate: false,
  },
  FOR_PWD: {
    path: "/user/forgetPassword",
    authenticate: false,
  },
  SET_NEW_PWD: {
    path: "/user/forgetPassword",
    authenticate: true,
  },
  CREATE_PROJECT: {
    path: "/project/create",
    authenticate: true,
  },
  EDIT_PROJECT: {
    path: "/project/edit",
    authenticate: true,
  },
  GET_ALL_PROJECT: {
    path: "/project/all",
    authenticate: true,
  },
  DELETE_PROJECT: {
    path: "/project/delete",
    authenticate: true,
  },
  CREATE_USER: {
    path: "/user/createUser",
    authenticate: true,
  },
  EDIT_USER: {
    path: "/user/editUser",
    authenticate: true,
  },
  GET_ALL_USER: {
    path: "/user/all",
    authenticate: true,
  },
  DELETE_USER: {
    path: "/user/delete",
    authenticate: true,
  },
  CREATE_MATERIAL: {
    path: "/material/create",
    authenticate: true,
  },
  GET_MATERIAL: {
    path: "/material/all",
    authenticate: true,
  },
  EDIT_MATERIAL: {
    path: "/material/edit",
    authenticate: true,
  },
  DELETE_MATERIAL: {
    path: "/material/delete",
    authenticate: true,
  },
  CREATE_PLAN: {
    path: "/plan/create",
    authenticate: true,
  },
  GET_PLAN: {
    path: "/plan/all",
    authenticate: true,
  },
  EDIT_PLAN: {
    path: "/plan/edit",
    authenticate: true,
  },
  DELETE_PLAN: {
    path: "/plan/delete",
    authenticate: true,
  },
  DOWNLOAD_AGG_DOC: {
    path: "/agreement/download",
    authenticate: true,
  },
  GET_QUOT_PDF: {
    path: "/quotation/generate-pdf",
    authenticate: true,
  }
};

export default ApiRoutes;
