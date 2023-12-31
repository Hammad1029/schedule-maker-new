import axios from "axios"
import { store } from "../store/index";
import { NotificationManager } from "react-notifications";
import { setLoading } from "../store/reducers/app";

const httpService = async (config = {}) => {
    try {
        store.dispatch(setLoading(true))
        let { baseURL, endpoint, base, reqBody, token, successNotif, description } = { ...defaultConfig, ...config };
        if (endpoint === undefined || base === undefined) throw new Error("Endpoint not given");
        if (!endpoint[2]) token = `Bearer ${store.getState().user.token}`;
        const res = await axios({
            method: endpoint[1],
            url: `${base}/${endpoint[0]}`,
            baseURL,
            data: reqBody,
            headers: { Authorization: token },
        })
        const { data: { responseCode, responseDescription, data }, status } = res;
        description = description || responseDescription;
        if (status === 200) {
            if (responseCode === "00") {
                if (successNotif) NotificationManager.success(description, "SUCCESS")
                return data || true;
            }
            else NotificationManager.warning(responseDescription, "ERROR")
        } else if (status === 400) NotificationManager.error(data.join("\n"));
        else NotificationManager.error(description);
        return false;
    } catch (e) {
        console.error(e);
        NotificationManager.error("Please contact system administrators", "ERROR");
        return false
    } finally {
        store.dispatch(setLoading(false))
    }
}

export default httpService

const defaultConfig = {
    baseURL: "http://localhost:5600/",
    endpoint: undefined,
    base: undefined,
    reqBody: {},
    jwt: undefined,
    successNotif: false,
    description: undefined
}

const methods = {
    post: "POST",
    get: "GET"
}

// endpoint url, method name, unauthorized
export const endpoints = {
    auth: {
        base: "auth",
        signUp: ["signUp", methods.post, true],
        login: ["login", methods.post, true],
        updateProfile: ["updateProfile", methods.post],
    },
    course: {
        base: "course",
        create: ["create", methods.post],
        view: ["view", methods.get],
        search: ["search", methods.post],
    },
    schedules: {
        base: "schedules",
        makeSchedule: ["makeSchedule", methods.post],
        uploadSchedule: ["uploadSchedule", methods.post],
        getAppInfo: ["getAppInfo", methods.get],
        saveSchedule: ["saveSchedule", methods.post],
        getSaveSchedule: ["getSaveSchedule", methods.get],
        deleteSavedSchedule: ["deleteSavedSchedule", methods.post],
    }
}

/*
    async () => {
        const res = await httpService({
        endpoint: endpoints.auth.login,
        base: endpoints.auth.base,
        reqBody: { erp: 25252, password: "password" },
        successNotif: true
        })
        console.log(res)
    }}
*/