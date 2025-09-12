import {UserType} from "@/types/User.ts";

export class User {
    public constructor(
        public login: string = '',
        public password: string = '',
        public type: UserType = UserType.LOCAL,
        public labels: any = [],
    ) {
    }
}

