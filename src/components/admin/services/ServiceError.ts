import {AxiosError} from "axios";

export class ServiceError {
    code: string | undefined;
    status: number | undefined;


    constructor(axiosError: AxiosError) {
        this.code = axiosError.code;
        this.status = axiosError.response?.status;
        console.debug(axiosError);
    }

    getFriendlyMessage() {
        switch (this.status) {
            case 412: {
                return "Your data is old. Refresh the screen";
            }
            default: {
                return "Status" + this.status
            }
        }
    }

}
