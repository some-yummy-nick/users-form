import {type Labels, type Password, UserType} from "@/types/User.ts";

export class User {
    public constructor(
        public login: string = '',
        public password: Password = { isVisible: false, value: '' },
        public type: UserType = UserType.LDAP,
        public labels: Labels = { value: '', parsed: [] },
    ) {}
}

