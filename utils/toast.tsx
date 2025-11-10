// if conflict with "fetchData", import like this:

import { ThemeIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

// import fetchUtils from 'utils/fetchData';
export default class toast {
    static loading(vTitle: string, vMessage: string) {
        var pNotificationID = notifications.show({
            title: vTitle,
            message: vMessage,
            loading: true,
            autoClose: false,
            position: 'top-center'
        });
        return pNotificationID;
    }

    static success(vTitle: string, vMessage: string, vID: (string | null) = null) {
        var pParams = {
            id: vID,
            title: vTitle,
            message: vMessage,
            icon: <IconCheck />,
            loading: false,
            autoClose: true,
            position: 'top-center'
        } as any;
        if (vID)
            notifications.update(pParams);
        else
            notifications.show(pParams);
    }

    static error(vTitle: string, vMessage: string | React.ReactNode, vID: (string | null) = null) {
        var pParams = {
            id: vID,
            title: vTitle,
            message: vMessage,
            icon: <ThemeIcon color="red" radius="xl" > <IconX /> </ThemeIcon>,
            loading: false,
            autoClose: true,
            position: 'top-center'
        } as any;
        if (vID)
            notifications.update(pParams);
        else
            notifications.show(pParams);
    }

    static hide(vID: string) {
        notifications.hide(vID);
    }
}