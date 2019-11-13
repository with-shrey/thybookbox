import {CHANGE_USERNAME} from "containers/DashboardPage/constants";

export function changeUsername(username) {
    return {
        type: CHANGE_USERNAME,
        username,
    };
}