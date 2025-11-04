import dayjs from "dayjs";

export default class dateUtils {
    static formatDate(vDate: Date | string | undefined | null) {
        if ((vDate == null)
            || (vDate == undefined)
            || (vDate == ''))
            return vDate;

        return dayjs(vDate).format('YYYY-MM-DD');
    }
}